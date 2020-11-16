const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// importing validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");


// importing Profile model
const Profile = require("../../models/Profile");

// importing User model
const User = require("../../models/User");

const router = express.Router();

// #route GET api/profile/search                    #Private
// #search users with that name

router.get("/search/:name", (req, res) => {

    let to_search = req.params.name;

Profile.find({"handle" : new RegExp(to_search, 'i') })
    .populate("user", ["name", "avatar"])
    .then((users)=>{
        res.json(users);
    })
    .catch((err)=>{
        console.log(err);
    });
});


// #route GET api/profile                  #Private
// #desc get current user profile
router.get("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const errors = {};

    Profile.findOne({
            user: req.user.id
        })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = "there is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});



// #route GET api/profile/all                #public
// #desc get all profiles

router.get("/all", (req, res) => {

    const errors = {};

    Profile.find()
        .populate("user", ["name", "avatar"])
        .then((profiles) => {
            if (!profiles) {
                errors.noprofile = "there are no profiles";
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});


// #route GET api/profile/handle/:handle                   #public
// #desc get profile by handle

router.get("/handle/:handle", (req, res) => {
    const errors = {};

    Profile.findOne({
            handle: req.params.handle
        })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = "there is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((err) => {
            res.status(404).json({
                profile: "there are no profiles"
            });
        });
});


// #route GET api/profile/user/:user_id                   #public
// #desc get profile by user_id

router.get("/user/:user_id", (req, res) => {
    const errors = {};

    Profile.findOne({
            user: req.params.user_id
        })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = "there is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((err) => {
            res.status(404).json({
                profile: "there is no profile for this user"
            });
        });
});




// #route POST api/profile/                   #Private
// #desc create or update user profile

router.post("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
        //return any errors with 400 status
        return res.status(400).json(errors);
    }

    // getting fields 
    const profile_fields = {};

    profile_fields.user = req.user.id;

    if (req.body.handle) profile_fields.handle = req.body.handle;
    if (req.body.company) profile_fields.company = req.body.company;
    if (req.body.website) profile_fields.website = req.body.website;
    if (req.body.location) profile_fields.location = req.body.location;
    if (req.body.bio) profile_fields.bio = req.body.bio;
    if (req.body.status) profile_fields.status = req.body.status;
    if (req.body.github_username) profile_fields.github_username = req.body.github_username;

    // skills
    if (typeof req.body.skills !== "undefined") {
        profile_fields.skills = req.body.skills.split(",");
    }

    // social
    profile_fields.social = {};

    if (req.body.youtube) profile_fields.social.youtube = req.body.youtube;
    if (req.body.twitter) profile_fields.social.twitter = req.body.twitter;
    if (req.body.facebook) profile_fields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profile_fields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profile_fields.social.instagram = req.body.instagram;

    Profile.findOne({
            user: req.user.id
        })
        .then((profile) => {
            // update
            if (profile) {
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profile_fields
                    }, {
                        new: true
                    })
                    .then((profile) => {
                        res.json(profile);
                    });
            } else {
                // create

                // check if handle exists
                Profile.findOne({
                        handle: profile_fields.handle
                    })
                    .then((profile) => {
                        if (profile) {
                            errors.handle = "that handle already exists";
                            res.status(400).json(errors);
                        }


                        // save profile
                        new Profile(profile_fields).save()
                            .then((profile) => {
                                res.json(profile);
                            });
                    });
            }
        });


});



// #route POST api/profile/experience                   #Private
// #desc add experience to profile
router.post("/experience", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateExperienceInput(req.body);

    // check validation
    if (!isValid) {
        //return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({
            user: req.user.id
        })
        .then((profile) => {

            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // add to experience array
            profile.experience.unshift(newExp);

            profile.save().then((profile) => {
                res.json(profile);
            });

        });
});





// #route POST api/profile/education                #Private
// #desc add education to profile
router.post("/education", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateEducationInput(req.body);

    // check validation
    if (!isValid) {
        //return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({
            user: req.user.id
        })
        .then((profile) => {

            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                field_of_study: req.body.field_of_study,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // add to experience array
            profile.education.unshift(newEdu);

            profile.save().then((profile) => {
                res.json(profile);
            });

        });
});




// #route DELETE api/profile/experience/:exp_id              #Private
// #desc delete experience from profile
router.delete("/experience/:exp_id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    Profile.findOne({
            user: req.user.id
        }).then(profile => {
            // get remove index

            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);


            // splice out of array
            profile.experience.splice(removeIndex, 1);

            //save 
            profile.save().then((profile) => {
                res.json(profile);
            })
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});



// #route DELETE api/profile/education/:edu_id              #Private
// #desc delete education from profile
router.delete("/education/:edu_id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    Profile.findOne({
            user: req.user.id
        }).then(profile => {
            // get remove index

            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);


            // splice out of array
            profile.education.splice(removeIndex, 1);

            //save 
            profile.save().then((profile) => {
                res.json(profile);
            })
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});




// #route DELETE api/profile              #Private
// #desc delete user and profile
router.delete("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

   Profile.findOneAndRemove({user: req.user.id})
   .then(()=>{
       User.findOneAndRemove({_id: req.user.id })
       .then(()=>{
           res.json({success: true});
       })
   })
});

module.exports = router;