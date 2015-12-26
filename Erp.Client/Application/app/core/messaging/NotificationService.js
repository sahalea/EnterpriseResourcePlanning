Ext.define('Erp.core.messaging.NotificationService', {
    extend: 'Ext.Base',
    singleton: true,

    /**
     * Shows the message box with info icon and ok button
     *      notificationService.notifyInfo({title: '', msg: ''})
     *                         .then(function () {
     *                              //Do actions here
     *                          });
     */
    notifyInfo: function (cfg) {
        var promise = new Promise(this);

        Ext.MessageBox.show({
            title: cfg.title || 'title',
            msg: cfg.msg || '',
            icon: Ext.MessageBox.INFO,
            buttons: Ext.MessageBox.OK,
            fn: function () {
                promise.success(arguments);
            }
        });

        return promise;
    },

    notifyOkCancel: function (cfg) {
        var promise = new Promise(this);

        Ext.MessageBox.show({
            title: cfg.title || 'title',
            msg: cfg.msg || '',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function (btn) {
                if (btn == 'ok') {
                    promise.success();
                }
                else {
                    promise.failure();
                }
            }
        });

        return promise;
    },

    notifyYesNo: function (cfg) {
        var promise = new Promise(this);

        Ext.MessageBox.show({
            title: cfg.title || 'title',
            msg: cfg.msg || '',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    promise.success();
                }
                else {
                    promise.failure();
                }
            }
        });

        return promise;
    },

    notifyError: function (title, msg) {
        Ext.MessageBox.show({
            title: title || 'title',
            msg: msg || '',
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.MessageBox.OK
        });
    }
});