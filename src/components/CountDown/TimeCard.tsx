import classes from "./TimeCard.module.css";

interface TimeCardProps {
  timeUnit?: any;
  value?: any;
}

const TimeCard: React.FC<TimeCardProps> = ({ timeUnit, value }) => {
  return (
    <div className={classes.card}>
      <p>{timeUnit}</p>
      <p>{value}</p>
    </div>
  );
};

export default TimeCard;
