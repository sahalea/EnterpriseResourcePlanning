Ext.defie('Erp.core.form.AbstractGridCombo', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.gridpicker',

    requires: [
        'Ext.grid.View',
        'Ext.grid.column.Column'
    ],

    enableKeyEvents: true,

    intitComponent: function () {
        var me = this;
        me.callParent(arguments);
    },

    createPicker: function () {
        picker = new Ext.create('Ext.grid.Panel', {
            floating: true,
            hidden: true,
            height: 150,
            minHeight: 150,
            minWidth: 400,
            width: 400,
            header: false,
            columns: [
                {
                    xtype: 'gridcolumn',
                    minWidth: 95,
                    width: 95,
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Name',
                    dataIndex: 'Name'
                }
            ]
        });
        return picker;
    }
});

//https://fiddle.sencha.com/#fiddle/2fb