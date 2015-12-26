
Ext.define('Erp.core.proxy.ErpServiceProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.erpservice',

    requires: ['Erp.core.connection.ServiceHelper'],

    header:  {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    },

    useDefaultXhrHeader: false,
    disableCaching: true

});