// const mongoose = require("mongoose");
// const laptopSchema = new mongoose.Schema({
//     pname:{type:String,required:true},
//     pid:{type:Number,required:true},
//     pcost:{type:Number},
//     img:{type:String,required:true},
//     pqty:{type:Number}
// })
// module.exports = mongoose.model("Laptop",laptopSchema);
const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
  pname: { type: String, required: true },
  pid: { type: Number, required: true, unique: true },
  pcost: { type: Number, required: true },
  img: { type: String, required: true },
  pqty: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Laptop", laptopSchema);