/**
* @class Erp.view.transactions.DeliveryNote
* @extend Ext.window.Window
*/
Ext.define("Erp.view.invoice.Invoice", {
    extend: 'Ext.window.Window',
    alias: 'widget.invoice',

    height: 630,
    width: 1000,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    requires: [
        'Erp.core.form.AbstractForm',
        'Erp.core.form.AbstractCombo',
        'Erp.core.toolbar.FormToolbar',
        'Erp.core.grid.AbstractGrid',
        'Erp.core.connection.RequestManager'
    ],

    listConfig: {
        url: serviceEndPointBase + 'api/invoice',
        name: 'InvoiceMaster',
        columns: [
            {
                name: 'InvoiceNumber',
                text: 'No',
                width: 120
            },
            {
                text: 'Customers',
                flex: 1,
                renderer: {
                  name: 'CustomerId',
                  columnName: 'Customers.Name'
                }
            }

        ]
    },

    iconCls: 'user',
    title: 'Invoice',
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
                    me.down('abstractform').getForm().setValues({
                          CustomerName: record.data.Customers.CustomerCode + ' - ' + record.data.Customers.Name,
                          ProjectId : record.data.Projects.Name,
                          CustomerContactId : record.data.CustomerContacts.Name,
                          CustomerPO: record.data.Customers.PostBox,
                          ExecutiveId : record.data.SalesExecutive.Name,
                          PaymentTerms: record.data.DeliveryNoteMaster.SalesOrderMaster.PaymentTerms.Description,
                          DeliveryTerms : record.data.DeliveryNoteMaster.SalesOrderMaster.DeliveryTerms.Name
                    });

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
                            html: '<b>Invoice</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Invoice , click Add. To change a Invoice , select the group' +
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
                            name: 'InvoiceMaster',
                            keyField: 'InvoiceMasterId',

                            linkedControls: [
                                'InvoiceDetails'
                            ],

                            urls: {
                                save: serviceEndPointBase + 'api/invoice/save'
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
                                            name: 'InvoiceMasterId'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Invoice Number',
                                            name: 'InvoiceNumber',
                                            emptyText: '0001',
                                            width: 220
                                        },
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/deliverynote',
                                            fields: ['DeliveryNoteMasterId', 'DeliveryNoteNumber'],
                                            displayField: 'DeliveryNoteNumber',
                                            valueField: 'DeliveryNoteMasterId',
                                            entity: 'DeliveryNoteMaster',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Delivery Note',
                                            name: 'DeliveryNoteMasterId',
                                            hiddenName: 'DeliveryNoteMasterId',
                                            queryMode: 'local',
                                            margin: '0 5 0 5',
                                            width: 250,
                                            listeners: {
                                                scope: this,
                                                select: this.deliveryNoteSelected
                                            }
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Customer',
                                    name: 'CustomerName',
                                    width: 685,
                                },
                                {
                                  name:'CustomerId',
                                  xtype: 'hiddenfield'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Contact Person',
                                            name: 'CustomerContactId',
                                            readOnly:true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Customer PO',
                                            name: 'CustomerPO',
                                            readOnly: true,
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
                                            xtype: 'textfield',
                                            fieldLabel: ' Project',
                                            name: 'ProjectId',
                                            readOnly: true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Sales Executive',
                                            name: 'ExecutiveId',
                                            readOnly: true,
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
                                            xtype: 'textfield',
                                            fieldLabel: 'Payment Terms',
                                            name: 'PaymentTerms',
                                            readOnly: true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Delivery Terms',
                                            name: 'DeliveryTerms',
                                            readOnly: true,
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
                                        save: serviceEndPointBase + 'api/invoice/save'
                                    },
                                    name: 'InvoiceDetails',
                                    keyName: 'InvoiceDetailId',
                                    initialValues: {

                                    },
                                    columns: [
                                        {
                                            name: 'InvoiceDetailId',
                                            dataIndex: 'InvoiceDetailId',
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
                                            xtype: 'numbercolumn',
                                            text: 'Unit',
                                            name: 'UnitId',
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
    deliveryNoteSelected: function (combo, record) {
        var self =this;
        var abstractform = self.down('abstractform');
        var form = abstractform.getForm();
        var salesOrderId = record.data.SalesOrderMasterId;
            if(RequestManager) {
                RequestManager.get({
                  url: 'api/salesorder/' + salesOrderId,
                  params: {
                    id: salesOrderId
            }
            }).then(function(data){
                if(data && data.responseText) {
                      var parsedData = JSON.parse(data.responseText);
                      var master = parsedData.SalesOrderMaster.Record;
                      Ext.apply(master, { 'InvoiceDetails': master.SalesOrderDetails });
                      abstractform.loadRecordOnEditMode(master);
                      form.setValues({
                          CustomerName: master.Customers.CustomerCode + ' - ' + master.Customers.Name,
                          ProjectId : master.Projects.Name,
                          CustomerContactId : master.CustomerContacts.Name,
                          CustomerPO: master.Customers.PostBox,
                          ExecutiveId : master.SalesExecutive.Name,
                          PaymentTerms: master.PaymentTerms.Description,
                          DeliveryTerms : master.DeliveryTerms.Name
                      });
                    }
                });
              }
        }
});
