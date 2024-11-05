"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignIn = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const url = "http://localhost:4000";

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignIn = async (e) => {
    e.preventDefault();

    const data = {
      emailOrPhone,
      password,
    };

    try {
      const response = await axios.post(`${url}/api/user/login`, data);
      if (response.data.success) {

        localStorage.setItem("token", response.data.token);

        router.push("/home");
      } else {
        console.error("Login error:", response.data.message);
      }
    } catch (error) {
      console.error("Sign-in failed:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <div className={styles.card}>
          <Image
            src="/img/cross-ash.svg"
            alt="Close"
            height={24}
            width={24}
            className={styles.closeIcon}
          />
          <h2 className={styles.heading}>Sign In</h2>
          <div className={styles.inputFieldWrapper}>
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
                alt="Show Password"
                height={24}
                width={24}
                className={styles.eyeIcon}
                onClick={togglePassword}
              />
            </div>

            <button className={styles.signUpButton} onClick={onSignIn}>
              Sign In
            </button>
            <p className={styles.signInText}>
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/sign-up")}
                className={styles.signInLink}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
