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

// Count Down
$('#clock').countdown('5/17/2016 00:00:00 UTC', function(event) {
  $(this).html(event.strftime('%D<span>Days</span>  %H:%M:%S'));
});

// Load More 
$('.load-more a').on('click', function() {
  $(this).find('i').addClass('fa-spin active');
  setTimeout(function(){
    $('.load-more a i').removeClass('fa-spin active');
    $('.load-more').html('<span class="pink-text accent-2 wow zoomIn">Finished, There is no more...</span>');
  },1500);
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

// Charts Function
function pie_chart() {
  
  if (typeof $.fn.easyPieChart !== 'undefined') {
  
    $(".pie-chart:in-viewport").each(function() {
      
      $(this).easyPieChart({
        animate: 1500,
        lineCap: "square",
        lineWidth: $(this).attr("data-line-width"),
        size: $(this).attr("data-size"),
        barColor: $(this).attr("data-bar-color"),
        trackColor: $(this).attr("data-track-color"),
        scaleColor: "transparent",
        onStep: function(from, to, percent) {
          $(this.el).find(".pie-chart-details .value").text(Math.round(percent));
        }
      });
      
    });
    
  }
  
}

// wow lib init 
new WOW().init();

// On Window Scroll
$(window).scroll(function() {
  // Stiky
  stickyNav();

  // Chart
  pie_chart();
  
  // start count 
  $('#facts').each(function(){
    var itemPos = $(this).offset().top;
    var topOfWindow = $(window).scrollTop();
    var time = $('.timer').text();

    if (itemPos < topOfWindow+400) 
      if(time == '' || time == '0')
        $('.timer').each(count);
  });
});

// On Window Load
$(window).load(function() {
  //Loading Page
  $(".overlay").fadeOut(700,function() {
    $('body').removeClass('overlay-open');
  });

});

// On Document Ready
$(document).ready(function(){
  // Stiky
  stickyNav();

  // Chart
  pie_chart();

  // Tweet
  $.ajax({
    url: 'php/get_tweets.php',
    type: 'GET',
    success: function(response) {

      if (typeof response.errors === 'undefined' || response.errors.length < 1) {
        
        var $tweets = $('<div class="tweetfeed"></div>');
        console.log(response);
        $.each(response, function(i, obj) {
          var created_at = obj.created_at.split('+');
          $tweets.append('<div class="tweet"><div class="tweet-content z-depth-1"><a target="_blank" href="http://twitter.com/' + obj.user.name +'">'+ obj.user.name +'</a> ' + obj.text + '</div><div class="tweet-date"><i class="mdi-device-access-time"></i>' + created_at[0] + '</div></div>');
        });

        $('.tweetfeed').html($tweets);

        var divs = $('.tweetfeed .tweet'),interval, current = jQuery(divs[0]);
        var cycle = function(){
          var prev = current;   
          current = current.next();
          if (current.length == 0){
            current = jQuery(divs[0]);
          }    
          prev.fadeOut(function(){
            current.fadeIn(); 
          });
        }
        interval = window.setInterval(cycle, 6000);  

      } else {
        $('.tweetfeed p:first').text('Response error');
      }
    },
    error: function(errors) {
      $('.tweetfeed p:first').text('Request error');
    }
  });


  // Comment Time Line 
  var h = $('.comment-time-line').height();
  $('.comment-time-line .v-line').height(h);

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
  var your_name = $(this).find("input[name='your_name']").val();
  var your_email = $(this).find("input[name='your_email']").val();
  var your_job = $(this).find("input[name='your_job']").val();
  var your_message = $(this).find("textarea[name='your_message']").val();
  if( your_name != '' && your_email != '' && your_message!= '' ) {
    $.ajax({
      url: "php/send_message.php",  
      type: 'POST',
      data: { your_name: your_name, your_email: your_email, your_job: your_job, your_message: your_message },
      dataType: "json",
      success: function(data) {
        Materialize.toast('Your Message has been Sent Successfully', 4000);
      }
    });
  } else {
    Materialize.toast('Fill all the required fields', 4000);
  }
});


// Subscrip
$('#mc-embedded-subscribe-form').on('submit', function(e) {
  var your_email = $(this).find("input[name='EMAIL']").val();
  if( your_email == '' ) {
    e.preventDefault();
    Materialize.toast('Enter Your Email', 4000);
  } 
});
// Google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-75079627-1', 'auto');
ga('send', 'pageview');