var Arrows = new Class({
	
	slidebox: undefined,
	
	setSlider: function(slider)
	{
		this.slidebox = slider;
		this.createArrows()
	},
	
	 createArrows: function()
    {
    	this.createLeftArrow();
    	this.createRightArrow();
    	
    	this.leftArrow.inject(this.slidebox.container);
    	this.rightArrow.inject(this.slidebox.container);
    	this.addArrowEvents();
    },
    
    createLeftArrow: function()
    {
    	this.leftArrow = new Element('a',{
    		'class':'arrow leftarrow',
    		'href': '#',
    		styles:{
    			'position':'absolute',
    			'left':'20px',
    			'z-index':'2',
    			'opacity':0
    		}})
    },
    
    createRightArrow: function()
    {
    	this.rightArrow = new Element('a',{
    		'class':'arrow rightarrow',
    		'href': '#',
    		styles:{
    			'position':'absolute',
    			'right':'20px',
    			'z-index':'2',
    			'opacity':0
    		}})
    },
    
    addArrowEvents: function()
    {
    	this.leftArrow.addEvent('click', function(event){
    		event.preventDefault();
    		this.slidebox.goPreviousNode();
    	}.bind(this))
    	
    	this.rightArrow.addEvent('click', function(event){
    		event.preventDefault();
    		this.slidebox.goNextNode();
    	}.bind(this))
    	
    	this.slidebox.container.addEvent('mouseenter', function(){
    		this.leftArrow.fade('in');
    		this.rightArrow.fade('in');
    	}.bind(this))
    	this.slidebox.container.addEvent('mouseleave', function(){
    		this.leftArrow.fade('out');
    		this.rightArrow.fade('out');
    	}.bind(this))
    },
    
    fireEvent: function(event, data)
    {
    	
    }
})