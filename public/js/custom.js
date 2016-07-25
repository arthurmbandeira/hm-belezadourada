/*
 *
 *    CUSTOM.JS
 *
 */

// StickyNav Function
function stickyNav() {
  var top = $(window).scrollTop();
  if (top > 80) {
    $('.navbar-fixed').addClass('sticky');
  } else {
    $('.navbar-fixed').removeClass('sticky');
  }
}

// Count Function
function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
}

// Calculate Height
var winH = 460;
if (document.body && document.body.offsetWidth) {
 winW = document.body.offsetWidth;
 winH = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 winW = document.documentElement.offsetWidth;
 winH = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 winW = window.innerWidth;
 winH = window.innerHeight;
}

$('.slider-section').height(winH-90);
$('.transparent-header .slider-section').height(winH-30);
$('.page-404').height(winH-144);
$('.page-soon').height(winH-70);

// Favorite btn Click
$('.favorite').on('click',function(){
  var att = $(this).attr('id');
  if(att != 'active') 
    $(this).attr('id','active');
  else 
    $(this).attr('id','');
});


// Portfolio Masonry
var $container = $('.items-list');
// init
$container.imagesLoaded().progress( function() {
  $container.isotope({
    // options
    itemSelector: '.col',
    columnWidth: '.m4',
    layoutMode: 'masonry'
  });
});
// Filter Items
$('#filters').on( 'click', 'a', function() {
  $("img.lazy").each(function() {
    $(this).attr("src", $(this).attr("data-original"));
    $(this).removeAttr("data-original");
  });
  var filterValue = $(this).attr('data-filter');
  $container.isotope({ filter: filterValue });

}); 

// Lazy initialize
$("img.lazy").lazyload({
  effect : "fadeIn",
  load : function()
  {
    $container.imagesLoaded().progress( function() {
      $container.isotope({
        // options
        itemSelector: '.col',
        columnWidth: '.m4',
        layoutMode: 'masonry'
      });
    });
  }
});

// wow lib init 
new WOW().init();

// On Window Scroll
$(window).scroll(function() {
  // Stiky
  stickyNav();
  $('#logo').height($('header nav').height());
});

// On Window Load
$(window).load(function() {
  //Loading Page
  $(".overlay").fadeOut(700,function() {
    $('body').removeClass('overlay-open');
  });

});

$(window).resize(function(){
  $('.portfolio .item .imgLiquid').height($('.portfolio .item').width());
  $('#logo').height($('header nav').height());
});

// On Document Ready
$(document).ready(function(){
  // Stiky
  stickyNav();

  $('.imgLiquid').imgLiquid();
  
  $('.portfolio .item .imgLiquid').height($('.portfolio .items-list .item').width());

  $('#logo').height($('header nav').height());

  $('.carousel').carousel({
    time_constant: 0,
    indicators: true,
  });

  // Fancybox
  $('.fancybox').fancybox({
    'padding'     : 0,
    'openEffect'  : 'elastic',
    'closeEffect' : 'elastic',
  });

  // Swiper Sliders
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0,
    loop: true,
    parallax: true,
    effect: 'fade'
  });  
  var swiper = new Swiper('.swiper-customer', {
    slidesPerView: 4,
    spaceBetween: 10,
  });

  // Select Box init
  $('select').material_select();

  // Modal init
  $('.modal-trigger').leanModal();

  // Mobile Nav
  $('.button-collapse').sideNav();

  // Pickadate
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  // Dropdown init
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on click
    alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
    gutter: 0, // Spacing from edge
    belowOrigin: false // Displays dropdown below the button
  });

  // Defualt Slider 
  $('.slider').slider({interval: 5000,full_width: true,transition: 800});
});


// Send Message 
$('.send-message').on('submit', function(e) {
  e.preventDefault();
  var nome = $(this).find("input[name='nome']").val();
  var email = $(this).find("input[name='email']").val();
  var telefone = $(this).find("input[name='telefone']").val();
  var mensagem = $(this).find("textarea[name='mensagem']").val();
  if( nome != '' && email != '' && mensagem!= '' ) {
    $.ajax({
      success: function(data) {
        Materialize.toast('Sua mensagem foi enviada!', 4000);
      }
    });
  } else {
    Materialize.toast('Todos os campos são obrigatórios', 4000);
  }
});

function scrollCustom(id){
  $('html, body').animate({scrollTop:$('#' + id).offset().top - 48}, 'slow');
}