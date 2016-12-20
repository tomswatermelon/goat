$(function(){
    console.log('Hi There!');

    $('body').imagesLoaded().always(function(){
        console.log('Loading Done');
    });
});
