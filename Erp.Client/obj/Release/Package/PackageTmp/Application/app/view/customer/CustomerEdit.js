
/**
* @class Erp.view.customer.CustomerEdit
* @extend Ext.window.Window
*/
Ext.define("Erp.view.customer.CustomerEdit", {
    extend: 'Ext.window.Window',
    alias: 'widget.customeredit',

    height: 450,
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
        url: serviceEndPointBase + 'api/customer/query',
        name: 'Customers',
        columns: [
            {
                name: 'CustomerCode',
                text: 'Customer Code',
                width: 120
            },
            {
                text: 'Name',
                name: 'Name',
                flex: 1
            }
        ]
    },

    iconCls: 'user',
    title: 'Customer',

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
                            html: '<b>Customer</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add customer , click Add. To change a customer , select the group' +
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
                             name: 'Customers',
                             keyField: 'CustomerId',
                             urls: {
                                 save: serviceEndPointBase + 'api/customer/save',
                                 read: serviceEndPointBase + 'api/customer/',
                                 delete: serviceEndPointBase+ 'api/deleteCustomer/'
                             },
                             bodyStyle: {
                                 background: 'transparent',
                                 padding: '5px'
                             },

                             listeners: {
                                 scope: this,
                                 recordloaded: me.recordLoaded
                             },

                             layout: {
                                 type: 'anchor'
                             },
                             items: [
                                 {
                                     xtype: 'hiddenfield',
                                     name: 'CustomerId'
                                 },
                                 {
                                     xtype: 'textfield',
                                     fieldLabel: 'Customer Code',
                                     name: 'CustomerCode',
                                     readOnly: true,
                                     emptyText: 'A0000'
                                 },
                                 {
                                     xtype: 'textfield',
                                     fieldLabel: 'Customer Name*',
                                     name: 'Name',
                                     anchor: '100%',
                                     emptyText: ' Please Enter Customer Name...'
                                 },
                                 {
                                     xtype: 'textfield',
                                     fieldLabel: 'City',
                                     name: 'City',
                                     emptyText: 'City',
                                     anchor: '100%'
                                 },
                                 {
                                     xtype: 'fieldcontainer',
                                     layout: {
                                         type: 'hbox'
                                     },
                                     anchor: '100%',
                                     items: [
                                         {
                                             xtype: 'abstractcombo',
                                             fieldLabel: 'Country',
                                             id:'abc',
                                             margin: '0 5 0 0',
                                             url: serviceEndPointBase + 'api/country/',
                                             fields: ['CountryId', 'Name'],
                                             displayField: 'Name',
                                             valueField: 'CountryId',
                                             entity: 'Country',
                                             name: 'CountryId',
                                             hiddenName: 'CountryId',
                                             type: 'app-form-data-selector',
                                             autoLoadData: true,
                                             flex: 1,
                                             iconClsField: 'countryFlag',
                                             queryMode: 'local',
                                             valueNotFoundText:'No Valu Found'
                                         },
                                         {
                                             xtype: 'textfield',
                                             fieldLabel: 'Post Box',
                                             name: 'PostBox',
                                             flex: 1,
                                             emptyText: '0000256'
                                         }
                                     ]
                                 },
                                 {
                                     xtype: 'fieldcontainer',
                                     layout: {
                                         type: 'hbox'
                                     },
                                     anchor: '100%',
                                     items: [
                                        {
                                            xtype: 'icontext',
                                            margin: '0 5 0 0',
                                            fieldLabel: 'Telephone No',
                                            name: 'Phone',
                                            iconCls: 'phone',
                                            flex: 1,
                                            emptyText: '+9740125635'
                                        },
                                        {
                                            xtype: 'icontext',
                                            fieldLabel: 'Mobile',
                                            name: 'Mobile',
                                            flex: 1,
                                            emptyText: '+9740125635',
                                            iconCls: 'phone'
                                        }
                                     ]
                                 },
                                 {
                                     xtype: 'fieldcontainer',
                                     layout: {
                                         type: 'hbox'
                                     },
                                     anchor: '100%',
                                     items: [
                                         {
                                             xtype: 'icontext',
                                             margin: '0 5 0 0',
                                             fieldLabel: 'Fax',
                                             name: 'Fax',
                                             emptyText: '+9740125635',
                                             flex: 1,
                                             iconCls:'page_white_copy'
                                         },
                                         {
                                             xtype: 'icontext',
                                             fieldLabel: 'Fax - 1',
                                             name: 'Fax1',
                                             emptyText: '+9740125635',
                                             flex: 1,
                                             iconCls: 'page_white_copy'
                                         }
                                     ]
                                 },
                                 {
                                     xtype: 'icontext',
                                     fieldLabel: 'Email',
                                     name: 'Email',
                                     emptyText: 'email@domain.com',
                                     anchor: '100%',
                                     iconCls:'email'
                                 },
                                 {
                                     xtype: 'icontext',
                                     fieldLabel: 'Website',
                                     name: 'Website',
                                     emptyText: 'http://www.domain.com',
                                     anchor: '100%',
                                     iconCls:'world'
                                 },
                                 {
                                     xtype: 'fieldcontainer',
                                     anchor: '100%',
                                     layout: {
                                         type: 'hbox'
                                     },
                                     items: [
                                         {
                                            xtype: 'abstractcombo',
                                            fieldLabel: 'General Ledger',
                                            margin: '0 5 0 0',
                                            url: serviceEndPointBase + 'api/accounttype',
                                            fields: ['AccountTypeId', 'Name'],
                                            displayField: 'Name',
                                            valueField: 'AccountTypeId',
                                            entity: 'AccountType',
                                            name: 'AccountTypeId',
                                            hiddenName: 'AccountTypeId',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            flex: 1,
                                            iconClsField: 'report',
                                            queryMode: 'local',
                                            valueNotFoundText:'No Valu Found'
                                         },
                                         {
                                             xtype: 'textfield',
                                             fieldLabel: 'Opening Balance',
                                             name: 'OpeningBalance',
                                             flex: 1,
                                             iconCls: 'money_dollar'
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

    recordLoaded: function (record) {
        var me = this;
        if (record.CustomerDetails && record.CustomerDetails.length > 0) {
            me.down('abstractform').getForm().setValues({
                OpeningBalance: record.CustomerDetails[0].OpeningBalance,
                AccountTypeId : record.CustomerDetails[0].AccountType.Name
            });
        }
    }
});
