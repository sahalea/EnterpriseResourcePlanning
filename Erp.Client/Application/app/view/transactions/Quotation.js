/**
* @class Erp.view.transactions.Quotation
* @extend Ext.window.Window
*/
Ext.define("Erp.view.transactions.Quotation", {
    extend: 'Ext.window.Window',
    alias: 'widget.quotation',

    height: 600,
    width: 902,

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
    title: 'Quotation',
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
                        ProjectName: record.data.Projects.Name,
                        CustomerContactName: record.data.CustomerContacts.Name,
                        CustomerReference: record.data.EnquiryMaster.CustomerReference,
                        ExecutiveName: record.data.SalesExecutive.Name,
                        CustomerId: record.data.Customers.CustomerId,
                        CustomerContactId: record.data.CustomerContacts.CustomerContactId,
                        ProjectId: record.data.Projects.ProjectId,
                        SalesExecutive: record.data.SalesExecutive.ExecutiveId
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
                      text: 'Print',
                      iconCls: 'printer',
                      listeners: {
                          scope: this,
                          click: function (e, eOpts) {
                              var me = this;
                              var form = me.down('abstractform').getForm();
                              var id = form.findField('QuotationMasterId').getValue();
                              if(id) {
                              window.open('PrintReport.aspx?ReportName=CustomerReport&QuotationId=' + id)
                              }
                          }
                      }
                  },
                  {
                     text: 'Close',
                     iconCls: 'cancel',
                     listeners: {
                        scope: this,
                        click: function () {
                            this.close()
                        }
                     }
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
                            html: '<b>Quotation</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Quotation , click Add. To change a Quoattion , select the group' +
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
                            name: 'QuotationMaster',
                            keyField: 'QuotationMasterId',
                            linkedControls: [
                                'QuotationDetails'
                            ],
                            urls: {
                                save: serviceEndPointBase + 'api/quotation/save',
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
                                            name: 'QuotationMasterId'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ' Number',
                                            name: 'QuotationNumber',
                                            emptyText: '0001',
                                            width: 220
                                        },
                                        {
                                            xtype: 'abstractcombo',
                                            url: serviceEndPointBase + 'api/enquiry',
                                            fields: ['EnquiryMasterId', 'EnquiryNumber'],
                                            displayField: 'EnquiryNumber',
                                            valueField: 'EnquiryMasterId',
                                            entity: 'EnquiryMaster',
                                            type: 'app-form-data-selector',
                                            autoLoadData: true,
                                            fieldLabel: 'Enquiry',
                                            name: 'EnquiryMasterId',
                                            hiddenName: 'EnquiryMasterId',
                                            queryMode: 'local',
                                            margin: '0 5 0 5',
                                            width: 250,
                                            listeners: {
                                                scope: this,
                                                select: this.enquirySelected
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Date',
                                            name: 'QuotationDate',
                                            emptyText: 'dd-mm-yyyy',
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
                                    xtype: 'hiddenfield',
                                    name: 'CustomerId'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'CustomerContactId'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'ProjectId'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'ExecutiveId'
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
                                            readOnly: true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Reference',
                                            name: 'CustomerReference',
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
                                            name: 'ProjectName',
                                            readOnly: true,
                                            width: 330
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 5 0 5',
                                            fieldLabel: 'Sales Executive',
                                            name: 'ExecutiveName',
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
                                            width: 330,
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
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Lead Time',
                                            name: 'LeadTime',
                                            width: 220
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Valid Through',
                                            name: 'ValidThrough',
                                            emptyText: 'dd/mm/yyy',
                                            margin: '0 5 0 5',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'abstractgrid',
                                    height: 184,
                                    margin: '5 0 0 0',
                                    editable: true,
                                    urls: {
                                        save: serviceEndPointBase + 'api/quotation/save',
                                        read: serviceEndPointBase + 'api/quotation'
                                    },
                                    name: 'QuotationDetails',
                                    keyName: 'QuotationDetailId',
                                    listeners: {
                                        scope: this,
                                        edit: function (editor, e) {
                                            var form = this.down('abstractform').getForm();

                                            switch (e.field) {
                                                case 'Discount':
                                                case 'Quantity':
                                                case 'UnitRate':
                                                    var totalValue = parseFloat(e.record.get('Quantity')) * parseFloat(e.record.get('UnitRate'));
                                                    if(e.record.get("Discount") == 0)
                                                    {
                                                      if (totalValue)
                                                          e.record.set('Amount', totalValue);
                                                      else
                                                          e.record.set('Amount', 0);
                                                    }
                                                    else
                                                    {
                                                      var totalAmount =  totalValue * parseFloat(e.record.get("Discount") / 100 );
                                                      if (totalAmount)
                                                          e.record.set('Amount', totalValue-totalAmount);
                                                      else
                                                          e.record.set('Amount', 0);
                                                    }
                                                    this.calculateTotalAmount();
                                                    break;
                                                default:

                                            }
                                        }
                                    },
                                    columns: [
                                        {
                                            name: 'QuotationDetailId',
                                            dataIndex: 'QuotationDetailId',
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
                                                triggerAction: 'all',
                                                listConfig: {
                                                    width:500
                                                }
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
                                                name: 'GradeName',
                                                columnName: 'Grade.Name'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
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
                                            xtype: 'gridcolumn',
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
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: {
                                        backgroundColor: 'transparent',
                                        padding: '10px'
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                      {
                                          xtype: 'fieldcontainer',
                                          layout: {
                                              pack: 'start',
                                              type: 'hbox'
                                          },
                                          items: [
                                              {
                                                  xtype: 'numberfield',
                                                  fieldLabel: 'Fright',
                                                  name: 'Transportation',
                                                  dataIndex: 'Transportation',
                                                  hideTrigger: true,
                                                  labelWidth: 70,
                                                  listeners: {
                                                      scope: this,
                                                      change: this.calculateTotalAmount
                                                  }
                                              },
                                              {
                                                  xtype: 'numberfield',
                                                  fieldLabel: 'Customs',
                                                  name: 'Customs',
                                                  hideTrigger: true,
                                                  labelWidth: 70,
                                                  margin: '0 0 0 5',
                                                  listeners: {
                                                      scope: this,
                                                      change: this.calculateTotalAmount
                                                  }
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
                }
            ]
        });
        me.callParent(arguments);
    },

    enquirySelected: function (combo, record) {
        var self = this;
        var abstractform = self.down('abstractform');
        var form = abstractform.getForm();
        var enquiryId = combo.getValue();

        if (RequestManager) {
            RequestManager.get({
                url: 'api/enquiry/' + enquiryId,
                params: {
                    id: enquiryId
                }
            }).then(function (data) {
                if (data && data.responseText) {
                    var parsedData = JSON.parse(data.responseText);
                    var master = parsedData.EnquiryMaster.Record;
                    Ext.apply(master, { 'QuotationDetails': master.EnquiryDetails });
                    abstractform.loadRecordOnEditMode(master);
                    form.setValues({
                        CustomerName: master.Customers.CustomerCode + ' - ' + master.Customers.Name,
                        ProjectName: master.Projects.Name,
                        CustomerContactName: master.CustomerContacts.Name,
                        CustomerReference: master.CustomerReference,
                        ExecutiveName: master.SalesExecutive.Name,
                        CustomerId: master.Customers.CustomerId,
                        CustomerContactId: master.CustomerContacts.CustomerContactId,
                        ProjectId: master.Projects.ProjectId,
                        SalesExecutive: master.SalesExecutive.ExecutiveId
                    });
                }
            });
        }
    },
    calculateTotalAmount: function () {
        var grid = this.down('abstractgrid');
        var form = this.down('abstractform').getForm();
        var store = grid.store;
        var totalAmount = 0;
        if (store.count() > 0) {
            grid.store.each(function (record) {
                console.log(record)
                var rowTotal = record.get('Amount');
                if (rowTotal) {
                    rowTotal = parseFloat(rowTotal);
                    totalAmount += rowTotal;
                }
            });

            var frieght = form.findField('Transportation').getValue();
            if (!frieght)
                frieght = 0;
            totalAmount -= frieght;

            var customs = form.findField('Customs').getValue();
            if (!customs)
                customs = 0;
            totalAmount -= customs;

            form.findField('TotalAmount').setValue(totalAmount);
            form.findField('TotalAmountInWords').setValue(convert(totalAmount));
        }
    }

});
