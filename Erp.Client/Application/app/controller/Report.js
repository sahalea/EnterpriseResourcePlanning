Ext.define('Erp.controller.Report', {

    extend: 'Ext.app.Controller',

   /* views: [
        'ERP.view.home.shortcuts.reports.ReportsGraph'
    ],*/

    refs: [
        {
            ref: 'reports',
            selector: 'reportsgraph'
        }
    ],

    init: function () {
        this.control({
            'button[action=report_print]': {
                click: this.printReport
            },
            'button[action=report_clear_filter]': {
                click: this.clearReportFilter
            }
        });
    },

    /*
     *
     * 
     *
     */
    printReport: function () {
        var selectedReportId = this.getReports().selectedReportId;
        var form = this.getReports().down('form');
        var reportName = form.reportName;
        var reportUrl = 'GenericReportViewer.aspx';

        if (form.getForm().isValid()) {
            var fields = new Array();
            var fieldValues = new Array();
            var values = form.getForm().getValues();

            for (var key in values) {
                fields.push(key);
                fieldValues.push(values[key]);
            }
            //--Push fixe parameter
            fields.push('ReportId');
            fieldValues.push(selectedReportId);
            fields.push('UserId');
            fieldValues.push(employeeId);

            var params = {
                reportId: selectedReportId,
                fields: fields.join(';'),
                values: fieldValues.join(';')
            };

            reportUrl += "?" + Ext.urlEncode(params);
            var index = fields.indexOf("format");
            if (index > -1) {
                fields.splice(index, 1);
                fieldValues.splice(index, 1);
            }
            this.prepareData(reportUrl, fields, fieldValues);
        }
        else {
            Ext.MessageBox.show({
                title: 'خطأ', msg: 'الرجاء ادخال كامل البيانات...!', icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK, scope: this, modal: true
            });
        }
    },
    /*
    *
    */
    prepareData: function (reportUrl, paramNames, paramValues) {
        var me = this;
        var id;

        Ext.MessageBox.show({
            msg: 'تحميل التقرير...', progressText: 'جاري التحميل...', width: 300, wait: true, waitConfig: { interval: 200 }
        });

        Ext.Ajax.timeout = 600000
        Ext.Ajax.request({
            url: 'router.ashx',
            params: {
                action: 'ERP.Account.GUI.DataHandler',
                method: 'ExecuteSP',
                procedure: 'Reports.GetSupplierStatments',
                paramNames: paramNames.join(';'),
                paramValues: paramValues.join(';')
            },
            success: function (response) {
                if (response) {
                    data = Ext.decode(response.responseText);
                    reportWindow = window.open(reportUrl + '&ID=' + data.data, 'reportWindow', 'resizable=no,height=928,width=875');
                    Ext.MessageBox.hide();
                } else {
                    Ext.MessageBox.hide();
                    Ext.MessageBox.show({
                        msg: 'حدث خطأ في العملية',
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.MessageBox.OK,
                        title: 'خطأ'
                    });
                }
                Ext.Ajax.timeout = 30000;
            },
            failure: function () {
                //  Ext.getCmp('searchButton').enable();
                Ext.MessageBox.show({
                    msg: 'Operation timeout',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK,
                    title: 'خطأ'
                });
                Ext.MessageBox.hide();
                Ext.Ajax.timeout = 30000;
            },
            scope: this
        });
    },
    clearReportFilter: function () {
        var selectedReportId = this.getReports().selectedReportId;
        var form = this.getReports().down('form');
        form.getForm().reset();
    }
});

