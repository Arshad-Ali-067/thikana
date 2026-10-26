const express = require("express")
const router = express.Router();//router object//
const wrapAsync = require("../utlis/wrapAsync");
const expressError = require("../utlis/expressError.js");
const {listingSchema,reviewSchema} = require("../schema.js"); 
const Listing = require("../models/listing.js")
const {isLoggedIn,validateListing,isOwner} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.createListing))

router.get("/new",isLoggedIn,listingController.renderNewForm)

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,upload.single("listing[image]"),wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))



router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))














//Index Route
// router.get("/",wrapAsync(listingController.index))

//New route
// router.get("/new",isLoggedIn,listingController.renderNewForm)

//create route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing))

//Show Route
// router.get("/:id",wrapAsync(listingController.showListing))

//edit Route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))

//Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))


//Delete Route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))

module.exports = router;