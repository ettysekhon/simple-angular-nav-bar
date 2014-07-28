Namespace.use('jasmine.grammar.GWT.*');

var mockModule = function(name, value) {
        module(function($provide) {
            $provide.value(name, value);
        });
    },

    compileController = function(ctrlName, httpMock) {

        var scope;

        inject(function (_$rootScope_, _$controller_, $httpBackend) {
            scope = _$rootScope_.$new();
            _$controller_(ctrlName, angular.extend({ $scope: scope }));
            httpMock = $httpBackend;
        });

        return scope;
    },

    compileDirective = function(el) {

        var compiledEl;

        inject(function($rootScope, $compile) {

            compiledEl = $compile(angular.element(el))($rootScope);

            $rootScope.$digest();
        });

        return compiledEl;
    };
