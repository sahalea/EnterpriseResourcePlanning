/**
 * @class Erp.store.ErpModules
 * @extend Ext.data.Store
 */

Ext.define('Erp.store.ErpModules', {
    extend: 'Ext.data.Store',
    alias: 'store.erpmdules',


        autoLoad: true,

    /**
     * Constructor
     * @param {Object} cfg
     * @return {void} null
     */
    constructor: function (cfg) {
        var me = this;
        me.callParent([Ext.apply({
            storeId: 'ErpModules',
            data: [
             { ModuleId: 1, ModuleName: 'Buisiness Status', Icon: 'flag_yellow' },
             { ModuleId: 2, ModuleName: 'Customers & Sales', Icon: 'expand-icon', ClassName: 'Erp.view.home.graphs.SalesGraph'  },
             { ModuleId: 3, ModuleName: 'Vendors & Purchases', Icon: 'css_add' },
             { ModuleId: 4, ModuleName: 'Inventory & Services', Icon: 'database_edit' },
             { ModuleId: 5, ModuleName: 'Employees & Payroll', Icon: 'date_previous' },
             { ModuleId: 6, ModuleName: 'Banking', Icon: 'map_edit', ClassName: 'Erp.view.home.graphs.AccountsGraph' },
             { ModuleId: 7, ModuleName: 'System', Icon: 'shape_align_bottom' }
           ],
            fields: [
                {
                    name: 'ModuleId',
                    type: 'int'
                },
                {
                    name: 'ModuleName',
                    type: 'string'
                },
                {
                    name: 'Icon',
                    type: 'string'
                },
                {
                    name: 'ClassName',
                    type: 'string'
                }
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        }, cfg || {})]);
    }

});
