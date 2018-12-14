var sliderBox = document.getElementById('slider-box');
var sliderUl = sliderBox.children[0].children[0];
var sliderLi = sliderUl.children;
var sliderBtn = document.getElementById('slider-btn');
var sliderOl = document.getElementById('slider-ol');
var imgWidth = sliderBox.children[0].offsetWidth;
var index = 0;
/*
 * 动态添加底部圆圈导航
 */
for(var i = 0; i < sliderLi.length; i++) {
	var tempSliderOl = document.createElement('li');
	sliderOl.appendChild(tempSliderOl);
	tempSliderOl.setAttribute('tabindex', i);
	//为每个导航圆点添加鼠标移动到上面时的事件
	tempSliderOl.onclick = function() {
		//去除掉上面的所有的class
		for(var j = 0; j < sliderOl.children.length; j++) {
			sliderOl.children[j].removeAttribute('class');
		}
		//当鼠标移动到当前圆点时为该圆点添加active的class
		this.className = "active";
		index = this.getAttribute('tabindex');
		animate(sliderUl, -index * imgWidth);
	}
}
//默认第一张图片第一个圆点
sliderOl.children[0].className = "active";
//将第一张图片复制到最后
sliderUl.appendChild(sliderUl.children[0].cloneNode(true));
/**
 * 自动播放
 */
var timeId = setInterval(onMouseClickRight, 3000);
/*
 * 鼠标移上去不动，放下继续循环
 */
sliderBox.onmouseover = function() {
	sliderBtn.style.display = "block";
	clearInterval(timeId);
}
sliderBox.onmouseout = function() {
	sliderBtn.style.display = "none";
	timeId = setInterval(onMouseClickRight, 3000);
}
/**
 * 左右按钮
 */
var btnPre = document.getElementById('btn-pre');
var btnNext = document.getElementById('btn-next');

btnNext.onclick = onMouseClickRight;
btnPre.onclick = onMouseClickLeft;
/*
 * 显示下一张图片的过程
 */
function onMouseClickRight() {
	//图片相对于index
	if(index == sliderLi.length - 1) { //在位于虚拟第一张
		index = 0;
		sliderUl.style.left = 0 + 'px';
	} else {
		sliderOl.children[index].className = ''; //去除掉前一个导航圆点的颜色
	}
	//底部圆点按钮相对于index
	if(index == sliderOl.children.length - 1) { //位于最后一张
		sliderOl.children[0].className = 'active';
		index++;
	} else {
		sliderOl.children[index].className = '';
		index++;
		sliderOl.children[index].className = 'active';
	}
	animate(sliderUl, -index * imgWidth);
}
/**
 * 显示上一张图片的过程
 */
function onMouseClickLeft() {
	if(index == 0) {
		index = sliderLi.length - 1;
		sliderUl.style.left = -index * imgWidth + 'px';
	}
	index--;
	animate(sliderUl, -index * imgWidth);
	//清除所有导航圆点的背景
	for(var i = 0; i < sliderOl.children.length; i++) {
		sliderOl.children[i].className = '';
	}
	sliderOl.children[index].className = 'active';
}
/*
 * 移动的动画
 * 使图片向左/右移动
 */
function animate(element, target) {
	clearInterval(element.timeId);
	element.timeId = setInterval(function() {
		var current = element.offsetLeft;
		//var  mmm=element.style.left;
		var step = 10;//每次移动10.
		step = current < target ? step : -step;
		current += step;
		if(Math.abs(current - target) > Math.abs(step)) {
			element.style.left = current + 'px';
		} else {
			clearInterval(element.timeId);
			element.style.left = target + 'px';
		}
	}, 10);
}
