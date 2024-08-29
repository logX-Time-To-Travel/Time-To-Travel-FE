import { useState, useEffect } from 'react';

function useTimeAgo(dateString) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      const date = new Date(dateString);
      const now = new Date();

      if (isNaN(date.getTime())) {
        // dateString이 유효한 날짜가 아닌 경우
        setTimeAgo('잘못된 날짜');

        return;
      }

      const diffInSeconds = Math.floor((now - date) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);

      if (diffInYears > 0) {
        setTimeAgo(`${diffInYears}년 전`);
      } else if (diffInMonths > 0) {
        setTimeAgo(`${diffInMonths}개월 전`);
      } else if (diffInDays > 0) {
        setTimeAgo(`${diffInDays}일 전`);
      } else if (diffInHours > 0) {
        setTimeAgo(`${diffInHours}시간 전`);
      } else if (diffInMinutes > 0) {
        setTimeAgo(`${diffInMinutes}분 전`);
      } else {
        setTimeAgo(`${diffInSeconds}초 전`);
      }
    };

    updateTimeAgo();

    const intervalId = setInterval(updateTimeAgo, 1000
    );

    return () => clearInterval(intervalId);
  }, [dateString]);
  console.log(dateString);
  return timeAgo;
}

export default useTimeAgo;
