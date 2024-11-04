"use client"
import Image from 'next/image'
import React from 'react'
import styles from "./page.module.css"

const SignUp = () => {
  return (
    <div className={styles.container}>
    <div className={styles.backgroundImage}>
        <div className={styles.card}>
            <Image src="/img/cross-ash.svg" alt="Close" height={24} width={24} className={styles.closeIcon}/>
            <h2 className={styles.heading}>Sign In</h2>
            <div className={styles.inputFeildWrapper}>

                <p className={styles.inName}>Email or Phone Number</p>
                <input type="text" placeholder="" className={styles.inputField}/>
                <p className={styles.inName}>Password</p>
                <div className={styles.passwordField}>
                    <input type="password" placeholder="" className={styles.inputField}/>
                    <Image src="/img/eye.svg" alt="Show Password" height={24} width={24} className={styles.eyeIcon}/>
                </div>
                <a href="../home/home.html"><button className={styles.signUpButton}>Sign In</button> </a>
                <p className={styles.signInText}>Already have an account? <a href="/home/" className={styles.signInLink}>Sign Up</a></p>
            </div>

        </div>
    </div>
    </div>
  )
}

export default SignUp