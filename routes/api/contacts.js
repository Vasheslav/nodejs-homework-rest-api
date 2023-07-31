const express = require("express");
const router = express.Router();

const { validateData } = require("../../decorators/contactValidations");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contactsController");
const {
  isEmptyBody,
  isEmptyBodyFavorite,
} = require("../../middlewares/isEmptyBody");
const { isValidId } = require("../../middlewares/isValidId");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../shemas/contacts-schemas");

router.get("/", listContacts);
router.get("/:id", isValidId, getContactById);
router.post("/", isEmptyBody, validateData(contactAddSchema), addContact);
router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateData(contactAddSchema),
  updateContact,
);
router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBodyFavorite,
  validateData(contactUpdateFavoriteSchema),
  updateFavorite,
);
router.delete("/:id", isValidId, removeContact);

module.exports = router;
