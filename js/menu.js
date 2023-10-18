$(document).ready(function(){
    var burger = $('.btn');
    var menu = $('.full-menu');
    var navItems =$('.nav__item');
    
    burger.click(function(){
      burger.toggleClass('btn--open');
      menu.toggleClass('menu--open');
    });
    
    navItems.hover(function(){
      navItems.not($(this)).toggleClass('nav__item--hover');
    });
  });
  