import Image from "next/image";
import styles from "./page.module.css";
import SignUp from "./components/signup/signup";

export default function Home() {
  return (
    <div className={styles.page}>
      <SignUp/>
    </div>
  );
}
