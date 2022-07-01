import React, { useState } from 'react';
function formatText(num) {
    if (num<10) {
        return '0'+num;
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
    };
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;
    return timeLeft;
}

export default function Countdown(props) {
    const [date, setDate] = useState({
        days: 0,
        hours: 0,
        min: 0,
        second: 1,
    })
    const handle =  setInterval( () => {
        const date2 = calculateCountdown(props.date)
        setDate(date2)
    }, 1000)

    //clear
    if (date.days == 0 && date.hours == 0 && date.min == 0 && date.second == 0) {
        clearInterval(handle)
    }
    return (
        <span className="Countdown">
          <span className="countdown-col">
            <strong>{formatText(date.days)}</strong>{' '}
            <span>{date.days === 1 ? 'Day' : 'Days'}</span>{' '}
          </span>
  
          <span className="countdown-col">
            <strong>{formatText(date.hours)}</strong>{' '}
            <span>Hours</span>{' '}
          </span>
  
          <span className="countdown-col">
            <strong>{formatText(date.min)}</strong>{' '}
            <span>Min</span>{' '}
          </span>
  
          <span className="countdown-col">
            <strong>{formatText(date.sec)}</strong>{' '}
            <span>Seconds</span>{' '}
          </span>
        </span>
      );
}