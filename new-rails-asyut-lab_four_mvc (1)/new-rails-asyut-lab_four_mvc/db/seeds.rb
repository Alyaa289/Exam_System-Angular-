user1 = User.create(name: "mohamed", dob: "2001-11-08", email: "mohamed@example.com", phone_number: "01016845129")
user2 = User.create(name: "mustafa", dob: "1998-02-02", email: "mustafa@example.com", phone_number: "01234234")
post1 = Post.create(title: "First Post", content: "Content ", user_id: user1)
post2 = Post.create(title: "Second Post", content: "Content", user_id: user2)

EditorsPost.create(user: user2, post: post1) 
EditorsPost.create(user: user1, post: post2) 