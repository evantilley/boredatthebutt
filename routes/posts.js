let express = require('express');
let router = express.Router();
let Post = require('../models/post');

//posts route
router.get('/', ensureAuthenticated, function(req, res){
    //find all posts
    Post.find({}, function(err, Posts){
        if (err){
            console.log(err)
        } else{
            console.log(Posts)
                res.render('posts', {
                title: "Posts",
                posts: Posts //array of posts
            });
    }
    });
});

//add a post route
router.get('/add', ensureAuthenticated, function(req, res){
    res.render('add_article', {
        title: "Add Post",
    });
});

//Add Submit POST Route
router.post('/add', function(req, res){

    req.checkBody('title', '100 chars max').isLength({ max:100 });
    req.checkBody('title', 'Title is required').notEmpty();

   // req.checkBody('author', 'Author is required').notEmpty();
   req.checkBody('body', '500 chars max').isLength({max: 500});
    req.checkBody('body', 'Body is required').notEmpty();


    //get errors
    let errors = req.validationErrors();
    if (errors){
        res.render('add_article', {
            errors: errors,
            title: 'Add Post'
        });
    } else{
        let post = new Post();
        post.title = req.body.title;
        post.author = req.user.username;
        post.body = req.body.body;
    
        //save post to database
        post.save(function(err){
            if(err){
                Console.log(err);
                return;
            } else{
                //alert
                req.flash('success', 'Post added');
                //redirect user back to home page
                res.redirect('/posts');
            }
        });
    }
});

//access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash('danger', "Please login sonz")
        res.redirect('/')
    }
}

module.exports = router;