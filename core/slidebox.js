	
var SlideBox = new Class({
	Implements: Options,
	
	NODE_CHANGE_EVENT: "NODE_CHANGE_EVENT",
	
	container: undefined,
	
	animations: [],
	animationsList: [],
	
	plugins: [],
	
	nodes: [],
	pointer: 0,
	onTransition: false,
	
	options: {
		duration:	 		700,
		transition:			'sine:in:out',
		wait: 				3000,
		animation: 			'FromTop',
		arrows: 			false,
	},
	
	initialize: function(slideContainerID, options)
	{
        this.setOptions(options);
        this.setupContainer(slideContainerID);
        this.getNodes();
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
    	this.currentNode().show();
    	this.fireEvent(this.NODE_CHANGE_EVENT,  this.pointer);
    	this.startTimer();
    },
    
    doAnimation: function(nodeIndex)
    { 
    	if(nodeIndex == undefined)
    	{
    		var nodeIndex = this.nextNode();
    	}
    	
    	var onSameNode = (this.pointer == nodeIndex);
    	var onlyHasOneNode = (this.nodes.length == 1);
    	
    	if(onSameNode || onlyHasOneNode) return;
    	
    	var currentNode = this.currentNode();
    	var nextNode = this.goAndGetNodeAt(nodeIndex);
		
    	this.onTransition = true;
		
		var callBackFunction = this.onAnimationComplete.bind(this);
		this.getAnimation().animate(currentNode, nextNode, callBackFunction);
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
    	return nextNode;
    },
    
    previousNode: function()
    {
    	var previousNode = this.pointer - 1;
    	var isFirstNode = (previousNode == -1);
    	
    	if(isFirstNode)
    	{
    		previousNode = (this.nodes.length - 1);
    	}
    	
    	return previousNode;
    },
    
    getNodeAt: function(nodeIndex)
    {
    	return this.nodes[nodeIndex];
    },
    
    goAndGetNodeAt: function(nodeIndex)
    {
    	this.pointer = nodeIndex;
    	this.fireEvent(this.NODE_CHANGE_EVENT,  this.pointer);
    	return this.getNodeAt(nodeIndex);
    },
    
    fireEvent: function(event, data)
    {
    	this.plugins.each(function(plugin){
    		plugin.fireEvent(event, data);
    	})
    },
    
    jumpToNode: function(nodeIndex)
    {
    	if(this.onTransition) return;
    	this.stopTimer();
    	this.doAnimation(nodeIndex);
    },
    
    goNextNode: function()
    {
    	this.stopTimer();
    	this.doAnimation();
    },
    
    goPreviousNode: function()
    {
    	this.stopTimer();
    	var previousNode = this.previousNode();
    	this.doAnimation(previousNode);
    },
    
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
    
    addPlugin: function(plugin)
    {
    	plugin.setSlider(this);
    	this.plugins.push(plugin);
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