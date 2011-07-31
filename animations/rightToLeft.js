var RightToLeftAnimation = new Class({
	
	Extends: Animation,
	
	name: 'RightToLeft',
	
	doTransition: function()
	{
		this.startNode.morpher.onComplete = this.animationCompleted.bind(this);
		var width = this.startNode.DOMElement.getParent().getDimensions().width
		
		this.startNode.show();
		this.endNode.show();
		
		this.endNode.setStyle('left', width) 
		
		this.endNode.morph({'left':0});
		
		this.startNode.morph({'left':-width});
	},
	
	onComplete: function()
	{
		this.startNode.setStyles({'left':0}) 
		this.startNode.hide();
		this.startNode.setUpMorph();
	}
	
}) 
