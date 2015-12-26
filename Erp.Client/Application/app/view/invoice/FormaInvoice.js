/**
* @class Erp.view.invoice.FormaInvoice
* @extend Ext.window.Window
*/
Ext.define("Erp.view.invoice.FormaInvoice", {
    extend: 'Ext.window.Window',
    alias: 'widget.formainvoice',

    height: 590,
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
            }
        ]
    },

    iconCls: 'user',
    title: 'ProForma Invoice',
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
                            html: '<b>ProForma Invoice</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add FormaInvoice , click Add. To change a FormaInvoice , select the group' +
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
                            name: 'ProFormaInvoiceMaster',
                            keyField: 'ProInvoiceMasterId',
                            linkedControls: [
                                'ProFormaInvoiceDetails'
                            ],
                            urls: {
                                save: serviceEndPointBase + 'api/proformainvoice/save',
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
                                            name: 'ProInvoiceMasterId'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ' Number',
                                            name: 'ProInvoiceNumber',
                                            emptyText: '0001',
                                            width: 220
                                        },
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/salesorder',
                                            fields: ['SalesOrderMasterId', 'SalesOrderNumber'],
                                            displayField: 'SalesOrderNumber',
                                            valueField: 'SalesOrderMasterId',
                                            entity: 'SalesOrderMaster',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Sales Order',
                                            name: 'SalesOrderMasterId',
                                            hiddenName: 'SalesOrderMasterId',
                                            queryMode: 'local',
                                            margin: '0 5 0 5',
                                            width: 250,
                                            listeners: {
                                                scope: this,
                                                select: this.salesOrderSelected
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
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                      {
                                        xtype: 'textfield',
                                        fieldLabel: 'Customer',
                                        name: 'CustomerName',
                                        width: 330
                                      },
                                      {
                                         xtype: 'textfield',
                                         fieldLabel: 'purchase Number',
                                         name: 'PurchaseOrderNumber',
                                         margin: '0 5 0 5',
                                         width: 350
                                       }
                                    ]
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name:'CustomerId'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name:'CustomerContactId'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name:'QuotationMasterId'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name:'ProjectId'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name:'ExecutiveId'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name:'PaymentTermsId'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name:'DeliveryTermId'
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
                                            name: 'CustomerContactName',
                                            readOnly:true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Quotation',
                                            name: 'QuotationMasterName',
                                            margin: '0 5 0 5',
                                            readOnly:true,
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
                                            fieldLabel: 'Project',
                                            name: 'ProjectName',
                                            readOnly:true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Sales Executive',
                                            name: 'ExecutiveName',
                                            margin: '0 5 0 5',
                                            readOnly:true,
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
                                            name: 'PaymentTermsName',
                                            readOnly:true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Delivery Terms',
                                            name: 'DeliveryTermsName',
                                            margin: '0 5 0 5',
                                            readOnly:true,
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
                                        save: serviceEndPointBase + 'api/proformainvoice/save'
                                    },
                                    name: 'ProFormaInvoiceDetails',
                                    keyName: 'ProInvoiceDetailId',

                                    columns: [
                                        {
                                            name: 'ProInvoiceDetailId',
                                            dataIndex: 'ProInvoiceDetailId',
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
                        },
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },


        salesOrderSelected: function (combo, record) {
              var self =this;
              var abstractform = self.down('abstractform');
              var form = abstractform.getForm();
              var orderId = combo.getValue();

              if(RequestManager) {
                RequestManager.get({
                  url: 'api/salesorder/' + orderId,
                  params: {
                    id: orderId
                  }
                }).then(function(data){
                  if(data && data.responseText) {
                      var parsedData = JSON.parse(data.responseText);
                      var master = parsedData.SalesOrderMaster.Record;
                      Ext.apply(master, { 'ProFormaInvoiceDetails': master.SalesOrderDetails });
                      abstractform.loadRecordOnEditMode(master);
                      form.setValues({
                          CustomerName: master.Customers.CustomerCode + ' - ' + master.Customers.Name,
                          ProjectName : master.Projects.Name,
                          CustomerContactName : master.CustomerContacts.Name,
                          PurchaseOrderNumber: master.PurchaseOrderNumber,
                          ExecutiveName : master.SalesExecutive.Name,
                          PaymentTermsName: master.PaymentTerms.Name,
                          DeliveryTermsName: master.DeliveryTerms.Name,
                          QuotationMasterName: master.QuotationMaster.QuotationNumber,

                          CustomerId : master.Customers.CustomerId,
                          ProjectId  : master.Projects.ProjectId,
                          CustomerContactId : master.CustomerContacts.CustomerContactId,
                          ExecutiveId: master.SalesExecutive.ExecutiveId,
                          PaymentTermsId: master.PaymentTerms.PaymentTermsId,
                          DeliveryTermId : master.DeliveryTerms.DeliveryTermId,
                          QuotationMasterId: master.QuotationMaster.QuotationMasterId
                      });
                  }
                });
              }
        }

});
