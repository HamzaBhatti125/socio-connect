const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
// importing validation
const validatePostInput = require("../../validation/post");


// #route GET api/posts                   #Public
// #desc get posts
router.get("/search/:word", (req, res) => {

    let to_search = req.params.word;

    Post.find({"text" : new RegExp(to_search, 'i') })
        .sort({
            date: -1
        })
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.status(404).json({
                nopostsfound: "no posts found with that word"
            });
        });
});


// #route GET api/posts                   #Public
// #desc get posts
router.get("/", (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then((posts) => {
            res.json(posts);
            // console.log(posts);
        })
        .catch((err) => {
            res.status(404).json({
                nopostsfound: "no posts found with that id"
            });
        });
});


// #route GET api/posts/:id                 #Public
// #desc get posts by id

router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(404).json({
                nopostfound: "no post found with that id"
            });
        });
});

// #route POST api/posts                   #Private
// #desc create posts
router.post("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {


    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        image: req.body.image,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then((post) => {
        res.json(post);
    });
});


// #route delete api/posts                   #Private
// #desc delete post
router.delete("/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then((profile) => {
            Post.findById(req.params.id)
                .then((post) => {
                    //check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({
                            notauthorized: "user not authorized"
                        });
                    }

                    post.remove().then(() => {
                        res.json({
                            success: true
                        });
                    });

                })
                .catch((err) => {
                    res.status(404).json({
                        postnotfound: "no post found"
                    });
                });
        });

});




// #route POST api/posts/like/:id                   #Private
// #desc Like post

router.post("/like/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then((profile) => {
            Post.findById(req.params.id)
                .then((post) => {

                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyliked: "user already liked this post"
                        });
                    }

                    // add user id to likes array
                    post.likes.unshift({
                        user: req.user.id
                    });

                    post.save().then((post) => {
                        res.json(post);
                    })
                })
                .catch((err) => {
                    res.status(404).json({
                        postnotfound: "no post found"
                    });
                });
        });

});



// #route POST api/posts/unlike/:id                   #Private
// #desc unike post

router.post("/unlike/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then((profile) => {
            Post.findById(req.params.id)
                .then((post) => {

                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            notliked: "you havent liked this post"
                        });
                    }

                    // get the remove index
                    const removeIndex = post.likes
                        .map((item) => {
                            item.user.toString()
                        })
                        .indexOf(req.user.id);


                    // splice out of array
                    post.likes.splice(removeIndex, 1);

                    // save
                    post.save().then(post => res.json(post));
                })
                .catch((err) => {
                    res.status(404).json({
                        postnotfound: "no post found"
                    });
                });
        });

});




// #route POST api/posts/comment/:id                   #Private
// #desc add comment to post

router.post("/comment/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    // validation

    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    // checking validation
    if (!isValid) {
        // if any errors send 400 with errors object
        return res.status(400).json(errors);
    }


    Post.findById(req.params.id)
        .then((post) => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            // add to comments array
            post.comments.unshift(newComment);

            // save
            post.save().then((post) => {
                res.json(post);
            });

        })
        .catch((err) => {
            res.status(404).json({
                postnotfound: "no post found"
            });
        });
});



// #route DELETE api/posts/comment/:id/:comment_id                   #Private
// #desc remove comment from post

router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    Post.findById(req.params.id)
        .then((post) => {

            // check to see if comment exists
            if (post.comments.filter(
                    comment => comment._id.toString() === req.params.comment_id
                ).length === 0) {
                return res.status(404).json({
                    commentnotexists: "comment doesnt exists"
                });
            }

            // get remove index
            const removeIndex = post.comments
                .map((item) => {
                    item._id.toString()
                })
                .indexOf(req.params.comment_id);

            // splice comment out of array
            post.comments.splice(removeIndex, 1);

            post.save().then((post) => {
                res.json(post);
            });

        })
        .catch((err) => {
            res.status(404).json({
                postnotfound: "no post found"
            });
        });
});



module.exports = router;