'use strict';

describe('encoder', function() {

    beforeEach(module('myApp.encoder'));

    // Test the controller
    describe('EncoderController', function() {
        var ctrl, weirdText;

        beforeEach(inject(function($componentController, _weirdText_) {
            weirdText = _weirdText_;
            ctrl = $componentController('encoder');
        }));

        it('should encode words', function() {
            expect(ctrl.encode("This")).toContain("Tihs");
            expect(true).toBe(true);
        });
    });
});