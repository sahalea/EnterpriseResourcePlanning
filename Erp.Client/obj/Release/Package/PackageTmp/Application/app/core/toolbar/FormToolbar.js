Ext.define('Erp.core.toolbar.FormToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.app-form-toolbar',


    items: [
        {
            xtype: 'tbfill'
        },
        {
            text: 'List',
            iconCls: 'application_view_columns',
            action: 'list'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Add',
            action: 'add',
            iconCls: 'add'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Edit',
            action: 'edit',
            iconCls: 'application_edit'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Save',
            action: 'save',
            iconCls: 'disk'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Cancel',
            action: 'cancel',
            iconCls: 'cancel'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Delete',
            action: 'delete',
            iconCls: 'delete'
        },
        {
            xtype: 'tbseparator'
        },
        {
            text: 'Print',
            action: 'print',
            iconCls: 'printer'
        }
    ]
});