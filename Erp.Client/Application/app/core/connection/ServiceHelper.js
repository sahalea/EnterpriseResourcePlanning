Ext.define('Erp.core.connection.ServiceHelper', {
    extend: 'Ext.util.Observable',
    singleton: true,
    alternateClassName: 'ServiceHelper',

    authenticateService: function (username, password) {
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
            },
            failure: function () {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Could not authenticate service, Please try again.',
                    buttons: Ext.MessageBox.OK,
                    icons: Ext.MessageBox.ERROR
                });
            }
        };
        Ext.Ajax.request(requestConfig);
    },

    getServiceAuthorizationData: function () {
        if (window.localStorage) {
            window.serviceCredentials = {
                accessToken: window.localStorage.getItem('access_token'),
                clientId: window.localStorage.getItem('client_id'),
                userName: window.localStorage.getItem('user_name'),
                tokenType: window.localStorage.getItem('token_type'),
                expires: window.localStorage.getItem('expires'),
                issued: window.localStorage.getItem('issued')
            };
        }
    },

    getServiceHeader: function () {

        this.getServiceAuthorizationData();

        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + window.serviceCredentials.accessToken
        };
    }

});