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
//   if (collapsed) {
//     $('.header').animate({
//       width: '90%'
//     }, 250);
//     setTimeout(function() {
//       $('.collapsable').animate({
//       }, 300);
//       $('.collapsable').animate({
//         opacity: 1
//       }, 300);
//     }, 300);
//   } else {
//     $('.collapsable').animate({
//       opacity: 0
//     }, 250);
//     setTimeout(function() {
//       $('.collapsable').animate({
//       }, 300);
//       $('.header').animate({
//         width: '20%'
//       }, 300);
//     }, 300);
//   }
//   collapsed = !collapsed;
}

$(document).ready(function() {
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
