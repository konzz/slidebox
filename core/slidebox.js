	
var SlideBox = new Class({
	Implements: Options,
	
	nodes: [],
	conatiner: undefined,
	
	bulletsContainer: undefined,
	
	animations: [],
	animationsList: [],
	
	bulletsController: undefined,
	
	currentNode: 0,
	nextNode: undefined,
	onTransition: false,
	
	options: {
		duration:	 		700,
		transition:			'sine:in:out',
		wait: 				3000,
		animation: 			'FromTop',
		columns:			8,
		rows:				5,
		bullets:			false,
		arrows: 			false,
	},
	
	initialize: function(listID, options){
        this.setOptions(options);
        this.setupContainer(listID);
        this.getNodes(listID);
     //   this.createControls();
        this.startSetup();
    },
    
    startSetup: function()
    {
    	this.nodes.each(function(node){
    		node.hide();
    	})
    	//if(this.options.bullets) this.bulletsController.setActive(0)
    	this.nodes[0].show();
    	this.nextNode = this.getNextNode(this.currentNode);
    	this.startTransition();
    },
    
    doAnimation: function()
    {
    	if(this.currentNode == this.nextNode) return;
    	var animation = this.getAnimation();
    	if(animation)
    	{
    		this.setActiveBullet();
    		this.onTransition = true;
    		var startNode = this.nodes[this.currentNode];
    		var endNode = this.nodes[this.nextNode];
    		var callBackFunction = this.onAnimationComplete.bind(this);
    		animation.animate(startNode, endNode, callBackFunction);
    	}
    },
    
    setActiveBullet: function()
    {
    	if(!this.options.bullets) return;
    	var bulletIndex = this.nextNode;
    	//this.bulletsController.setActive(bulletIndex);
    },
    
    jumpToNode: function(index)
    {
    	if(this.onTransition) return;
    	if(index == this.currentNode) return;
    	this.stopTransition();
    	this.nextNode = index;
    	this.doAnimation();
    },
    
    goNextNode: function()
    {
    	this.jumpToNode(this.nextNode);
    },
    
    goPreviousNode: function()
    {
    	var previousNode = this.getPreviousNode(this.currentNode);
    	this.jumpToNode(previousNode);
    },
    
    startTransition: function()
    {
    	this.transition = this.doAnimation.delay(this.options.wait,this);
    },
    
    stopTransition: function()
    {
    	clearTimeout(this.transition);
    },
    
    onAnimationComplete: function()
    {
    	this.setNextNode();
    	this.startTransition();
    },
    
    setNextNode: function()
    {
    	this.currentNode = this.nextNode;
    	this.nextNode = this.getNextNode(this.currentNode);
    	this.onTransition = false;
    },
    
    getNodes: function(listID)
    {
    	var listElements = $(listID).getChildren();
    	listElements.each(this.addNode.bind(this));
    },
    
    addNode: function(aListElement)
    {
		var newNode = new Node(aListElement, this.options);
		this.nodes.push(newNode);
    },
    
    setupContainer: function(listID)
    {
    	this.container = $(listID);
    	
    	this.container.setStyles({
    		'position':'relative',
    		'overflow':'hidden',
    	});
    },
            
    createControls: function()
    {
    	if(this.options.bullets)this.bulletsController = new BulletsController(this);
    	if(this.options.arrows)this.createArrows();
    },
    
    createArrows: function()
    {
    	this.createLeftArrow();
    	this.createRightArrow();
    	
    	this.leftArrow.inject(this.container);
    	this.rightArrow.inject(this.container);
    	this.setArrowsTop();
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
    		this.goPreviousNode();
    	}.bind(this))
    	
    	this.rightArrow.addEvent('click', function(event){
    		event.preventDefault();
    		this.goNextNode();
    	}.bind(this))
    	
    	this.container.addEvent('mouseenter', function(){
    		this.leftArrow.fade('in');
    		this.rightArrow.fade('in');
    	}.bind(this))
    	this.container.addEvent('mouseleave', function(){
    		this.leftArrow.fade('out');
    		this.rightArrow.fade('out');
    	}.bind(this))
    },
    
    setArrowsTop: function()
    {
    	var height = this.options.height;
    	var arrowsHeight = this.leftArrow.getScrollSize().y;
    	var top = ((height/2) - (arrowsHeight/2));
    	this.leftArrow.setStyle('top', top);
    	this.rightArrow.setStyle('top', top);
    },
    
    getNextNode: function(nodeIndex)
    {
    	var isLastNode = (nodeIndex == (this.nodes.length - 1));
    	if(isLastNode)
    	{
    		return 0;
    	}
    	return nodeIndex +1;
    },
    
    getPreviousNode: function(nodeIndex)
    {
    	var isFirstNode = nodeIndex == 0;
    	if(isFirstNode)
    	{
    		return this.nodes.length -1;
    	}
    	return nodeIndex -1;
    },
    
    getAnimation: function()
    {
    	var animationName = this.options.animation;
    	if(animationName == 'random') return this.getRandomAnimation();
    	if(animationName instanceof Array) animationName = animationName.getRandom();
    	if(this.animations[animationName] != undefined) return this.animations[animationName];
    	return new Animation(this.options);
    },
    
    getRandomAnimation: function()
    {
    	var animationName = this.animationsList.getRandom();
    	return this.animations[animationName];
    },
    
    addAnimation: function(animation)
    {
    	animation.setOptions(this.options);
    	var animationName = animation.getName()
    	this.animationsList.push(animationName);
    	this.animations[animationName] = animation;
    }
    
})