var gulp = require('gulp');
// var tinypng = require('gulp-tinypng-compress'); // 官方默认，每月有500张限额
var tinypng = require('gulp-tinypng-nokey'); // 修改后的，模拟用户上传和下载的行为，来得到压缩图片，突破使用官网api每月500张限制,尽量放到任务的最后一步，因为这个过程是要上传图片，再下载图片的，和网络稳定有关
 
gulp.task('tinypng', function () {
    gulp.src('src/assets/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            // key: 'm2-qGTl114vfMK9Cub6qho34w1vuseWf',
            // sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('images'));
});