import { Empty, Spin } from "antd";
import classes from "./fullback.module.css";
interface ErrorOverlayProps {
  loadingDesc?: String;
}

const LoadingOverlay: React.FC<ErrorOverlayProps> = ({ loadingDesc }) => {
  return (
    <div className={classes.container}>
      <Spin size="large" tip={loadingDesc}></Spin>
    </div>
  );
};

export default LoadingOverlay;
