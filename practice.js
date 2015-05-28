db.Album.create(albums[0], function(err,alb){
	a1 = alb;
	console.log(err)
})



db.User.findOne({email: 'foobar'},function(err,user){
	user.favoriteAlbums.push(a1);
	u1 = user;
})


> u1
{ _id: 55663e88590354b941e0c9e7,
  email: 'foobar',
  passwordDigest: 'foobar',
  __v: 1,
--> favoriteAlbums: [ 556641139c032afe43e3acd4, 556641139c032afe43e3acd4 ] }


> u1.favoriteAlbums
["556641139c032afe43e3acd4","556641139c032afe43e3acd4"]
> db.Album.findById(u1.favoriteAlbums[0], function(){
	 console.log("here is", arguments)
	 })