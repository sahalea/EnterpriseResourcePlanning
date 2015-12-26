Ext.apply(Ext.grid.Column,{
  rendererConfig: {

  }
});
﻿/**
* @class Erp.view.transactions.DeliveryNote
* @extend Ext.window.Window
*/
Ext.define("Erp.view.transactions.DeliveryNote", {
    extend: 'Ext.window.Window',
    alias: 'widget.deliverynote',

    height: 480,
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
        url: serviceEndPointBase + 'api/deliverynote',
        name: 'DeliveryNoteMaster',
        columns: [
            {
                name: 'DeliveryNoteNumber',
                text: 'No',
                width: 120
            },
            {
                text: 'Customer',
                flex: 1,
                renderer: {
                  name: 'SalesOrderNumber',
                  columnName: 'SalesOrderMaster.SalesOrderNumber'
                }
            }
        ]
    },

    iconCls: 'user',
    title: 'Delivery Note',
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
                          CustomerName: record.data.SalesOrderMaster.Customers.CustomerCode + ' - ' + record.data.SalesOrderMaster.Customers.Name,
                          ProjectId : record.data.SalesOrderMaster.Projects.Name,
                          CustomerContactId : record.data.SalesOrderMaster.CustomerContacts.Name,
                          CustomerPO: record.data.SalesOrderMaster.Customers.PostBox,
                          ExecutiveId : record.data.SalesOrderMaster.SalesExecutive.Name
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
                            html: '<b>Delivery Note</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Delivery , click Add. To change a Delivery , select the group' +
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
                            name: 'DeliveryNoteMaster',
                            keyField: 'DeliveryNoteMasterId',

                            linkedControls: [
                                'DeliveryNoteDetails'
                            ],

                            urls: {
                                save: serviceEndPointBase + 'api/deliverynote/save'
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
                                            name: 'DeliveryNoteMasterId'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Delivery Number',
                                            name: 'DeliverNoteNumber',
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
                                }
                            ]
                        },
                        {
                            xtype: 'abstractgrid',
                            height: 184,
                            margin: '5 0 0 0',
                            editable: true,
                            urls: {
                                save: serviceEndPointBase + 'api/deliverynote/save'
                            },
                            name: 'DeliveryNoteDetails',
                            keyName: 'DeliveryNoteDetailId',
                            initialValues: {

                            },
                            columns: [
                                {
                                    name: 'DeliveryNoteDetailId',
                                    dataIndex: 'DeliveryNoteDetailId',
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
                                   text: 'Total Delivery',
                                   name: 'TotalDelivery'
                                },
                                {
                                   xtype: 'gridcolumn',
                                   text: 'Balance Delivery',
                                   name: 'BalanceDelivery'
                                },
                                {
                                   xtype: 'gridcolumn',
                                   name: 'CurrentDelivery',
                                   text: 'CurrentDelivery'
                                }
                            ]
                        }
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
        var salesOrderId = combo.getValue();
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
                      debugger;
                      Ext.apply(master, { 'DeliveryNoteDetails': master.SalesOrderDetails });

                      console.log(master);
                      abstractform.loadRecordOnEditMode(master);
                      console.log(master);
                      form.setValues({
                          CustomerName: master.Customers.CustomerCode + ' - ' + master.Customers.Name,
                          ProjectId : master.Projects.Name,
                          CustomerContactId : master.CustomerContacts.Name,
                          CustomerPO: master.Customers.PostBox,
                          ExecutiveId : master.SalesExecutive.Name
                      });
                    }
                });
              }
        }
});
