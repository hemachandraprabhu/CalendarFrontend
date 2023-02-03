import moment from "moment";

export function HandleDate(widgetContext, props) {
  /* to update the date in day view*/
  const handleDay = (day) => {
    let currDate = new Date(widgetContext.date);
    currDate.setDate(currDate.getDate() + day);

    widgetContext.setDate(currDate);
  };

  /* to update the month in month view */
  const handleMonth = (month) => {
    let currDate = new Date(widgetContext.date);
    currDate.setDate(1);
    currDate.setMonth(currDate.getMonth() + month);

    moment(widgetContext.date).format("YYYY MMMM") !==
      moment(currDate).format("YYYY MMMM") &&
      widgetContext.setGetByMonthCondition(true);

    widgetContext.setDate(currDate);
  };

  /* to set the date to current date  */
  const handleToday = () => {
    moment(widgetContext.date).format("YYYY MMMM D") !==
      moment().format("YYYY MMMM D") && widgetContext.setDate(new Date());

    props.userPicked === "Month" &&
      widgetContext.getByMonthCondition &&
      moment(widgetContext.date).format("YYYY MMMM") ===
        moment().format("YYYY MMMM") &&
      widgetContext.setGetByMonthCondition(false);

    !widgetContext.miniCalDateCondition &&
      widgetContext.setMiniCalDateCondition(true);
  };
  return { handleToday, handleDay, handleMonth };
}
