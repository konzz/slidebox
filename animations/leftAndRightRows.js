var LeftAndRightRowsAnimation = new Class({
	
	Extends: Animation,
	
	name: 'LeftAndRightRows',
	
	extendedSetup: function()
	{
		this.createRows(this.options.rows, this.endPanel);
		this.rows[0].set('morph', {onComplete: this.animationCompleted.bind(this)});
	},
	
	doTransition: function()
	{
		this.endPanelStyles = this.endPanel.getStyles('background-color','background-image');
		this.endPanel.setStyles({'background-color':'transparent','background-image':'none'})
		
		this.endNode.captionPanel.setStyle('z-index', 2);
		this.startNode.captionPanel.setStyle('z-index', 2);
		this.switchCaptionsWithFade();
		
		this.showStartPanel();
		this.showEndPanel();
		
		this.setRowsInPosition();
		
		this.endPanel.setStyle('z-index', 1)
		this.moveRows(this.endPanelStyles);
		
	},
	
	moveRows: function()
	{
		this.rows.each(function(row){
			row.setStyles(this.endPanelStyles);
			row.morph({'left':'0'});
		}.bind(this))
	},
	
	onComplete: function()
	{
		this.endPanel.setStyles(this.endPanelStyles);
		this.endPanel.setStyle('z-index', 0)
		this.endNode.captionPanel.setStyle('z-index', 0);
		this.startNode.captionPanel.setStyle('z-index', 0);
	},
	
	setRowsInPosition: function()
	{
		var leftRow = false;
		numberOfRows = this.rows.length
		for(currentRow = 0; currentRow < numberOfRows; currentRow++)
		{
			colWidth = this.rows[currentRow].getStyle('width').toInt();
			if(!leftRow)
			{
				this.rows[currentRow].setStyle('left', colWidth);
				leftRow = true;
				continue;
			}
			
			if(leftRow)
			{
				this.rows[currentRow].setStyle('left', -colWidth);
				leftRow = false;
				continue;
			}
		}
	}
	
}) 
