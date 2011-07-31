var FadeAnimation = new Class({
	
	Extends: Animation,
	
	name: 'Fade',
	
	doTransition: function()
	{
		this.endNode.morpher.onComplete =  this.animationCompleted.bind(this);
		this.startNode.morph({'opacity':0});
		this.endNode.morph({'opacity':1});
	},
	
	onComplete: function()
	{
		this.endNode.setUpMorph();
	}
}) 
