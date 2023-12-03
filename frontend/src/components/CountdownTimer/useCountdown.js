import { useEffect, useState } from 'react';

const useCountdown = (targetDateInMilliseconds) => {
  // Retrieve targetDate from sessionStorage
  const storedTargetDate = sessionStorage.getItem('countdownTargetDate');

  // Use the provided targetDate or the one from sessionStorage
  const initialTargetDate = storedTargetDate
    ? new Date(storedTargetDate).getTime()
    : targetDateInMilliseconds;

  const [countDown, setCountDown] = useState(
    initialTargetDate - new Date().getTime()
  );

  console.log(storedTargetDate, initialTargetDate);

  // Store targetDate in sessionStorage if not already present
  useEffect(() => {
    if (!storedTargetDate) {
      sessionStorage.setItem('countdownTargetDate', new Date(initialTargetDate).toISOString());
    }

    const interval = setInterval(() => {
      setCountDown(initialTargetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTargetDate, storedTargetDate]);

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
