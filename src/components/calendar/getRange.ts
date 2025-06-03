import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay } from "date-fns";
import { View } from "react-big-calendar";

export function getDateRange(date: Date, view: View) {
  switch (view) {
    case "month":
      return {
        startDate: startOfWeek(startOfMonth(date), { weekStartsOn: 1 }),
        endDate: endOfWeek(endOfMonth(date), { weekStartsOn: 1 }),
      };
    case "week":
      return { 
        startDate: startOfWeek(date, { weekStartsOn: 1 }),
        endDate: endOfWeek(date, { weekStartsOn: 1 }),
      };
    case "day":
      return {
        startDate: startOfDay(date),
        endDate: endOfDay(date),
      };
    default:
      return {
        startDate: startOfWeek(date, { weekStartsOn: 1 }),
        endDate: endOfWeek(date, { weekStartsOn: 1 }),
      };
  }
}
