Ext.define('Erp.Application', {
    extend: 'Ext.app.Application',

    name: 'Erp',

    appFolder: baseUrl + '/app',

    viewportName: 'Erp.view.Viewport',

    requires: [
        'Deft.mixin.Injectable',
        'Deft.mixin.Controllable',
        'Erp.core.connection.RequestManager',
        'Erp.core.messaging.NotificationService',
        'Erp.core.connection.ServiceHelper',
        'Erp.core.ErpCore',
        'Erp.core.form.AbstractForm',
        'Erp.view.Viewport'

    ],

    controllers: [
        'Erp.controller.ErpController'//,
        //'Erp.core.controller.AbstractController'
    ],
    stores: [
        // TODO: add global / shared stores here
		      'Erp.store.ErpModules'
    ],

    init: function () {


        Deft.Injector.configure({
            requestManager: 'Erp.core.connection.RequestManager',
            notificationService: 'Erp.core.messaging.NotificationService'
        });

        Ext.tip.QuickTipManager.init();
        Ext.create(this.viewportName);
       // Ext.create('Erp.view.lookups.Unit').show();
    }
});
