var UpAndBottomColumns = new Class({
	
	Extends: Animation,
	
	name: 'UpAndBottomColumns',
	
	extendedSetup: function()
	{
		this.createColumns(this.options.columns, this.endPanel);
		this.columns[0].set('morph', {onComplete: this.animationCompleted.bind(this)});
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
		
		this.setColumnsInPosition();
		
		this.endPanel.setStyle('z-index', 1)
		this.moveColumns(this.endPanelStyles);
		
	},
	
	moveColumns: function()
	{
		this.columns.each(function(column){
			column.setStyles(this.endPanelStyles);
			column.morph({'top':'0'});
		}.bind(this))
	},
	
	onComplete: function()
	{
		this.endPanel.setStyles(this.endPanelStyles);
		this.endPanel.setStyle('z-index', 0)
		this.endNode.captionPanel.setStyle('z-index', 0);
		this.startNode.captionPanel.setStyle('z-index', 0);
	},
	
	setColumnsInPosition: function()
	{
		var topPositionColumn = false;
		numberOfColumns = this.columns.length
		for(currentColumn = 0; currentColumn < numberOfColumns; currentColumn++)
		{
			colHeight = this.columns[currentColumn].getStyle('height').toInt();
			if(!topPositionColumn)
			{
				this.columns[currentColumn].setStyle('top', -colHeight);
				topPositionColumn = true;
				continue;
			}
			
			if(topPositionColumn)
			{
				this.columns[currentColumn].setStyle('top', colHeight);
				topPositionColumn = false;
				continue;
			}
		}
	}
	
}) 
