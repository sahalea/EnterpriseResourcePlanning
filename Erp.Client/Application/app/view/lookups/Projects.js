
/**
* @class Erp.view.customer.CustomerContact
* @extend Ext.window.Window
*/
Ext.define("Erp.view.lookups.Projects", {
    extend: 'Ext.window.Window',
    alias: 'widget.projects',

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
        url: serviceEndPointBase + 'api/project/query',
        name: 'Projects',
        columns: [
            {
                name: 'MainContractor',
                text: 'Main Contractor',
                width: 120
            },
            {
                text: 'Name',
                name: 'Name',
                flex: 1
            }
        ]
    },

    iconCls: 'user',
    title: 'Projects',

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
                            html: '<b>Projects</b>'
                        },
                        {
                            xtype: 'box',
                            style: 'padding-left:10px;',
                            html: 'To add Project , click Add. To change a Project , select the group' +
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
                            keyField: 'ProjectId',
                            urls: {
                                save: serviceEndPointBase + 'api/project/save',
                                delete: serviceEndPointBase + 'api/deleteproject'
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
                                                      name: 'ProjectId'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Project Name',
                                                      name: 'Name'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'Main Contractor',
                                                      name: 'MainContractor'
                                                  },
                                                  {
                                                      xtype: 'textfield',
                                                      margin: '5 5 5 5',
                                                      fieldLabel: 'City',
                                                      name: 'City'
                                                  }

                                              ]
                                          },
                                        {
                                            xtype: 'fieldcontainer',
                                            flex: 1,
                                            layout: {
                                                align: 'stretch',
                                                type: 'vbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    margin: '5 5 5 5',
                                                    fieldLabel: 'Consultant',
                                                    name: 'Consultant'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    margin: '5 5 5 5',
                                                    fieldLabel: 'Owner',
                                                    name: 'Owner'
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
