var Node = new Class({
	
	Implements: Options,
	
	DOMElement: undefined,
	panel: undefined,
	morpher: undefined,
	
	options: {
		duration:	 		700,
		transition:			'sine:in:out',
	},
	
	initialize: function(aListElement, options)
	{
		this.setOptions(options);
		
		this.DOMElement = aListElement;
		this.createPanel();
		this.setUpMorph();
	},
	
	morph: function(styles)
	{
		this.morpher.start(styles);
	},
	
	setStyle: function(property, value)
	{
		this.panel.setStyle(property, value);
	},
	
	setStyles: function(styles)
	{
		this.panel.setStyles(styles);
	},
	
	hide: function()
	{
		this.panel.setStyle('opacity', 0);
	},
	
	show: function()
	{
		this.panel.setStyle('opacity', 1);
	},
	
	setUpMorph: function()
	{
		this.morpher = new Fx.Morph(this.panel, {duration:this.options.duration, transition: this.options.transition});
	},
	
	createPanel: function()
	{
		width = this.DOMElement.getParent().getStyle('width');
		height = this.DOMElement.getParent().getStyle('height');
		this.panel = new Element('div',{
			'class':"nodewrapper",
			styles:{
				position:'absolute',
				top:0,
				left:0,
				'overflow':'hidden',
				'width':width,
				'height':height
			}
		}).wraps(this.DOMElement);
	},
	
	getParent: function()
	{
		return this.panel.getParent();
	}
})