import { useEffect, useState } from "react";

export const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-xl font-bold text-[var(--neutral-700)]">
      {currentTime}
    </span>
  );
};
