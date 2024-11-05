"use client";
import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/context/store-context";
import axios from "axios";

const SignUp = () => {
  const url = "http://localhost:4000";
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const togglePassword = () => setShowPassword(!showPassword);

  const onRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      emailOrPhone,
      password,
    };

    try {
      const response = await axios.post(`${url}/api/user/register`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        router.push("/sign-in");
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <div className={styles.card}>
          <Image src="/img/cross-ash.svg" height={24} width={24} alt="close icon"/>
          <h2 className={styles.heading}>Sign Up</h2>
          <div className={styles.inputFieldWrapper}>
            <p className={styles.inName}>Name</p>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className={styles.inputField} 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />

            <p className={styles.inName}>Email or Phone Number</p>
            <input 
              type="text" 
              placeholder="Enter your email or phone number" 
              className={styles.inputField} 
              value={emailOrPhone} 
              onChange={(e) => setEmailOrPhone(e.target.value)} 
            />

            <p className={styles.inName}>Password</p>
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                src="/img/eye.svg"
                height={24}
                width={24}
                onClick={togglePassword}
                alt="toggle visibility"
              />
            </div>

            <button className={styles.signUpButton} onClick={onRegister}>
              Sign Up
            </button>
            <p className={styles.signInText}>
              Already have an account?{" "}
              <span
                onClick={() => router.push("/sign-in")}
                className={styles.signInLink}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
