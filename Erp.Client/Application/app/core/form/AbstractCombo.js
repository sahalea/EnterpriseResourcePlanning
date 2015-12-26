Ext.define('Erp.core.form.AbstractCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.abstractcombo',

    requires: ['Erp.core.proxy.ErpServiceProxy'],
    autoLoadData: false,
    initComponent: function (cfg) {
        var me = this;

        Ext.apply(me, cfg || {});

        Ext.apply(me, {
            store: this._getStore(),
            displayField: this.displayField || 'text',
            valueField: this.valueField || 'value',
            typeAhead: true,
            triggerAction: 'all'
        });
        console.log(this.autoLoadData);
        me.callParent(arguments);
    },

    _getStore: function () {
        var fields = new Array();
        if (this.fields) {
            Ext.each(this.fields, function (value, index) {
                if (Ext.isString(value)) {
                    fields.push({
                        name: value,
                        type: 'auto'
                    });
                }
                else {
                    fields.push(value);
                }
            });
        }

        this.store = Ext.create('Ext.data.Store', {
            autoLoad: this.autoLoadData,
            proxy: {
                type: 'erpservice',
                url: this.url,
                useDefaultXhrHeader: false,
                disableCaching: true,
                reader: {
                    type: 'json',
                    rootProperty: this.entity + '.Record',
                    totalProperty: this.entity + '.TotalRecords'
                },
                extraParams: {
                    start: 0,
                    limit: 25
                }
            },
            fields: fields
        });

        return this.store;
    },

    destroy: function () {
        if (this.store) {
            this.store.destroy();
        }
        this.callParent(arguments);
    },

    setUrl: function (url) {
        this.store.proxy.url = url;
    }
});
