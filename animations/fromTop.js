
var FromTopAnimation = new Class({
	
	Extends: Animation,
	
	name: 'FromTop',
	
	doTransition: function()
	{
		this.endNode.morpher.onComplete =  this.animationCompleted.bind(this);
		var height = this.startNode.getParent().getDimensions().height
		
		this.startNode.show();
		this.endNode.show();
		this.endNode.setStyle('z-index', 1);
		this.endNode.setStyle('top', -height) 
		this.endNode.morph({'top':0});
		
	},
	
	onComplete: function()
	{
		this.endNode.setStyle('z-index', 0);
		this.startNode.hide();
		this.endNode.setUpMorph();
	}
	
}) 

