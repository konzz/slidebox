var RandomCellFadeOutAnimation = new Class({
	
	Extends: Animation,
	
	name: 'RandomCellFadeOut',
	
	fadedRows: [],
	
	periodicalMiliSecs: 16,
	
	extendedSetup: function()
	{
		this.createColumns(this.options.columns, this.startPanel);
		this.columns.each(function(column){
			this.createRows(this.options.rows, column);
		}.bind(this));
		
		this.duration = (this.options.duration - (this.rows.length * this.periodicalMiliSecs));
		$$(this.rows).set("morph", {duration:this.duration});
	},
	
	doTransition: function()
	{
		this.startPanelStyles = this.startPanel.getStyles('background-color','background-image');
		this.startPanel.setStyles({'background-color':'transparent','background-image':'none'})
		$$(this.rows).setStyles(this.startPanelStyles);
		
		this.endNode.captionPanel.setStyle('z-index', 2);
		this.startNode.captionPanel.setStyle('z-index', 2);
		this.switchCaptionsWithFade();
		
		$$(this.rows).setStyle('opacity','1');
		this.startPanel.setStyle('z-index', 1)
		
		this.periodical = this.fadeRandomCell.periodical(this.periodicalMiliSecs, this);
	},
	
	fadeRandomCell: function()
	{
		if(this.rows.length == 1)
		{
			var lastCell = this.rows[0];
			clearInterval(this.periodical);
			this.fadedRows.push(lastCell);
			
			var myLastMorph = new Fx.Morph(lastCell,{duation:this.duration,onComplete: this.animationCompleted.bind(this)})
			myLastMorph.start({'opacity':'0'});
			
			this.rows.erase(lastCell);
			return
		}
		var randomCell = this.rows.getRandom();
		this.fadedRows.push(randomCell);
		randomCell.morph({'opacity':'0'});
		this.rows.erase(randomCell);
	},
	
	onComplete: function()
	{
		this.startPanel.setStyles(this.startPanelStyles);
		this.startPanel.setStyle('z-index', 0)
		this.endNode.captionPanel.setStyle('z-index', 0);
		this.startNode.captionPanel.setStyle('z-index', 0);
	
		this.rows = Array.clone(this.fadedRows);
		this.fadedRows.empty();
	}
	
}) 
