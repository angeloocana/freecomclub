var gulp = require("gulp");
var ts = require("gulp-typescript");
//var babel = require("gulp-babel");

gulp.task("js", function () {
    var tsProject = ts.createProject(__dirname + "/tsconfig.json");

    return tsProject.src()
        .pipe(tsProject())
        //.pipe(babel()) Remove because of webpack and relay
        .pipe(gulp.dest("dist/"));
});
