
/**
* @class Erp.view.lookups.Material
* @extend Ext.window.Window
*/
Ext.define("Erp.view.lookups.Material", {
    extend: 'Ext.window.Window',
    alias: 'widget.material',

    height: 250,
    width: 600,

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
        url: serviceEndPointBase + 'api/material/query',
        name: 'Material',
        columns: [
            {
                name: 'MaterialCode',
                text: 'Material Code',
                width: 120
            },
            {
                text: 'Name',
                flex: 1,
                name: 'Name'
            }
        ]
    },

    iconCls: 'user',
    title: 'Material',

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
                            html: '<b>Material</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Material , click Add. To change a Material , select the group' +
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
                            keyField: 'MaterialId',
                            urls: {
                                save: serviceEndPointBase + 'api/material/save'

                            },
                            bodyStyle: {
                                background: 'transparent'
                            },
                            items: [
                                 {
                                     xtype: 'fieldcontainer',
                                     padding: 5,

                                     layout: {
                                         type: 'hbox'
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
                                                      name: 'MaterialId'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Material Code',
                                                      name: 'MaterialCode'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Material Name',
                                                      name: 'Name'
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
    }
});
