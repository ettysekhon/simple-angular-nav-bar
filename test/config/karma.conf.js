module.exports = function(config) {
    config.set({
        frameworks : ['jasmine'],

        basePath : '../../',
        browsers : ['Chrome'],

        files : [
            'js/lib/angular/angular.js',
            'js/lib/angular/angular-resource.js',

            'js/app.js',
            'js/**/*.js',

            'test/support/angular-mocks.js',
            'test/support/namespace.js',
            'test/support/spec-helper.js',

            'test/unit/*.js'

        ],

        autoWatch : true,

        reporters : ['dots','junit'],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
