	
var SlideBox = new Class({
	Implements: Options,
	
	container: undefined,
	
	bulletsContainer: undefined,
	bulletsController: undefined,
	
	animations: [],
	animationsList: [],	
	
	nodes: [],
	pointer: 0,
	onTransition: false,
	
	options: {
		duration:	 		700,
		transition:			'sine:in:out',
		wait: 				3000,
		animation: 			'FromTop',
		bullets:			false,
		arrows: 			false,
	},
	
	initialize: function(slideContainerID, options)
	{
        this.setOptions(options);
        this.setupContainer(slideContainerID);
        this.getNodes();
     //   this.createControls();
        this.start();
    },
    
    setupContainer: function(slideContainerID)
    {
    	this.container = $(slideContainerID);
    	
    	this.container.setStyles({
    		'position':'relative',
    		'overflow':'hidden',
    	});
    },
    
    start: function()
    {
    	this.nodes.each(function(node){
    		node.hide();
    	})
    	//if(this.options.bullets) this.bulletsController.setActive(0)
    	this.currentNode().show();
    	this.startTimer();
    },
    
    doAnimation: function(nodeIndex)
    { 
    	var onSameNode = (this.pointer == nodeIndex);
    	var onlyHasOneNode = (this.nodes.length == 1);
    	
    	if(onSameNode || onlyHasOneNode) return;
    	
		//this.setActiveBullet();
		this.onTransition = true;
		
		var callBackFunction = this.onAnimationComplete.bind(this);
		this.getAnimation().animate(this.currentNode(), this.nextNode(nodeIndex), callBackFunction);
    },
    
    currentNode: function() 
    {
    	return this.nodes[this.pointer];
    },
    
    nextNode: function(nodeIndex)
    {
    	var nextNode = this.pointer + 1;
    	
    	if(nodeIndex != undefined)
    	{
    		nextNode = nodeIndex;
    	}
    	
    	var isOutOfRigthBound = (nextNode > (this.nodes.length - 1));
    	
    	if(isOutOfRigthBound)
    	{
    		nextNode = 0;
    	}
    	
    	return this.getNodeAt(nextNode);
    },
    
    getNodeAt: function(nodeIndex)
    {
    	this.pointer = nodeIndex;
    	return this.nodes[nodeIndex];
    },
    
    
   /* previousNode: function()
    {
    	var previousNode = this.pointer - 1;
    	var isFirstNode = (previousNode == -1);
    	
    	if(isFirstNode)
    	{
    		previousNode = (this.nodes.length - 1);
    	}
    	
    	return this.nodes[previousNode];
    },*/
    
    /*setActiveBullet: function()
    {
    	if(!this.options.bullets) return;
    	var bulletIndex = this.nextNode;
    	//this.bulletsController.setActive(bulletIndex);
    },*/
    
    jumpToNode: function(nodeIndex)
    {
    	if(this.onTransition) return;
    	this.stopTimer();
    	this.doAnimation(nodeIndex);
    },
    
   /* goNextNode: function()
    {
    	this.jumpToNode(this.nextNode);
    },
    
    goPreviousNode: function()
    {
    	var previousNode = this.getPreviousNode(this.currentNode);
    	this.jumpToNode(previousNode);
    },*/
    
    startTimer: function()
    {
    	this.transition = function() {this.doAnimation();}.delay(this.options.wait, this);
    },
    
    stopTimer: function()
    {
    	clearTimeout(this.transition);
    },
    
    onAnimationComplete: function()
    {
    	this.onTransition = false;
    	this.startTimer();
    },
    
    getNodes: function()
    {
    	var slides = this.container.getChildren();
    	slides.each(this.addNode.bind(this));
    },
    
    addNode: function(slide)
    {
		var newNode = new Node(slide, this.options);
		this.nodes.push(newNode);
    },
            
    /*createControls: function()
    {
    	if(this.options.bullets)this.bulletsController = new BulletsController(this);
    	if(this.options.arrows)this.createArrows();
    },*/
    
   /* createArrows: function()
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
    },*/
    
   /* getNextNode: function(nodeIndex)
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
    },*/
    
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