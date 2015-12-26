
/**
* @class Erp.view.customer.CustomerContact
* @extend Ext.window.Window
*/
Ext.define("Erp.view.customer.DailyCustomerVisit", {
    extend: 'Ext.window.Window',
    alias: 'widget.dailycustomervisit',

    height: 280,
    width: 600,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    requires: [
        'Erp.core.form.AbstractForm',
        'Erp.core.form.AbstractCombo',
        'Erp.core.toolbar.FormToolbar',
        'Ext.ux.form.IconTextfield',
        'Ext.ux.form.IconCombo'
    ],

    listConfig: {
        url: serviceEndPointBase + 'api/customerVisit/query',
        name: 'DailyCustomerVisit',
        columns: [
            {
                name: 'CustomerId',
                text: 'Customer',
                slex: 1,
                renderer: {
                  name: 'CustomerName',
                  columnName: 'Customers.Name'
                }
            },
            {
                text: 'Contact',
                name: 'CustomerContactId',
                flex: 1,
                renderer: {
                  name: 'CustomerContact',
                  columnName: 'CustomerContacts.Name'
                }

            }
        ]
    },


    iconCls: 'user',
    title: 'Daily Customer Visit',

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
                   iconCls: 'report'
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
                            html: '<b>Daily Customer Visit</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add customervisit , click Add. To change a customervisit , select the group' +
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
                            keyField: 'CustomerVisitId',
                            urls: {
                                save: serviceEndPointBase + 'api/customerVisit/save',
                                read: serviceEndPointBase + 'api/customervisit/'
                            },
                            bodyStyle: {
                                background: 'transparent'
                            },

                            layout: {
                                type: 'anchor'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'CustomerVisitId'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    layout: {
                                        align: 'stretch',
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            margin: '5 0 0 5',
                                            fieldLabel: 'Date',
                                            name: 'Date'
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            flex: 1,
                                            fieldLabel: 'New Customer',
                                            columns: 2,
                                            margin: '5 0 0 15',
                                            items: [
                                                {
                                                    boxLabel: 'Yes',
                                                    inputValue: true,
                                                    name: 'IsNew'
                                                },
                                                {
                                                    boxLabel: 'No',
                                                    inputValue: false,
                                                    name: 'IsNew'
                                                }
                                            ]
                                        }
                                    ]
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
                                  anchor: '100%',
                                  valueNotFoundText: 'No Valu Found',
                                  listeners: {
                                        scope: this,
                                        select: this.customerSelected
                                    }
                                },

                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    layout: {
                                        align: 'stretch',
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                          xtype: 'abstractcombo',
                                          url: serviceEndPointBase + 'api/customercontact',
                                          fields: ['CustomerContactId', 'Name'],
                                          displayField: 'Name',
                                          valueField: 'CustomerContactId',
                                          entity: 'CustomerContacts',
                                          type: 'app-form-data-selector',
                                          autoLoadData: true,
                                          fieldLabel: 'Contact Person',
                                          name: 'CustomerContactId',
                                          hiddenName: 'CustomerContactId',
                                          queryMode: 'remote',
                                          margin: '5 5 0 5'
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Source',
                                            name: 'Source',
                                            width: 300,
                                            margin: '5 5 0 5',
                                            labelWidth: 50
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

    customerSelected: function (combo) {
        var customerId = combo.getValue();
        var customerContactCombo = this.down('abstractcombo[entity=CustomerContacts]');
        if (customerContactCombo) {
            delete combo.lastQuery
            customerContactCombo.setUrl(serviceEndPointBase + 'api/customercontacts/' + customerId);
            customerContactCombo.store.proxy.extraParams.id = customerId;
            customerContactCombo.store.load();
        }
    }

});
