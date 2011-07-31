
var FromTopAnimation = new Class({
	
	Extends: Animation,
	
	name: 'FromTop',
	
	doTransition: function()
	{
		this.endNode.setStyle('box-shadow', 'rgb(70,70,70) 10px 10px 10px');
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
		this.endNode.setStyle('box-shadow', 'none');
		this.startNode.hide();
		this.endNode.setUpMorph();
	}
	
}) 

