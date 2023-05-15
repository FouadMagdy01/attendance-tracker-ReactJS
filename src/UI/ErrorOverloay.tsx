import { Empty } from "antd";
import classes from "./fullback.module.css";
interface ErrorOverlayProps {
  errorDesc?: String;
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ errorDesc }) => {
  return (
    <div className={classes.container}>
      <Empty description={errorDesc} />
    </div>
  );
};

export default ErrorOverlay;
