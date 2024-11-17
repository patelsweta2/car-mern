const Car = require("../models/car");
const uploadToCloudinary = require("../utils/cloudinary");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary").v2;

const addCarController = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = [];

    if (!title || !description || !tags || !images) {
      throw new CustomError("All fields are required", 400);
    }

    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      throw new CustomError("User not authenticated", 401);
    }

    // Check if the number of images exceeds 10
    if (req.files && req.files.length > 10) {
      throw new CustomError("You can only upload up to 10 images.", 400);
    }

    // handling image uploads
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadToCloudinary(req.files[i].path);
        if (result && result.secure_url) {
          images.push(result.secure_url);
        } else {
          console.error("Failed to upload image:", result);
          // Log if upload fails
        }
      }
    }

    // create a new car
    const newCar = new Car({
      title,
      description,
      tags: JSON.parse(tags),
      images,
      user: req.user.userId,
    });

    // Save the car to the database
    await newCar.save();

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Failed to add car" });
  }
};

const getAllCarsController = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.userId })
      .select("title tags images")
      .lean();

    // for each car, we keep only the first image
    const carsList = cars.map((car) => {
      return {
        title: car.title,
        tags: car.tags,
        image: car.images.length > 0 ? car.images[0] : null,
      };
    });
    res.status(200).json({
      message: "Cars retrieved successfully",
      cars: carsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve cars" });
  }
};

const globalSearchCarsController = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      throw new CustomError("Keyword is required for search", 400);
    }

    //search query
    const cars = await Car.find({
      user: req.user.userId,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $elemMatch: { $regex: keyword, $options: "i" } } },
      ],
    })
      .select("title description tags images")
      .lean();

    res.status(200).json({
      message: "Search result retrieve successfully",
      cars,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to perform search" });
  }
};

const getCarDetailsController = async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findOne({
      _id: carId,
      user: req.user.userId,
    })
      .select("title description tags images")
      .lean();

    if (!car) {
      throw new CustomError("Car not found", 404);
    }

    // send the car details as a response
    res.status(200).json({
      message: "Car details fetched successfully",
      car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch car details" });
  }
};

const updateCarController = async (req, res) => {
  try {
    const { carId } = req.params;
    const { title, description, tags } = req.body;
    const images = [];

    // Find the car by ID and check if it belongs to the logged-in user
    const car = await Car.findOne({
      _id: carId,
      user: req.user.userId,
    });
    if (!car) {
      throw new CustomError("Car not found", 404);
    }

    //check the no of images that should be under 10
    if (req.files && req.files.length > 10) {
      throw new CustomError("You can only upload upto 10 images", 400);
    }

    //upload new images to cloudinary
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadToCloudinary(req.files[i].path);
        if (result) {
          images.push(result.secure_url);
        }
      }
    }

    //update car details with the new data
    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags || car.tags;

    // Replace images only if new images are provided; otherwise, keep existing ones
    if (images.length > 0) {
      car.images = images;
    }

    //save the updated car
    await car.save();

    res.status(200).json({
      message: "car updated successfully",
      car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to update car" });
  }
};

const deleteCarController = async (req, res) => {
  try {
    const { carId } = req.params;

    //find the car by id and check ownership
    const car = await Car.findOne({
      _id: carId,
      user: req.user.userId,
    });
    if (!car) {
      return res
        .status(404)
        .json({ message: "Car not found or not authorized" });
    }
    //delete image from cloudinary
    if (car.images && car.images.length > 0) {
      for (let imageUrl of car.images) {
        const publicId = extractCloudinaryPublicId(imageUrl);
        await deleteFromCloudinary(publicId);
      }
    }

    //delete the car from the database
    await car.deleteOne();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete car" });
  }
};

// extract Cloudinary publicId from the image URL
const extractCloudinaryPublicId = (imageUrl) => {
  const parts = imageUrl.split("/");
  const fileName = parts[parts.length - 1];
  return fileName.split(".")[0];
};

// delete an image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error.message);
  }
};

module.exports = {
  addCarController,
  getAllCarsController,
  globalSearchCarsController,
  getCarDetailsController,
  updateCarController,
  deleteCarController,
};
