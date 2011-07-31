var Node = new Class({
	
	Implements: Options,
	
	DOMElement: undefined,
	morpher: undefined,
	
	options: {
		duration:	 		700,
		transition:			'sine:in:out',
	},
	
	initialize: function(aListElement, options)
	{
		this.setOptions(options);
		
		this.DOMElement = aListElement;
		this.setUpDOMElement();
		this.setUpMorph();
		
	},
	
	morph: function(styles)
	{
		this.morpher.start(styles);
	},
	
	setStyle: function(property, value)
	{
		this.DOMElement.setStyle(property, value);
	},
	
	setStyles: function(styles)
	{
		this.DOMElement.setStyles(styles);
	},
	
	hide: function()
	{
		this.DOMElement.setStyle('opacity', 0);
	},
	
	show: function()
	{
		this.DOMElement.setStyle('opacity', 1);
	},
	
	setUpDOMElement: function()
	{
		this.DOMElement.setStyles({
			position:'absolute',
			top:0,
			left:0
		})
	},
	
	setUpMorph: function()
	{
		this.morpher = new Fx.Morph(this.DOMElement, {duration:this.options.duration, transition: this.options.transition});
	},
	
	getParent: function()
	{
		return this.DOMElement.getParent();
	}
})