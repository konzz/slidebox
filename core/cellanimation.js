var CellAnimation = new Class({
	
	Extends: Animation,
	
	name: 'cellbasic',
	
	createColumns: function(numberOfColumns, container)
	{
		var containerWidth = container.getStyle('width').toInt()
		var containerHeight = container.getStyle('height').toInt()
		
		var colWidth = Math.floor((containerWidth / numberOfColumns));
		var colHeight = containerHeight;
		var missingWidthPxels = (containerWidth - (colWidth * numberOfColumns));
		
		var topPosition = container.getStyle('top').toInt();
		
		var leftPosition = 0;
		for(var endPanelcolumnsCreated = 0; endPanelcolumnsCreated < this.options.columns; endPanelcolumnsCreated ++)
		{
			var width = colWidth;
			if(missingWidthPxels > 0)
			{
				width++;
				missingWidthPxels--;
			}
			var column = new Element('div', {
				'class':'slidercolumn', 
				styles:{
					'width':width,
					'height':colHeight,
					'position':'absolute',
					'left':leftPosition,
					'background-position': (-leftPosition) + 'px '+ (-topPosition) + 'px'
				}
			}).inject(container);
					
			leftPosition = leftPosition + width;
			this.setMorph(column);
			this.columns.push(column)
		}
	},
	
	createRows: function(numberOfRows, container)
	{
		var containerWidth = container.getStyle('width').toInt()
		var containerHeight = container.getStyle('height').toInt()
		
		var rowHeight = Math.floor((containerHeight / numberOfRows));
		var rowWidth = containerWidth;
		var missingWidthPxels = (containerHeight - (rowHeight * numberOfRows));
		
		var leftPosition = container.getStyle('left').toInt();
		var topPosition = 0;
		for(var endPanelcolumnsCreated = 0; endPanelcolumnsCreated < numberOfRows; endPanelcolumnsCreated ++)
		{
			var height = rowHeight;
			if(missingWidthPxels > 0)
			{
				height++;
				missingWidthPxels--;
			}
			var column = new Element('div', {
				'class':'sliderrow', 
				styles:{
					'width':rowWidth,
					'height':height,
					'position':'absolute',
					'top':topPosition,
					'background-position': (-leftPosition) + 'px '+ (-topPosition) + 'px'
				}
			}).inject(container);
					
			topPosition = topPosition + height;
			this.setMorph(column);
			this.rows.push(column)
		}
	},
}) 
