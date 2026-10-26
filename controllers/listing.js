const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapTocken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapTocken });

module.exports.index = async (req, res) => {

  const { category, search } = req.query;

    let query = {};

    
    if (category) {
        query.category = category;
    }

  
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }

    const allListings = await Listing.find(query);

    res.render("listings/index.ejs", {
        allListings,
        category,
        search
    });


};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  
  let url = req.file.path;
  let filename = req.file.filename;

  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  newlisting.geometry = response.body.features[0].geometry;

  let savelisting = await newlisting.save();
  console.log(savelisting);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let OriginalImageUrl = listing.image.url;
  OriginalImageUrl = OriginalImageUrl.replace("/upload", "/upload/h_300,w_250");

  res.render("listings/edit.ejs", { listing, OriginalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
 
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    console.log(listing);
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);

  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
