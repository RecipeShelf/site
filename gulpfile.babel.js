import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

const browserSync = BrowserSync.create();
const hugoBin = "hugo";
const defaultArgs = ["-d", "../dist", "-s", "site"];

function runPagefind(cb) {
  return cp.spawn("npx", ["pagefind", "--source", "dist"], {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      cb();
    } else {
      browserSync.notify("Pagefind indexing failed :(");
      cb("Pagefind indexing failed");
    }
  });
}

function buildSite(cb, options = []) {
  const args = [...defaultArgs, ...options];
  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      runPagefind((err) => {
        if (!err) {
          browserSync.reload();
        }
        cb(err);
      });
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("css", () => 
  gulp.src("./src/css/*.css")
    .pipe(postcss([postcssPresetEnv(), cssImport({from: "./src/css/main.css"})]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
);

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

// Define the build task
gulp.task("build", gulp.series("css", "js", "hugo"));
gulp.task("build-preview", gulp.series("css", "js", "hugo-preview"));

// Define the server task
gulp.task("server", gulp.series(gulp.parallel("css", "js"), "hugo", function(cb) {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch("./src/js/**/*.js", gulp.series("js"));
  gulp.watch("./src/css/**/*.css", gulp.series("css"));
  gulp.watch("./site/**/*", gulp.series("hugo"));
  cb();
}));
