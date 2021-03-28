// The user is compsing the blog post but not complete yet. 
// What should the constructor function look like?
// First time creating the post, the view is 0, the comment is NULL as well
// the isLive should be false by default
// The more paramaters a funciton has, the harder to use it
function BlogPost (title, body, author) {
    this.title = title;
    this.body = body;
    this.authoer = author;
    this.views = 0; //initialize = 0
    this.comments = [];
    this.isLive = false;
}

let blogPost1 = new BlogPost('Avengers','This is my first blgo post','Derrick');

console.log(blogPost1);

