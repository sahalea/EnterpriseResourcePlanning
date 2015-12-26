
/**
* @class Erp.view.lookups.Unit
* @extend Ext.window.Window
*/
Ext.define("Erp.view.lookups.Unit", {
    extend: 'Ext.window.Window',
    alias: 'widget.unit',

    height: 250,
    width: 430,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    iconCls: 'user',
    title: 'Manage Unit',

    requires: [
       'Erp.core.form.AbstractForm',
       'Erp.core.form.AbstractCombo',
       'Erp.core.toolbar.FormToolbar'
    ],

    listConfig: {
        url: serviceEndPointBase + 'api/units/query',
        name: 'Units',
        columns: [
            {
                name: 'UnitCode',
                text: 'Unit Code',
                width: 120
            },
            {
                text: 'Name',
                flex: 1,
                name: 'Name'
            }
        ]
    },

    /**
     * initializes the class
     * @return {void} null
     */
    initComponent: function () {
        var me = this;
        Ext.apply(this.listConfig, {
            listeners: {
                recordselected: function (record) {
                    me.down('abstractform').loadRecord(record.data);
                }
            }
        });

        Ext.apply(me, {
            buttons: [
                {
                    text: 'Help',
                    iconCls: 'help'
                },
                {
                    xtype: 'tbfill'
                },
                {
                    text: 'Close',
                    iconCls: 'cancel'
                }
            ],

            dockedItems: [
                {
                    xtype: 'app-form-toolbar',
                    dock: 'top'

                }
            ],
            items: [
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    height: 65,
                    border: false,

                    layout: {
                        type: 'vbox'
                    },

                    items: [
                        {
                            xtype: 'box',
                            html: '<b>Unit</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Unit , click Add. To change a Unit , select the group' +
                                  ' <br/> then click Edit or Remove'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyPadding: 5,
                    flex: 1,

                    bodyStyle: {
                        borderRight: 'none',
                        borderLeft: 'none',
                        borderBottom: 'none',
                        background: 'transparent'
                    },

                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    items: [
                        {
                            xtype: 'abstractform',
                            keyField: 'UnitId',
                            urls: {
                                save: serviceEndPointBase + 'api/units/save'
                            },
                            bodyStyle: {
                                background: 'transparent'
                            },

                            items: [
                                 {
                                     xtype: 'fieldcontainer',
                                     flex: 1,
                                     layout: {
                                         align: 'stretch',
                                         type: 'vbox'
                                     },
                                     items: [
                                         {
                                             xtype: 'hiddenfield',
                                             name: 'UnitId'
                                         },
                                         {
                                             xtype: 'textfield',
                                             margin: '5 5 5 5',
                                             fieldLabel: 'Unit Code',
                                             name: 'UnitCode'
                                         },
                                         {
                                             xtype: 'textfield',
                                             margin: '5 5 5 5',
                                             fieldLabel: 'Name',
                                             name: 'Name'
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
