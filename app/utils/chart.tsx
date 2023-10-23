import { Domain } from "../domain";

export async function getMonthlyChartData(date: number) {
  const _date = new Date(date);
  return fetch(
    `${Domain}Admin/ChartDataComicUpdateByMonth?month=${
      _date.getMonth() + 1
    }/1/${_date.getFullYear()}`
  ).then((response) => response.json());
}
