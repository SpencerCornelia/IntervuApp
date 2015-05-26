$(function () {
  
  View.renderAlbums(albums, "album-ul", "album-template");

});

function View() {};
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
  var interviewId = $(event.target).closest(".list-album-item").data();
  console.log(interviewId);
  $.ajax({
    url: '/activities/' + interviewId,
    type: 'POST',
    success: function(res) {
      // re-render
      View.renderInterviews(interviews, "album-ul", "interview-template");
    }
  });
};  
