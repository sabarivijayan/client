"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/context/store-context";
import axios from "axios";

const SignIn = () => {
  const url = "http://localhost:4000";
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState({});
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onRegister = async (e) => {
    e.preventDefault();

    let new_url = url;
    new_url += "/api/user/register";
    const response = await axios.post(new_url, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      loadCartData({ token: response.data.token });
      router.push("/login");
    } else {
      console.log("Error: ", response.data.message);
    }
  };

  return (
    // <div className={styles.container}>
    //   <div className={styles.backgroundImage}>
    //     <div className={styles.card}>
    //       <Image src="/img/cross-ash.svg" height={24} width={24} />
    //       <h2 className={styles.heading}>Sign In</h2>
    //       <div className={styles.inputFieldWrapper}>
    //         <p className={styles.inName}>Email or Phone Number</p>
    //         <input type="text" placeholder="" className={styles.inputField} />
    //         <p className={styles.inName}>Password</p>
    //         <div className={styles.passwordField}>
    //           <input
    //             type={showPassword ? "text" : "password"}
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             placeholder="Enter your password"
    //             className={styles.inputField}
    //           />
    //           <Image
    //             src="/img/eye.svg"
    //             height={24}
    //             width={24}
    //             onClick={togglePassword}
    //           />
    //         </div>
    //         <button className={styles.signUpButton} onClick={onRegister}>
    //           Sign In
    //         </button>
    //         <p className={styles.signInText}>
    //           Already have an account?{" "}
    //           <span
    //             onClick={() => router.push("/login")}
    //             className={styles.signInLink}
    //           >
    //             Sign Up
    //           </span>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
<div className={styles.container}>
<div className={styles.backgroundImage}>
<div className={styles.card}>
<Image src="/img/cross-ash.svg" height={24} width={24} />
    <h2 className={styles.heading}>Sign Up</h2>
    <div className={styles.inputFieldWrapper}>
        <p className={styles.inName}>Name</p>
        <input type="text" placeholder="" className={styles.inputField}/>

        <p className={styles.inName}>Email or Phone Number</p>
        <input type="text" placeholder="" className={styles.inputField}/>
        <p className={styles.inName}>Password</p>
        <div className={styles.passwordField}>
            <input type="password" placeholder="" className={styles.inputField}/>
            <Image
                 src="/img/eye.svg"
                 height={24}
                 width={24}
                 onClick={togglePassword}           /> 
        </div>

        <button className={styles.signUpButton} onClick={onRegister}>
               Sign In
             </button>
             <p className={styles.signInText}>
               Already have an account?{" "}
               <span
                 onClick={() => router.push("/login")}
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

export default SignIn;
