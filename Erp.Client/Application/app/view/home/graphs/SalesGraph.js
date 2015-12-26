/**
 * @Class Erp.view.home.graphs.SalesGraph
 * @extend Ext.panel.Panel
 * @alias salesgraph
 */
Ext.define('Erp.view.home.graphs.SalesGraph', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.salesgraph',

    iconCls: 'application_view_columns',
    title: 'Customers & Sales',

    requires: [
        'Erp.view.home.shortcut.ShortcutBtn',
        'Erp.view.home.shortcut.ShortcutPath',
        'Erp.view.home.ActivitySidebar'
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

            cls: 'x-app-dashboard-wrapper',
            bodyStyle: {
                backgroundColor: '#F8F8F8',
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
                          xtype: 'panel',
                          bodyStyle: {
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderBottom: 'none'
                          },

                          layout: {
                              type: 'hbox',
                              align: 'stretch'
                          },

                          items: [
                              {
                                   xtype: 'container',
                                   flex: 1,
                                   style: 'padding: 10px',

                                  layout: {
                                     type: 'vbox',
                                     align: 'stretch'
                                  },

                                  items: [
                                      {
                                          xtype: 'container',
                                          style: 'color: #58666e;',
                                          flex: 1,
                                          layout: {
                                              type: 'vbox',
                                              align: 'stretch'
                                          },
                                          items: [
                                              {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'box',
                                                            flex: 1,
                                                            html: [
                                                                '<div style="padding: 0 10px;">',
                                                                    '<div class="x-dashboard-panel x-padder-v x-text-center" style="position: relative;background-color: #edf1f2;">',
                                                                        '<div class="h1 x-text-info x-font-thin h1">521</div>',
                                                                        '<span class="x-text-muted x-text-xs">Enquiry</span>',
                                                                        '<div class="x-top x-text-right x-width-full">',
                                                                            '<i class="fa fa-caret-down x-text-warning" style="margin-right: 10px"></i>',
                                                                        '</div>',
                                                                    '</div>',
                                                                '</div>'
                                                            ].join('')
                                                        },
                                                        {
                                                            xtype: 'box',
                                                            flex: 1,
                                                            html: [
                                                                '<div style="padding: 0 10px;">',
                                                                    '<div class="x-dashboard-panel x-padder-v x-text-center x-background-primary" style="position: relative">',
                                                                        '<div class="h1 x-text-white x-font-thin h1">930</div>',
                                                                        '<span class="x-text-muted x-text-xs">Quotation</span>',
                                                                        '<div class="x-bottom x-text-right x-width-full">',
                                                                            '<i class="fa fa-cloud-upload " style="margin-right: 10px"></i>',
                                                                        '</div>',
                                                                    '</div>',
                                                                '</div>'
                                                            ].join('')
                                                        },
                                                        {
                                                            xtype: 'box',
                                                            flex: 1,
                                                            html: [
                                                                '<div style="padding: 0 10px;">',
                                                                    '<div class="x-dashboard-panel x-padder-v x-text-center x-background-info" style="position: relative">',
                                                                        '<div class="h1 x-text-white x-font-thin h1">325</div>',
                                                                        '<span class="x-text-muted x-text-xs">Delivery</span>',
                                                                        '<div class="x-bottom x-text-right x-width-full">',
                                                                            '<i class="fa fa-cloud-upload " style="margin-right: 10px"></i>',
                                                                        '</div>',
                                                                    '</div>',
                                                                '</div>'
                                                            ].join('')
                                                        }
                                                    ]
                                                },
                                          ]
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
                                  text: 'Customer',
                                  iconCls: 'customer_3',
                                  action: 'graphbutton',
                                  className: 'Erp.view.customer.CustomerEdit',
                                  x: 10,
                                  y: 20
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: '&nbsp;&nbsp; Customer Contact&nbsp;&nbsp;',
                                  iconCls: 'business_contact',
                                  action: 'graphbutton',
                                  className: 'Erp.view.customer.CustomerContact',
                                  x: 74,
                                  y: 20
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: '&nbsp;&nbsp; Sales Executive&nbsp;&nbsp;',
                                  iconCls: 'sales_customer',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.SalesExecutive',
                                  x: 194,
                                  y: 20
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Project',
                                  iconCls: 'description',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.Projects',
                                  x: 301,
                                  y:20
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: '&nbsp;&nbsp;&nbsp; Payment Terms &nbsp;&nbsp;&nbsp;',
                                  iconCls: 'coins',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.PaymentTermsList',
                                  x: 10,
                                  y:81
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: '&nbsp;&nbsp;&nbsp; Delivery Terms &nbsp;&nbsp;&nbsp;&nbsp;',
                                  iconCls: 'emblem_library',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.PaymentTermsList',
                                  x: 126,
                                  y:81
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Material',
                                  iconCls: 'book3',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.Material',
                                  x: 242,
                                  y: 81
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Product',
                                  iconCls: 'marked_price',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.Product',
                                  x: 303,
                                  y: 81
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Daily Customer Visit',
                                  iconCls: 'roles',
                                  action: 'graphbutton',
                                  className: 'Erp.view.customer.DailyCustomerVisit',
                                  x: 10,
                                  y: 142
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Unit',
                                  iconCls: 'tasks',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.Unit',
                                  x: 126,
                                  y: 142
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Make',
                                  iconCls: 'service',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.Make',
                                  x: 187,
                                  y: 142
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Item Size &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                                  iconCls: 'stock_new_spreadsheet',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.ItemSize',
                                  x: 248,
                                  y: 142
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Grade',
                                  iconCls: 'stock_new_spreadsheet',
                                  action: 'graphbutton',
                                  className: 'Erp.view.lookups.Grade',
                                  x: 10,
                                  y: 203
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chart of Account &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                                  iconCls: 'credit_1',
                                  action: 'graphbutton',
                                  className: 'Erp.view.accounts.ChartOfAccount',
                                  x: 71,
                                  y: 203
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Receipt Account',
                                  iconCls: 'credit_1',
                                  action: 'graphbutton',
                                  className: 'Erp.view.accounts.Receipts',
                                  width: 157,
                                  x: 206,
                                  y: 203
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Enquiry',
                                  iconCls: 'forms',
                                  action: 'graphbutton',
                                  width: 150,
                                  className: 'Erp.view.transactions.Enquiry',
                                  x: 500,
                                  y: 20
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Quotation',
                                  iconCls: 'document_new',
                                  action: 'graphbutton',
                                  width: 150,
                                  className: 'Erp.view.transactions.Quotation',
                                  x: 652,
                                  y: 20
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Sales <br/> Order',
                                  iconCls: 'medical_invoice_information',
                                  action: 'graphbutton',
                                  className: 'Erp.view.transactions.SalesOrder',
                                  x: 500,
                                  y: 83
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Delivery Notes',
                                  iconCls: 'purchase_order',
                                  action: 'graphbutton',
                                  width: 240,
                                  height: 78,
                                  className: 'Erp.view.transactions.DeliveryNote',
                                  x: 562,
                                  y: 83
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Invoice',
                                  iconCls: 'my_invoices',
                                  action: 'graphbutton',
                                  width: 213,
                                  height: 78,
                                  className: 'Erp.view.invoice.Invoice',
                                  x: 500,
                                  y: 162
                              },
                              {
                                  xtype: 'shortcutbtn',
                                  text: 'Pro</br>Forma Invoice',
                                  iconCls: 'invoice_1',
                                  action: 'graphbutton',
                                  className: 'Erp.view.invoice.FormaInvoice',
                                  x: 715,
                                  y: 162
                              },

                          ]
                      }
                    ]
                },
                {
                    xtype: 'panel',
                    width: 200,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'activtysidebar',
                            width: 240,
                            style: {
                                borderLeft: 'solid 1px #dee5e7'
                            }
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
