window.addEvent('load', function(){
	slider = new SlideBox("myList");
	
	slider.addPlugin(new Bullets());
	slider.addPlugin(new Arrows());
	
	slider.start();
	
	var animations = [
	                  new FadeAnimation(slider.options),
	            //      new RightFadeAnimation(slider.options),
	                  new RightToLeftAnimation(slider.options),
	            //      new UpAndBottomColumns(slider.options),
	            //      new LeftAndRightRowsAnimation(slider.options),
	                  new FromRightAnimation(slider.options),
	                  new FromLeftAnimation(slider.options),
	                  new FromTopAnimation(slider.options),
	                  new FromBottomAnimation(slider.options),
	            //      new RandomCellFadeOutAnimation(slider.options),
	           //       new RandomCellTransitionAnimation(slider.options)
	                  ];
	
	animations.each(function(animation)
	{
		slider.addAnimation(animation);
		addAnimationButtonToIndex(animation);
	})
	
	function addAnimationButtonToIndex(animation)
	{
		var animationName = animation.getName();
		var li = new Element('li').inject('animations')
		var a = new Element('a',{
			href:'#',
			text:animationName
		}).inject(li);
		
		a.addEvent('click', function(event){
			event.preventDefault();
			slider.options.animation = animationName;
		})
	}
})