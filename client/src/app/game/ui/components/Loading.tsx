import { useState } from "react";
import { useEventsListeners } from "../../../../lib/utils/events";
import { UIEvents } from "../../../../lib/constants/events";

export const Loading = () => {
  const [value, setValue] = useState(0);

  const getPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  useEventsListeners(
    [
      {
        name: UIEvents.LOADING_PROGRESS,
        callback: (event: CustomEvent) => {
          setValue(event.detail);
        },
      },
    ],
    [],
  );

  return (
    <div className="loading">
      <img src="assets/images/ui/Slide 16_9 - 1.png" alt="logo" />
      <div className="meter z-50">
        <span style={{ width: getPercentage(value) }}></span>i
      </div>
    </div>
  );
};
