var RandomCellTransitionAnimation = new Class({
	
	Extends: Animation,
	
	name: 'RandomCellTransition',
	
	movedRows: [],
	
	
	
	directions: ['top', 'bottom', 'left', 'right'],
	
	periodicalMiliSecs: 16,
	
	extendedSetup: function()
	{
		this.createColumns(this.options.columns, this.startPanel);
		this.addRows();
		
		this.rowWidth = this.rows[0].getStyle('width');
		this.rowsHeight = this.rows[0].getStyle('height');
	},
	
	addRows: function()
	{
		this.columns.each(function(column){
			this.createRows(this.options.rows, column);
		}.bind(this));
		
		this.duration = (this.options.duration - (this.rows.length * this.periodicalMiliSecs));
		this.rowWidth = this.rows[0].getStyle('width');
		this.rowsHeight = this.rows[0].getStyle('height');
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
		
		this.periodical = this.moveRandomCell.periodical(this.periodicalMiliSecs, this);
	},
	
	moveRandomCell: function()
	{
		if(this.rows.length == 1)
		{
			var lastCell = this.rows[0];
			var morph = this.getMorph(lastCell);
			clearInterval(this.periodical);
			this.movedRows.push(lastCell);
			var myLastMorph = new Fx.Morph(lastCell,{duation:this.duration ,onComplete: this.animationCompleted.bind(this)})
			myLastMorph.start(morph);
			
			this.rows.erase(lastCell);
			return
		}
		var randomCell = this.rows.getRandom();
		var morph = this.getMorph(randomCell);
		this.movedRows.push(randomCell);
		randomCell.morph(morph);
		this.rows.erase(randomCell);
	},
	
	getMorph: function(cell)
	{
		var direction = this.directions.getRandom();
		var morph = {'width':0};
		if(direction == 'top') var morph = {'height':0};
		if(direction == 'right') var morph = {'width':0, 'right':0};
		
		if(direction == 'bottom')
		{
			var bottom = cell.getStyle('top') - this.rowHeight;
			var morph = {'width':0, 'bottom':bottom};
		}
		
		return morph;
	},
	
	onComplete: function()
	{
		this.startPanel.setStyles(this.startPanelStyles);
		this.startPanel.setStyle('z-index', 0)
		this.endNode.captionPanel.setStyle('z-index', 0);
		this.startNode.captionPanel.setStyle('z-index', 0);
		$$(this.movedRows).dispose();
		this.addRows();
	}
	
}) 
