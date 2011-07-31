var FromRightAnimation = new Class({
	
	Extends: Animation,
	
	name: 'FromRight',
	
	doTransition: function()
	{
		this.endNode.morpher.onComplete =  this.animationCompleted.bind(this);
		var width = this.startNode.getParent().getDimensions().width
		
		this.startNode.show();
		this.endNode.show();
		this.endNode.setStyle('z-index', 1);
		this.endNode.setStyle('left', width) 
		this.endNode.morph({'left':0});
		
	},
	
	onComplete: function()
	{
		this.endNode.setStyle('z-index', 0);
		this.startNode.hide();
		this.endNode.setUpMorph();
	}
	
}) 
