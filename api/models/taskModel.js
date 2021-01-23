const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: 'name cannot be blank'
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Include your phone number"]
    },
    address: {
      type: String,
      required: [true, "Please Include your address"]
    },
    debt: {
      type: String,
      required: 'debt cannot be blank(if there is not debt, enter 0)'
    }
  },
  { collection: 'task' }
);

module.exports = mongoose.model('task', taskSchema);
