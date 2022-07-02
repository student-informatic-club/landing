import React, { useEffect, useState } from "react";
function formatText(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}
function calculateCountdown(endDate) {
  let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  const timeLeft = {
    days: 0,
    hours: 0,
    min: 0,
    second: 0,
    isTimeOut: false,
  };
  // STOP CALC
  if (diff < 0) {
    timeLeft.second = 0
    timeLeft.isTimeOut = true
  } else {
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.second = diff;
  }
  return timeLeft;
}

export default function CountDown({endDate, checkTimeOut}) {
  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    min: 0,
    second: 0,
    isTimeOut: false,
  });
  useEffect(() => {
    const handle = setInterval(() => {
      const date2 = calculateCountdown(endDate);
      setDate(date2);
      checkTimeOut(date2.isTimeOut)
    }, 1000);
    console.log(date);
    return () => clearInterval(handle);
  }, []);

  const viewData = () => (
    <span style={{fontSize:'16px'}}>
      <span>
        <strong>{formatText(date.days)}</strong>{" "}
        <span>{date.days === 1 ? "Ngày" : "Ngày"}</span>{" "}
      </span>

      <span>
        <strong>{formatText(date.hours)}</strong> <span>Giờ</span>{" "}
      </span>

      <span>
        <strong>{formatText(date.min)}</strong> <span>Phút</span>{" "}
      </span>

      <span>
        <strong>{formatText(date.second)}</strong> <span>Giây</span>{" "}
      </span>
    </span>
  );
  return viewData();
}

