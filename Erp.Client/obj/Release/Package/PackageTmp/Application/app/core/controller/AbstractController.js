Ext.define('Erp.core.controller.AbstractController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Erp.core.list.AbstractList'
    ],

    mixins: {
        util: 'Erp.core.util.Util',
        formHelper: 'Erp.core.form.FormHelper',
        gridHelper: 'Erp.core.grid.GridHelper'
    },

    init: function () {

        var cfg = {
            'abstractform': {
                render: this.mixins.formHelper.onFormRender
            },
            'menuitem[type=app-menu-item]': {
                click: {
                    fn: this.mixins.util.openMenuTarget
                }
            },
            'window app-form-toolbar > button[action=add]': {
                click: {
                    fn: this.mixins.formHelper.initFormInsert,
                    scope: this.mixins.formHelper
                }
            },
            'window app-form-toolbar > button[action=cancel]': {
                click: {
                    fn: this.mixins.formHelper.cancelEdit,
                    scope: this.mixins.formHelper
                }
            },
            'window app-form-toolbar > button[action=save]': {
                click: {
                    fn: this.mixins.formHelper.saveForm,
                    scope: this.mixins.formHelper
                }
            },
            'window app-form-toolbar > button[action=edit]': {
                click: {
                    fn: this.mixins.formHelper.initFormEdit,
                    scope: this.mixins.formHelper
                }
            },
            'window app-form-toolbar > button[action=delete]': {
                click: {
                    fn: this.mixins.formHelper.deleteRecord,
                    scope: this.mixins.formHelper
                }
            },
            'window app-form-toolbar > button[action=list]': {
                click: {
                    fn: this.mixins.formHelper.openList,
                    scope: this.mixins.formHelper
                }
            },
            'window abstractcombo[name=lookupCombo]': {
                select: {
                    fn: this.mixins.formHelper.loadFormData,
                    scope: this.mixins.formHelper
                }
            },
            'window button[action=deleteGridRow]': {
                click: {
                    fn: this.mixins.gridHelper.deleteGridRow,
                    scope: this.mixins.gridHelper
                }
            },
            'window button[action=addGridRow]': {
                click: {
                    fn: this.mixins.gridHelper.addGridRow,
                    scope: this.mixins.gridHelper
                }
            }
        };

        this.control(cfg);
    }
});
