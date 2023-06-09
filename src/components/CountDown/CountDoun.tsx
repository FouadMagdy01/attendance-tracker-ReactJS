import dayjs from "dayjs";
import { useState, useEffect } from "react";
import classes from "./CountDown.module.css";
import TimeCard from "./TimeCard";
import SectionTitle from "../SectionTitle/SectionTitle";
interface CountDownProps {
  date?: any;
  digitClassName?: any;
}

const CountDown: React.FC<CountDownProps> = ({ date, digitClassName }) => {
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  var countDownDate = dayjs(date).valueOf();
  useEffect(() => {
    var x = setInterval(function () {
      const now = dayjs().valueOf();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountDown((prev) => {
        return {
          days,
          hours,
          minutes,
          seconds,
        };
      });

      if (distance < 0) {
        clearInterval(x);
      }
    }, 1000);

    return () => {
      clearInterval(x);
    };
  }, []);

  return (
    <>
      <SectionTitle sectionTitle="Time Left" />
      <div className={classes.container}>
        <TimeCard
          digitClassName={digitClassName}
          timeUnit="Days"
          value={countDown.days}
        />
        <TimeCard
          digitClassName={digitClassName}
          timeUnit="Hours"
          value={countDown.hours}
        />
        <TimeCard
          digitClassName={digitClassName}
          timeUnit="Minutes"
          value={countDown.minutes}
        />
        <TimeCard
          digitClassName={digitClassName}
          timeUnit="Seconds"
          value={countDown.seconds}
        />
      </div>
    </>
  );
};

export default CountDown;
