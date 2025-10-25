const { default: mongoose } = require("mongoose");


const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  photo: String,
  description: String,
});

// homeSchema.pre("findOneAndDelete", async function (next) {
//   console.log("Home Pre Hook while Deleting the home");
//   const homeId = this.getQuery()["_id"];
//   await favourite.deleteMany({ houseId: homeId });
//   next();
// });

module.exports = mongoose.model("Home", homeSchema);

/*

save()
find()  
findById(homeId)
deleteById(homeId)

*/
