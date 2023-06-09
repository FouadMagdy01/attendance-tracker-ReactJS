import classes from "./TimeCard.module.css";

interface TimeCardProps {
  timeUnit?: any;
  value?: any;
  digitClassName?: any;
}

const TimeCard: React.FC<TimeCardProps> = ({
  timeUnit,
  value,
  digitClassName,
}) => {
  return (
    <div className={`${classes.card} ${digitClassName}`}>
      <p>{timeUnit}</p>
      <p>{value}</p>
    </div>
  );
};

export default TimeCard;
