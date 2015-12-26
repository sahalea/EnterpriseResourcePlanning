/**
 * @class Erp.view.toolbar.Statusbar
 * @extend Ext.toolbar.Toolbar
 * @alias widget.statusbar
 */
Ext.define('Erp.view.toolbar.Statusbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.appstatusbar',

    /**
     * Initializes viewport class
     * @param {Object} arguments
     * @return {void} null
     */

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    iconCls: 'database',
                    text: 'Database Utils',

                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype: 'menuitem',
                                iconCls: 'database',
                                className: 'Erp.view.settings.code.CodeGenerator',
                                type: 'toolbar-menu',
                                text: 'Generate Model'
                            }
                        ]
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});