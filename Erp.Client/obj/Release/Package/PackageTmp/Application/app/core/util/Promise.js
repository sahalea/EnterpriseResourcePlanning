(function () {
    'use strict';

    var root = this;

    var Promise = function (context) {
        var callbacks = [];

        var execute = function (type, context, args) {
            var hasCallbacks = callbacks.length;

            if (!hasCallbacks) {
                return;
            }

            callbacks[0][type].apply(context, args);
            callbacks.shift();
        };

        return {
            context: context || root,

            resolve: function () {
                execute('success', this.context, arguments);
            },

            reject: function () {
                execute('failure', this.context, arguments)
            },

            then: function (onFullfilled, onRejected) {
                callbacks.push({ 'success': onFullfilled, 'failure': onRejected });
                return this;
            },

            ok: function (fn) {
                if (callbacks.length > 0) {
                    Ext.apply(callbacks[0], { 'success': fn });
                }
                else {
                    callbacks.push({ 'success': fn })
                }
                return this;
            },

            cancel: function (fn) {
                if (callbacks.length > 0) {
                    Ext.apply(callbacks[0], { 'failure': fn });
                }
                else {
                    callbacks.push({ 'failure': fn });
                }
                return this;
            },

            no: function (fn) {
                return this.cancel(fn);
            },

            yes: function (fn) {
                return this.ok(fn);
            },

            success: function (fn) {
                return this.ok(fn);
            },

            failure: function (fn) {
                return this.cancel(fn);
            }
        };
    };

    root.Promise = Promise;

}).call(this);