// utils/customLocalizer.ts
import {
  format as formatDate,
  parse,
  getDay,
  startOfWeek,
} from "date-fns";
import { ru } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import { dateFnsLocalizer } from "react-big-calendar";

const timeZone = "Asia/Tashkent";

const customFormat = (date: Date, formatStr: string): string => {
  const zonedDate = toZonedTime(date, timeZone);
  return formatDate(zonedDate, formatStr, { locale: ru });
};

const customParse = (value: string, formatStr: string): Date => {
  return parse(value, formatStr, new Date(), { locale: ru });
};

const CustomLocalizer = dateFnsLocalizer({
  format: customFormat,
  parse: customParse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales: { ru },
});

export default CustomLocalizer;

