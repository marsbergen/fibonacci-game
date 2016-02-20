module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            //'node_modules/angular/angular.min.js',
            //'node_modules/angular-mocks/angular-mocks.js',
            'app/**/*.js',
            'test/unit/**/*Test.js'
        ],


        exclude: [
        ],

        preprocessors: {
            'app/**/*.js': ['browserify'],
            'test/**/*Test.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify', 'stringify']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false
    });
};
