import { EventType } from "../../types/events";
import moment from "moment";

const CalendarEventStyle = (event: EventType) => {
  const hour = moment(event.start).hour();
  let backgroundColor;
  let borderColor;

  if (hour < 12) {
    backgroundColor = "rgba(239, 219, 255, 1)";
    borderColor = "rgba(146, 84, 222, 1)";
  } else if (hour < 16) {
    backgroundColor = "rgba(255, 247, 230, 1)";
    borderColor = "rgb(246, 198, 95)";
  } else {
    backgroundColor = "rgba(240, 245, 255, 1)";
    borderColor = "rgb(73, 133, 253)";
  }

  return {
    style: {
      backgroundColor,
      borderColor,
      border: `1px solid ${borderColor}`,
      color: "black",
      borderRadius: "5px",
      padding: "5px",
    },
  };
};

export default CalendarEventStyle