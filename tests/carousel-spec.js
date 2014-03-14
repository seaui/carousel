define(function(require) {

  require('../src/carousel');
  var expect = require('expect');
  var $ = require('$');

  describe('carousel', function() {

    it('js ok', function() {
        expect($.fn.carousel).to.be.a('function');
    });

      it('should provide no conflict', function () {
          var carousel = $.fn.carousel.noConflict()
          expect($.fn.carousel).to.not.be.ok();// 'carousel was set back to undefined (org value)'
          $.fn.carousel = carousel
      })

      it('should be defined on jquery object', function () {
          expect($(document.body).carousel).to.be.ok();// 'carousel method is defined'
      })

      it('should return element', function () {
          expect($(document.body).carousel()[0]).to.be( document.body);//, 'document.body returned'
      })

      it('should not fire slide when slide is prevented', function () {
          $.support.transition = false

          $('<div class="carousel"/>')
              .on('slide.bs.carousel', function (e) {
                  e.preventDefault();
                  expect(true).to.be.ok();
              })
              .on('slid.bs.carousel', function () {
                  expect(false).to.not.be.ok();
              })
              .carousel('next')
      })

      it('should reset when slide is prevented', function () {
          var template = '<div id="carousel-example-generic" class="carousel slide"><ol class="carousel-indicators"><li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li><li data-target="#carousel-example-generic" data-slide-to="1"></li><li data-target="#carousel-example-generic" data-slide-to="2"></li></ol><div class="carousel-inner"><div class="item active"><div class="carousel-caption"></div></div><div class="item"><div class="carousel-caption"></div></div><div class="item"><div class="carousel-caption"></div></div></div><a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"></a><a class="right carousel-control" href="#carousel-example-generic" data-slide="next"></a></div>'
          var $carousel = $(template)
          $.support.transition = false

          $carousel.one('slide.bs.carousel', function (e) {
              e.preventDefault()
              setTimeout(function () {
                  expect($carousel.find('.item:eq(0)').is('.active')).to.be.ok();
                  expect($carousel.find('.carousel-indicators li:eq(0)').is('.active')).to.be.ok();
                  $carousel.carousel('next')
              }, 1);
          })
          $carousel.one('slid.bs.carousel', function () {
              setTimeout(function () {
                  expect($carousel.find('.item:eq(1)').is('.active')).to.be.ok();
                  expect($carousel.find('.carousel-indicators li:eq(1)').is('.active')).to.be.ok();
              }, 1);
          })
          $carousel.carousel('next')
      })

      it('should fire slide event with direction', function () {
          var template = '<div id="myCarousel" class="carousel slide"><div class="carousel-inner"><div class="item active"><img alt=""><div class="carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
          $.support.transition = false

          $(template).on('slide.bs.carousel', function (e) {
              e.preventDefault()
              expect(e.direction).to.be.ok();
              expect(e.direction === 'right' || e.direction === 'left').to.be.ok();
          }).carousel('next')
      })

      it('should fire slide event with relatedTarget', function (done) {
          var template = '<div id="myCarousel" class="carousel slide"><div class="carousel-inner"><div class="item active"><img alt=""><div class="carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
          $.support.transition = false

          $(template)
              .on('slide.bs.carousel', function (e) {
                  e.preventDefault();
                  expect(e.relatedTarget).to.be.ok();
                  expect($(e.relatedTarget).hasClass('item')).to.be.ok();
              })
              .carousel('next');
          done();
      })

      it('should set interval from data attribute', function () {
          var template = $('<div id="myCarousel" class="carousel slide"> <div class="carousel-inner"> <div class="item active"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}First Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="item"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}Second Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="item"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}Third Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> </div> <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a> <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a> </div>');
          template.attr('data-interval', 1814);

          template.appendTo('body');
          $('[data-slide]').first().click();
          expect($('#myCarousel').data('bs.carousel').options.interval).to.eql(1814);
          $('#myCarousel').remove();

          template.appendTo('body').attr('data-modal', 'foobar');
          $('[data-slide]').first().click();
          expect($('#myCarousel').data('bs.carousel').options.interval).to.eql(1814);// 'even if there is an data-modal attribute set'
          $('#myCarousel').remove();

          template.appendTo('body');
          $('[data-slide]').first().click();
          $('#myCarousel').attr('data-interval', 1860);
          $('[data-slide]').first().click();
          expect($('#myCarousel').data('bs.carousel').options.interval).to.eql(1814);// 'attributes should be read only on intitialization'
          $('#myCarousel').remove();

          template.attr('data-interval', false);
          template.appendTo('body');
          $('#myCarousel').carousel(1);
          expect($('#myCarousel').data('bs.carousel').options.interval).to.be(false);// 'data attribute has higher priority than default options'
          $('#myCarousel').remove();
      })
  });

});
