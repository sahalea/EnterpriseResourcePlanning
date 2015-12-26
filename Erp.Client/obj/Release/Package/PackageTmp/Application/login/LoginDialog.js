
Ext.define('Ext.ux.RegisterDialog', {
    extend: 'Ext.window.Window',
    requires: ['Ext.layout.container.Border', 'Ext.form.Panel', 'Ext.form.field.Checkbox', 'Ext.ux.form.IconCombo'],
    alias: 'widget.registerdialog',

    cls: 'form-login-dialog',
    iconCls: 'form-login-icon-title',
    width: 420,
    height: 400,
    closable: false,
    resizable: false,
    modal: true,
    resizable: false,
    layout: 'border',
    title: 'Register New User',

    initComponent: function () {
        var me = this;

        var messages = {
            header: 'Access to this location is restricted to authorized users only.<br />' +
                        'Please type your username and password.'
        };

        Ext.apply(me, {

            buttons: [
                {
                    text: 'Login',
                    iconCls: 'form-login-icon-login',
                    scale: 'medium',
                    width: 90
                },
                {
                    text: 'Register',
                    iconCls: 'form-login-icon-register',
                    scale: 'medium',
                    width: 90,
                    scope: this,
                    handler: this.register
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    cls: 'form-login-header',
                    baseCls: 'x-plain',
                    html: messages.header,
                    region: 'north',
                    height: 60
                },
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    header: false,
                    region: 'center',
                    border: false,
                    waitMsgTarget: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            ref: 'usernameField',
                            name: 'FirstName',
                            fieldLabel: 'First Name',
                            validateOnBlur: false,
                            iconCls: 'user',
                            allowBlank: false,
                            emptyText: 'First Name'
                        },
                        {
                            xtype: 'textfield',
                            ref: 'usernameField',
                            name: 'LastName',
                            fieldLabel: 'Last Name',
                            validateOnBlur: false,
                            iconCls: 'user',
                            allowBlank: false,
                            emptyText: 'Last name'
                        },
                        {
                            xtype: 'textfield',
                            ref: 'usernameField',
                            name: 'Email',
                            fieldLabel: 'Email',
                            emptyText: 'user@example.com',
                            validateOnBlur: false,
                            iconCls: 'user',
                            allowBlank: false
                        },
                        {
                            xtype: 'box',
                            height: 20
                        },
                        {
                            xtype: 'textfield',
                            ref: 'usernameField',
                            name: 'UserName',
                            fieldLabel: 'Username',
                            validateOnBlur: false,
                            iconCls: 'user',
                            allowBlank: false,
                            emptyText: 'User name'
                        },
                        {
                            xtype: 'textfield',
                            ref: 'passwordField',
                            inputType: 'password',
                            name: 'Password',
                            fieldLabel: 'Password',
                            width: 300,
                            iconCls: 'key',
                            validateOnBlur: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            emptyText: 'Password'
                        },
                        {
                            xtype: 'textfield',
                            ref: 'passwordField',
                            inputType: 'password',
                            name: 'ConfirmPassword',
                            fieldLabel: 'Confirm Password',
                            width: 300,
                            iconCls: 'key',
                            validateOnBlur: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            emptyText: 'Confirm Password'
                        },
                        {
                            xtype: 'box',
                            height: 20
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Phone Number',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    hideEmptyLabel: true,
                                    xtype: 'textfield',
                                    hideTrigger: true,
                                    name: 'PhoneNumber',
                                    width: 140,
                                    emptyText: '95-256-330115'
                                },
                                {
                                    xtype: 'checkbox',
                                    ref: 'usernameField',
                                    name: 'enableTwoFactor',
                                    name: 'EnableTwoFactor',
                                    inputValue: false,
                                    fieldLabel: 'Two Factor',
                                    margin: '0 0 0 5'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },

    register: function () {
        var form = this.down('form').getForm();

        if (form.isValid()) {

            //this.setErrorMessage('');
            form.submit({
                url: basePath + 'Account/Register/',
                method: 'post',
                waitMsg: form.waitMsg || 'Please wait...',
                success: this.onSuccess,
                failure: this.onFailure,
                scope: this
            });

        }
    },

    onSuccess: function (request, response) {
        var responseText = JSON.parse(response.response.responseText);

        if (responseText.success) {
            document.location = "/";
        }
    },

    onFailure: function (request, response) {

        var responseText = JSON.parse(response.response.responseText),
            msg = "Error in registering the user. Please try again";

        if (responseText.success == false) {
            if (responseText.Errors.length > 0) {
                msg = responseText.Errors[0];
            }
        }

        Ext.MessageBox.show({
            title: 'Login Error!',
            msg: msg,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.MessageBox.OK
        });
    }
});

Ext.define('Ext.ux.OTPWindow', {
    extend: 'Ext.window.Window',
    requires: ['Ext.form.Panel', 'Ext.form.field.Checkbox', 'Ext.ux.form.IconCombo'],
    alias: 'widget.otpwindow',

    cls: 'form-login-dialog',
    iconCls: 'form-login-icon-title',
    width: 350,
    height: 320,
    closable: false,
    resizable: false,
    modal: true,
    resizable: false,
    layout: 'border',
    title: 'One time password',
    bodyPadding: 5,
    buttonAlign: 'center',

    initComponent: function (cfg) {
        var me = this;

        Ext.apply(me, cfg || {});

        this.form = Ext.create('Ext.form.Panel', {
            borde: false,
            bodyStyle: {
                background: 'transparent'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'image',
                    src: '/Application/login/images/icons/large/lock_red.png',
                    autoEl: 'div',
                    width: 128,
                    height: 128,
                    style: 'text-align: center'
                },
                {
                    xtype: 'box',
                    html: 'Please enter your one time Password. Your OTP will expired in <span id="otp-remaining-time"06:00></span> Minutes',
                    cls: 'x-otp-label'
                },
                {
                    xtype: 'textfield',
                    name: 'Code',
                    hideTrigger: true,
                    width: 120,
                    cls: 'x-otp-textfield'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'Provider',
                    value: this.provider || ''
                },
                {
                    xtype: 'hiddenfield',
                    name: 'ReturnUrl',
                    value: this.returnUrl || ''
                }
            ]
        });

        Ext.apply(me, {

            buttons: [
                {
                    text: 'Cancel',
                    iconCls: 'form-login-icon-register',
                    scale: 'medium',
                    width: 90,
                    scope: this,
                    handler: this.cancel
                },
                {
                    text: 'Login',
                    iconCls: 'form-login-icon-cancel',
                    scale: 'medium',
                    width: 90,
                    scope: this,
                    handler: this.login
                }
            ],

            layout: {
                type: 'fit'
            },
            items: [this.form]

        });

        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;

        me.callParent(arguments);

        var time = Ext.get('otp-remaining-time');
        if (time) {
            var minute = 5;
            var seconds = 59;

            var interval = setInterval(function () {


                if (seconds == 0) {
                    minute--;
                    seconds = 59;
                }

                seconds--;

                if (minute == 0) {
                    clearInterval(interval)
                    var loginDialog = Ext.create('Ext.ux.LoginDialog', {
                        forgotPasswordLink: '<a href="http://support.microsoft.com/kb/189126" target="_blank">Forgot Password ?</a>',
                        formPanel: {
                            url: '/users/login.php'
                        }
                    });

                    loginDialog.show();
                    me.close();
                }

                time.setHtml(('0' + minute).slice(-2) + ':' + ('0' + seconds).slice(-2))

            }, 1000);

        }
    },

    cancel: function () {
        this.close();
        showLoginDialog();
    },

    login: function () {

        function onSuccess(form, action) {
            var response = Ext.JSON.decode(action.response.responseText);
            if (response.success) {
                document.location = '/';
            }
        }

        function onFailure(form, action) {
            var response = Ext.JSON.decode(action.response.responseText);

            if (response.isLockedOut) {
                this.close();
                showLoginDialog();
            }

            Ext.MessageBox.show({
                title: 'Error!',
                msg: response.message,
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });

        }

        if (this.form.isValid()) {
            this.form.submit({
                url: basePath + 'Account/VerifyCode',
                method: 'post',
                waitMsg: 'Please wait...',
                success: onSuccess,
                failure: onFailure,
                scope: this
            });

        }
    }
});

function showLoginDialog() {
    var loginDialog = Ext.create('Ext.ux.LoginDialog', {
        forgotPasswordLink: '<a href="http://support.microsoft.com/kb/189126" target="_blank">Forgot Password ?</a>',
        formPanel: {
            url: basePath + 'Account/Login'
        }
    });

    loginDialog.show();
}


Ext.define('Ext.ux.LoginDialog', {
    extend: 'Ext.window.Window',
    requires: ['Ext.layout.container.Border', 'Ext.form.Panel', 'Ext.form.field.Checkbox', 'Ext.ux.form.IconCombo'],
    alias: 'widget.logindialog',

    cls: 'form-login-dialog',
    iconCls: 'form-login-icon-title',
    width: 420,
    height: 280,
    resizable: false,
    closable: false,
    draggable: true,
    modal: true,
    //closeAction: 'hide',
    layout: 'border',
    title: 'Login',

    messages: undefined,
    qtips: undefined,

    headerPanel: undefined,
    formPanel: undefined,

    usernameField: undefined,
    passwordField: undefined,
    languageField: undefined,
    rememberMeField: undefined,

    forgotPasswordLink: '<a href="about:blank" target="_blank">Forgot Password ?</a>',

    loginAction: undefined,
    cancelAction: undefined,

    initComponent: function () {
        var config = {};
        Ext.applyIf(this, Ext.apply(this.initialConfig, config));

        this.messages = this.messages || {};
        this.messages = Ext.Object.merge({
            loginfailed: 'Unable to log in',
            wait: 'Please wait...',
            header: 'Access to this location is restricted to authorized users only.<br />' +
                'Please type your username and password.'
        }, this.messages);

        this.qtips = this.qtips || {};
        this.qtips = Ext.Object.merge({
            rememberme: 'This is not recommended for shared computers.',
            capslockwarning: '<div class="form-login-warning">Caps Lock is On</div><br />' +
                '<div>Having Caps Lock on may cause you to enter your password incorrectly.</div><br />' +
                '<div>You should press Caps Lock to turn it off before entering your password.</div>'
        }, this.qtips);


        this.headerPanel = this.headerPanel || {};
        this.headerPanel = Ext.create('Ext.panel.Panel', Ext.Object.merge({
            cls: 'form-login-header',
            baseCls: 'x-plain',
            html: this.messages.header,
            region: 'north',
            height: 60
        }, this.headerPanel));

        this.usernameField = this.usernameField || {};
        this.usernameField = Ext.Object.merge({
            xtype: 'icontext',
            ref: 'usernameField',
            name: 'UserName',
            fieldLabel: 'Username',
            emptyText: 'Please enter your user name...',
            validateOnBlur: false,
            iconCls: 'user',
            allowBlank: false
        }, this.usernameField);

        this.passwordField = this.passwordField || {};
        this.passwordField = Ext.Object.merge({
            xtype: 'icontext',
            ref: 'passwordField',
            inputType: 'password',
            name: 'Password',
            fieldLabel: 'Password',
            emptyText: 'Please enter your password...',
            width: 300,
            iconCls: 'key',
            validateOnBlur: false,
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                render: {
                    fn: function (field, eOpts) {
                        field.capsWarningTooltip = Ext.create('Ext.tip.ToolTip', {
                            target: field.bodyEl,
                            anchor: 'top',
                            width: 305,
                            html: this.qtips.capslockwarning
                        });

                        // disable to tooltip from showing on mouseover
                        field.capsWarningTooltip.disable();
                    },
                    scope: this
                },

                keypress: {
                    fn: function (field, e, eOpts) {
                        var charCode = e.getCharCode();
                        if ((e.shiftKey && charCode >= 97 && charCode <= 122) ||
                            (!e.shiftKey && charCode >= 65 && charCode <= 90)) {

                            field.capsWarningTooltip.enable();
                            field.capsWarningTooltip.show();
                        }
                        else {
                            if (field.capsWarningTooltip.hidden === false) {
                                field.capsWarningTooltip.disable();
                                field.capsWarningTooltip.hide();
                            }
                        }
                        if (charCode == 13) {
                            this.submit();
                        }

                    },
                    scope: this
                },

                blur: function (field) {
                    if (field.capsWarningTooltip.hidden === false) {
                        field.capsWarningTooltip.hide();
                    }
                }
            }
        }, this.passwordField);

        this.forgotPassword = {
            xtype: 'box',
            autoEl: {
                html: '<div style="font-size:11px; text-align: right; width: 388px;">' + this.forgotPasswordLink + '</div>'
            }
        };

        this.languageField = this.languageField || {};
        this.languageField = Ext.Object.merge({
            xtype: 'iconcombo',
            name: 'data[User][lang]',
            fieldLabel: 'Language',
            valueField: 'languageCode',
            value: 'en-us',
            displayField: 'languageName',
            iconClsField: 'countryFlag',
            triggerAction: 'all',
            editable: false,
            mode: 'local'
        }, this.languageField);

        this.languageField.store = this.languageField.store || {};
        this.languageField.store = Ext.create('Ext.data.ArrayStore', Ext.applyIf(this.languageField.store, {
            fields: ['languageCode', 'languageName', 'countryFlag'],
            data: [
                ['en-us', 'English - United States', 'flag-us'],
                ['en-ae', 'Arabic - United Arab Emirtaes', 'flag-ae'],
                ['en-in', 'English - India', 'flag-in']
            ]
        }));

        this.rememberMeField = this.rememberMeField || {};
        this.rememberMeField = Ext.Object.merge({
            xtype: 'checkbox',
            itemId: 'rememberMe',
            name: 'data[User][rememberme]',
            padding: '0 0 0 80',
            boxLabel: '&#160;' + 'Remember me on this computer',
            listeners: {
                render: function (checkbox) {

                },
                scope: this
            }
        }, this.rememberMeField);

        this.formPanel = this.formPanel || {};
        this.formPanel = Ext.create('Ext.form.Panel', Ext.Object.merge({
            bodyPadding: 10,
            header: false,
            region: 'center',
            border: false,
            waitMsgTarget: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                labelWidth: 75
            },
            items: [
                this.usernameField,
                this.passwordField,
                this.forgotPassword, {
                    xtype: 'box',
                    autoEl: 'div',
                    height: 10
                }, this.languageField,
                this.rememberMeField
            ]
        }, this.formPanel));

        this.loginAction = this.loginAction || {};
        this.loginAction = Ext.Object.merge({
            text: 'Login',
            ref: '../loginAction',
            iconCls: 'form-login-icon-login',
            scale: 'medium',
            width: 90,
            handler: this.submit,
            scope: this
        }, this.loginAction);

        this.cancelAction = this.cancelAction || {};
        this.cancelAction = Ext.Object.merge({
            text: 'Cancel',
            ref: '../cancelAction',
            iconCls: 'form-login-icon-cancel',
            scale: 'medium',
            width: 90,
            handler: this.cancel,
            scope: this
        }, this.cancelAction);

        this.registerAction = this.registerAction || {};
        this.registerAction = Ext.Object.merge({
            text: 'Register',
            iconCls: 'form-login-icon-register',
            scale: 'medium',
            width: 90,
            handler: this.register,
            scope: this
        }, this.registerAction);


        this.buttons = this.buttons || [];
        this.buttons = this.buttons.concat([this.registerAction, this.loginAction, this.cancelAction]);

        this.items = this.items || [];
        this.items = this.items.concat([this.headerPanel, this.formPanel]);

        this.keys = this.keys || [];
        this.keys = this.keys.concat([{
            key: [10, 13],
            handler: this.submit,
            scope: this
        }]);

        if (this.cancelAction && (this.cancelAction.hidden === undefined || this.cancelAction.hidden === false)) {
            this.keys = this.keys.concat([{
                key: [27],
                handler: this.cancel,
                scope: this
            }]);
        }

        this.callParent(arguments);

        // this.addEvents('success', 'failure');
    },

    onShow: function () {
        this.callParent(arguments);
        //this.formPanel.usernameField.focus(true, 300);
    },

    onRender: function () {
        this.callParent(arguments);
    },

    setMessage: function (msg) {
        this.headerPanel.update(msg);
    },

    setErrorMessage: function (msg) {
        var errorNode = Ext.DomQuery.selectNode('span[class=error]', this.headerPanel.getEl().dom);
        if (!errorNode) {
            Ext.DomHelper.insertHtml('beforeEnd',
                Ext.DomQuery.selectNode('div[id^=panel-]:last', this.headerPanel.getEl().dom),
                '<br /><span class="error"></span>');
            errorNode = Ext.DomQuery.selectNode('span[class=error]', this.headerPanel.getEl().dom);
        }
        Ext.get(errorNode).show().update(msg);
    },

    submit: function () {
        var form = this.formPanel.getForm();

        if (form.isValid()) {
            //this.loginAction.disable();
            if (this.cancelAction instanceof Ext.Button) {
                this.cancelAction.disable();
            }
            this.setErrorMessage('');
            form.submit({
                url: form.url,
                method: 'post',
                waitMsg: form.waitMsg || 'Please wait...',
                success: this.onSuccess,
                failure: this.onFailure,
                scope: this
            });

        }
    },

    cancel: function () {
        this.hide();
    },

    register: function () {
        this.close();
        Ext.create('Ext.ux.RegisterDialog').show();
    },

    onSuccess: function (form, action) {

        // this.formPanel.getForm().findField('Password').setRawValue('');

        var response = Ext.JSON.decode(action.response.responseText);

        if (response.success) {
            if (response.tfaEnabled) {
                this.close();
                Ext.create('Ext.ux.OTPWindow', {
                    provider: response.provider,
                    returnUrl: response.returnUrl
                }).show();
            }
            else {

                //var helper = new ServiceHelper();
                //helper.authenticate(this.formPanel.getForm().findField('UserName').getValue(),
                //    this.formPanel.getForm().findField('Password').getValue(),
                //    function () {

                //    });
                document.location = basePath;
            }
        }

        if (this.loginAction instanceof Ext.Button) {
            this.loginAction.enable();
        }
        if (this.cancelAction instanceof Ext.Button) {
            this.cancelAction.enable();
        }

        this.fireEvent('success', this, form, action);


    },

    onFailure: function (form, action) {
        if (this.loginAction instanceof Ext.Button) {
            this.loginAction.enable();
        }

        if (this.cancelAction instanceof Ext.Button) {
            this.cancelAction.enable();
        }

        var response = Ext.JSON.decode(action.response.responseText);


        var msg = this.messages.loginfailed;
        if (action.result.msg) {
            msg = action.result.msg;
        }

        this.setErrorMessage(response.message);

        Ext.MessageBox.show({
            title: 'Login Error!',
            msg: response.message,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.MessageBox.OK
        });

        this.fireEvent('failure', this, form, action);
    }
});

ServiceHelper = (function () {

    function ServiceHelper() { }

    ServiceHelper.prototype.clientId = "Erp";

    ServiceHelper.prototype.authenticate = function (userName, password, callbackFn) {
        var requestConfig = {
            url: 'http://' + serviceEndpointBase + '/token',
            timeout: 6000,

            withCredential: true,
            useDefaultXhrHeader: false,
            disableCaching: true,
            params: {
                UserName: userName,
                Password: password,
                client_id: serviceClientName,
                grant_type: 'password'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                var access_token = data.access_token;

                if (window.localStorage) {
                    window.localStorage.setItem('access_token', access_token);
                    window.localStorage.setItem('client_id', data['as:client_id']);
                    window.localStorage.setItem('user_name', data['userName']);
                    window.localStorage.setItem('token_type', data['token_type']);
                    window.localStorage.setItem('expires', data['.expores']);
                    window.localStorage.setItem('issued', data['.issued']);
                }

                if (callbackFn) {
                    callbackFn.apply(this, []);
                }
            },
            failure: function () {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Could not authenticate backoffice service, Please try again.',
                    buttons: Ext.MessageBox.OK,
                    icons: Ext.MessageBox.ERROR
                });
            }
        };
        Ext.Ajax.request(requestConfig);
    };

    return ServiceHelper;
})();