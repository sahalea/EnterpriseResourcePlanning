Ext.define('Erp.core.util.Util', {
    extend: 'Ext.Base',

    openMenuTarget: function (sender, evt) {
        if (sender.className) {
            var window = Ext.create(sender.className);
            window.show();
        }
    }
});