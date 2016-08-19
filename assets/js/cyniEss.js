var page_top = true;
var loaded = 1;

var bumpIt = function() {
        $('body').css('margin-bottom', $('.big_footer').height());
    },
    didResize = false;

window.onload = function() {
    bumpIt();
};

window.onscroll = function() {
    if (document.body.scrollTop > 50 && page_top)
    {
        page_top = false;
        spinDial();
    }
    else if (document.body.scrollTop < 50 && !page_top)
    {
        page_top = true;
        resetDial();
    }
};

function spinDial() {
    $('#dial').animate({rotate: '180deg'}, 900);
}

function resetDial() {
    $('#dial').animate({rotate: '0deg'}, 900);
}

function toTheTop() {
    $('html, body').animate({ scrollTop: 0}, 'slow');
    top = true;
    resetDial();
}

function loadComment(is_anime, item_id)
{
    $.get('/scripts/load_comments.php', {item_id: item_id, mode: (is_anime ? 1 : 0)},
        function updateComments(response) {
            console.log(response);
            if (is_anime == true) {
                $('#inputAnimeComments').val(JSON.parse(response).comments);
            }
            else {
                $('#inputMangaComments').val(JSON.parse(response).comments);
            }
        }
    );
}

$(window).resize(function() {
    didResize = true;
});

setInterval(function() {
    if(didResize) {
        didResize = false;
        bumpIt();
    }
}, 250);