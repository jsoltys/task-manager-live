/*******************************************************************************
 * Custom string functions.
 */

export var zeroPadString = function(length, content) {
   var padding = "00000000000000000000000000000000" + content;
   var size = padding.length;

   return padding.substr(size - length, length);
};

/*******************************************************************************
 * Convert a date into a string for storage.
 */

export var convertDateToString = function(calendar) {
   let year = zeroPadString(4, calendar.getFullYear());
   let month = zeroPadString(2, calendar.getMonth() + 1);
   let day = zeroPadString(2, calendar.getDate());

   let hour = zeroPadString(2, calendar.getHours());
   let mins = zeroPadString(2, calendar.getMinutes());
   let secs = zeroPadString(2, calendar.getSeconds());

   return `${year}-${month}-${day}T${hour}:${mins}:${secs}`;
};

/*******************************************************************************
 * Calculate the difference between two dates.
 */

var calculateCalendarDifference = function(
   checkValue,
   curValue,
   preValue,
   perValue
) {
   let result = 0;

   if (checkValue > 0) {
      // the passed value is greater than 0.
      result += perValue - preValue;
      result += curValue;
      result += (checkValue - 1) * perValue;
   } else {
      // The passed value is equal to 0.
      result += curValue - preValue;
   }

   return result;
};

export var calculateMinuteDifference = function(prevTime, curTime) {
   var days = calculateCalendarDifference(
      0,
      curTime.getDate(),
      prevTime.getDate(),
      30
   );

   var hours = calculateCalendarDifference(
      days,
      curTime.getHours(),
      prevTime.getHours(),
      24
   );

   var mins = calculateCalendarDifference(
      hours,
      curTime.getMinutes(),
      prevTime.getMinutes(),
      60
   );

   var secs = calculateCalendarDifference(
      mins,
      curTime.getSeconds(),
      prevTime.getSeconds(),
      60
   );

   return secs / 60;
};

export let isTaskRunning = function(task) {
   return task.outDate === null && task.timestamp.length !== 0;
};

/*******************************************************************************
 * Append a timestamp to the task and calculate either billable or non-billable
 * totals to add.
 */

export let appendNewTimestamp = function(task, newTimestamp) {
   let lastIndex = task.timestamp.length;
   let prevIndex = lastIndex - 1;
   let result = {
      ...task
   };

   result.timestamp.push(newTimestamp);

   if (lastIndex > 0) {
      let prevTimestamp = task.timestamp[prevIndex];
      let minutes = calculateMinuteDifference(prevTimestamp, newTimestamp);

      if (lastIndex % 2 === 1) {
         result.outDate = convertDateToString(newTimestamp);
         result.billable =
            result.billable !== null ? result.billable + minutes : minutes;
      } else {
         result.outDate = null;
         result.nonBillable =
            result.nonBillable !== null
               ? result.nonBillable + minutes
               : minutes;
      }
   } else {
      result.inDate = convertDateToString(newTimestamp);
   }

   return result;
};
