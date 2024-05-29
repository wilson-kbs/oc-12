import styles from "./ProfileLayout.module.scss";
import { Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <div className={styles.PageWrapper}>
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
