const express = require("express");
const router = express.Router();

const { validateData } = require("../../helpers/contactValidations");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../helpers/contactsController");

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", validateData, addContact);
router.delete("/:id", removeContact);
router.put("/:id", validateData, updateContact);

module.exports = router;
