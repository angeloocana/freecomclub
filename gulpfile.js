var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require("gulp-babel");
//var rename = require("gulp-rename");
var webpack = require("gulp-webpack");
var fs = require('fs');

gulp.task("js", function () {
    // Using my existing tsconfig.json file
    var tsProject = ts.createProject(__dirname + "/tsconfig.json");

    // The `base` part is needed so
    //  that `dest()` doesnt map folders correctly after rename
    return tsProject.src()
        .pipe(tsProject())
        //.pipe(babel())
        // .pipe(rename(function (path) {
        //     path.extname = ".js";
        // }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("webpack", function(){
    var conf = {
        output:{
            filename: "bundle.js"
        },
        module:{
            loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel-loader',
                query: {
                    presets:['react','es2015'],
                    plugins: ['./babelRelayPlugin'].map(require.resolve)
                }
            }
            ]
        }

    };

    return gulp.src('dist/frontend/app.js')
        .pipe(webpack(conf, null, function(err, stats){
            //upload the generated file to http://webpack.github.io/analyse/
            fs.writeFile('dist/webpack-stats.json', stats, function(err){
                if(err) console.log('Error writing webpack stats',err);
            })
        }))
        .pipe(gulp.dest('dist/public/'));
});
