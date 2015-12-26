/**
 * @class ErpController
 * @extend Erp.controller.ErpController
 */
Ext.define('Erp.controller.ErpController', {
    extend: 'Ext.app.Controller',

   
    requires: [
           'Erp.core.list.AbstractList'
    ],

    mixins: {
        util: 'Erp.core.util.Util',
        formHelper: 'Erp.core.form.FormHelper',
        gridHelper: 'Erp.core.grid.GridHelper'
    },

    /**
     * initializes the Controller
     * @param {object} application
     * @return {void} null
     */
    init: function (application) {
        this.control({
            'button[action=graphbutton]': {
                click: this.graphButtonClicked
            },
            'menuitem[type=appmenu]': {
                click: this.graphButtonClicked
            }, 'abstractform': {
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
            },
            'button[action=saveButton]': {
                click: {
                    fn: this.mixins.formHelper.saveForm,
                    scope: this.mixins.formHelper
                }
            },
            'window app-form-toolbar > button[action=list]': {
                click: {
                    fn: this.mixins.formHelper.openList,
                    scope: this.mixins.formHelper
                }
            }
        });
    },

    /**
     * Graph button click event
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} event
     * @return {void} null
     */
    graphButtonClicked: function (button, event) {
        this.openWindow(button.className);
    },

    /**
     * Opens window with passed class name
     * @param {string} class name
     * @return {void} null
     */
    openWindow: function (className) {
        if (className) {
            var id = className.replace(/\./gi, '_');
            var cmp = Ext.getCmp(id);
            if (!cmp) {
                cmp = Ext.create(className, { id: id });
            }
            cmp.show();
        }
    }
});