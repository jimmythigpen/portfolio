(function(){

  $(document).ready(function() {
    $('#fullpage').fullpage({
       anchors:['home', 'work', 'blog', 'about'],
       menu: '.nav',
       paddingTop: '55px',
       paddingBottom: '55px',
       slidesNavigation: true,
       controlArrows: false
    });

    var blogURL = 'http://api.tumblr.com/v2/blog/jimmythigpen.tumblr.com/posts/text?api_key=wSCsrQNh71emdz0eTvoZvt4pCkszK7noN9laB0cSCPQtUBRvMG&jsonp=?';

    var $titleList = $('.title-list');
    var $previewList = $('.preview-list');

    $.ajax({
      url: blogURL,
      dataType: 'jsonp'
    }).done(function(response) {

      renderListings(response.response.posts);
    });

    function renderListings(posts) {
      var sliced = posts.slice(0,4);
      sliced.forEach(function(post) {

        var postInfo = renderTemplate('post-title-list', {
          title: post.title,
        });
        $titleList.append(postInfo);

        var previewInfo = renderTemplate('post-preview-list', {
          title: post.title,
          body: post.body,
        });
        $previewList.append(previewInfo);

      });
    }

    function renderTemplate(name, data) {
      var $template = $('[data-template-name=' + name + ']').text();
      $.each(data, function(prop, value) {
        $template = $template.replace('<% ' + prop + ' %>', value);
      });
      return $template;
    }
});

}());
