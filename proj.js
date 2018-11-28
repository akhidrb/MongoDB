use proj_1;

db.createCollection("users");

show collections;

db.users.find().pretty();


///Inserting users
db.users.insert(
	{name:"John Doe", gender:"M", age: 25, email:"johndoe@aucegypt.edu", username:"johndoe", password: "john123", 
				profilePic:"images/john_doe.png", dateCreated:"10-5-2018"}
);

db.users.insert(
	{name:"Steven Huntly", gender:"M", age: 35, email:"stevenhuntly@aucegypt.edu", username:"stevenhuntly", password: "steven123", 
					profilePic:"images/steven_huntly.png", dateCreated:"10-5-2018"}
);

db.users.insert([
	{name:"Mr Bean", gender:"M", age: 42, email:"bean@aucegypt.edu", username:"bean", password: "bean123", 
					profilePic:"images/bean.png", dateCreated:new Date()  },
	{name:"Shaun Sheep", gender:"M", age: 10, email:"shaun@aucegypt.edu", username:"shaun", password: "shaun123", 
					profilePic:"images/shaun.png", dateCreated:new Date() }
	
]);

//update user (set, inc, dateModified)
db.users.update(
	{name:"John Doe"},
	{ 
		$set: {password: "john123"}, 
		$inc:{age:-4},
		$currentDate: { dateModified: true }
	}
);

//remove user by name
db.users.remove(
	{name:"Shaun Sheep"}
);

//add date to user
db.users.update(
	{name:"Shaun Sheep"},
	{ $currentDate: { dateCreated: true } }
);

//Find post
db.users.find(
	{posts: { $elemMatch: {post:"Hello"} } }
);

//remove user by date created
db.users.remove(
	{dateCreated: ISODate("2018-05-09T23:49:53.330Z") }
);


//Add Post
db.users.update(
	{userID:4},
	{$push: { 
		posts:
				{
					postID: 1,
					post: "Did you watch my tv series",
					datePosted: new Date()
				}
	}}
);

//Edit Post
db.users.update(
	{userID:1},
	{$set: { "posts.0.post": "There are many dbs out there!!"
	}}
);

//Remove Post
db.users.update(
	{userID:4},
	{$unset: {"posts.0": 1}}
);
db.users.update(
	{userID:4},
	{$pull: {"posts": null}}
);

//Add picture
db.users.update(
	{userID:3},
	{$push: { 
		pictures:
				{
					pic: "https://i.ytimg.com/vi/0Iykn4mBT9U/maxresdefault.jpg",
					caption: "Me on the beach",
					datePosted: new Date()
				}
	}}
);

//Edit caption of picture
db.users.update(
	{userID:3},
	{$set: { "pictures.0": {
			caption:"Me on the beach. Look at my funny face."
	}} }
);

//removing picture
db.users.update(
	{userID:3},
	{$unset: { "pictures.1": ""} }
);

//setting and unsetting several modifications (mutli)
db.users.update(
	{},
	{$unset: { posts:  "" } },
	{ multi: true}
);


//Comments

//Comment to post
db.users.update(
	{userID:1},
	{$push: { 
		"posts.0.comments":
				{
					commenterID: 2, 
					text: "Yes. There are SQL and NoSQL dbs.",
					datePosted: new Date()
				}
	}}
);

//Comment to a picture
db.users.update(
	{userID:3},
	{$push: { 
		"pictures.0.comments.0.comments":
				{
					commenterID: 2, 
					text: "Thanks Man",
					datePosted: new Date()
				}
	}}
);

//Comment to a Comment
db.users.update(
	{userID:3},
	{$push: { 
		"pictures.0.comments.0.comments.1.comments":
				{
					commenterID: 2, 
					text: "Ya no biggy",
					datePosted: new Date()
				}
	}}
);

//
//Edit Comment
db.users.update(
	{userID:3},
	{$set: { 
		"pictures.0.comments.0.comments.0.text":  "Thanks Man"
	}}
);

//Remove Comment
db.users.update(
	{userID:3},
	{$unset: {"pictures.0.comments.0.comments.0": 1}}
);
db.users.update(
	{userID:3},
	{$pull: {"pictures.0.comments.0.comments": null}}
);

//Reactions

//Reactions to post
db.users.update(
	{userID:1},
	{$push: { 
		"posts.0.reactions":
				{
					reactorID: 2, 
					reaction: "Love",
					datePosted: new Date()
				}
	}}
);

//Reaction to a picture
db.users.update(
	{userID:3},
	{$push: { 
		"pictures.0.reactions":
				{
					reactorID: 2, 
					reaction: "Like",
					datePosted: new Date()
				}
	}}
);

//Reaction to a Comment
db.users.update(
	{userID:1},
	{$push: { 
		"posts.0.comments.0.reactions":
				{
					reactorID: 2, 
					reaction: "Dislike",
					datePosted: new Date()
				}
	}}
);

//
//Edit Reaction
db.users.update(
	{userID:3},
	{$set: { 
		"pictures.0.comments.0.comments.0.text":  "Thanks Man"
	}}
);

//Remove Reaction
db.users.update(
	{userID:1},
	{$unset: {"posts.0.reactions.0": 1}}
);
db.users.update(
	{userID:1},
	{$pull: {"posts.0.reactions": null}}
);