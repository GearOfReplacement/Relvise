import "./styles/style.sass";

const menuBurger = document.querySelector('.menu-burger');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const body = document.querySelector('body');

menuBurger.addEventListener('click', () => {
	menuBurger.classList.toggle('menu-burger_active');
	nav.classList.toggle('nav_active');
	header.classList.toggle('header_touched');
	body.classList.toggle('body_hidden')
});

window.addEventListener('scroll', () => {
	console.log('scrollY ', scrollY);
	if(scrollY > 80) header.classList.add('header_scrolled');
	else header.classList.remove('header_scrolled');
});