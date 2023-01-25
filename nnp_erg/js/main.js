$(document).ready(function(){

 /*==============*/
 $('.clked_show').click(function () {
  $(this).toggleClass('clked').next().slideToggle('fast');
  $('.clked_show').not(this).removeClass('clked').next().slideUp('fast');
});
/*==============*/
$('.bt_mob').click(function () {
  $(this).toggleClass('bt_mob_hide').next().slideToggle('fast');
  $('.bt_mob').not(this).removeClass('bt_mob_hide').next().slideUp('fast');
});
/*===================*/
 
$(window).scroll(function() {
  if ($(this).scrollTop() > 3){
    $('header').addClass("header");
  }
  else{
    $('header').removeClass("header");
  }
});
 /*===================*/
 $('.ban_block_slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay:false,
  dots: true,
  autoplaySpeed:2000
});
 /*===================*/
 $('.ban_block_mob').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay:false,
  dots: true,
  autoplaySpeed:2000
});
/*==============*/
$("a.scrollto").click(function () {
  elementClick = $(this).attr("href")
  destination = $(elementClick).offset().top;
  $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 0}, 1000);
  return false;
});
/*==============*/
$('.block_2_slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay:false,
  dots: true,
  autoplaySpeed:2000,
  variableWidth: true
});
/*==============*/
$('.cert_slider').slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay:false,
  dots: true,
  autoplaySpeed:2000,
  variableWidth: true
});
/*==============*/
$('.cert_main_block_slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay:false,
  dots: true,
  autoplaySpeed:2000,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 981,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
});
 /*==============*/
 $('.minus').click(function () {
  var $input = $(this).parent().find('input');
  var count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
  $input.change();
  return false;
});
$('.plus').click(function () {
  var $input = $(this).parent().find('input');
  $input.val(parseInt($input.val()) + 1);
  $input.change();
  return false;
});
/*===================*/
$('input,textarea').focus(function () {
  $(this).data('placeholder', $(this).attr('placeholder'))
  $(this).attr('placeholder', '');
});
$('input,textarea').blur(function () {
  $(this).attr('placeholder', $(this).data('placeholder'));
});
/*===================*/
$('.select_par_in').select2({
  minimumResultsForSearch: -1
});
  /*==============*/
  $(".mask_tel").mask("+0 (000) 000-00-00", {
        clearIfNotMatch: true
    });
  $('.mask_email').mask("A", {
  translation: {
    "A": { pattern: /[\w@\-.+]/, recursive: true }
  }
});
});/*$(document).ready(function()*/