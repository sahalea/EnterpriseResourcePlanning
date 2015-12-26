
/**
 * @class Erp.view.toolbar.AppToolbar
 * @extend Erp.container.Viewport
 */

Ext.define('Erp.view.toolbar.AppToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'apptoolbar',

    items: [
        {
            text: 'File',
            iconCls: 'application_view_columns',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New Company',
                        type: 'appmenu',
                        //className: 'Erp.view.company.JournalEntry'
                    },
                    {
                        text: 'Open Company'
                    }

                ]
            }
        },
        {
            text: 'Customers',
            iconCls: 'application_view_columns',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Customer Home',
                        iconCls: 'user_suit'
                    },
                    {
                        xtype: 'menuseparator'
                    },
                    {
                        text: 'New',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'New Customer',
                                    type: 'appmenu',
                                    className: 'Erp.view.customer.CustomerEdit1'
                                },
                                {
                                    text: 'New Time Entry'
                                },
                                {
                                    text: 'New Product Or Service',
                                    type: 'appmenu',
                                    className: 'Erp.view.sales.products.ProductTypeSelector'
                                },
                                {
                                    text: 'New Quote...',
                                    type: 'appmenu',
                                    className: 'Erp.view.sales.quotation.Quotation'
                                },
                                {
                                    text: 'New Sales Order...'
                                },
                                {
                                    text: 'New Invoice...'
                                },
                                {
                                    text: 'New Cash Sale...'
                                },
                                {
                                    text: 'New Credit Note'
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Projet',
            iconCls: 'user',
            listeners: {
                scope: this,
                click: function () {
                    var path = 'app/view/student/StudentPanel.js';
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.status == 200) {
                            if (xhr.readyState == 4) {
                                eval(xhr.responseText);
                            }
                        }
                    };
                    xhr.open('GET', path, true);
                    xhr.send();
                }
            }
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Invoice',
            iconCls: 'page_white_code_red'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Accounts',
            iconCls: 'money'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Reports',
            iconCls: 'report_edit'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Other',
            iconCls: 'application_form'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Settings',
            iconCls: 'cog'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Help',
            iconCls: 'help'
        },
        {
            xtype: 'tbfill'
        },
        {
            text: 'Settings',
            iconCls: 'key',
            menu: {
                items:[
                  {
                    text: 'change Password'
                  },
                  {
                    text: 'Logout',
                    listeners: {
                      scope: this,
                      click: function() {
                          Ext.Msg.show({
                          title:'Logout?',
                          msg: 'Do you want to logout?',
                          buttons: Ext.Msg.YESNO,
                          icon: Ext.Msg.QUESTION,
                            fn: function(btn) {
                              if (btn === 'yes') {
                                  window.location.href = "Account/LogOff";
                              } else if (btn === 'no') {

                              }
                            }
                          });
                      }
                    }
                  }
                ]
            }
        }
    ],

    reloadClass: function (path) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200) {
                if (xhr.readyState == 4) {
                    console.log(xhr.responseText);
                }
            }
        };
        xhr.open('GET', path, true);
        xhr.send();
    }

});
