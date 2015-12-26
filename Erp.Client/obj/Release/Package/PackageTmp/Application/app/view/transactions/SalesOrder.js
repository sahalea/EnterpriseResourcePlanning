/**
* @class Erp.view.transactions.SalesOrder
* @extend Ext.window.Window
*/
Ext.define("Erp.view.transactions.SalesOrder", {
    extend: 'Ext.window.Window',
    alias: 'widget.salesorder',

    height: 610,
    width: 1000,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    requires: [
        'Erp.core.form.AbstractForm',
        'Erp.core.form.AbstractCombo',
        'Erp.core.toolbar.FormToolbar',
        'Erp.core.grid.AbstractGrid'
    ],

    listConfig: {
        url: serviceEndPointBase + 'api/salesorder/query',
        name: 'SalesOrderMaster',
        columns: [
            {
                name: 'SalesOrderNumber',
                text: 'No',
                width: 120
            },
            {
                text: 'Customer',
                flex: 1,
                name: 'CustomerId',
                renderer: {
                  name: 'CustomerName',
                  columnName: 'Customers.Name'
                }
            },
            {
                text: 'Order Date',
                name: 'CreatedOn',
                width: 120
            },
            {
                text: 'P.O Number',
                name: 'PurchaseOrderNumber',
                width: 120
            }
        ]
    },

    iconCls: 'user',
    title: 'SalesOrder',
    name: 'topMostParent',
    /**
     * initializes the class
     * @return {void} null
     */
    initComponent: function () {
        var me = this;

        Ext.apply(this.listConfig, {
            listeners: {
                recordselected: function (record) {
                    me.down('abstractform').loadRecordOnEditMode(record.data);
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
                            html: '<b>Sales order</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Sales Order , click Add. To change a Sales Order , select the group' +
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
                            name: 'SalesOrderMaster',
                            keyField: 'SalesOrderMasterId',

                            linkedControls: [
                                'SalesOrderDetails'
                            ],

                            urls: {
                                save: serviceEndPointBase + 'api/salesorder/save',
                                read: serviceEndPointBase + 'api/salesorder'
                            },
                            bodyStyle: {
                                background: 'transparent',
                                padding: '5px'
                            },
                            layout: {
                                type: 'anchor'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'SalesOrderMasterId'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ' Number',
                                            name: 'SalesOrderNumber',
                                            emptyText: '0001',
                                            width: 220
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'purchase Number',
                                            name: 'PurchaseOrderNumber',
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Date',
                                            name: 'CreatedOn',
                                            emptyText: 'dd/mm/yyy',
                                            margin: '0 5 0 5',
                                            labelWidth: 40
                                        }
                                    ]
                                },
                                {
                                  xtype: 'abstractcombo',
                                  url: serviceEndPointBase + 'api/customer/',
                                  fields: ['CustomerId', 'Name'],
                                  displayField: 'Name',
                                  valueField: 'CustomerId',
                                  entity: 'Customers',
                                  type: 'app-form-data-selector',
                                  autoLoadData: true,
                                  fieldLabel: 'Customer',
                                  name: 'CustomerId',
                                  hiddenName: 'CustomerId',
                                  queryMode: 'local',
                                  width: 685,
                                  listeners: {
                                    scope: this,
                                    select: this.customerSelected
                                  }
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
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
                                            width: 330
                                        },
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/quotation',
                                            fields: ['QuotationMasterId', 'QuotationNumber'],
                                            displayField: 'QuotationNumber',
                                            valueField: 'QuotationMasterId',
                                            entity: 'QuotationMaster',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Quotation',
                                            name: 'QuotationMasterId',
                                            hiddenName: 'QuotationMasterId',
                                            queryMode: 'local',
                                            margin: '0 5 0 5',
                                            width: 350
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/project',
                                            fields: ['ProjectId', 'Name'],
                                            displayField: 'Name',
                                            valueField: 'ProjectId',
                                            entity: 'Projects',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Project',
                                            name: 'ProjectId',
                                            hiddenName: 'ProjectId',
                                            queryMode: 'local',
                                            width: 330
                                        },
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/executive/',
                                            fields: ['ExecutiveId', 'Name'],
                                            displayField: 'Name',
                                            valueField: 'ExecutiveId',
                                            entity: 'SalesExecutive',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Sales Executive',
                                            name: 'ExecutiveId',
                                            hiddenName: 'ExecutiveId',
                                            queryMode: 'local',
                                            margin: '0 5 0 5',
                                            width: 350
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/paymentterms',
                                            fields: ['PaymentTermsId', 'Description'],
                                            displayField: 'Description',
                                            valueField: 'PaymentTermsId',
                                            entity: 'PaymentTerms',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Payment Terms',
                                            name: 'PaymentTermsId',
                                            hiddenName: 'PaymentTermsId',
                                            queryMode: 'local',
                                            width: 330
                                        },
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/deliveryTerms',
                                            fields: ['DeliveryTermId', 'Name'],
                                            displayField: 'Name',
                                            valueField: 'DeliveryTermId',
                                            entity: 'DeliveryTerms',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Delivery Terms',
                                            name: 'DeliveryTermId',
                                            hiddenName: 'DeliveryTermId',
                                            queryMode: 'local',
                                            margin: '0 5 0 5',
                                            width: 350
                                        },
                                    ]
                                },
                                {
                                    xtype: 'abstractgrid',
                                    height: 184,
                                    margin: '5 0 0 0',
                                    editable: true,
                                    urls: {
                                        save: serviceEndPointBase + 'api/salesorder/save'
                                    },
                                    name: 'SalesOrderDetails',
                                    keyName: 'SalesOrderDetailsId',
                                    linkedControls: [
                                        'SalesOrderDetails'
                                    ],
                                    initialValues: {

                                    },
                                    listeners:{
                                        scope: this,
                                        edit: function(editor, e)
                                        {
                                          var form = this.down('abstractform').getForm();

                                          switch (e.field) {
                                            case 'Discount':
                                                var totalValue = parseFloat(e.record.get('Quantity')) * parseFloat(e.record.get('UnitRate') / parseFloat(e.record.get("Discount")));
                                                if (totalValue) {
                                                    e.record.set('Amount', totalValue);
                                                } else {
                                                    e.record.set('Amount', 0);
                                                }

                                                var total = 0;

                                                e.grid.store.each(function (record) {
                                                    total += parseFloat(record.get('Amount'));
                                                });
                                                form.findField('TotalAmount').setValue(total)
                                                form.findField('TotalAmountInWords').setValue(convert(total));
                                            break;
                                            default:

                                          }
                                        }
                                    },
                                    columns: [
                                        {
                                            name: 'SalesOrderDetailsId',
                                            dataIndex: 'SalesOrderDetailsId',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Material',
                                            name: 'MaterialId',
                                            dataIndex: 'MaterialId',
                                            flex: 1,
                                            editor: {
                                                xtype: 'abstractcombo',
                                                url: serviceEndPointBase + 'api/material/query',
                                                fields: ['MaterialId', 'Name'],
                                                displayField: 'Name',
                                                valueField: 'MaterialId',
                                                entity: 'Material',
                                                name: 'MaterialId',
                                                triggerAction: 'all'
                                            },
                                            renderer: {
                                                  name: 'MaterialName',
                                                  columnName: 'Material.Name'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Product',
                                            dataIndex: 'ProductId',
                                            name: 'ProductId',
                                            width: 80,
                                            editor: {
                                                xtype: 'abstractcombo',
                                                url: serviceEndPointBase + 'api/product/query',
                                                fields: ['ProductId', 'Name'],
                                                displayField: 'Name',
                                                valueField: 'ProductId',
                                                entity: 'Product',
                                                name: 'Product',
                                                triggerAction: 'all'
                                            },
                                            renderer: {
                                                name: 'ProductName',
                                                columnName: 'Product.Name'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Sizes',
                                            dataIndex: 'ItemSizeId',
                                            name: 'ItemSizeId',
                                            width: 80,
                                            editor: {
                                                xtype: 'abstractcombo',
                                                url: serviceEndPointBase + 'api/itemsize/query',
                                                fields: ['ItemSizeId', 'Name'],
                                                displayField: 'Name',
                                                valueField: 'ItemSizeId',
                                                entity: 'ItemSize',
                                                name: 'ItemSize',
                                                triggerAction: 'all'
                                            },
                                            renderer: {
                                                name: 'ItemSizeName',
                                                columnName: 'ItemSize.Name'
                                            }
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            text: 'Make',
                                            dataIndex: 'MakeId',
                                            name: 'MakeId',
                                            width: 75,
                                            editor: {
                                                xtype: 'abstractcombo',
                                                url: serviceEndPointBase + 'api/make/query',
                                                fields: ['MakeId', 'Name'],
                                                displayField: 'Name',
                                                valueField: 'MakeId',
                                                entity: 'Make',
                                                name: 'Make',
                                                triggerAction: 'all'
                                            },
                                            renderer: {
                                                name: 'MakeName',
                                                columnName: 'Make.Name'
                                            }
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            text: 'Grade',
                                            dataIndex: 'GradeId',
                                            name: 'GradeId',
                                            width: 75,
                                            editor: {
                                                xtype: 'abstractcombo',
                                                url: serviceEndPointBase + 'api/grade/query',
                                                fields: ['GradeId', 'Name'],
                                                displayField: 'Name',
                                                valueField: 'GradeId',
                                                entity: 'Grade',
                                                name: 'Grade',
                                                triggerAction: 'all'
                                            },
                                            renderer: {
                                                name: 'GradeId',
                                                columnName: 'Grade.Name'
                                            }
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            text: 'Quantity',
                                            name: 'Quantity',
                                            width: 75
                                        },
                                        {
                                          xtype: 'gridcolumn',
                                          text: 'Unit',
                                          name: 'UnitId',
                                          dataIndex: 'UnitId',
                                          width: 75,
                                          editor: {
                                              xtype: 'abstractcombo',
                                              url: serviceEndPointBase + 'api/units/query',
                                              fields: ['UnitId', 'Name'],
                                              displayField: 'Name',
                                              valueField: 'UnitId',
                                              entity: 'Units',
                                              name: 'Units',
                                              triggerAction: 'all'
                                          },
                                          renderer: {
                                              name: 'UnitsName',
                                              columnName: 'Units.Name'
                                          }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Unit Rate',
                                            name: 'UnitRate'
                                        },
                                        {
                                             xtype : 'gridcolumn',
                                             text: 'Discount',
                                             name: 'Discount'
                                        },
                                        {
                                              xtype: 'gridcolumn',
                                              text: 'Amount',
                                              name: 'Amount'
                                        }
                                    ]
                                },
                                {
                                    items: [
                                      {
                                        xtype: 'fieldcontainer',
                                        layout: {
                                          type: 'hbox'
                                        },
                                        items: [
                                          {
                                              xtype: 'numberfield',
                                              fieldLabel: 'Fright',
                                              margin: '5 0 5 10',
                                              name: 'Transportation',
                                              hideTrigger: true
                                          },
                                          {
                                              xtype: 'numberfield',
                                              fieldLabel: 'Customs',
                                              margin: '5 0 5 10',
                                              name: 'Customs',
                                              hideTrigger: true
                                              /*listeners: {
                                                scope: this,
                                                change: this.amountchange
                                              }*/
                                          }
                                        ]
                                      },
                                      {
                                        xtype: 'fieldcontainer',
                                        layout: {
                                          type: 'hbox'
                                        },
                                        items: [
                                          {
                                              xtype: 'numberfield',
                                              fieldLabel: 'Total Amount',
                                              margin: '0 0 0 10',
                                              name: 'TotalAmount',
                                              hideTrigger: true
                                          },
                                          {
                                              xtype: 'abstractcombo',
                                              fieldLabel: 'General Ledger',
                                              margin: '0 0 0 10',
                                              url: serviceEndPointBase + 'api/accounttype',
                                              fields: ['AccountTypeId', 'Name'],
                                              displayField: 'Name',
                                              valueField: 'AccountTypeId',
                                              entity: 'AccountType',
                                              name: 'AccountTypeId',
                                              hiddenName: 'AccountTypeId',
                                              type: 'app-form-data-selector',
                                              autoLoadData: true,
                                              queryMode: 'local',
                                              valueNotFoundText:'No Valu Found'
                                          }
                                        ]
                                      },
                                      {
                                          xtype: 'textfield',
                                          fieldLabel: 'Amount In Words',
                                          margin: '5 0 5 10',
                                          name: 'TotalAmountInWords',
                                          width: 520,
                                          hideTrigger: true
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
        var quotationCombo  = this.down('abstractcombo[entity=QuotationMaster]');
        if(quotationCombo) {
            delete combo.lastQuery
            quotationCombo.setUrl(serviceEndPointBase + 'api/quotations/' + customerId);
            quotationCombo.store.proxy.extraParams.id = customerId;
            quotationCombo.store.load();
        }
    },
    amountchange: function(field, value) {
        var form = this.down('abstractform').getForm(),
            amount = form.findField('TotalAmount').getValue();
        var  totalAmounts = parseFloat(amount) - parseFloat(form.findField('Transportation').getValue()) - parseFloat(form.findField('Customs').getValue());
            form.findField('TotalAmount').setValue(totalAmounts);
            form.findField('TotalAmountInWords').setValue(convert(totalAmounts));
    }

});
