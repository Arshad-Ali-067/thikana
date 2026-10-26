 const joi = require('joi');
 
 
module.exports.listingSchema = joi.object({
  listing : joi.object({
    title : joi.string().required(),
    description : joi.string().required(),
    location : joi.string().required(),
    country : joi.string().required(),
    price : joi.number().required().min(0),
    image : joi.object({
      url : joi.string().required(),
      filename : joi.string().required()
    }),
    category: joi.string()
  .valid(
    "Trending",
            "Design",
            "TreeHouse",
            "Luxe",
            "Bedroom",
            "Iconic",
            "Beach",
            "Pools",
            "Camping",
            "Dine",
            "Bars",
            "Cafe",
            "Spa"
  ).required(),
  }).required()

 })

 module.exports.reviewSchema = joi.object({
  review : joi.object({
    rating : joi.number().required().min(1).max(5),
comment : joi.string().required()



  }).required()
 })