import moment from "moment";
import "moment/locale/vi";

export const formatDate = (timeUpdate: string) => {
  const chapterDate = moment(timeUpdate).add("7", "hour");
  const currentYear = moment().year();
  const diffInMonths = moment().diff(chapterDate, "months");

  if (chapterDate.isValid()) {
    if (diffInMonths === 0) {
      return chapterDate.fromNow();
    } else {
      const formattedDate = chapterDate.format(
        currentYear === chapterDate.year() ? "HH:mm - DD/MM" : "DD/MM/YY"
      );

      return formattedDate;
    }
  } else {
    return "Ngày tháng không hợp lệ";
  }
};
