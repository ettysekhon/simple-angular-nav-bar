(function () {
    'use strict';

    describe('movies auto suggest', function () {
        var $rootScope, $compile,
            createDirective = function () {
            		var elm = angular.element('<div movies-auto-suggest="{minCharsRequiredToDisplayList:3, maxDisplayItems:5}"></div>');
                return $compile(elm)($rootScope);
            };
        
        beforeEach(function () {
            module("movieApp");
        });

		// todo: should mock the movie catalog service 
        beforeEach(inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should return 5 items when search term is "sunshine"', function () {
            var element = createDirective(), directiveScope = element.scope();

            directiveScope.searchTerm = "sunshine";
            directiveScope.$apply();

            expect(directiveScope.searchItems.length).toEqual(5);
        });

        it('should return 0 items when search term is "batman"', function () {
            var element = createDirective(), directiveScope = element.scope();

            directiveScope.searchTerm = "batman";
            directiveScope.$apply();
            
            expect(directiveScope.searchItems.length).toEqual(0);
        });

        it('should return 0 items when search term is less than three characters', function () {
            var element = createDirective(), directiveScope = element.scope();

            directiveScope.searchTerm = "su";
            directiveScope.$apply();
            
            expect(directiveScope.searchItems.length).toEqual(0);
        });

        it('should return first 5 items only when search term is "sun"', function () {
            var element = createDirective(), directiveScope = element.scope();

            directiveScope.searchTerm = "sun";
            directiveScope.$apply();
            
            expect(directiveScope.searchItems.length).toEqual(5);
        });
    });

}());