const express = require("express")
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utlis/wrapAsync");
const {listingSchema,reviewSchema} = require("../schema.js"); 
const Listing = require("../models/listing.js")
const Review = require("../models/review.js")
const expressError = require("../utlis/expressError.js");
const{validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js")





//Reviews
//post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))

//Delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))


module.exports = router;