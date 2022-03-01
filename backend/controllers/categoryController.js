const Category = require("../models/categoryModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

// Create Category -- Admin
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  
    const category = await Category.create(req.body)
  
    res.status(201).json({
        success: true,
        category
    })
})

// Get Admin Category -- Admin
exports.getAdminCategory = catchAsyncErrors(async (req, res) => {
    
    const category = await Category.find()

    res.status(200).json({
        success: true,
        category,
    })
})

// Update Category -- Admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    
    let category = await Category.findById(req.params.id)

    if(!category){
        return next(new ErrorHandler("Category not found", 404))
    }
    
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        category
    })
})

// Delete Category -- Admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id)

    if(!category){
        return next(new ErrorHandler("Category not found", 404))
    }

    await category.remove()

    res.status(200).json({
        success: true,
        message: "Category delete successfully"
    })
})