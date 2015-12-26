﻿
/**
* @class Erp.view.lookups.PaymentTermsList
* @extend Ext.window.Window
*/
Ext.define("Erp.view.lookups.DeliveryMethodList", {
    extend: 'Ext.window.Window',
    alias: 'widget.deliverymethodlist',

    height: 250,
    width: 500,

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
        url: serviceEndPointBase + 'api/deliveryTerms',
        name: 'DeliveryTerms',
        columns: [
            {
                text: 'Name',
                flex: 1,
                name: 'Name'
            },
            {
                text: 'Description',
                flex: 1,
                name: 'Description'
            }
        ]
    },


    iconCls: 'user',
    title: 'Manage Delivery Method',

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
                            html: '<b>Delivery Terms</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Delivery Terms , click Delivery Terms. To change a Payment Terms , select the group' +
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
                            keyField: 'DeliveryTermId',
                            urls: {
                                save: serviceEndPointBase + 'api/deliveryTerms/save',
                                read: serviceEndPointBase + 'api/deliveryTermss'
                            },
                            bodyStyle: {
                                background: 'transparent'
                            },
                            items: [
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
                                                      name: 'DeliveryTermId'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Name',
                                                      name: 'Name'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Description',
                                                      name: 'Description'
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
    }

});
