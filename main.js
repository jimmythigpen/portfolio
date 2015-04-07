(function(){

  $(document).ready(function() {

    $(".section-right-arrow").on("click", function(){
      $.fn.fullpage.moveSlideRight();
    });

    $(".section-left-arrow").on("click", function(){
      $.fn.fullpage.moveSlideLeft();
    });

    $(".mobile-right").on("click", function(){
      $.fn.fullpage.moveSlideRight();
    });

    $(".mobile-left").on("click", function(){
      $.fn.fullpage.moveSlideLeft();
    });

    $('.photoset-grid-basic').photosetGrid({
      highresLinks: true,
      lowresWidth: 9999,
      layout: '44',
    });

    $('#fullpage').fullpage({
       anchors:['home', 'work', 'blog', 'contact'],
       menu: '.nav',
       paddingTop: '55px',
       paddingBottom: '50px',
       slidesNavigation: true,
       controlArrows: false,
       fitToSection: false,
       responsive: 800,
       touchSensitivity: 15,

      afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
        var loadedSlide = $(this);
        if(anchorLink == 'work' && slideIndex == 1 || slideIndex == 2 || slideIndex == 3 || slideIndex == 4 || slideIndex == 5 || slideIndex == 6 || slideIndex == 7 || slideIndex == 8){
          $(".section-left-arrow").css("z-index", 3);
          $(".section-right-arrow").css("z-index", 3);
          } else {
          $(".section-left-arrow").css("z-index", 1);
          $(".section-right-arrow").css("z-index", 1);
          }
        },

        onSlideLeave: function( anchorLink, index, slideIndex, direction){
         var leavingSlide = $(this);
         if(anchorLink == 'work' && slideIndex == 1 || slideIndex == 8 && direction == 'left'){
           $(".section-left-arrow").css("z-index", 1);
           $(".section-right-arrow").css("z-index", 1);
         }
       },
    });

    var blogURL = 'http://api.tumblr.com/v2/blog/jimmythigpen.tumblr.com/posts/text?api_key=wSCsrQNh71emdz0eTvoZvt4pCkszK7noN9laB0cSCPQtUBRvMG&jsonp=?';
    var $titleList = $('.title-list');
    var $previewList = $('.preview-list');

    $.ajax({
      url: blogURL,
      dataType: 'jsonp'
    }).done(function(response) {

      renderListings(response.response.posts);
      renderTitles(response.response.posts);
    });

    function renderListings(posts) {
      var slicedPosts = posts.slice(0,3);
      slicedPosts.forEach(function(post) {

      function truncate (text, limit) {
        if (typeof text.body !== 'string')
          return '';
        if (typeof append == 'undefined')
          console.log();
          append = ('...' + '<a href=' + text.post_url + '> continue reading</a>');
        var parts = text.body.split(' ');
        if (parts.length > limit) {
          for (var i = parts.length - 1; i > -1; --i) {
            if (i+1 > limit) {
              parts.length = i;
              }
            }
            parts.push(append);
          }
          return parts.join(' ');
        }
        var newPostBody = truncate(post, 36);
        var previewInfo = renderTemplate('post-preview-list', {
          title: post.title,
          body: newPostBody,
          url: post.post_url
        });
        $previewList.append(previewInfo);
      });
    }

    function renderTitles(posts){
    var slicedTitles = posts.slice(0,7);
    slicedTitles.forEach(function(post) {
    var momentDate = moment(post.date).endOf('day').fromNow();
    var postInfo = renderTemplate('post-title-list', {
      title: post.title,
      url: post.post_url,
      date: momentDate
    });
    $titleList.append(postInfo);
    });
  }

    function renderTemplate(name, data) {
      var $template = $('[data-template-name=' + name + ']').text();
      $.each(data, function(prop, value) {
        $template = $template.replace('<% ' + prop + ' %>', value);
      });
      return $template;
    }

    // $(".hidden").css("display", "block");

});

}());
