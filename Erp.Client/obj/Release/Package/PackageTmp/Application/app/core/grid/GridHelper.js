/**
 * @class
 * @extend Ext.Base
 */
Ext.define('Erp.core.grid.GridHelper', {
    extend: 'Ext.Base',

    /**
     * @param {Ext.Button} sender
     * @param {Ext.EventObject} evt
     * @return
     */
    deleteGridRow: function (sender, evt) {
        var self = this,
          win = sender.up('window'),
          gridName = sender.actionAttachedTo || undefined;

        if (!gridName) {
            throw new Error('Grid name is  not defined with the button, ' +
                'please  specify actionAttachedTo: gridName property on the button');
            return;
        }

        var grid = win.down('abstractgrid[name=' + gridName + ']'),
            selection = grid.getSelectionModel().getSelection();
        if (selection && selection.length > 0) {
            grid.deleteRecord(selection[0], true);
        }
    },

    /**
     * @param {Ext.Button} sender
     * @param {Ext.EventObject} evt
     * @return
     */
    deleteGridRow: function (sender, evt) {
        var self = this,
          win = sender.up('window'),
          gridName = sender.actionAttachedTo || undefined;

        if (!gridName) {
            throw new Error('Grid name is  not defined with the button, ' +
                'please  specify actionAttachedTo: gridName property on the button');
            return;
        }

        var grid = win.down('abstractgrid[name=' + gridName + ']');
        grid.initializeInsert();
    }
});