Ext.define('Erp.view.home.ActivitySidebar', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.activtysidebar',

	requires: [
		'Erp.view.home.UserList'
	],

	initComponent: function(argument) {
		var me = this;

		Ext.apply(me, {
			activeTab: 0,
			activeItem: 0,
			items: [
				{
					title: '&nbsp',
					iconCls: 'user',
					iconAlign: 'center',
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
							html: 'Pending Delivery',
							style: 'line-height: 1.42857143;color: #58666e;font-size: 14px',
							margin: '0 0 15 0'
                        },
						{
							xtype: 'dataview',
							flex: 1,
							cls: 'x-activity-timeline x-border-left x-margin-left',
							itemSelector: '.x-timline-item ',
							tpl: [
								'<tpl for=".">',
                                '   <div class="x-timline-item {type}">',
                                '       <div class="x-margin-left">',
                                '           <div class="x-text-muted">{time}</div>',
                                '           <p><a href="" class="x-text-info">{name}</a> {comment} </p>',
                                '       </div>',
                                '   </div>',
                                '</tpl>'
                            ],
							store: {
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
									},
									{
										name: 'Jessi',
										time: 'Thu, 10 Mar',
										comment: 'Trip to the moon',
										type: ''
									},
									{
										name: 'Jessi',
										time: 'Sat, 5 Mar',
										comment: 'Prepare for presentation',
										type: 'x-border-primary'
                                    },
									{
										name: '',
										time: 'Sun, 11 Feb',
										comment: ' assign you a task ',
										type: 'x-border-info'
                                    },
                                ]
							}
                        },
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								pack: 'center'
							},
							cls: 'x-text-center',
							items: [
								{
									xtype: 'button',
									text: 'More Stories',
									margin: '10 10 10 10',
									cls: 'x-btn-primary'
								}
                            ]
                        }
                    ]
                },
				{
					title: '&nbsp;',
					iconCls: 'comment',
					iconAlign: 'center',
					xtype: 'userlist'
                },
				{
					title: '&nbsp;',
					iconCls: 'note_go',
					iconAlign: 'center'
                }
            ]
		});

		me.callParent(argument);
	}

});
