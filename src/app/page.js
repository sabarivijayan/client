import styles from "./page.module.css";
import SignUp from "./sign-up/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <SignUp/>
    </div>
  );
}
