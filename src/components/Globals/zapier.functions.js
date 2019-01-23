import { zeroPadString } from "./task.functions";

/*******************************************************************************
 * Custom string functions.
 */

let convertTo24HourTime = function(calendar) {
   let time =
      zeroPadString(2, calendar.getHours()) +
      ":" +
      zeroPadString(2, calendar.getMinutes());

   return time;
};

/*******************************************************************************
 * Create an object to send to a Google sheets document.
 */

let buildHoursWorkedFormula = () => {
   let colD = `INDIRECT( CONCAT("D", ROW()))`;
   let colE = `INDIRECT( CONCAT("E", ROW()))`;
   let colF = `INDIRECT( CONCAT("F", ROW()))`;

   let cont = `(((${colE} - ${colD}) * 24 ) - (${colF} / 60))`;

   return `=MROUND(${cont}, 0.25 )`;
};

var formatForGoogleSheets = function(task, username) {
   let inDate = new Date(task.inDate);
   let outDate = new Date(task.outDate);

   let year = zeroPadString(4, inDate.getFullYear());
   let month = zeroPadString(2, inDate.getMonth() + 1);
   let day = zeroPadString(2, inDate.getDate());

   return {
      week: '=WEEKNUM( INDIRECT( CONCAT("C", ROW())))',
      month: '=text( INDIRECT( CONCAT("C", ROW())),"mmm yy")',
      date: `${year}-${month}-${day}`,
      timeIn: convertTo24HourTime(inDate),
      timeOut: convertTo24HourTime(outDate),
      nonBillable: task.nonBillable,
      hoursWorked: buildHoursWorkedFormula(),
      project: task.project,
      comments: task.summary,
      owner: username
   };
};

export var submitTaskToGooleSheet = function(task, username) {
   let data = formatForGoogleSheets(task, username);

   fetch("https://hooks.zapier.com/hooks/catch/4152821/ckrdwn/", {
      method: "POST",
      headers: {
         Accept: "application/json"
         //'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
   }).then(value => {
      console.log(value);
   });
};
