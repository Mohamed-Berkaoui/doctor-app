import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./DoctorRegister.css";
import appAxios from "../utils/appAxios";
import { useDoctor } from "../context/DoctorContext";

export default function LoginDoctor() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const {login,logout,token}=useDoctor()
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await appAxios.post("/auth/login", {
                email: form.email,
                password: form.password,
            });

            if (!res.data || res.data.status !== "success") {
                return toast.error("Login failed. Please try again.");
            }
            
            const  {token,user}  = res.data.data;
            login(token,user);
            setForm({ email: "", password: "" });
            setLoading(false);
            toast.success("Login successful!");
            navigate("/dashboard/doctor");
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    return (
        <div className="doctor-register-container">
            <form className="doctor-register-form" onSubmit={handleSubmit}>
                <h2>Doctor Login</h2>
                {error && <div className="error">{error}</div>}
                <label>
                    Email*
                    <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password*
                    <input
                        type="password"
                        name="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Login</button>
                <div className="login-link">
                    Don't have an account? <Link to="/dashbord/register">Register</Link>
                </div>
            </form>
        </div>
    );
}