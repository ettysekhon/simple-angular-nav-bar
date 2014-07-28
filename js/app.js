(function(angular) {
  'use strict';

	angular.module('movieApp', []);

	angular.module('movieApp').config(['$routeProvider',
	    function($routeProvider) {
	        $routeProvider.when('/movies', {
	            templateUrl: 'movies.tmpl.html',
	            controller: 'moviesCtrl'
	        }).when('/movies/:slug', {
	            templateUrl: 'movie.tmpl.html',
	            controller: 'movieCtrl'
	        }).otherwise({
	            redirectTo: '/movies'
	        });
	    }
	]);

	angular.module('movieApp').run(function($templateCache) {
		// quick hack there's better ways of doing this.
	 	var templates = [{
	 		url: 'movies.tmpl.html',
	 		html: '<h1>Movies</h1>'
	 	}, {
	 		url: 'movie.tmpl.html',
	 		html: '<h1>Movie</h1>'
	 	}, {
	 		url: 'search-auto-suggest.tmpl.html',
	 		html: ['<div class="search-auto-suggest__container">',
	 		'<input class="search-auto-suggest__input" ng-model="searchTerm" type="text autofocus"/>',
	 		'<ul class="search-auto-suggest__list" ng-show="searchItems.length > 0">',
	 		'<li class="search-auto-suggest__item" ng-repeat="item in searchItems">',
	 		'<a href="#/movies/{{item.slug}}" class="search-auto-suggest__link" ng-bind="item.title"></a>'].join('')
	 	}];

	 	templates.forEach(function(template) {
	 		$templateCache.put(template.url, template.html);
	 	});
	});

	angular.module('movieApp')
	  .controller('moviesCtrl', function ($scope) {
	  	// movies list display logic here
	  });

	angular.module('movieApp')
	  .controller('movieCtrl', function ($scope) {
	  	// get slug from $routeParams and show detail view
	  });


	angular.module('movieApp')
		.factory('moviesAutoSuggestService', function (moviesCatalogue) {
			var searchItems = [], getSearchItems = function (searchTerm, minCharsRequiredToDisplayList, maxDisplayItems) {
				var items = [];

				if (!searchTerm || searchTerm.length < minCharsRequiredToDisplayList) {
					return items;
				}

				items = moviesCatalogue.all().filter(function (item) {
					return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
				});

				return searchItems = items.slice(0, maxDisplayItems);
			};

			return {
				getSearchItems: getSearchItems
			}
		});

	angular.module('movieApp')
	  .directive('moviesAutoSuggest', function (moviesAutoSuggestService) {
	  	return {
	  		templateUrl: 'search-auto-suggest.tmpl.html',
	  		replace: true,
	  		scope: {},
	  		link: function ($scope, element, attrs) {
	  			var options = $scope.$eval(attrs.moviesAutoSuggest);
	  			
	  			// searchTerm change handler
			  	$scope.$watch('searchTerm', function(val) {
		  		  	$scope.searchItems = moviesAutoSuggestService.getSearchItems(val, options.minCharsRequiredToDisplayList, options.maxDisplayItems);
			   	});
	  		}
	  	};
	  });

})(angular);