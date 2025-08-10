const Listing = require("../models/listing");
const countries = require("i18n-iso-countries");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
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
    req.flash("error", "Listing you requested for doesn't exist!");
    res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let { location, country } = req.body.listing;
  let countryCode = countries.getAlpha2Code(country, "en");
  let params = new URLSearchParams({
    format: "json",
    city: location,
    countrycodes: countryCode.toLowerCase(),
    limit: "1",
    "accept-language": "en",
  });
  let mapUrl = `https://nominatim.openstreetmap.org/search?${params}`;
  let response = await fetch(mapUrl);
  let places = await response.json();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  if (places.length > 0) {
    let { lat, lon } = places[0];
    newListing.geometry = {
      type: "Point",
      coordinates: [Number.parseFloat(lon), Number.parseFloat(lat)],
    };
  }
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidators: true, new: true }
  );

  let { location, country } = req.body.listing;
  if (location && country) {
    let countryCode = countries.getAlpha2Code(country, "en");
    let params = new URLSearchParams({
      format: "json",
      city: location,
      countrycodes: countryCode.toLowerCase(),
      limit: "1",
      "accept-language": "en",
    });

    let mapUrl = `https://nominatim.openstreetmap.org/search?${params}`;
    let response = await fetch(mapUrl);
    let places = await response.json();

    if (places.length > 0) {
      let { lat, lon } = places[0];
      listing.geometry = {
        type: "Point",
        coordinates: [Number.parseFloat(lon), Number.parseFloat(lat)],
      };
    }
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
