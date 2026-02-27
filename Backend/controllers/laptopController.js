// const Laptop = require("../models/Laptop");
// exports.getAllLaptops = async (req,res)=>{
//     try{
//         const laptops = await Laptop.find();
//         res.status(200).json(laptops);
//     }catch(err){
//         return res.status(500).json({"message":"internal server error"});
//     }
// }
const Laptop = require("../models/Laptop");

// ✅ Get All Laptops
exports.getAllLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.status(200).json(laptops);
    } catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
};

// ✅ Buy Laptop (Reduce Stock)
// exports.buyLaptop = async (req, res) => {
//     try {
//         const { id, qty } = req.body;

//         const laptop = await Laptop.findById(id);

//         if (!laptop) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         if (laptop.pqty <= 0) {
//             return res.status(400).json({ message: "Sold Out" });
//         }

//         if (qty > laptop.pqty) {
//             return res.status(400).json({
//                 message: `Only ${laptop.pqty} left in stock`
//             });
//         }

//         // 🔥 Reduce Quantity
//         laptop.pqty -= qty;
//         await laptop.save();

//         res.status(200).json({
//             message: "Purchase successful",
//             remainingStock: laptop.pqty
//         });

//     } catch (err) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };
exports.buyLaptop = async (req, res) => {
    try {
        const { id, qty } = req.body;

        const laptop = await Laptop.findById(id);

        if (!laptop) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (laptop.pqty <= 0) {
            return res.status(400).json({ message: "Sold Out" });
        }

        laptop.pqty -= qty;
        await laptop.save();

        res.status(200).json({ message: "Purchase successful" });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
