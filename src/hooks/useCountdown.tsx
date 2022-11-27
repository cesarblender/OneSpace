import * as React from "react";

interface CountDownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const addLeadingZero = (num: number): string => {
  if (num < 10) return "0" + num;

  return num.toString();
};

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

const useCountDown = ({ end }: { end: Date }) => {
  const [time, setTime] = React.useState<CountDownTime>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [expired, setExpired] = React.useState<boolean>(
    end.getTime() - new Date().getTime() < 0
  );

  React.useEffect(() => {
    const endTime = end.getTime();

    setExpired(endTime - new Date().getTime() < 0);

    const calculateDistance = setInterval(() => {
      const now = new Date().getTime();

      const distance = endTime - now;

      if (distance < 0) {
        setExpired(true);
      }

      const days = Math.floor(distance / _day);
      const hours = Math.floor((distance % _day) / _hour);
      const minutes = Math.floor((distance % _hour) / _minute);
      const seconds = Math.floor((distance % _minute) / _second);

      setTime({
        days: addLeadingZero(days),
        hours: addLeadingZero(hours),
        minutes: addLeadingZero(minutes),
        seconds: addLeadingZero(seconds),
      });
    }, 1000);

    return () => {
      clearInterval(calculateDistance);
    };
  });

  return { time, expired };
};

export default useCountDown;
