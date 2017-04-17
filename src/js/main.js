$(function(){
    console.log('Hi There!');

    $('body').imagesLoaded().always(function(){
        console.log('Loading Done');
        swal({
            title:'Hello!',
            text:'The page is ready and images are loaded',
            type:'success'
        });
    });

});
