
/**
* @class Erp.view.accounts.ChartOfAccount
* @extend Ext.window.Window
*/
Ext.define("Erp.view.accounts.ChartOfAccount", {
    extend: 'Ext.window.Window',
    alias: 'widget.chartofaccount',

    height: 300,
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
        url: serviceEndPointBase + 'api/chartofaccount/query',
        name: 'ChartsAccount',
        columns: [
            {
                name: 'AccountTypeId',
                text: 'Account Type',
                width: 120,
                renderer: {
                  name: 'AccountTypeName',
                  columnName: 'AccountType.Name'
                }
            },
            {
                text: 'Description',
                name: 'Description',
                flex: 1
            }
        ]
    },

    iconCls: 'user',
    title: 'Chart Of Account',

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
                            html: '<b>Chart Of Account</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add ChartOfAccount, click Add. To change a ChartOfAccount, select the group' +
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
                            keyField: 'ChartsAccountId',
                            urls: {
                                save: serviceEndPointBase + 'api/chartofaccount/save',
                                read: serviceEndPointBase + 'api/chartofaccount/query'
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
                                                      name: 'ChartsAccountId'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Account ID',
                                                      name: 'AccountId'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Description',
                                                      name: 'Description'
                                                  },
                                                  {
                                                      xtype: 'abstractcombo',
                                                      url: serviceEndPointBase + 'api/accounttype/',
                                                      fields: ['AccountTypeId', 'Name'],
                                                      displayField: 'Name',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Account Type',
                                                      valueField: 'AccountTypeId',
                                                      name: 'AccountTypeId',
                                                      entity: 'AccountType',
                                                      hiddenName: 'AccountTypeId',
                                                      type: 'app-form-data-selector',
                                                      autoLoadData: true,
                                                      queryMode: 'local',
                                                      valueNotFoundText: 'No Valu Found'
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


});
