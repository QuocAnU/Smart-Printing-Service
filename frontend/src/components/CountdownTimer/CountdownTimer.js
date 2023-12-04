import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DateTimeDisplay from './DateTimeDisplay.js';
import useCountdown from './useCountdown.js';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';

import HomePage from '../../pages/HomePage/Homepage.js';

import './CountdownTimer.css';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Bạn đã hết thời gian trong hệ thống</span>
      <p>Vui lòng thực hiện in nhanh chóng.</p>
      <Link path="/"></Link>
    </div>
  );
};

const ShowCounter = ({ minutes, seconds }) => {
  const clockImage = require('./../../assets/Image/clock.png');

  return (
    <Stack direction="horizontal" gap={2}>
      <Image src={clockImage} alt="Clock image" className="Clock-image"></Image>

      <DateTimeDisplay value={minutes} type={'phút'} isDanger={false} />
      <p className="m-0">:</p>
      <DateTimeDisplay value={seconds} type={'giây'} isDanger={false} />
    </Stack>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect when the countdown reaches zero
    if (days + hours + minutes + seconds <= 0) {
       // If file is uploaded successfully, reset countdown timer
       if (sessionStorage.getItem('countdownTargetDate')) {
        sessionStorage.removeItem('countdownTargetDate');
       }
      navigate('/');
    }
  }, [days, hours, minutes, seconds, navigate]);

  return days + hours + minutes + seconds <= 0 ? (
    <ExpiredNotice />
  ) : (
    <ShowCounter minutes={minutes} seconds={seconds} />
  );
};

export default CountdownTimer;
