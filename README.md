# Goat

Hi There!

This is just another front-end development setup, simple and fast, it might not be lightweight enough, but it gets the job done and saves your time. Riding this goat, you will be implementing these things into your workflow:

- Gulp
- Sass
- Livereload

So, you will be writing sass and page will be reloaded upon your saving action.

## Dependencies

Run `npm install` to install these dependencies

- gulp
- gulp-clean-css
- gulp-concat
- gulp-concat-css
- gulp-autoprefixer
- gulp-imagemin
- gulp-jshint
- gulp-livereload
- gulp-notify
- gulp-plumber
- gulp-sass
- gulp-uglify
- jshint
- gulp-order


## Usage

Download and run `npm install`, once all dependencies are installed, run `gulp` in root folder, and you should able to see gulp running and watching the file changes.

You should write your stuff in src folder (please refer to the example file struture), and visit dist/{page name}.html (or .php) folder in browser.

### Livereload

Go to https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei to install chrome plugin for livereloading. Once `gulp` is running, visit your page and switch on the livereload extension in chrome.
