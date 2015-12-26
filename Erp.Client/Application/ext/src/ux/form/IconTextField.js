
Ext.define('Ext.ux.form.IconTextfield', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.icontext',

    initComponent: function () {
        Ext.apply(this, {

        });

        // call parent initComponent
        this.callParent(arguments);

    }, // end of function initComponent

    onRender: function (ct, position) {
        // call parent onRender
        this.callParent(arguments);

        // adjust styles
        this.bodyEl.applyStyles({ position: 'relative' });
        this.el.down('input.x-form-field').addCls('ux-icon-combo-input');

        // add div for icon
        this.icon = Ext.core.DomHelper.append(this.el.down('div.x-form-item-body'), {
            tag: 'div', style: 'position:absolute'
        });
    }, // end of function onRender

    setIconCls: function () {
        if (this.rendered) {
            this.icon.className = 'ux-icon-combo-icon ' + this.iconCls;
        } else {
            this.on('render', this.setIconCls, this, { single: true });
        }
    }, // end of function setIconCls

    setValue: function (value) {
        this.callParent(arguments);
        this.setIconCls();
    } // end of function setValue
});