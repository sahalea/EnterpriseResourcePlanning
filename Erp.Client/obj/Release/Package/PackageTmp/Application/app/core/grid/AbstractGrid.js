Ext.define('Erp.core.grid.AbstractGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.abstractgrid',

    requires: [
       'Erp.core.connection.RequestManager',
       'Erp.core.proxy.ErpServiceProxy'
    ],

    inject: ['requestManager'],

    config: {
        requestManager: null
    },

    linkedControls: new Array(),

    removedKeys: new Array(),

    autoLoadData: true,

    enableRowDelete: true,

    autoCreateToolbar: true,

    enablePaging: false,

    editable: false,

    groupField: undefined,

    selType: 'rowmodel',

    rowNumber: true,

    start: 0,

    editControl: null,

    limit: 25,

    resumeEdit: true,

    groupHeaderTpl: '{name} ({rows.length})',

    addButton: null,

    autoSave: false,

    columnTypes: {
        auto: 'gridcolumn',
        bool: 'checkcolumn',
        int: 'numbercolumn',
        string: 'gridcolumn',
        float: 'numbercolumn',
        date: 'datecolumn'
    },

    editorTypes: {
        auto: 'textfield',
        bool: 'checkbox',
        int: 'numberfield',
        string: 'textfield',
        float: 'numberfield',
        date: 'datefield'
    },

    initComponent: function (cfg) {
        var self = this;


        Ext.apply(self, cfg || {});

        var defaultCfg = { xtype: 'gridcolumn' };
        var columns = new Array();

        self.store = self._getStore();
        self.columns = self.createColumns();
        self.forceFit = false;

        if (self.autoCreateToolbar) {
            self.dockedItems = [self.createToolbar()];
        }

        self.features = [
           // { ftype: 'filters', encode: false }
        ];

        if (self.groupField != undefined) {
            self.groupingFeature = new Ext.create('Ext.grid.feature.Grouping', {
                groupHeaderTpl: self.groupHeaderTpl,
                hideGroupHeader: true,
                startCollapsed: true
            });
            self.features.push(self.groupingFeature);
        }

        if (self.enablePaging) {
            var pagingCfg = { xtype: 'pagingtoolbar', dock: 'bottom', store: self.store };
            if (self.dockedItems) {
                self.dockedItems.push(pagingCfg)
            }
            else {
                self.dockedItems = pagingCfg;
            }
        }

        self.plugins = [
             Ext.create('Ext.grid.plugin.CellEditing', {
                 ptype: 'cellediting',
                 clicksToEdit: 1
             })
        ];


        self.on('edit', self.onEdit, this);
        self.on('beforeedit', self.onBeforeEdit, this);

        self.callParent(arguments);
        self.configureButtons();
    },

    hasColumn: function(arr, columnName) {
        var hasColumn = false;
        Ext.each(arr, function(value, index) {
            if(value.name == columnName)
                hasColumn = true;
        });
        return hasColumn;
    },

    configureButtons: function () {
        var toolbar = this.getDockedItems('toolbar[dock=top]');
        if (toolbar && toolbar.length > 0) {
            toolbar = toolbar[0];
            this.addButton = toolbar.down('button[action=addtablerow]');
        }
    },

    getFistVisibleColumn: function () {
        var visibleColumn = null, idx = 0;
        Ext.each(this.columns, function (column, index) {
            if (column.hidden || column.xtype == 'rownumberer') {
                return true;
            }
            else {
                visibleColumn = column;
                idx = index;
                return false;
            }
        });
        return { column: visibleColumn, index: idx };
    },

    setPhantom: function (status) {
        this.store.each(function (record) { record.phantom = status; });
    },

    onBeforeEdit: function (editor, e, evt) {
        var self = this;

        self.resumeEdit = true;

        if (self.editable) {
            self.fireEvent('beforecelledit', this, editor, e, evt);
        }

        if (!self.resumeEdit) {
            return false;
        }

        return self.editable;
    },

    onEdit: function (editor, e) {
        if (e.column.getEditor().xtype.indexOf('combo') != -1) {
            var record = e.column.getEditor().store.findRecord(e.column.dataIndex, e.value);
            if (record) {
                if (e.column.rendererConfig) {
                    //e.record.set(e.column.rendererConfig.name, record.get(e.column.rendererConfig.columnName))
                    var parts = e.column.rendererConfig.columnName.split('.');
                    var recordData = record.get(parts[1]);

                    //e.record.set(e.column.rendererConfig.name, recordData);
                  e.record.set(parts[0], record.data);

                }

                if (e.column.afterEdit) {
                    for (var key in e.column.afterEdit) {
                        if (Ext.isString(e.column.afterEdit[key])) {
                            e.record.set(key, record.get(e.column.afterEdit[key]));
                        }
                        else {
                            e.record.set(key, e.column.afterEdit[key]);
                        }
                    }
                }
            }
            if (e.column.editHandler) {
                e.column.editHandler.apply(me, [editor, e]);
            }
        }
        this.fireEvent('aftercelledit', this, editor, e);
    },

    createColumns: function () {
        var self = this,
            model = null,
            columns = new Array();

        var defaultCfg = { xtype: 'gridcolumn', editor: { xtype: 'textfield' } };

        if (this.rowNumber) {
            columns.push({ xtype: 'rownumberer' });
        }

        Ext.each(this.columns, function (column) {
            var config = {},
                columnConfig = {};

            if (Ext.isString(column)) {
                config = { text: column, dataIndex: column };
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
                          if(relationShipData) {
                              data = relationShipData[parts[1]];
                          }
                      }
                      //record.set(config.rendererConfig.name, data);
                      return data;//record.get(config.rendererConfig.name);
                    };
                }
            }

            Ext.apply(columnConfig, defaultCfg);
            Ext.apply(columnConfig, config);

            if (columnConfig.editor && Ext.isObject(columnConfig.editor)) {
                if (columnConfig.editor.xtype == 'datefield') {
                    columnConfig.editor.format = 'd/m/Y';
                }
            }

            columns.push(columnConfig);
        }, this);

        if (this.enableRowDelete) {
            columns.push({
                xtype: 'actioncolumn',
                width: 23,

                items: [
                    {
                        icon: 'Application/resources/images/16/delete.png',
                        tooltip: 'Delete',
                        style: { cursor: 'hand' },
                        handler: this.deleteRow,
                        scope: this
                    }
                ]
            })
        }

        return columns;
    },

    createToolbar: function () {
        this.toolbar = Ext.create('Ext.toolbar.Toolbar', {
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add New Row',
                    action: 'addtablerow',
                    iconCls: 'table_add',
                    handler: this.initializeInsert,
                    scope: this
                }
            ]
        });
        return this.toolbar;
    },

    initializeInsert: function () {
        var editor = null,
            model = this.store.model,
            position = this.store.getCount(),
            data = new model(Ext.apply({}, this.initialValues || {}));

        if (this.editControl == null) {
            this.store.insert(position, data);

            Ext.each(this.plugins, function (plugin, index) {
                if (plugin.$className == "Ext.grid.plugin.CellEditing") {
                    editor = plugin;
                }
            }, this);

            var firstVisibleColumn = this.getFistVisibleColumn().index;

            if (editor != null) {
                editor.startEditByPosition({ row: position, column: 2 });
            }
        }
        else {
            var editControl = Ext.create(this.editControl);
            editControl.show();
        }
    },

    setEditable: function (flag) {
        if (this.addButton) {
            flag == true ? this.addButton.enable() : this.addButton.disable();
        }
        this.editable = flag;
    },

    deleteRow: function (grid, index, allItems, button, evt, record) {
        var me = this, store = me.getStore();
        if (this.editable) {
            this.deleteRecord(record, this.autoSave);
        }
    },

    deleteRecord: function (index, autoSave) {
        var me = this, record = null;
        if (Ext.isNumber(index)) {
            record = this.store.getAt(index);

        }
        console.log(index);
        // Means index is the record object
        if (Ext.isObject(index)) {
            record = index;
        }

        var callback = function (button) {
            if (button == 'yes') {
                this.store.remove(record);
                if (!record.phantom && me.keyName) {
                    me.removedKeys.push(record.data[me.keyName]);
                }
                if (autoSave) {
                    me.saveRecord();
                }
            }
        };

        Ext.MessageBox.show({
            title: 'Confirm', msg: 'Are you sure want to delete?', icon: Ext.MessageBox.QUESTION,
            buttons: Ext.MessageBox.YESNO, scope: me, modal: true, fn: callback
        });
    },

    _getStore: function () {
      var me = this;
        var fields = new Array();

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

        var store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'erpservice',
                url: this.urls.list,
                useDefaultXhrHeader: false,
                disableCaching: true,
                reader: {
                    type: 'json',
                    rootProperty:  this.name + '.Record',
                    totalProperty: this.name + '.TotalRecords'
                },
                extraParams: {
                    start: 0,
                    limit: 25
                }
            },
            fields: fields
        });

        return store;
    },

    destroy: function () {
        if (this.store) {
            this.store.destroy();
        }
        this.callParent(arguments);
    },

    saveRecord: function () {
        var self = this,
            param = {},
            config = null;

        param.removedKeys = {};
        param.data = {};

        if (self.store.getCount() != 0) {
            param.data[self.componentName] = new Array();
            self.store.each(function (record) {
                if (record.get(self.keyName) != '0' || record.dirty) {
                    param.data[self.componentName].push(record.data);
                }
            });

            Ext.each(self.linkedControls, function (ctrl, index) {
                var control = Ext.ComponentQuery.query('*[componentName=' + ctrl + ']');
                if (control) {
                    switch (ctrl.xtype) {
                        case 'grid':
                        case 'dataview':
                        case 'abstractgrid':
                            param.data[control.componentName] = new Array();
                            control.store.each(function (record) {
                                param.data[control.componentName].push(record.data);
                            });
                            break;
                    }
                }
            });
        }

        function onSuccess() {

        }

        function onFailure() {

        }

        self.getRequestManager().post({ url: self.urls.save, params: param, jsonSubmit: true }).success(onSuccess).failure(onFailure);
    }
});
