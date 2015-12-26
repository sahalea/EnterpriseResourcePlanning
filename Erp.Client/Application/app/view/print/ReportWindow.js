/**
* @class Stores.view.print.ReportWindow
* @extend Ext.window.Window
*/Ext.define('Erp.view.print.ReportWindow', {

     extend: 'Ext.window.Window',

     initComponent: function (cfg) {
         var me = this;
         Ext.apply(me, cfg || {});
         Ext.apply(me, {

             maximizable: true,
             width: 500,
             maximized: true,
             height: 500,
             items: [
                 {
                     xtype: 'box',
                     autoEl: {
                         tag: 'iframe',
                         style: {
                             'height': '100%',
                             'width': '100%'
                         },
                         frameBorder: 0,
                         src: 'ReportViewer.aspx?reportName=' + me.reportName + '&selectionFormula=' + me.selectionFormula
                     }
                 }
             ]
         });

         me.callParent(arguments);
     }

 });