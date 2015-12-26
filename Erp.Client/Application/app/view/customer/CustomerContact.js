
/**
* @class Erp.view.customer.CustomerContact
* @extend Ext.window.Window
*/
Ext.define("Erp.view.customer.CustomerContact", {
    extend: 'Ext.window.Window',
    alias: 'widget.customercontact',

    height: 280,
    width: 550,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    requires: [
       'Erp.core.form.AbstractForm',
       'Erp.core.form.AbstractCombo',
       'Erp.core.toolbar.FormToolbar'
    ],
    listConfig: {
        name: 'CustomerContacts',
        columns: [
            {
                name: 'CustomerId',
                text: 'Customer',
                width: 120,
                renderer: {
                    name: 'CustomerName',
                    columnName: 'Customers.Name'
                },
            },
            {
                text: 'Customer Contact',
                flex: 1,
                name: 'Name'
            }
        ],
        url: basePath + 'api/customerContact/query'
    },

    iconCls: 'user',
    title: 'Customer Contact',

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
                            html: '<b>Customer Contact</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add customer contact, click Add. To change a customer contact, select the group' +
                                  ' <br/> then click Edit or Remove'
                        }
                    ]
                },
                {
                    xtype: 'form',
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
                            name: 'CustomerContacts',
                            keyField: 'CustomerContactId',
                            padding: 5,
                            urls: {
                                save: serviceEndPointBase + 'api/customerContacts/save',
                                read: serviceEndPointBase + 'api/customerContact/',
                                delete: serviceEndPointBase + 'api/deleteCustomerContact'
                            },
                            bodyStyle: {
                                background: 'transparent'
                            },
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
                                    name: 'CustomerContactId'
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Name',
                                    name: 'Name'
                                },
                                {
                                    xtype: 'abstractcombo',
                                    id: 'abc',
                                    url: serviceEndPointBase + 'api/customer/',
                                    fields: ['CustomerId', 'Name'],
                                    displayField: 'Name',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Customer',
                                    valueField: 'CustomerId',
                                    name: 'CustomerId',
                                    entity: 'Customers',
                                    hiddenName: 'CustomerId',
                                    type: 'app-form-data-selector',
                                    autoLoadData: true,
                                    queryMode: 'local',
                                    valueNotFoundText: 'No Valu Found'
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Mobile Number',
                                    name: 'Mobile'
                                }
                            ]
                            },
                            {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Designation',
                                    name: 'Designation'
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    fieldLabel: 'Email',
                                    name: 'Email'
                                },

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
