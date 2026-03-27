import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1>[LOGIN]</h1>
      <input className={styles.input} placeholder="Email" />
      <input className={styles.input} placeholder="Password" type="password" />
      <button className={styles.button}>Login</button>
    </div>
  );
}