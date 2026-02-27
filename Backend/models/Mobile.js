// const mongoose = require("mongoose");
// const mobileSchema = new mongoose.Schema({
//     pname:{type:String,required:true},
//     pid:{type:Number,required:true},
//     pcost:{type:Number,required:true},
//     img:{type:String,required:true},
//     pqty:{type:Number}
// })
// module.exports = mongoose.model("Mobile",mobileSchema,)

const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  pname: { type: String, required: true },
  pid: { type: Number, required: true, unique: true }, // ✅ unique id
  pcost: { type: Number, required: true },
  img: { type: String, required: true },
  pqty: { type: Number, required: true, default: 0 } // ✅ default stock 0
}, { timestamps: true }); // ✅ adds createdAt & updatedAt

module.exports = mongoose.model("Mobile", mobileSchema);