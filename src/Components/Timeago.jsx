import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateAgo = () => {
      const currentDate = new Date();
      const parsedDate = new Date(timestamp);
      const timeDifference = currentDate.getTime() - parsedDate.getTime();

      if (timeDifference < 60000) {
        // Less than a minute
        setTimeAgo('just now');
      } else if (timeDifference < 3600000) {
        // Less than an hour
        const minutes = Math.floor(timeDifference / 60000);
        setTimeAgo(`${minutes} min ago`);
      } else if (timeDifference < 86400000) {
        // Less than a day
        const hours = Math.floor(timeDifference / 3600000);
        setTimeAgo(`${hours} hours ago`);
      } else {
        // More than a day
        const days = Math.floor(timeDifference / 86400000);
        setTimeAgo(`${days} days ago`);
      }
    };

    // Initial update
    updateAgo();

    // Update every minute
    const interval = setInterval(updateAgo, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};
