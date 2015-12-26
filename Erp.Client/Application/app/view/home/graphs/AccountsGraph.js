/**
 * @Class Erp.view.home.graphs.AccountsGraph
 * @extend Ext.panel.Panel
 * @alias salesgraph
 */
Ext.define('Erp.view.home.graphs.AccountsGraph', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountsgraph',

    iconCls: 'application_view_columns',
    title: 'Banking',

    requires: [
        'Erp.view.home.shortcut.ShortcutBtn',
        'Erp.view.home.shortcut.ShortcutPath'
    ],

    /**
     * Initializes SalesGraph
     * @param {Object} arguments
     * @return {void} null
     */
    initComponent: function (cfg) {
        var me = this;

        Ext.apply(me, {

            layout: {

                type: 'hbox',
                align: 'stretch'
            },

            bodyCls: 'erp-shortcuts-panel',

            bodyStyle: {
                backgroundColor: '#f9f9f9',
                background: 'url(/Application/resources/images/bg/square.gif)'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                      {
                          xtype: 'container',
                          padding: 5,
                          style: {
                              borderTop: 'solid 1px #CCC'
                          },
                          layout: {
                              type: 'vbox'
                          },
                          items: [
                              {
                                  xtype: 'box',
                                  html: 'More Tasks',
                                  style: {
                                      fontSize: '20px',
                                      fontFamily: 'Verdana',
                                      fontWeight: 'bold',
                                      textDecoration: 'underline'
                                  }
                              },
                              {
                                  xtype: 'container',
                                  padding: 10,
                                  layout: {
                                      type: 'hbox'
                                  },
                                  defaults: {
                                      iconAlign: 'top',
                                      iconCls: 'application_form_edit_slick',
                                      width: 80,

                                      style: {
                                          border: 'none',
                                          backgroundColor: 'transparent',
                                          margins: '0 0 0 5'
                                      }
                                  },
                                  items: [
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'New <br/> Customer',
                                          action: 'graphbutton',
                                          className: 'Erp.view.customer.CustomerEdit'
                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: ' Customer <br/>Contact',
                                          action: 'graphbutton',
                                          className: 'Erp.view.customer.CustomerContact'
                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'Payment <br/> Term',
                                          action: 'graphbutton',
                                          className: 'Erp.view.lookups.PaymentTermsList'
                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'Delivery <br/> Term',
                                          action: 'graphbutton',
                                          className: 'Erp.view.lookups.DeliveryMethodList'

                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'Unit Of <br/> Measure',
                                          action: 'graphbutton',
                                          className: 'Erp.view.lookups.Unit'
                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'New <br/> Projects',
                                          action: 'graphbutton',
                                          className: 'Erp.view.lookups.Projects'

                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'Sales <br/> Executive',
                                          action: 'graphbutton',
                                          className: 'Erp.view.lookups.SalesExecutive'
                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'Daily <br/> Customer Visit',
                                          action: 'graphbutton',
                                          className: 'Erp.view.customer.DailyCustomerVisit'
                                      },
                                      {
                                          xtype: 'shortcutbtn',
                                          text: 'New <br/> Item',
                                          menu: {
                                              defaults: {
                                                  xtype: 'menuitem',
                                                  type: 'app-menu-item'
                                              },
                                              items: [
                                                  {
                                                      text: 'Material',
                                                      iconCls: 'application_form_add',
                                                      className: 'Erp.view.lookups.Material'
                                                  },
                                                  {
                                                      text: 'Product',
                                                      iconCls: 'application_form_add',
                                                      className: 'Erp.view.lookups.Product'
                                                  },
                                                  {
                                                      text: 'Item Size',
                                                      iconCls: 'application_form_add',
                                                      className: 'Erp.view.lookups.ItemSize'
                                                  },
                                                  {
                                                      text: 'Make',
                                                      iconCls: 'application_form_add',
                                                      className: 'Erp.view.lookups.Make'
                                                  },

                                                  {
                                                      text: 'Grade',
                                                      iconCls: 'application_form_add',
                                                      className: 'Erp.view.lookups.Grade'
                                                  }
                                              ]
                                          }
                                      }
                                  ]
                              }
                          ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,

                            layout: {
                                type: 'absolute'
                            },
                            items: [
                                {
                                    xtype: 'shortcutbtn',
                                    text: 'New <br/> &nbsp;&nbsp; Enquiry &nbsp;&nbsp;  ',
                                    iconCls: 'application_x_desktop',
                                    action: 'graphbutton',
                                    className: 'Erp.view.transactions.Enquiry',
                                    x: 40,
                                    y: 60
                                },
                                {
                                    xtype: 'shortcutbtn',
                                    text: 'New <br/>&nbsp; Quotation &nbsp;',
                                    iconCls: 'application_x_desktop',
                                    className: 'Erp.view.transactions.Quotation',
                                    action: 'graphbutton',
                                    x: 150,
                                    y: 60
                                },
                                {
                                    xtype: 'shortcutbtn',
                                    text: 'New <br/>Sales Order',
                                    iconCls: 'application_x_desktop',
                                    className: 'Erp.view.transactions.SalesOrder',
                                    action: 'graphbutton',
                                    x: 260,
                                    y: 60
                                },
                                {
                                    xtype: 'shortcutbtn',
                                    text: ' &nbsp;&nbsp; Delivery  &nbsp;&nbsp; <br/> Notes',
                                    iconCls: 'application_x_desktop',
                                    className: 'Erp.view.transactions.DeliveryNote',
                                    action: 'graphbutton',
                                    x: 370,
                                    y: 60
                                },
                                {
                                    xtype: 'shortcutbtn',
                                    text: '&nbsp; &nbsp; Invoice  <br/> &nbsp;&nbsp;',
                                    iconCls: 'application_x_desktop',
                                    action: 'graphbutton',
                                    className: 'Erp.view.invoice.Invoice',
                                    x: 480,
                                    y: 60
                                },
                                {
                                    xtype: 'shortcutbtn',
                                    text: ' &nbsp;&nbsp; Forma  &nbsp;&nbsp; <br/> Invoice',
                                    iconCls: 'application_x_desktop',
                                    className: 'Erp.view.invoice.FormaInvoice',
                                    action: 'graphbutton',
                                    x: 590,
                                    y: 60
                                },
                                {
                                    xtype: 'shortcutpath',
                                    x: 60,
                                    y: 100,
                                    height: 4,
                                    width: 600
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    width: 180,
                    padding: 10,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'box',
                            html: 'Reports',
                            style: {
                                fontSize: '20px',
                                fontFamily: 'Verdana',
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }
                        },
                        {
                            xtype: 'combo',
                            labelAlign: 'top',
                            fieldLabel: 'Select a report type'
                        },
                        {
                            xtype: 'combo',
                            labelAlign: 'top',
                            fieldLabel: 'Select a report '
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    text: 'Display',
                                    xtype: 'button',
                                    flex: 1
                                },
                                {
                                    text: 'Print...',
                                    xtype: 'button',
                                    flex: 1,
                                    margins: '0 0 0 0'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    /**
     * After render this panel
     * @return {void} null
     */
    afterRender: function () {
        var me = this;

        var dragOverrides = {
            b4StartDrag: function () {
                if (!this.el) {
                    this.el = Ext.get(this.getEl())
                }
                this.origPos = this.el.getXY();
                Ext.getBody().appendChild(this.el);
            }
        };

        var elements = Ext.select('.draggable');

        Ext.each(elements.elements, function (el) {
            var dd = new Ext.dd.DD(el, 'customDDGroup', {
                isTarget: false
            });
            Ext.apply(dd, dragOverrides);
        });

        me.callParent(arguments);
    }

});
