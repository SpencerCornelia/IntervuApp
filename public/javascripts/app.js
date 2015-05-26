// on page load
$(function(){
  // get and render the album info
  Album.all();
  // set the view's behaviors
  // View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};
// View.init = function() {
//   // food form submit event listener
//   $("#food-form").on("submit", function(e){
//     // stop page reload
//     e.preventDefault();
//     // format form data into a query string
//     var foodParams = $(this).serialize();
//     Food.create(foodParams);
//   });
// }
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.compile($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(compile({collection: items}));
};

// FOOD OBJECT
function Album() {};
Album.all = function() {
  $.get("/activities", function(res){ 
    // parse the response
    var albums = JSON.parse(res);
    // render the results
    View.render(albums, "album-ul", "album-template");
  });
}