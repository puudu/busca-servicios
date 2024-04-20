const mongoose = require("mongoose");
const Service = require("./serviceModel");

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String },
    rating: {
      type: Number,
      required: [true, "La reseña debe tener una valoración"],
      min: [1, "La valoración debe ser mayor a 1"],
      max: [5, "La valoración debe ser menor o igual a 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    service: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: [true, "La reseña debe estar asociado a un servicio"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "La reseña debe estar asociado a un usuario"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username photo",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (serviceId) {
  const stats = await this.aggregate([
    {
      $match: { service: serviceId },
    },
    {
      $group: {
        _id: "$service",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats > 0) {
    await Service.findByIdAndUpdate(serviceId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Service.findByIdAndUpdate(serviceId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.service);
});

reviewSchema.index({ service: 1, user: 1 }, { unique: true }); // un usuario solo puede crear una review por servicio

reviewSchema.post(/^findOneAnd/, async function () {
  this.r.constructor.calcAverageRatings(this.r.tserviceoserviceur);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
