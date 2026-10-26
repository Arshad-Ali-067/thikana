
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.profile = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be logged in to view your profile");
      return res.redirect("/login");
    }

    // Find listings created by the logged-in user
    const myListings = await Listing.find({
      owner: req.user._id
    });

    // Find reviews written by the logged-in user
    const myReviews = await Review.find({
      author: req.user._id
    })
      .sort({ createdAt: -1 })
      .lean();

    // Find listings containing those reviews
    const listings = await Listing.find({
      reviews: { $in: myReviews.map(review => review._id) }
    })
      .select("title location reviews")
      .lean();

    // Attach the matching listing to each review
    myReviews.forEach(review => {
      review.listing = listings.find(listing =>
        listing.reviews.some(id =>
          id.toString() === review._id.toString()
        )
      );
    });

    // Render the profile page
    res.render("users/profile.ejs", {
      myListings,
      myReviews
    });

  } catch (err) {
    next(err);
  }
};
