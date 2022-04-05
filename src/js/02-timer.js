import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';


const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute("disabled", "");

const myInput = document.querySelector("#datetime-picker");

const valueElems = document.querySelectorAll('.value');


function changeMarkupValues(params) {    
    let counterValue = 0;
    const changedValues = valueElems.forEach(valueElem => {
        
        valueElem.textContent = params[counterValue];
        counterValue += 1;        
    });
    return changedValues;
}


const date = new Date();
// alert("Please choose a date in the future")
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {      
      selectedDates[0].getTime() < date.getTime()
          ? Notiflix.Notify.failure('Please choose a date in the future')
          : btnStart.removeAttribute("disabled"); 
    
      btnStart.addEventListener("click", () => {
          btnStart.setAttribute("disabled", "");
          myInput.setAttribute("disabled", "");
          const timerId = setInterval(() => {         
            const selectedDatesDifTimes = selectedDates[0].getTime() - Date.now();
           
            changeMarkupValues(addLeadingZero(convertMs(selectedDatesDifTimes)));
          }, 1000);
                })
    },
};
const fp = flatpickr(myInput, options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(nums) {
    const values = Object.values(nums);
        const twoNums = values.map(value => {        
        const fullValues = String(value).padStart(2, "0");
                return fullValues;        
    })    
    return twoNums;
}







