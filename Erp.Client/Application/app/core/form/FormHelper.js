/**
 * @class
 * @extend Ext.Base
 */
Ext.define('Erp.core.form.FormHelper', {
  extend: 'Ext.Base',

  /**
   * mode determines the current state of the form
   */
  mode: {
    EMPTY: 0,
    INSERT: 1,
    UPDATE: 2,
    READ: 3
  },

  /**
   * @param {Ext.Button} sender
   * @param {Ext.EventObject} evt
   * @return {Void}
   */
  onFormRender: function(sender, evt) {
    var win = sender.up('window'),
      form = win.down('abstractform'),
      buttons = win.query('button[action]');

    function iterator(control, idx) {
      switch (control.action) {
        case 'new':
        case 'list':
          control.enable();
          break;
        case 'save':
        case 'delete':
        case 'cancel':
        case 'edit':
        case 'print':
        case 'attachment':
          control.disable();
          break;
      }
    }

    Ext.each(buttons, iterator);
  },

  /**
   * @param {Ext.Button} sender
   * @param {Ext.EventObject} evt
   * @return {Void}
   */
  initFormInsert: function(sender, evt) {
      var self = this,         
      win = sender.up('window'),
      formPanel = win.down('abstractform'),
      form = formPanel.getForm(),
      btns = win.query('button[action]');
    form.reset();
    formPanel.setMode(self.mode.INSERT);

    if (formPanel.keyField) {
      form.findField(formPanel.keyField).setValue('0');
      form.findField(formPanel.keyField).focus(10);
    }

    if (formPanel.initialValues) {
      form.setValues(formPanel.initialValues);
    }

    var iterator = function(control, idx) {
      switch (control.action) {
        case 'new':
        case 'list':
        case 'add':
        case 'delete':
        case 'edit':
        case 'print':
        case 'attachment':
          control.disable();
          break;
        case 'save':
        case 'cancel':
          control.enable();
          break;
      }
    };

    Ext.each(btns, iterator);

    this.enableAllFields(form);
  },

  /**
   * @param {Ext.Button} sender
   * @param {Ext.EventObject} evt
   * @return
   */
  initFormEdit: function(sender, evt) {
    var self = this,
      win = sender.up('window'),
      formPanel = win.down('abstractform'),
      form = formPanel.getForm(),
      btns = win.query('button[action]');

    formPanel.setMode(self.mode.UPDATE);

    var iterator = function(control, idx) {
      switch (control.action) {
        case 'new':
        case 'list':
        case 'add':
        case 'delete':
        case 'edit':
        case 'print':
        case 'attachment':
          control.disable();
          break;
        case 'save':
        case 'cancel':
          control.enable();
          break;
      }
    };

    Ext.each(btns, iterator);

    this.enableAllFields(form);
  },

  /**
   * @param {Ext.Button} sender
   * @param {Ext.EventObject} evt
   * @return
   */
  cancelEdit: function(sender, evt) {
    var self = this,
      win = sender.up('window'),
      form = win.down('abstractform'),
      baseForm = form.getForm();

    /**
     * this function will be called on the select of message box
     * @param {String} opts the selected button
     * @return
     */
    var callback = function(opts) {
      if (opts == 'yes') {

        form.getForm().reset();
        form.setMode(self.mode.READ);

        Ext.each(win.query('button[action]'), function(control, index) {
          switch (control.action) {
            case 'new':
            case 'list':
            case 'add':
              control.enable();
              break;
            case 'save':
            case 'cancel':
            case 'edit':
            case 'print':
            case 'delete':
            case 'attachment':
              control.disable();
              break;
          }
        });

        self.disableAllFields(baseForm);
      }
    }

    //show confirmation box
    Ext.MessageBox.show({
      title: 'Confirm!',
      msg: 'Are you sure want to cancel?',
      icon: Ext.MessageBox.QUESTION,
      buttons: Ext.MessageBox.YESNO,
      scope: win,
      modal: true,
      fn: callback
    });
  },

  /**
   * @param {Ext.form.Panel} form
   * @return {void}
   */
  setReadOnly: function(form) {
    var self = this,
      win = form.up('window');

    Ext.each(win.query('button[action]'), function(control, index) {
      switch (control.action) {
        case 'new':
        case 'list':
        case 'add':
        case 'edit':
        case 'print':
        case 'delete':
        case 'attachment':
          control.enable();
          break;
        case 'save':
        case 'cancel':
          control.disable();
          break;
      }
    });

    self.disableAllFields(form.getForm());
  },

  /**
   * @param {Ext.Button} sender
   * @param {Ext.EventObject} evt
   * @return
   */
  saveForm: function (sender, evt) {
    var self = this,
      win = sender.up('window'),
      form = win.down('abstractform');

    form.submit()
      .success(function() {

          form.getForm().reset();

        Ext.MessageBox.show({
          title: 'Success',
          msg: 'Record saved successfully!',
          icon: Ext.MessageBox.INFO,
          buttons: Ext.MessageBox.OK
        });
        self.disableAllFields(form.getForm());

        var iterator = function(control, index) {
          switch (control.action) {
            case 'new':
            case 'edit':
            case 'print':
            case 'delete':
            case 'list':
            case 'attachment':
              control.enable();
              break;
            case 'savevoucher':
            case 'cancel':
            case 'saveandnew':
              control.disable();
              break;
          }
        };

        Ext.each(win.query('button[action]'), iterator);
      });

  },

  /**
   * @param {Ext.Button} sender
   * @param {Ext.EventObject} evt
   * @return
   */
  deleteRecord: function(sender, evt) {
    var self = this,
      win = sender.up('window'),
      form = win.down('abstractform');

    form.deleteRecord.apply(form).success(function() {
      form.getForm().reset();
      self.onFormRender(sender, evt);
    });
  },

  /**
   * @param {Ext.form.Basic} form
   * @return {Void}
   */
  enableAllFields: function(form) {
    form.getFields().each(function(field) {
      field.setReadOnly(false);
    });
  },

  /**0
   * @param {Ext.form.Basic} form
   * @return {Void}
   */
  disableAllFields: function(form) {
    form.getFields().each(function(field) {
      field.setReadOnly(true);
    });
  },

  /**
   * @param {Ext.Button} sender
   * @param {Ext.EventObject} evt
   * @return
   */
  openList: function(sender, evt) {
    var self = this,
      win = sender.up('window');

    if (win.listConfig) {
      Ext.create('Erp.core.list.AbstractList', win.listConfig).show();
    }
  },

  /**
   * @param {Ext.form.field.Combo} combo
   * @param {Ext.data.Model} record
   * @return
   */
  loadFormData: function(combo, record) {
    var self = this,
      win = combo.up('window'),
      form = win.down('abstractform');

    form.load(combo.getValue());

  }

});