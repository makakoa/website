'use strict';

/* globals $ */

console.log('Hey thanks for checking out my page!');
var page = '#page1';

var renderPage = function(to) {
  if (page === to) {
    return;
  }
  $(page).fadeOut(function() {
    $(to).fadeIn();
    page = to;
  });
};

function toggleCollapse() {
}

function toggleMenu() {
  $('#menu').text($('#menu').text() ===  'Menu' ? 'Close' : 'Menu');
  $('.header').toggleClass('expanded');
}

$(document).ready(function() {
  $('#name').click(function() {
    $('body').addClass('open');
  });

  $('#collapse').click(function() {
    toggleMenu();
    toggleCollapse();
  });

  $('#name').click(function() {
    toggleMenu();
    renderPage('#page1');
  });

  $('#flybox').click(function() {
    toggleMenu();
    renderPage('#page2');
  });

  $('#enviz').click(function() {
    toggleMenu();
    renderPage('#page5');
  });

  $('#braincryption').click(function() {
    toggleMenu();
    renderPage('#page3');
  });

  $('#thecouncil').click(function() {
    toggleMenu();
    renderPage('#page4');
  });

  $('#heyyou').click(function() {
    toggleMenu();
    renderPage('#page5');
  });

  $('#menu').click(function() {
    toggleMenu();
  });
});
