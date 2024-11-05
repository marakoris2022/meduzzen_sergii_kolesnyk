import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <main className="container">
      <div className={styles.wrapper}>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </main>
  );
}
