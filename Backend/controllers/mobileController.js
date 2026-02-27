const Mobile = require("../models/Mobile");
exports.getAllMobiles = async (req,res)=>{
    try{
        const mobiles = await Mobile.find();
        res.status(200).json(mobiles);
    }catch(err){
        return res.status(500).json({"message":"internal server error"});
    }
}
exports.buyMobile = async (req, res) => {
    try {
        const { id, qty } = req.body;

        const mobile = await Mobile.findById(id);

        if (!mobile) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (mobile.pqty <= 0) {
            return res.status(400).json({ message: "Sold Out" });
        }

        if (qty > mobile.pqty) {
            return res.status(400).json({
                message: `Only ${mobile.pqty} left in stock`
            });
        }

        // 🔥 Reduce Stock
        mobile.pqty -= qty;
        await mobile.save();

        res.status(200).json({
            message: "Purchase successful",
            remainingStock: mobile.pqty
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};