$(function () {

  // $(".form-inline").on("submit", function () {
  //    var valueFromInput = $("#searchAlbum").val();
  //    console.log(valueFromInput);
  //    event.preventDefault();
  // })

  Albums.all();
  View.init();



  $("body").on("click", ".list-album-item img", function (event){ 
    var clickEvent = event.target.src;
    var changed = clickEvent.substr(21);
    var better = ".." + changed
    for (var i = 0; i < albums.length; i++) {
      if (better === albums[i].albumPic) {
        var newArray = []
        newArray.push(albums[i]);
        View.renderInterviews(newArray, "album-ul", "interview-template");
        // console.log(interviews[i].albumPic);
        // View.renderAlbums(interviews.video1, "album-ul", "albums-template");
      } else {
        console.log("else statement");
      }
    }
  });


});


function Albums() {};
Albums.all = function() {
  $.get("/albums", function (res) {
    var albums = JSON.parse(res);
    View.renderAlbums(albums, "album-ul", "album-template");
  })
}

function View() {};
View.init = function() {
  $("#ourForm").on("submit", function (event) {
    event.preventDefault();
    var form = $("#ourForm").serialize();
    var searchForm = form.substr(12);
    $.post("/search/album", searchForm)
      .done(function(res){
        var newArray = [];
        newArray.push(res);
        console.log(newArray);
        View.searchedAlbums(newArray, "album-ul", "albums-template");
      });
  })
}

View.searchedAlbums = function (album, parentId, templateId) {
  var templateHTML = $("#" + templateId).html();
  var compiledTemplate = _.template(templateHTML);
  var renderedTemplate = compiledTemplate({collection: album});
  $("#" + parentId).html(renderedTemplate);
}

View.renderAlbums = function (items, parentId, templateId) {
  var templateHTML = $("#" + templateId).html();
  var compiledTemplate = _.template(templateHTML);
  var renderedTemplate = compiledTemplate({collection: items});
  $("#" + parentId).html(renderedTemplate);
};

View.renderInterviews = function (items, parentId, templateId) {
  var templateHTML = $("#" + templateId).html();
  var compiledTemplate = _.template(templateHTML);
  var renderedTemplate = compiledTemplate({collection: items});
  $("#" + parentId).html(renderedTemplate);
};


//ajax from catchphrase.ly
function Interviews() {};
// Interviews.add = function (event) {
//   var interviewId = $(event.target).closest(".list-album-item").data().id;
//   $.ajax({
//     url: '/activities/' + interviewId,
//     type: 'GET',
//     success: function(res) {
//       View.renderInterviews(interviews, "album-ul", "interview-template");
//     }
//   });
// };  


Interviews.add = function (event, item) {
  console.log(item);
}
