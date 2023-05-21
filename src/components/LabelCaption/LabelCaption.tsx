import { Typography } from "antd";
import classes from "./LabelCaption.module.css";
interface LabelCaptionProps {
  label?: any;
  caption?: any;
  labelClassName?: String;
  captionClassName?: String;
  labelProps?: any;
  captionProps?: any;
}

const LabelCaption: React.FC<LabelCaptionProps> = ({
  label,
  caption,
  labelClassName,
  labelProps,
  captionClassName,
  captionProps,
}) => {
  return (
    <Typography.Text
      {...labelProps}
      className={`${classes.label} ${labelClassName}`}
    >
      {label}:{" "}
      <Typography.Text
        strong
        className={`${classes.caption} ${captionClassName}`}
        {...captionProps}
      >
        {caption}
      </Typography.Text>
    </Typography.Text>
  );
};
export default LabelCaption;
