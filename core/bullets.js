var BulletsController = new Class({
	
	bullets:[],
	
	activeBullet: 0,
	
	initialize: function(slidebox)
	{
		this.slidebox = slidebox;
		this.createBullets()
	},
	
	createBullets: function()
    {
    	this.createBulletsContainer();
    	this.slidebox.nodes.each(this.addBullet.bind(this));
    	this.setBulletsListPosition();
    },
	    
    createBulletsContainer: function()
    {
    	this.bulletsContainer = new Element('ul', {
			'class':'slidebox-bullets',
			styles:{
			'z-index':10,
			'position':'absolute',
			}
		}).inject(this.slidebox.container);
	},
	
	addBullet: function(node, index)
	{
		bullet = this.createBullet();
		bullet.addEvent('click', function(event){
			event.preventDefault();
			this.slidebox.jumpToNode(index)
		}.bind(this))
		this.bullets.push(bullet);
	},
	
	createBullet: function()
	{
		var bulletli = new Element('li', {'class':'slidebox-bullet'}).inject(this.bulletsContainer);
		return new Element('a', {'href':'#'}).inject(bulletli);
	},
	
	setBulletsListPosition: function()
	{
		var top = this.slidebox.options.height + 20;
		var listWidth = this.bulletsContainer.getScrollSize().x;
		var width = this.slidebox.options.width;
		var left = ((width - listWidth) /2 )
		this.bulletsContainer.setStyles({'top':top,'left':left,'margin':'0px','padding':'0px'});
	},
	
	setActive: function(index)
	{
		this.bullets[this.activeBullet].removeClass('active');
		this.bullets[index].addClass('active');
		this.activeBullet = index;
	}
	
})