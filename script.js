'use strict';

console.log('Hey thanks for checking out my page!');
var open = false;
var collapsed = true;
var page = '#page1';

var renderPage = function(to) {
  if (page == to) {
    // $('.main').slideToggle();
    // open = !open;
    return;
  }
  $(page).fadeOut(function() {
    if (open) {
      $('.main').height($(page).height());
      $('.main').animate({
        height: $(to).height()
      }, 100, null, function() {
        $(to).fadeIn();
        page = to;
      });
    } else {
      $(to).fadeIn();
      page = to;
      $('.main').slideDown();
      open = true;
    }
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

  $('#about').click(function() {
    if (!open) {
      if (collapsed) toggleCollapse();
      setTimeout(function() {
        $('.main').slideToggle();
      }, 500);
      open = !open;
    } else {
      $('.main').slideToggle();
      open = !open;
      setTimeout(function() {
        if (!collapsed) toggleCollapse();
      }, 500);
    }
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
