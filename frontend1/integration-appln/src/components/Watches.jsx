import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Watches = () => {
    const [watches, setWatches] = useState([]);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const get_watches = async () => {
        const { data } = await axios.get("http://localhost:5000/api/watches", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        setWatches(data);
    };

    useEffect(() => {
        get_watches();
    }, []);

    // ✅ BUY NOW FUNCTION
    const handleBuy = async (item) => {
        try {

            // 1️⃣ Create Order
            const res = await fetch("http://localhost:5000/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: item.pcost,
                    userId: "demoUser123",
                }),
            });

            const data = await res.json();

            if (!data.success) {
                alert("Order creation failed");
                return;
            }

            // 2️⃣ Razorpay Options
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: "INR",
                name: "My E-Commerce Store",
                description: "Watch Purchase",
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
                                products: [
                                    {
                                        ...item,
                                        quantity: 1,
                                        category: "watch" // ✅ IMPORTANT
                                    }
                                ],
                            }),
                        }
                    );

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        alert("✅ Payment Successful!");
                        navigate("/order-success");
                    } else {
                        alert("❌ Payment Verification Failed");
                    }
                },

                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function () {
                alert("❌ Payment Failed");
            });

            rzp.open();

        } catch (err) {
            console.error(err);
            alert("Payment Failed");
        }
    };

    return (
        <div className="watches_pg">
            <div className="product-container">
                {watches.map((item) => (
                    <div className="card" key={item.pid}>
                        <img src={item.img} alt={item.pname} />
                        <h2>{item.pname}</h2>
                        <h4>ID : {item.pid}</h4>
                        <p>₹ {item.pcost}</p>
                        <h5>Qty: {item.pqty}</h5>

                        {item.pqty > 0 ? (
                            <>
                                <p style={{ color: "green", fontWeight: "bold" }}>
                                    In Stock ({item.pqty})
                                </p>

                                <button onClick={() => addToCart(item, 1)}>
                                    Add To Cart
                                </button>

                                <br /><br />

                                <button onClick={() => handleBuy(item)}>
                                    Buy Now
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
                    className="prev-btn"
                    onClick={() => navigate("/dashboard/mobiles")}
                >
                    ⬅ Previous
                </button>
            </div>
        </div>
    );
};

export default Watches;