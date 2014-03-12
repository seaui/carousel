define(function(require) {

  require('../src/carousel');
  var expect = require('expect');
  var module = require('$');

  describe('carousel', function() {

    it('js ok', function() {
        expect(module.fn.carousel).to.be.a('function');
    });
  });

});
