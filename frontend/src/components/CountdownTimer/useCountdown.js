import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
  // Retrieve targetDate from localStorage or use the provided targetDate
  const storedTargetDate = localStorage.getItem('countdownTargetDate');
  const initialTargetDate = storedTargetDate ? new Date(storedTargetDate) : new Date(targetDate);

  const countDownDate = initialTargetDate.getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    // Save targetDate to localStorage
    localStorage.setItem('countdownTargetDate', initialTargetDate.toISOString());

    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate, initialTargetDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default useCountdown;
