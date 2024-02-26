import styles from "./DashboardLayout.module.scss";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className={styles.PageWrapper}>
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
