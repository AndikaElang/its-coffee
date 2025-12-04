import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export default function useTimeInterval(timeInterval: number = 15000) {
  const [curDate, setCurDate] = useState(new Date());
  const interval = useInterval(() => setCurDate(new Date()), timeInterval);

  useEffect(() => {
    interval.start();

    return () => {
      interval.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return curDate;
}
