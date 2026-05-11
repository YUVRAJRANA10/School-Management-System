const express = require("express");
const {
	addSchool,
	listSchools,
	listAllSchools,
} = require("../controllers/school.controller");

const router = express.Router();

router.post("/addSchool", addSchool);
router.get("/listSchools", listSchools);
router.get("/schools", listAllSchools);

module.exports = router;
