const express = require("express")
const {
    getAdminCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController")
const {
    
} = require("../controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router()

router.route("/admin/categories").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCategory)
router.route("/admin/categories/new").post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
router.route("/admin/categories/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
router.route("/admin/categories/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory)

module.exports = router