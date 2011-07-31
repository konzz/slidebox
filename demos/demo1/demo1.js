window.addEvent('load', function(){
	var slider = new SlideBox("slide1",{
		width:150,
		height:150,
		wait:	3000,
		bullets: false,
		arrows: false,
		animation: ['FromBottom', 'FromLeft', 'FromRight', 'FromTop'],
	})
	
	slider.addAnimation(new FromRightAnimation(slider.options));
	slider.addAnimation(new FromLeftAnimation(slider.options));
	slider.addAnimation(new FromTopAnimation(slider.options));
	slider.addAnimation(new FromBottomAnimation(slider.options));
	slider.addAnimation(new UpAndBottomColumns(slider.options));
	
	var slider = new SlideBox("slide2",{
		width:150,
		height:150,
		wait:	3000,
		bullets: false,
		arrows: false,
		animation: ['FromBottom', 'FromLeft', 'FromRight', 'FromTop'],
	})
	
	slider.addAnimation(new FromRightAnimation(slider.options));
	slider.addAnimation(new FromLeftAnimation(slider.options));
	slider.addAnimation(new FromTopAnimation(slider.options));
	slider.addAnimation(new FromBottomAnimation(slider.options));
	
	var slider = new SlideBox("slide3",{
		width:150,
		height:150,
		wait:	3000,
		bullets: false,
		arrows: false,
		animation: ['FromBottom', 'FromLeft', 'FromRight', 'FromTop'],
	})
	
	slider.addAnimation(new FromRightAnimation(slider.options));
	slider.addAnimation(new FromLeftAnimation(slider.options));
	slider.addAnimation(new FromTopAnimation(slider.options));
	slider.addAnimation(new FromBottomAnimation(slider.options));
	
	var slider = new SlideBox("slide4",{
		width:150,
		height:150,
		wait:	3000,
		bullets: false,
		arrows: false,
		animation: ['FromBottom', 'FromLeft', 'FromRight', 'FromTop'],
	})
	
	slider.addAnimation(new FromRightAnimation(slider.options));
	slider.addAnimation(new FromLeftAnimation(slider.options));
	slider.addAnimation(new FromTopAnimation(slider.options));
	slider.addAnimation(new FromBottomAnimation(slider.options));
	
	var slider = new SlideBox("slide5",{
		width:150,
		height:150,
		wait:	3000,
		bullets: false,
		arrows: false,
		animation: ['FromBottom', 'FromLeft', 'FromRight', 'FromTop'],
	})
	
	slider.addAnimation(new FromRightAnimation(slider.options));
	slider.addAnimation(new FromLeftAnimation(slider.options));
	slider.addAnimation(new FromTopAnimation(slider.options));
	slider.addAnimation(new FromBottomAnimation(slider.options));
	
	var slider = new SlideBox("slide6",{
		width:150,
		height:150,
		wait:	3000,
		bullets: false,
		arrows: false,
		animation: ['FromBottom', 'FromLeft', 'FromRight', 'FromTop'],
	})
	
	slider.addAnimation(new FromRightAnimation(slider.options));
	slider.addAnimation(new FromLeftAnimation(slider.options));
	slider.addAnimation(new FromTopAnimation(slider.options));
	slider.addAnimation(new FromBottomAnimation(slider.options));
})