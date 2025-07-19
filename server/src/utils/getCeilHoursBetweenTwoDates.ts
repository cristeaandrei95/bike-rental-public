import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const getCeilHoursBetweenTwoDates = (startDate: Dayjs, endDate: Dayjs) => {
  const hours = dayjs.duration(endDate.diff(startDate)).asHours();
  return Math.ceil(hours);
};

export default getCeilHoursBetweenTwoDates;
