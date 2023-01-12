export function addDays(date, numDays) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + numDays);
  return copy;
}
