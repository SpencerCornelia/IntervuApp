// DATA
var albums = [
	{ id: 0, albumPic: "../public/images/take_care.jpg", artist: "Drake", albumName: "Take Care"},
	{ id: 1, albumPic: "../public/images/dark_fantasy.jpg", artist: "Kanye West", albumName: "My Beautiful Dark Twisted Fantasy"},
	{ id: 2, albumPic: "../public/images/ready_to_die.jpg", artist: "Notorious B.I.G", albumName: "Ready To Die"},
]

var interviews = [
	{ id: 0, video: "https://www.youtube.com/watch?v=twNV2ItVBcY", artist: "Drake"}
]

$(function () {
	var templateHTML = $("#album-template").html();
	var compiledTemplate = _.template(templateHTML);
	var renderedTemplate = compiledTemplate({collection: albums});
	$("#album-ul").html(renderedTemplate);
});