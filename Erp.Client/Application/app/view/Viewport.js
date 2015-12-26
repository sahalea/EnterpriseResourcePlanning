Ext.define('Erp.view.Viewport', {
    extend: 'Ext.container.Viewport',
    renderTo: Ext.getBody(),
    xtype: 'app-main',
    layout: {
        type: 'fit'
    },

    requires: [
        'Erp.view.home.Sidebar',
        'Erp.view.toolbar.AppToolbar',
        'Erp.view.toolbar.Statusbar',
        'Erp.view.home.graphs.SalesGraph'
    ],

    /**
     * Initializes viewport class
     * @param {Object} arguments
     * @return {void} null
     */
    initComponent: function (arguments) {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    frame: true,
                    rtl: false,
                    layout: {
                        type: 'fit'
                    },
                    title: 'AL-FUZAIL GROUP',
                    iconCls: 'application_view_columns',
                    dockedItems: [
                        {
                            xtype: 'apptoolbar',
                            dock: 'top'
                        }
                    ],
                    tools: [
                       {
                           xtype: 'tool'
                       }
                    ],
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            bodyStyle: {
                                borderBottom: 'none',
                                borderTop: 'none',
                                background: 'transparent'
                            },
                            items: [
                                {
                                    xtype: 'sidebar',
                                    width: 222,
                                    border: false,
                                    bodyStyle: {
                                        background: 'transparent'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    border: false,
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 74,
                                            bodyCls: [
                                                'erp-home-header',
                                                'x-panel-body-default'
                                            ],
                                            bodyStyle: {
                                                borderBottom: 'none',
                                                borderRight: 'none',
                                                borderTop: 'none'
                                            }
                                        },
                                        {
                                            xtype: 'tabpanel',
                                            id: 'erp-container-panel',
                                            flex: 1,
                                            bodyStyle: {
                                                borderRight: 'none',
                                                borderBottom: 'none'
                                            },
                                            activeTab: 0,
                                            items: [
                                                {
                                                    xtype: 'salesgraph'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
