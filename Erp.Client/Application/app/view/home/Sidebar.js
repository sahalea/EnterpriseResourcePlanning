/**
 * @class Erp.view.home.Sidebar
 * @extend Ext.panel.Panel
 */

Ext.define('Erp.view.home.Sidebar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sidebar',

    require: [
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View'
  ],
  layout: {
            type: 'vbox',
            align: 'stretch'
        },
        dockedItems: [
            {
                xtype: "toolbar",
                dock: 'bottom',
                items: [
                    {
                        xtype: 'textfield',
                        flex: 1,
                        emptyText: 'Search Help...'
                    },
                    {
                        text: 'Search',
                        iconCls: 'find'
                    }

                ]

            }
        ],

        items: [
            {
                flex: 1,
                xtype: 'panel',
                border: false,
                plain: true,
                html: 'Info',
                bodyCls: 'erp-home-info-panel',
                bodyStyle: {
                    background: 'transparent'
                },

                html: '<div class="erp-info-panel-title">Login Time</div><div>' + Ext.Date.format(new Date(), 'g:i a') + '</div><br/>' +
                             '<div class="erp-info-panel-title">Financial Year</div><div>2015-2016</div><br/>' +
                             '<div class="erp-info-panel-title">Login User</div><div>' + identity.user.fullName + '</div><br/>' +
                             '<div class="erp-info-panel-title">Company</div><div>Al-Fuzail Group</div><br/>' +
                             '<div class="erp-info-panel-title">System Date Time</div><div id="inventory-clock">' + identity.user.loginTime + '</div>',


                listeners: {
                    render: {
                        fn: function () {
                            Ext.TaskManager.start({
                                run: function () {
                                    Ext.fly(Ext.get('inventory-clock')).update(Ext.Date.format(new Date(), 'n/d/Y g:i:s a'));
                                },
                                interval: 1000
                            });
                        },
                        delay: 100
                    }
                }
            },
            {
                xtype: 'dataview',
                store: 'Erp.store.ErpModules',
                bodyCls:{
                  borderTop: 'none'
                },
                flex: 1,
                itemTpl: [
                    '<tpl for=".">',
                        '<div class="erp-modules-shortcuts {disabled}">',
                            '<span class="{Icon} erp-module-name">{ModuleName}</span>',
                        '</div>',
                    '</tpl>'
                ],
                listeners: {
                      select: function(record, eOpts ){
                            var tabs = Ext.getCmp('erp-container-panel');
                            tabs.add({
                              title: eOpts.data.ModuleName,
                              iconCls: eOpts.data.Icon,
                              closable: true,
                              id: eOpts.data.ModuleId,
                              items: [Ext.create(eOpts.data.ClassName)]
                            });
                            Ext.getCmp('erp-container-panel').setActiveTab(eOpts.data.ModuleId);
                    }
              }
            }
        ]
    });
