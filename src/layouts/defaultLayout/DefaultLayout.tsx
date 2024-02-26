import styles from "./DefaultLayout.module.scss";
import Header from "src/components/layouts/header/Header.tsx";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className={styles.PageWrapper}>
      <Header className={styles.PageWrapper__Header} />
      <main className={styles.PageWrapper__Main}>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
