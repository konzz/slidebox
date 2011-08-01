var Bullets = new Class({
	
	bullets:[],
	
	activeBullet: 0,
	
	setSlider: function(slider)
	{
		this.slidebox = slider;
		this.createBullets()
	},
	
	createBullets: function()
    {
    	this.createBulletsContainer();
    	this.slidebox.nodes.each(this.addBullet.bind(this));
    },
	    
    createBulletsContainer: function()
    {
    	this.bulletsContainer = new Element('ul', {
			'id':'slidebox-bullets'}).inject(this.slidebox.container, 'after');
    	var wrapper = new Element("div", {'id':'bulletswrapper'}).wraps(this.bulletsContainer);
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
	
	setActive: function(index)
	{
		this.bullets[this.activeBullet].removeClass('active');
		this.bullets[index].addClass('active');
		this.activeBullet = index;
	},
	
	fireEvent: function(event, data)
	{
		if(event == "NODE_CHANGE_EVENT") this.setActive(data);
	}
	
})