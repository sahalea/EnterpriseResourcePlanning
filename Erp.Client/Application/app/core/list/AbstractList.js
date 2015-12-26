Ext.Ajax.cors = true;
Ext.Ajax.useDefaultXhrHeader = false;

Ext.define('Erp.core.list.AbstractList', {
    extend: 'Ext.window.Window',
    requires: ['Erp.core.proxy.ErpServiceProxy'],

    width: 500,
    height: 450,

    iconCls: 'application_view_columns',
    title: 'List',

    /**
     * @constructor
     * @return
     */
    constructor: function () {
        this.callParent(arguments);
    },

    initComponent: function (cfg) {
        var me = this;

        Ext.apply(me, cfg || {});

        if (Ext.isEmpty(me.name)) {
            throw new Error('name is not defined');
        }

        var defaultCfg = { xtype: 'gridcolumn' };
        var columns = new Array();

        columns.push({ xtype: 'rownumberer' });

        Ext.each(this.columns, function (column, index) {
          var config = {},
              columnConfig = {};
            if(Ext.isString(column)) {
              columns.push({ text: column, dataIndex: column });
            }
            else {
              Ext.apply(config, column);
              config.text = column.text ? column.text : column.name;
              config.dataIndex = column.name;
              if (column.renderer && !Ext.isFunction(column.renderer)) {
                config.rendererConfig = column.renderer;
                  config.renderer = function (value, meta, record) {
                    var data = '';
                    if(config.rendererConfig.columnName) {
                        var parts = config.rendererConfig.columnName.split('.');
                        var relationShipData = record.get(parts[0]);
                        console.log(relationShipData);
                        if(relationShipData) {
                            data = relationShipData[parts[1]];
                        }
                    }
                    return data;//record.get(field.renderer.name);
                  };
                }
            }

            Ext.apply(columnConfig, defaultCfg);
            Ext.apply(columnConfig, config);
            columns.push(columnConfig);
        });

        this.grid = Ext.create('Ext.grid.Panel', {
            columns: columns,
            border: false,
            store: this._getStore(),
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.store,
                    dock: 'bottom'
                }
            ],
            listeners: {
                scope: this,
                rowdblclick: this.onRowDblClick
            }
        });

        Ext.apply(me, {
            buttons: [
                {
                    text: 'Ok',
                    iconCls: 'tick',
                    action: 'ok',
                    listeners: {
                        scope: this,
                        click: this.onActionButtonClicked
                    }
                },
                {
                    text: 'Cancel',
                    action: 'cancel',
                    iconCls: 'cancel',
                    listeners: {
                        scope: this,
                        click: this.onActionButtonClicked
                    }
                }
            ],
            layout: {
                type: 'fit'
            },
            items: [
                this.grid
            ],
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            emtyText: 'Search...',
                            enableKeyEvents: true,
                            listeners: {
                                scope: this,
                                keyUp: this.onEnterPressed
                            }
                        },
                        {
                            text: 'Find',
                            iconCls: 'find',
                            listeners: {
                                scope: this,
                                click: this.filterData
                            }
                        }
                    ]
                }
            ]
        });

        if (this.layoutConfig) {
            Ext.apply(this, this.layoutConfig);
        }

        me.callParent(arguments);
    },

    /**
     * Show me the  fields value in console msg me when its' done ok
     */
    _getStore: function () {
        var me = this;

        function getFields() {
            var fields = new Array();
            if (!Ext.isEmpty(me.columns)) {
                Ext.each(me.columns, function (value, index ) {
                    if (Ext.isString(value)) {
                        fields.push({
                            name: value,
                            type: 'auto'
                        });
                    }
                    else {
                        fields.push({
                            name: value.dataIndex || value.name,
                            type: value.type || 'auto'
                        });
                        if(value.renderer && Ext.isObject(value.renderer)) {
                            var columnName = value.renderer.columnName.split('.');
                            if(columnName.length > 0 && !me.hasColumn(fields, columnName[0])) {
                                fields.push({ name: columnName[0], type:'auto' });
                            }
                            if(value.renderer.name && !me.hasColumn(fields, value.renderer.name)) {
                                fields.push({ name: value.renderer.name, type:  'string'});
                            }
                        }
                    }
                });
            }
            return fields;
        }

        var fields = getFields();
        if (Ext.isEmpty(fields)) {
            throw new Error('columns are not specified in the listConfig object');
        }

        console.log(fields);

        this.store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            proxy: {
                type: 'erpservice',
                url: this.url,
                useDefaultXhrHeader: false,
                disableCaching: true,
                headers: ServiceHelper.getServiceHeader(),
                reader: {
                    type: 'json',
                    rootProperty:  me.name + '.Record',
                    totalProperty: me.name + '.TotalRecords'
                },
                extraParams: {
                    query: ""
                }
            },
            fields: fields,
            listeners: {
                scope: this,
                load: this.storeLoaded
            }
        });
        return this.store;
    },

    hasColumn: function(arr, columnName) {
        var hasColumn = false;
        Ext.each(arr, function(value, index) {
            if(value.name == columnName)
                hasColumn = true;
        });
        return hasColumn;
    },

    destroy: function () {
        if (this.store != null) {
            this.store.destroy();
        }
        this.callParent(arguments);
    },

    filterData: function () {
        var textfield = this.down('textfield');
        this.store.proxy.extraParams.query = textfield.getValue();
        this.store.load();
    },

    onEnterPressed: function (textfield, evt) {
        if (evt.keyCode == 13) {
            this.store.proxy.extraParams.query = textfield.getValue();
            this.store.proxy.extraParams.start = 0;
            this.store.proxy.extraParams.page = 1;
            this.store.load();
        }
    },

    storeLoaded: function (store, records) {
        var me = this;
        if (records && records.length > 0) {
            setTimeout(function () {
                console.log(me.grid.getSelectionModel().select(0))
            }, 100);
        }
    },

    onRowDblClick: function (table, record, tr, rowIndex, evt, opts) {
        this.selectRow(record);
    },

    selectRow: function (record) {
        this.fireEvent('recordselected', record);
        this.close();
    },

    onActionButtonClicked: function (button, evt) {
        switch (button.action) {
            case 'ok':
                var selection = this.grid.getSelection();
                if (selection.length > 0) {
                    this.selectRow(selection[0]);
                }
                break;
            case 'cancel':
                this.close();
                break;
        }
    }
});
