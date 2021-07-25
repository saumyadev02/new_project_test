const bcrypt = require("bcrypt"),
  Messages = require("../models/messages");

const addMessage = async (formData) => {
  let msg;
  const message = new Messages({
    userId: formData.userId,
    userEmail: formData.userEmail,
    userPhone: formData.userPhone,
    message: formData.message,
    createOn: Date.now(),
  });
  try {
    msg = await message.save();
  } catch (error) {
    msg = null;
  }
  return msg;
};

exports.addMessage = addMessage;
