import { Suspense } from "react";
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

function LoginFallback() {
  return (
    <div className={styles.container} aria-busy="true">
      <h1>[LOGIN]</h1>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
