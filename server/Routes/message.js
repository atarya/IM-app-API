const express = require("express");
const {
    allMessages,
    sendMessage,
} = require("../Controllers/message");
const { protect } = require("../Middleware/auth");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;