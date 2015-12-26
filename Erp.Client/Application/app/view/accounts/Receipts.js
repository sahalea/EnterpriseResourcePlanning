/**
* @class Erp.view.accounts.Receipts
* @extend Ext.window.Window
*/
Ext.define("Erp.view.accounts.Receipts", {
    extend: 'Ext.window.Window',
    alias: 'widget.receipts',

    height: 580,
    width: 770,

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
        url: serviceEndPointBase + 'api/quotation/query',
        name: 'QuotationMaster',
        columns: [
            {
                name: 'QuotationNumber',
                text: 'Quotation Number',
                width: 120
            },
            {
                text: 'Enquiry Number',
                flex: 1,
                renderer: {
                  name: 'EnquiryMasterId',
                  columnName: 'EnquiryMaster.EnquiryNumber'
                }
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
    title: 'Receipts',
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
                      CustomerName: record.data.EnquiryMaster.Customers.CustomerCode + ' - ' + record.data.EnquiryMaster.Customers.Name,
                      ProjectId : record.data.EnquiryMaster.Projects.Name,
                      CustomerContactId : record.data.EnquiryMaster.CustomerContacts.Name,
                      CustomerReference: record.data.EnquiryMaster.CustomerReference,
                      ExecutiveId : record.data.EnquiryMaster.SalesExecutive.Name,
                      CustomerId: record.data.EnquiryMaster.Customers.CustomerId
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
                            html: '<b>Receipts</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add receipts , click Add. To change a receipts , select the group' +
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
                            name: 'AccountReceiptMaster',
                            keyField: 'AccountReceiptMasterId',
                            linkedControls: [
                                'AccountReceiptDetails'
                            ],
                            urls: {
                                save: serviceEndPointBase + 'api/accountreceipt/save',
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
                                            name: 'AccountReceiptMasterId'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Number',
                                            name: 'AccountReceiptNumber',
                                            emptyText: '0001',
                                            readOnly: true,
                                            width: 220
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
                                            margin: '0 5 0 5',
                                            labelWidth: 70,
                                            width: 230,
                                            listeners: {
                                              scope: this,
                                              select: this.customerSelected
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Created On',
                                            name: 'CreatedOn',
                                            emptyText: 'dd/mm/yyy',
                                            margin: '0 5 0 5',
                                            labelWidth: 65
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
                                            url: serviceEndPointBase + 'api/payments',
                                            fields: ['PaymentMethodId', 'Name'],
                                            displayField: 'Name',
                                            valueField: 'PaymentMethodId',
                                            entity: 'PaymentMethod',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Payment Method',
                                            name: 'PaymentMethodId',
                                            hiddenName: 'PaymentMethodId',
                                            queryMode: 'local',
                                            width: 330,
                                            listeners: {
                                                scope: this,
                                                select: function(combo)
                                                {
                                                   if(combo.value == 1) {
                                                       var formPanel = Ext.getCmp('chequedetails');
                                                       console.log(formPanel);

                                                   }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Receipt Number',
                                            name: 'ReceiptNumber',
                                            readOnly: true,
                                            width: 350
                                        }
                                    ]
                                },
                      /*          {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/accounttype',
                                            fields: ['AccountTypeId', 'Name'],
                                            displayField: 'Name',
                                            valueField: 'AccountTypeId',
                                            entity: 'AccountType',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Debit',
                                            name: 'DebitAccountId',
                                            hiddenName: 'DebitAccountId',
                                            queryMode: 'local',
                                            width: 330,
                                        },
                                        {
                                          xtype: 'abstractcombo',
                                          url: serviceEndPointBase + 'api/accounttype',
                                          fields: ['AccountTypeId','Name'],
                                          displayField: 'Name',
                                          valueField: 'AccountTypeId',
                                          entity: 'AccountType',
                                          type: 'app-form-data-selector',
                                          autoLoadData: true,
                                          fieldLabel: 'Credit Account',
                                          name: 'CreditAccountId',
                                          hiddenName: 'CreditAccountId',
                                          queryMode: 'local',
                                          margin: '0 5 0 5',
                                          width: 350
                                        },
                                    ]
                                },*/
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Cheque Number',
                                            name: 'ChequeNumber',
                                            width: 220
                                        },
                                        {
                                            xtype: 'datefield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Date',
                                            name: 'ChequeDate',
                                            emptyText: 'dd/mm/yyy',
                                            labelWidth: 70,
                                            width: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Bank',
                                            name: 'BankId',
                                            margin: '0 5 0 5',
                                            labelWidth: 65,
                                            width: 220
                                        }
                                    ]
                                },
                                {
                                  xtype: 'abstractgrid',
                                  height: 184,
                                  editable: true,
                                  border: false,
                                  urls: {
                                      save: serviceEndPointBase + 'api/accountreceipt/save'
                                    },
                                    name: 'AccountReceiptDetails',
                                    keyName: 'AccountReceiptDetailId',
                                    listeners: {
                                        scope: this,
                                        edit: function (editor, e) {
                                            var form = this.down('abstractform').getForm();
                                            switch (e.field) {
                                                case 'AmountPaid':
                                                  var totalValue = parseFloat(e.record.get('TotalAmount'));
                                                    if(totalValue < e.value){
                                                      Ext.Msg.show({
                                                        msg: '',
                                                        buttons: Ext.Msg.OK,
                                                        animEl: 'elId'
                                                      });
                                                      e.record.set('AmountPaid',0);
                                                    }
                                                    else {
                                                      e.record.set('TotalAmount',totalValue- e.value);
                                                    }
                                                    this.calculateTotalAmount();
                                                    break;
                                                case 'IsPaid':
                                                var totalValue = parseFloat(e.record.get('TotalAmount'));
                                                e.record.set('AmountPaid',totalValue);
                                                e.record.set('TotalAmount',0);
                                                default:
                                              }
                                          }
                                      },
                                      columns: [
                                          {
                                              name: 'AccountReceiptDetailId',
                                              dataIndex: 'AccountReceiptDetailId',
                                              hidden: true
                                          },
                                          {
                                              xtype: 'gridcolumn',
                                              text: 'Invoice Number',
                                              name: 'InvoiceNumber',
                                              dataIndex: 'InvoiceNumber',
                                          },
                                          {
                                              xtype: 'datecolumn',
                                              text: 'Due Date',
                                              name: 'CreatedOn',
                                              dataIndex: 'CreatedOn'
                                          },
                                          {
                                              xtype: 'gridcolumn',
                                              text: 'Amount Due',
                                              name: 'TotalAmount',
                                              dataIndex: 'TotalAmount'
                                          },
                                          {
                                              xtype: 'gridcolumn',
                                              text: 'Decription',
                                              name: 'Description',
                                              dataIndex: 'Description',
                                              flex: 1
                                          },
                                          {
                                              xtype: 'gridcolumn',
                                              text: 'Amount',
                                              name: 'AmountPaid',
                                              dataIndex: 'AmountPaid'
                                          },
                                          {
                                              xtype: 'checkcolumn',
                                              text: 'Is Paid',
                                              name: 'IsPaid',
                                              dataIndex: 'IsPaid',
                                              editor: {
                                                xtype: 'checkbox'
                                              },
                                              listeners: {
                                                scope: this,
                                                checkchange: this.isPaid
                                              }
                                          }
                                      ]
                                  },

                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    margin: '5 5 5 5',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Amount',
                                            name: 'TotalAmountInWords',
                                            labelWidth: 70,
                                            width: 455
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Total',
                                            name: 'TotalAmount',
                                            labelWidth: 40,
                                            readOnly: true,
                                            margin: '0 0 0 5'
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

    customerSelected: function (combo, record) {
          var self =this;
          var abstractform = self.down('abstractform');
          var form = abstractform.getForm();
          var customerId = combo.getValue();
          var total_amount=0;
          if(RequestManager) {
            RequestManager.get({
              url: 'api/invoicebycustomer/' + customerId,
              params: {
                id: customerId
              }
            }).then(function(data){
              if(data && data.responseText) {
                  var parsedData = JSON.parse(data.responseText);
                  var master = parsedData.InvoiceMaster.Record;
                  for(i = 0; i<master.length;i++){
                    total_amount+=master[i].TotalAmount;
                  }
                  Ext.apply(master, { 'AccountReceiptDetails': master});
                  abstractform.loadRecordOnEditMode(master);
                  form.findField('TotalAmount').setValue(total_amount);
                  form.findField('TotalAmountInWords').setValue(convert(total_amount));
              }
            });
          }
    },
    isPaid: function(column, rowIndex, checked, eOpts) {

      console.log(eOpts);


    },
    calculateTotalAmount: function () {
        var grid = this.down('abstractgrid');
        var form = this.down('abstractform').getForm();
        var store = grid.store;
        var totalAmount = 0;
        if (store.count() > 0) {
            grid.store.each(function (record) {
                var rowTotal = record.get('TotalAmount');
                if (rowTotal) {
                    rowTotal = parseFloat(rowTotal);
                    totalAmount += rowTotal;
                }
            });
            form.findField('TotalAmount').setValue(totalAmount);
            form.findField('TotalAmountInWords').setValue(convert(totalAmount));
        }
    }


});
