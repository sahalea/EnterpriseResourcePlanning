Ext.define('Erp.view.home.UserList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.userlist',

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			bodyStyle: {
				padding: '20px'
			},
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'box',
					html: 'Online Users',
					style: 'line-height: 1.42857143;color: #58666e;font-size: 14px',
					margin: '0 0 15 0'
				},
				{
					xtype: 'dataview',
					flex: 1,
					cls: 'x-user-list',
					store: this.getUserListStore(),
					itemSelector: 'div.x-user-list-item',
					tpl: [
						'<tpl for=".">',
						'	<div class="x-user-list-item">',
              			'		<a herf="" class="x-pull-left x-thumb-small x-avatar x-margin-right">',
                		'			<img src="//flatfull.com/themes/angulr/angular/img/a4.jpg" alt="..." class="x-img-circle">',
                		'			<i class="x-on x-border-white x-bottom"></i>',
              			'		</a>',
              			'		<div style="padding-bottom: 5px;">',
                		'			<div>',
                		'				<a href="">Chris Fox</a>',
                		'			</div>',
                		'			<small class="x-text-muted">Designer, Blogger</small>',
              			'		</div>',
            			'	</div>',
            			'</tpl>'
					]
				}
			]
		});

		me.callParent(arguments);
	},

	getUserListStore: function() {
		this.store = Ext.create('Ext.data.Store', {
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			},
			fields: ['name', 'time', 'comment', 'type'],
			data: [
				{
					name: 'Jessi',
					time: '5 minutes ago',
					comment: 'commented a post',
					type: ''
                },
				{
					name: 'Jessi',
					time: '11:30',
					comment: 'Join comference',
					type: 'x-border-primary'
                },
				{
					name: 'Jacob',
					time: '10:30',
					comment: 'Call to customer  and discuss the detail.',
					type: 'x-border-success'
                },
				{
					name: 'Jasim',
					time: '10:00',
					comment: 'Create tasks for the team',
					type: 'x-border-warning'
                },
				{
					name: 'Testing',
					time: 'Wed, 25 Mar',
					comment: 'Finished task ',
					type: 'x-border-info'
                }
            ]
		});
		return this.store;
	}
});
