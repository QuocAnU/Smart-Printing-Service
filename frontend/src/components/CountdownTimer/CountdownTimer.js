import React from 'react';
import DateTimeDisplay from './DateTimeDisplay.js';
import useCountdown from './useCountdown.js';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

import './CountdownTimer.css';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Bạn đã hết thời gian trong hệ thống</span>
      <p>Vui lòng thực hiện in nhanh chóng.</p>
    </div>
  );
};

const ShowCounter = ({ minutes, seconds }) => {

  const clockImage = require('./../../assets/Image/clock.png')

  return (
    <Stack direction='horizontal' gap={2}>
      <Image src={clockImage} alt='Clock image' className='Clock-image'></Image>

      <DateTimeDisplay value={minutes} type={'phút'} isDanger={false} />
      <p className='m-0'>:</p>
      <DateTimeDisplay value={seconds} type={'giây'} isDanger={false} />
    </Stack>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountdown(targetDate);

  if (minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;