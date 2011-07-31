var FromBottomAnimation = new Class({
	
	Extends: Animation,
	
	name: 'FromBottom',
	
	extendedSetup: function()
	{
		this.endPanel.set('morph', {onComplete: this.animationCompleted.bind(this)});
		this.endPanel.setStyle('box-shadow', 'rgb(70,70,70) 0px -10px 10px');
	},
	
	doTransition: function()
	{
		var height = this.options.height
		this.endNode.captionPanel.setStyle('z-index', 2);
		this.startNode.captionPanel.setStyle('z-index', 2);
		this.switchCaptionsWithFade();
		
		this.showStartPanel();
		this.showEndPanel();
		this.endPanel.setStyle('z-index', 1);
		this.endPanel.setStyle('top', height) 
		this.endPanel.morph({'top':0});
		
	},
	
	onComplete: function()
	{
		this.endPanel.setStyle('z-index', 0);
		this.endNode.captionPanel.setStyle('z-index', 0);
		this.startNode.captionPanel.setStyle('z-index', 0);
	}
	
}) 
