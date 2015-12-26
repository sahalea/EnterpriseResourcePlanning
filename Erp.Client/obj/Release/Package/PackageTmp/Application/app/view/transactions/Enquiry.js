/**
* @class Erp.view.transactions.Enquiry
* @extend Ext.window.Window
*/
Ext.define("Erp.view.transactions.Enquiry", {
    extend: 'Ext.window.Window',
    alias: 'widget.enquiry',

    height: 500,
    width: 850,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    requires: [
        'Erp.core.form.AbstractForm',
        'Erp.core.form.AbstractCombo',
        'Erp.core.toolbar.FormToolbar',
        'Erp.core.grid.AbstractGrid',
        'Ext.ux.form.IconTextfield',
        'Ext.ux.form.IconCombo'
    ],

    //  Every top most components like window
    // Should have this property defined like this
    name: 'topMostParent',

    listConfig: {
        url: serviceEndPointBase + 'api/enquiry/query',
        name: 'EnquiryMaster',
        columns: [
            {
                name: 'EnquiryNumber',
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
    title: 'Enquiry',

    /**
     * initializes the class
     * @return {void} null
     */
    initComponent: function () {
        var me = this;

        Ext.apply(this.listConfig, {
            listeners: {
                recordselected: function (record) {
                    me.down('abstractform').loadRecordOnEditMode(record.data)
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
                            html: '<b>Enquiry</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Enquiry , click Add. To change a Enquiry , select the group' +
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
                             name: 'EnquiryMaster',
                             keyField: 'EnquiryMasterId',

                             linkedControls: [
                               'EnquiryDetails'
                            ],

                            urls: {
                               save: serviceEndPointBase + 'api/enquiry/save',
                               read: serviceEndPointBase + 'api/enquiry'
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
                                          name: 'EnquiryMasterId'
                                      },
                                      {
                                          xtype: 'textfield',
                                          fieldLabel: 'Enquiry Number',
                                          name: 'EnquiryNumber',
                                          emptyText: '0001',
                                          width: 220
                                      },
                                      {
                                          xtype: 'datefield',
                                          margin: '0 5 0 5',
                                          fieldLabel: 'Date',
                                          name: 'Date',
                                          emptyText: '01-01-2015',
                                          labelWidth: 40,
                                          width: 200
                                      },
                                      {
                                          xtype: 'textfield',
                                          fieldLabel: 'Reference',
                                          name: 'CustomerReference'
                                      }
                                  ]
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
                                    width: 685
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
                                  width: 685
                                },
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
                                  width: 685
                                }
                            ]
                        },
                        {
                            xtype: 'abstractgrid',
                            height: 184,
                            margin: '5 0 0 0',
                            editable: true,
                            urls: {
                                save: serviceEndPointBase + 'api/enquiry/save',
                                read: serviceEndPointBase +  'api/enquiry/query'
                            },
                            name: 'EnquiryDetails',
                            keyName: 'EnquiryDetailId',
                            initialValues: {

                            },
                            columns: [
                                {
                                    name: 'EnquiryDetailId',
                                    hidden: true
                                },
                                {
                                    name: 'EnquiryMasterId',
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
                                    xtype: 'gridcolumn',
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
                                    xtype: 'gridcolumn',
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
