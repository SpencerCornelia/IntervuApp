$(function () {

  // $(".form-inline").on("submit", function () {
  //    var valueFromInput = $("#searchAlbum").val();
  //    console.log(valueFromInput);
  //    event.preventDefault();
  // })

  Albums.all();
  View.init();
});


function Albums() {};
Albums.all = function() {
  $.get("/albums", function (res) {
    var albums = JSON.parse(res);
    console.log(albums);
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
Interviews.add = function (event) {
  var interviewId = $(event.target).closest(".list-album-item").data().id;
  //interviewId is working
  $.ajax({
    url: '/activities/' + interviewId,
    type: 'GET',
    success: function(res) {
      View.renderInterviews(interviews, "album-ul", "interview-template");
    }
  });
};  
