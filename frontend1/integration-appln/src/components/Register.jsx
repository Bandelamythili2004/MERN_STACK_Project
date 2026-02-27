import axios from "axios";
import { useRef } from "react";
import {useNavigate} from "react-router-dom"
const Register = ()=>{
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const navigate = useNavigate();
    const register = async ()=>{
        try{
            const {data} = await axios.post("http://localhost:5000/api/auth/register",
                                {"name":ref1.current.value,"email":ref2.current.value,"password":ref3.current.value,"confirm password":ref4.current.value});
            const {message} = data;
            if(message == "Registration Success"){
              
                navigate("/login");
            }
        }catch(err){
            navigate("/error")
        }
    }
    return(
        <>
           {/* <div className="register_pg">
            <fieldset>
                <legend>Register</legend>
                <input type="text" ref={ref1} placeholder="Full Name"></input>
                <br></br>
                <input type="email" ref={ref2} placeholder="EMAIL"></input>
                <br></br>
                <input type="password" ref={ref3} placeholder="Password"></input>
                <br></br>
                <input type="confirm password" ref={ref4} placeholder="Confirm Password"></input>
                <button onClick={register}>Register</button>
                
            </fieldset>
            </div> */}
            
    <div className="register_pg">
        <div className="register_card">
            <h2>CREATE NEW ACCOUNT</h2>

            <div className="input_group">
                <span className="icon">👤</span>
                <input type="text" ref={ref1} placeholder="Full Name" />
            </div>

            <div className="input_group">
                <span className="icon">✉️</span>
                <input type="email" ref={ref2} placeholder="Email" />
            </div>

            <div className="input_group">
                <span className="icon">🔒</span>
                <input type="password" ref={ref3} placeholder="Password" />
            </div>

            <div className="input_group">
                <span className="icon">🔐</span>
                <input type="password" ref={ref4} placeholder="Confirm Password" />
            </div>

            

            <button onClick={register}>REGISTER</button>
        </div>
    </div>


        </>
    )
}
export default Register;