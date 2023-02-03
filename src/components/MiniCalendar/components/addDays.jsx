export function addDays(date, numDays) {
  let currDate = new Date(date);
  currDate.setDate(currDate.getDate() + numDays);
  return currDate;
}