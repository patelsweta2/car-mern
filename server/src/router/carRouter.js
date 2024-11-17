const express = require("express");
const authMiddleware = require("../middleware/authMiddleWare");
const { upload } = require("../middleware/uploads");
const {
  addCarController,
  getAllCarsController,
  globalSearchCarsController,
  getCarDetailsController,
  updateCarController,
  deleteCarController,
} = require("../controller/carController");

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  upload.array("images", 10),

  addCarController
);

router.get("/all", authMiddleware, getAllCarsController);

router.get("/search", authMiddleware, globalSearchCarsController);

router.get("/:carId", authMiddleware, getCarDetailsController);

router.put(
  "/:carId",
  authMiddleware,
  upload.array("images", 10),
  updateCarController
);

router.delete("/:carId", authMiddleware, deleteCarController);

module.exports = router;
