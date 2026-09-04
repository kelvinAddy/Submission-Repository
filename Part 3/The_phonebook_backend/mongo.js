require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(uri, { family: 4 })
  .then((res) => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.error("Database failed to connect" + err.message);
  });

const phoneRegex = /^\d{2,3}-\d+$/;

const personSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    number: { type: String, required: true, minLength: 8, validate: { validator: (val) => phoneRegex.test(val), message: (props) => `${props.value} is not a valid phone number` } },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const PersonModel = mongoose.model("Person", personSchema);

module.exports = { PersonModel };
