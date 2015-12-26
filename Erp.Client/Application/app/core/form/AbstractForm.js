/**
 * @class Erp.core.form.AbstractForm
 * @extend Ext.form.FormPanel
 * @alias abstractform
 */
Ext.define('Erp.core.form.AbstractForm', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.abstractform',

    requires: [
        'Erp.core.connection.RequestManager',
        'Erp.core.messaging.NotificationService'
    ],

    inject: ['notificationService', 'requestManager'],

    config: {
        mode: 0,
        requestManager: null,
        notificationService: null
    },

    mixins: {
        formHelper: 'Erp.core.form.FormHelper'
    },

    /**
     * @param cfg
     * @return
     */
    submit: function (config) {
        var self = this,
            extraParams = {},
            win = self.up('window'),
            promise = new Promise(this),
            url = self.urls.save

        if (!this.isValid()) {
            this.getNotificationService().notifyError('Error!', 'Invalid form values');
            return;
        }

        if (this.linkedControls) {
            Ext.each(this.linkedControls, function (value, index) {
                var control = win.down('*[name=' + value + ']');

                if (control.store) {
                    var records = new Array();

                    control.store.each(function (record) {
                        if (!record.isModified()) {
                            records.push(record.data);
                        }
                    });

                    extraParams[value] = records;
                }

                if(control.xtype.indexOf('form') != -1) {
                    var formValues = control.getForm().getValues();
                    extraParams[value] = formValues;
                }

            });
        }

        function successFn(form, action) {
            var response = action.response;
            var data = Ext.JSON.decode(response.responseText);

            if (data.success) {

                Ext.MessageBox.show({
                    title: 'Success', msg: 'Record saved successfully!',
                    icon: Ext.MessageBox.INFO, buttons: Ext.MessageBox.OK
                });

                self.loadFormValues(data, win);

                self.mixins.formHelper.setReadOnly(self);
                promise.resolve(response);
            }
            else {

                Ext.MessageBox.show({
                    title: 'Error!', msg: 'Exception from server!',
                    icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK
                });

                promise.reject(response);
            }
        }

        function failureFn(form, action) {
            switch (action.failureType) {
                case Ext.form.action.Action.CLIENT_INVALID:
                    Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                    break;
                case Ext.form.action.Action.CONNECT_FAILURE:
                    Ext.Msg.alert('Failure', 'Ajax communication failed');
                    break;
                case Ext.form.action.Action.SERVER_INVALID:
                    Ext.Msg.alert('Failure', action.result.msg);
            }
            promise.reject(form, action);
        }

        var cfg = {
            url: url,
            failure: failureFn,
            success: successFn,
            params: extraParams || {},
            baseParams: extraParams || {},
            enableClientValidation: true,
            jsonSubmit: true,
            contentType: 'json'
        };

        Ext.apply(cfg, config);

        self.getForm().submit(cfg);

        return promise;
    },

    /**
     * loads data from server using url
     * @param {int} id
     * @return {void}
     */
     load: function (id) {
        var self = this,
            window = self.up('window');

        var successFn = function (response) {
            var data = Ext.JSON.decode(response.responseText);
            if (data) {
                self.loadFormValues(data, window);
            }

            self.mixins.formHelper.setReadOnly(self);
        };

        if (Ext.isObject(self.urls))
            url = self.urls.read;
        else
            url = self.url;

        self.getRequestManager()
            .get({
                url: url + id,
            })
            .success(successFn)
            .failure(function () {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Error in loading data',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            });
    },

    /**
     * send requests to delete data
     * @return
     */
    deleteRecord: function () {
        var self = this,
            win = self.up('window'),
            promise = new Promise(this),
            form = this.getForm(),
            url = self.urls.delete; //.getUrls().saveUrl;

        var callback = function (opts) {
            if (opts == 'yes') {

                var successFn = function () {
                    Ext.MessageBox.show({
                        title: 'Success',
                        msg: 'Record deleted successfully!',
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.MessageBox.OK
                    });
                    promise.resolve();
                };

                self.getRequestManager()
                    .get({
                        url: url,
                        params: {
                            id: form.findField(this.keyField).getValue()
                        }
                    }).success(successFn);
            }
        };

        Ext.MessageBox.show({
            title: 'Confirm?',
            msg: 'Are you sure want to delete?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            fn: callback
        });

        return promise;
    },

    /**
     * Checks the form is valid or not
     * @return {Boolean} isValid
     */
    isValid: function () {
        return this.getForm().isValid();
    },

    /**
     * Load the response object to the form and linked controls
     * @param {Object} record
     * @param {Object} scope
     * @return {Void} null
     */
    loadFormValues: function (record, scope) {
        var self = this;

        if (record.success) {
            if (record[self.name] && record[self.name].Record) {
                self.getForm().setValues(record[self.name].Record);
                var data = record[self.name].Record;
                self.getForm().getFields().each(function(field, index) {
                  if(field.xtype=='datefield') {
                      var data = record[field.name];
                    field.setValue(moment.utc(data)._d);

                  }
                });
            }
            if (self.linkedControls && self.linkedControls.length > 0) {
                Ext.each(self.linkedControls, function (value, index) {
                    var control = scope.down('*[name=' + value + ']');
                    if (control.store) {
                        if (record[value]) {
                            var obj = { };
                            obj[value] = {};
                            Ext.apply(obj[value], record[value])
                            control.store.loadRawData(obj);
                        }
                    }
                });
            }
        }
    },

    /**
     *
     */
    loadRecord: function (record) {
        var self = this;
        var scope = self.up('*[name=topMostParent]');
        if (record) {
            self.getForm().setValues(record);
            self.getForm().getFields().each(function(field, index) {
               if(field.xtype=='datefield') {
                   var data = record[field.name];
                  field.setValue(moment.utc(data)._d);
               }
             });
            if (self.linkedControls && self.linkedControls.length > 0) {
                Ext.each(self.linkedControls, function (value, index) {
                  var control = scope.down('*[name=' + value + ']');
                  if (control.store) {
                      if (record[value]) {
                          var obj = { };
                          obj[value] = {};
                          obj[value]["Record"] = {};
                          Ext.apply(obj[value]["Record"], record[value]);
                          control.store.loadRawData(obj);
                      }
                  }
                  if(control.xtype.indexOf('form') != -1) {
                    if(record[value]) {
                      control.getForm().setValues(record[value]);
                    }
                  }
                });
            }
            this.fireEvent('recordloaded', record);
            self.disableAllFields();
            self.mixins.formHelper.setReadOnly(self);
        }
    },

    loadRecordOnEditMode: function (record, inline) {
        var self = this;
        var scope = self.up('*[name=topMostParent]');
        if (record) {
            self.getForm().setValues(record);
            self.getForm().getFields().each(function(field, index) {
               if(field.xtype=='datefield') {
                var data = record[field.name];
                if(data){
                 field.setValue(moment.utc(data)._d);
                 }
               }
             });
            if (self.linkedControls && self.linkedControls.length > 0) {
                Ext.each(self.linkedControls, function (value, index) {
                  var control = scope.down('*[name=' + value + ']');
                  if (control.store) {
                      if (record[value]) {
                            var obj = { };
                            obj[value] = {};
                            obj[value]["Record"] = {};
                            Ext.apply(obj[value]["Record"], record[value]);
                            control.store.loadRawData(record[value]);
                      }
                  }
                  if(control.xtype.indexOf('form') != -1) {
                    if(record[value]) {
                      control.getForm().setValues(record[value]);
                    }
                  }
                });
            }
            self.disableAllFields();
            self.mixins.formHelper.setReadOnly(self);
        }
    },

    disableAllFields: function() {
        var me = this,
            form = me.getForm();
        form.getFields().each(function(field) {
            field.setReadOnly(true);
        });
    }

});
