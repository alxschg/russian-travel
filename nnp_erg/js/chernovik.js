  /*======================*/
  var url=document.location.href;

  $.each($("nav a"),function(e){
    if(url==this.href){$(this).addClass('choosed');};
  });


  $('#menu-btn').click(function(){
    $('.menu').slideToggle(300);
    if ($(this).hasClass('not-active')) {
     $(this).addClass('is-active').removeClass('not-active');
   }else{
     setTimeout(function(){
      $('.is-active').addClass('not-active').removeClass('is-active')
    },250)
   }
 });
 
 /*===================*/
 $('#search_bt').click(function(){
   $('.search_block').slideToggle(300);
   if ($(this).hasClass('not_search_bt')) {
    $(this).addClass('is_search_bt').removeClass('not_search_bt');
  }else{
    setTimeout(function(){
     $('.is_search_bt').addClass('not_search_bt').removeClass('is_search_bt')
   },250)
  }
 });
  /*====================*/
 $('.in_color1 span').click(function(){
   var id = $(this).data('id');
   $('.in_color span').removeAttr('id');
   $(this).attr('id','border');
   $('.color1 p').hide();
   $('#clicked'+id).fadeIn();
 });
 /*====================*/
 $('.in_color2 span').click(function(){
   var id = $(this).data('id');
   $('.in_color2 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color2 p').hide();
   $('#clicked'+id).fadeIn();
 });
 /*====================*/
 $('.in_color3 span').click(function(){
   var id = $(this).data('id');
   $('.in_color3 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color3 p').hide();
   $('#clicked'+id).fadeIn();
 });
 /*====================*/
 $('.in_color4 span').click(function(){
   var id = $(this).data('id');
   $('.in_color4 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color4 p').hide();
   $('#clicked'+id).fadeIn();
 });
 /*====================*/
 $('.in_color5 span').click(function(){
   var id = $(this).data('id');
   $('.in_color5 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color5 p').hide();
   $('#clicked'+id).fadeIn();
 });
  /*====================*/
 $('.in_color6 span').click(function(){
   var id = $(this).data('id');
   $('.in_color6 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color6 p').hide();
   $('#clicked'+id).fadeIn();
 });
  /*====================*/
 $('.in_color7 span').click(function(){
   var id = $(this).data('id');
   $('.in_color7 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color7 p').hide();
   $('#clicked'+id).fadeIn();
 });
  /*====================*/
 $('.in_color8 span').click(function(){
   var id = $(this).data('id');
   $('.in_color8 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color8 p').hide();
   $('#clicked'+id).fadeIn();
 });
  /*====================*/
$('.in_color9 span').click(function(){
   var id = $(this).data('id');
   $('.in_color9 span').removeAttr('id');
   $(this).attr('id','border');
   $('.color_span b').hide();
   $('#chos_col'+id).fadeIn();
 });
  /*====================*/
$('.small_pic div').click(function(){
   var id = $(this).data('id');
   $('.small_pic div').removeAttr('id');
   $(this).attr('id','border');
   $('.big_pic').hide();
   $('#big_pic'+id).fadeIn();
 });
  /*=====================*/
 $('.color_span').click(function() {
    $('.colored').removeClass('colored');
    $(this).addClass('colored');
  });
  /*=====================*/


  /*======================*/
  

  /*======================*/
  

   /*======================*/
  
  $(window).scroll(function() {
    if ($(this).scrollTop() > 3){
      $('header').addClass("header");
    }
    else{
      $('header').removeClass("header");
    }
  });

  /*======================*/


  /*===================*/
  $('.banner_slide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay:false,
    dots: true,
    autoplaySpeed:2000
  });
  /*=====================*/
