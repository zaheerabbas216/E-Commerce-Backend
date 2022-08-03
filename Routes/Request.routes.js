const express = require("express");

const router = express.Router();

const RequestController = require("../Controllers/Request.controller");

router.post("/newrequest", RequestController.createRequest);
router.get("/getrequest", RequestController.getAllRequests);
router.get("/:id", RequestController.getRequestById);

module.exports = router;
