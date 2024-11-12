import styles from "./customSwitch.module.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Switch } from "@mui/material";

const CustomSwitch = ({
  handleSwitch,
  isActive,
}: {
  handleSwitch: () => void;
  isActive: boolean;
}) => {
  return (
    <div className={styles.visibilityWrapper}>
      <VisibilityOffOutlinedIcon color={!isActive ? "disabled" : "primary"} />
      <Switch onChange={handleSwitch} />
      <VisibilityOutlinedIcon color={isActive ? "disabled" : "primary"} />
    </div>
  );
};

export default CustomSwitch;
