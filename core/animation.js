var Animation = new Class({
	Implements: Options,
	
	name: "basic",
	
	columns: [],
	rows: [],
	
	options: {
		width:				700,
		height:				300,
		duration:	 		700,
		transition:			'sine:in:out',
		columns:			8,
		rows:				5
	},

	initialize: function(options)
	{
		this.setOptions(options);
		this.extendedSetup();
	},

	animate: function(startNode, endNode, callBackFunction)
	{
		this.startNode = startNode;
		this.endNode = endNode;
		this.callBackFunction = callBackFunction;
		
		this.doTransition();
	},
	
	animationCompleted: function()
	{
		this.onComplete();
		this.callBackFunction();
	},
	
	/////EXTEND FUNCTIONS /////
	
	extendedSetup: function()
	{
		
	},
	
	onComplete: function()
	{
		
	},
	
	addStylesToStartPanel: function(startBackgroundStyles)
	{
		this.startPanel.setStyles(startBackgroundStyles);
	},
	
	addStylesToEndPanel: function(endBackgroundStyles)
	{
		this.endPanel.setStyles(endBackgroundStyles);
	},
	
	doTransition: function()
	{
		this.startNode.hide()
		this.endNode.show();
		
		this.animationCompleted();
	},
	
		
	getName: function()
	{
		return this.name;
	},
	
	setMorph: function(element)
	{
		element.set('morph',{duration:this.options.duration, transition: this.options.transition});
	}
})