import type { NutrientType } from "./NutrientDetail.type.ts";
import styles from "./NutrientDetail.module.scss";
import { NutrientDetailService } from "./NurientDetail.service.ts";

interface NutrientDetailProps {
  className?: string;
  type: NutrientType;
  value: number;
}

export function NutrientDetail({
  className = "",
  ...props
}: NutrientDetailProps) {
  return (
    <div className={`${styles.Component} ${className}`}>
      <div
        className={styles.Component__icon}
        style={{
          backgroundColor: NutrientDetailService.getNutrientBgColor(props.type),
        }}
      >
        <img
          className={styles.Component__icon_img}
          src={NutrientDetailService.getNutrientIcon(props.type)}
        />
      </div>
      <div className={styles.Component__content}>
        <span className={styles.Component__value}>
          {NutrientDetailService.formatValue(props.value, props.type)}
        </span>
        <span className={styles.Component__title}>
          {NutrientDetailService.getNutrientName(props.type)}
        </span>
      </div>
    </div>
  );
}

export default NutrientDetail;
