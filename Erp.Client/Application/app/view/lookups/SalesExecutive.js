
/**
* @class Erp.view.lookups.SalesExecutive
* @extend Ext.window.Window
*/
Ext.define("Erp.view.lookups.SalesExecutive", {
    extend: 'Ext.window.Window',
    alias: 'widget.salesexecutive',

    height: 300,
    width: 500,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    requires: [
        'Erp.core.form.AbstractForm',
        'Erp.core.form.AbstractCombo',
        'Erp.core.toolbar.FormToolbar'
    ],

    iconCls: 'user',
    title: 'Sales Executive',

    listConfig: {
        url: serviceEndPointBase + 'api/executive/query',
        name: 'SalesExecutive',
        columns: [
            {
                name: 'EmployeeId',
                text: 'Employee Id',
                width: 120
            },
            {
                text: 'Name',
                name: 'Name',
                flex: 1
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
                     text: 'Reports',
                     iconCls: 'report',
                     menu: {
                         xtype: 'menu',
                         items: [
                             {
                                 text: 'menu1'
                             }
                         ]
                     }
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
                            html: '<b>Sales Executive</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add sales executive , click Add. To change a sales executive , select the group' +
                                  ' <br/> then click Edit or Remove'
                        }
                    ]
                },
                {
                    xtype: 'abstractform',
                    name: 'SalesExecutive',
                    keyField: 'ExecutiveId',
                    urls: {
                        save: serviceEndPointBase + 'api/executive/save',
                        read: serviceEndPointBase + 'api/executive',
                        delete: serviceEndPointBase + 'api/deletesalesexecutive'
                    },
                    bodyStyle: {
                        background: 'transparent'
                    },

                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    items: [

                        {
                            xtype: 'fieldcontainer',
                            padding: 5,

                            layout: {
                                type: 'hbox'
                            },
                            items:[
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
                                    name: 'ExecutiveId'
                                },

                                {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Emaployee ID',
                                    name: 'EmployeeId'
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Name',
                                    name: 'Name'
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Monthly Target',
                                    name: 'MonthlyTarget'
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
    },


});
