"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const url="http://localhost:4000"
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onRegister = async(e) =>{
    e.preventDefault()

    let new_url = url;
    new_url += "/api/user/register";
    
  }

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.card}>
        <Image src="/img/cross-ash.svg" height={24} width={24} />
        <h2 className={styles.heading}>Sign In</h2>
        <div className={styles.inputFieldWrapper}>
          <p className={styles.inName}>Email or Phone Number</p>
          <input type="text" placeholder="" className={styles.inputField} />
          <p className={styles.inName}>Password</p>
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={styles.inputField}
            />
            <Image
              src="/img/eye.svg"
              height={24}
              width={24}
              onClick={togglePassword}
            />
          </div>
          <button className={styles.signUpButton} onClick={() => router.push("/home")}>Sign In</button>
          <p className={styles.signInText}>Already have an account? <span onClick={()=>router.push("/login")} className={styles.signInLink}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
