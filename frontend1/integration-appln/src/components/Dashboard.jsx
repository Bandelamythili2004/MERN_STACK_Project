import Header from "./Header";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
// import "./Dashboard.css";   // 👈 make sure this file exists

const Dashboard = () => {
    const ref1 = useRef(null);
    const [res, setRes] = useState({});
    const [showChat, setShowChat] = useState(false);

    const chat = async () => {
        if (!ref1.current.value) return;

        const { data } = await axios.post(
            "http://127.0.0.1:8000/chat",
            { message: ref1.current.value }
        );

        setRes(data);
        ref1.current.value = "";
    };

    return (
        <>
            <Header />

            {/* Category Links */}
            <div className="category-links text-center mt-4">
                <Link to="laptops" className="mx-3">Laptops</Link>
                <Link to="mobiles" className="mx-3">Mobiles</Link>
                <Link to="watches" className="mx-3">Watches</Link>
            </div>

            <Outlet />

            {/* 💬 Floating Chat Button */}
            <button
                className="btn btn-primary chat-button"
                onClick={() => setShowChat(!showChat)}
            >
                <i className="fa fa-comments"></i>
            </button>

            {/* 💬 Chat Popup Box */}
            {showChat && (
                <div className="chat-box">
                    <h5>Chat Assistant</h5>

                    <textarea
                        ref={ref1}
                        placeholder="Enter your message..."
                        className="form-control"
                    ></textarea>

                    <br />

                    <button
                        className="btn btn-success w-100"
                        onClick={chat}
                    >
                        Send
                    </button>

                    <br /><br />

                    <div className="chat-response">
                        <strong>Response:</strong>
                        <p>{res.bot_response}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
