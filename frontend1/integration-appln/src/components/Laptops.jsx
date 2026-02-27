import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Laptops = () => {

    const [laptops, setLaptops] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const { addToCart } = useCart();
    const navigate = useNavigate();

    // 🔹 Fetch laptops
    const get_laptops = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/all",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setLaptops(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        get_laptops();
    }, []);

    // ✅ REAL BUY NOW WITH RAZORPAY
    const handleBuy = async (item) => {
        try {
            setLoadingId(item._id);

            // 1️⃣ Create Order
            const res = await fetch(
                "http://localhost:5000/api/payment/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: item.pcost,
                        userId: "demoUser123",
                    }),
                }
            );

            const data = await res.json();

            if (!data.success) {
                alert("Order creation failed");
                setLoadingId(null);
                return;
            }

            // 2️⃣ Open Razorpay
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: "INR",
                name: item.pname,
                description: "Buy Now Payment",
                order_id: data.order.id,

                handler: async function (response) {

                    // 3️⃣ Verify Payment
                    const verifyRes = await fetch(
                        "http://localhost:5000/api/payment/verify-payment",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                ...response,
                                amount: item.pcost,
                                userId: "demoUser123",
                            }),
                        }
                    );

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {

                        // 4️⃣ Reduce stock after successful payment
                        await axios.post(
                            "http://localhost:5000/api/buy",
                            { id: item._id, qty: 1 },
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }
                        );

                        alert("✅ Payment Successful!");
                        get_laptops();
                    } else {
                        alert("❌ Payment Verification Failed");
                    }

                    setLoadingId(null);
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.log(err);
            alert("Payment Failed");
            setLoadingId(null);
        }
    };

    return (
        <div className="laptops_pg">

            <div className="product-container">
                {laptops.map((item) => (
                    <div className="card" key={item._id}>
                        <img src={item.img} alt={item.pname} />
                        <h2>{item.pname}</h2>
                        <h4>ID : {item.pid}</h4>
                        <p>₹ {item.pcost}</p>

                        {item.pqty > 0 ? (
                            <>
                                <p style={{ color: "green", fontWeight: "bold" }}>
                                    In Stock ({item.pqty})
                                </p>

                                {/* ✅ ADD TO CART → GO TO CART PAGE */}
                                <button onClick={() => {
                                    addToCart(item, 1);
                                    navigate("/cart");
                                }}>
                                    Add To Cart
                                </button>

                                <br /><br />

                                {/* ✅ BUY NOW DIRECT PAYMENT */}
                                <button
                                    onClick={() => handleBuy(item)}
                                    disabled={loadingId === item._id}
                                >
                                    {loadingId === item._id ? "Processing..." : "Buy Now"}
                                </button>
                            </>
                        ) : (
                            <p style={{ color: "red", fontWeight: "bold" }}>
                                Sold Out
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="page-navigation">
                <button
                    className="next-btn"
                    onClick={() => navigate("/dashboard/mobiles")}
                >
                    Next ➜
                </button>
            </div>

        </div>
    );
};

export default Laptops;