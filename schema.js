const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.object({
      url: Joi.string().allow("", null),
      filename: Joi.string().allow("", null),
    }),
    reviews: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    category: Joi.string().valid(
      "Rooms",
      "Iconic Cities",
      "Mountains",
      "Castles",
      "Amazing Pools",
      "Camping",
      "Farms",
      "Arctic",
      "Other"
    ),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
    author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }).required(),
});
