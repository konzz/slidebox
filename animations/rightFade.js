var RightFadeAnimation = new Class({
	
	Extends: CellAnimation,
	
	name: 'RightFade',
	
	currentColumn:0,
	
	periodicalMiliSecs: 8,
	
	extendedSetup: function()
	{
		this.options.columns = 60;
		this.createColumns(this.options.columns, this.startPanel);
		this.columns[this.columns.length - 1].set('morph', {onComplete: this.animationCompleted.bind(this)});
		var duration = (this.options.duration - (this.options.columns * this.periodicalMiliSecs));
		$$(this.columns).set("morph", {duration:duration});
	},
	
	doTransition: function()
	{
		this.startPanelStyles = this.startPanel.getStyles('background-color','background-image');
		this.startPanel.setStyles({'background-color':'transparent','background-image':'none'});
		
		this.endNode.captionPanel.setStyle('z-index', 2);
		this.startNode.captionPanel.setStyle('z-index', 2);
		this.switchCaptionsWithFade();
		
		this.showEndPanel();
		
		$$(this.columns).setStyles(this.startPanelStyles);
		$$(this.columns).setStyle("opacity", 1);
		
		this.startPanel.setStyle('z-index', 10)
		this.periodical = this.fadeColumns.periodical(this.periodicalMiliSecs, this);
	},
	
	fadeColumns: function()
	{
		if(!$defined(this.columns[this.currentColumn]))
		{
			return;
		}
		
		this.columns[this.currentColumn].morph({"opacity": 0});
		this.currentColumn++;
	},
	
	onComplete: function()
	{
		if(this.periodical != undefined)
		{
			clearInterval(this.periodical);
		}
		this.currentColumn = 0;
		
		this.startPanel.setStyle('z-index', 0);
		
		this.endNode.captionPanel.setStyle('z-index', 0);
		this.startNode.captionPanel.setStyle('z-index', 0);
	}
})
