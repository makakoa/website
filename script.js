console.log('Hey thanks for checking out my page!');
var title, head, text, picture, link;
var open = false;
var collapsed = true;
var page = '#page1';

var renderPage = function(to) {
  if (page == to) {
    $('.main').slideToggle();
    open = !open;
    return;
  }
  $(page).fadeOut(function() {
    $(to).fadeIn();
    page = to;
    if (!open) {
      $('.main').slideDown();
      open = true;
    }
  });
};

var toggleCollapse = function() {
    if (collapsed) {
      $('.collapsable').animate({
        width: 'toggle',
        display: 'block'
      }, 700);
      $('.header').animate({
        width: '90%'
      }, 400);
      collapsed = !collapsed;
      $('#collapse').html('<');
    } else {
      $('.collapsable').animate({
        width: 'toggle'
      }, 400);
      $('.header').animate({
        width: '20%'
      }, 700);
      collapsed = !collapsed;
      $('#collapse').html('>');
    }
};

$(document).ready(function() {
  $('.link').hover(function() {
    $(this).animate({padding: '5px'}, 50);
  }, function() {
    $(this).animate({padding: '0'}, 50);
  });

  $('#name').click(function() {
    if (!open) {
      if (collapsed) toggleCollapse();
      setTimeout(function() {
        $('.main').slideToggle()
      }, 500);
      open = !open;
    } else {
      $('.main').slideToggle()
      open = !open;
      setTimeout(function() {
        if (!collapsed) toggleCollapse();
      }, 500);
    }
  });

  $('#collapse').click(function() {
    toggleCollapse();
  });

  $('#about').click(function() {
    renderPage('#page1');
  });

  $('#flybox').click(function() {
    renderPage('#page2');
  });

  $('#braincryption').click(function() {
    renderPage('#page3');
  });

  $('#thecouncil').click(function() {
    renderPage('#page4');
  });

  $('#heyyou').click(function() {
    renderPage('#page5');
  });
});
