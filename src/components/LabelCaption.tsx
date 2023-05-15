import { Typography } from "antd";

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
    <Typography.Text {...labelProps} className={labelClassName}>
      {label}:{" "}
      <Typography.Text strong className={captionClassName} {...captionProps}>
        {caption}
      </Typography.Text>
    </Typography.Text>
  );
};
export default LabelCaption;
