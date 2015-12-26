Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': baseUrl + '/ext',
        'DeftJs': baseUrl + '/packages/deft',
        'Erp': baseUrl + '/app',
        'Ext.ux': baseUrl + '/ext/src/ux'
    }
});

Ext.syncRequire([
    'Deft.mixin.Injectable',
    'Deft.mixin.Controllable'
]);

Ext.application({
    name: 'Erp',
    appFolder: baseUrl + '/app',
    extend: 'Erp.Application'
});