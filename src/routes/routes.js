const express = require("express");
const router = express.Router();
const passport = require("../auth/auth");

const searchController = require("../controllers/searchController");
const userController = require("../controllers/user");

/**No requiere de autenticacion**/
router.get("/profile/:id", searchController.getProfile);
router.get("/profiles", searchController.getProfiles);
/*Requiere autenticacion */ 
router.post("/profile", passport.auth, searchController.saveProfile);
router.put("/profiles/:id" , passport.auth, searchController.updateProfile)
router.delete("/profile/:id" , passport.auth, searchController.deleteProfile)


router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
