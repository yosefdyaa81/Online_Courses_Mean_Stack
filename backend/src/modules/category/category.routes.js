const express = require("express");

const categoryController = require("./category.controller");

const {
  createCategorySchema,
  updateCategorySchema,
} = require("./category.validation");

const validate = require("../../middlewares/validate.middleware");
const { restrictTo, protect } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/",
  protect,
  restrictTo("admin"),
  validate(createCategorySchema),
  categoryController.createCategory,
);

router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

router.delete("/:id", restrictTo("admin"), categoryController.deleteCategory);

module.exports = router;
