/**
 * @class Lattice.core.connection.RequestManager
 * @extend Ext.Base
 */

Ext.define('Erp.core.connection.RequestManager', {
    extend: 'Ext.Base',

    singleton: true,
    alternateClassName: 'RequestManager',

    get: function (config) {
        var cfg = {
            method: 'GET'
        };

        Ext.apply(cfg, config);

        return this.makeRequest(cfg, cfg.success, cfg.failure || Ext.emptyFn);
    },

    post: function (config) {
        var cfg = {
            method: 'POST'
        };

        Ext.apply(cfg, config);

        return this.makeRequest(cfg, cfg.success, cfg.failure || Ext.emptyFn);
    },

    makeRequest: function (config) {
        var promise = new Promise(config.scope || this);

        var cfg = {
            url: config.url || '',
            timeout: 6000,
            username: '',
            password: '',
            withCredential: true,
            useDefaultXhrHeader: false,
            disableCaching: true,
            params: config.params || {},
            method: config.method || 'GET'
        };

        if (config.contentType && config.contentType == 'json') {
            cfg.headers = { 'Content-Type': 'application/json' };
        }

        if (config.jsonSubmit) {
            cfg.headers = { 'Content-Type': 'application/json' };
        }

        Ext.apply(cfg, config);

        var success = function (response) {
            promise.resolve(response);
        };

        var failure = function (response) {
            promise.reject(response);
        };

        cfg.success = success;
        cfg.failure = failure;

        Ext.Ajax.request(cfg);

        return promise;
    }

})
