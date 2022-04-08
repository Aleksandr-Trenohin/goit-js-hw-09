import Notiflix from 'notiflix';


const FormEl = document.querySelector('.form');
FormEl.addEventListener('submit', onFormSubmit);



function onFormSubmit(event) {
  event.preventDefault();
  
    
  const delay = event.currentTarget.delay.value;
  const step = event.currentTarget.step.value;
  const amount = event.currentTarget.amount.value;

   const formData = {
     position: 1,
      delay,
      step,
     amount,
            };
 
  promiseCall(formData);
 
  FormEl.reset(); 
}

function createPromise({ position, delay }) {
   
  return new Promise((resolve, reject) => {    
    setTimeout(() => {
      
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          // Fulfill 
          resolve({ position: position, delay: delay })
        } else {
          // Reject
          reject({ position: position, delay: delay })
        }
      // }
      }, delay);    
    });  
};

const isSuccess = ({ position, delay }) => { 
    // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

  const isError = ({ position, delay }) => {
    // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }

function promiseCall({ delay, step, amount }) {
  for (let position = 1; position <= amount; position += 1) {      
    createPromise({ position, delay }).then(isSuccess).catch(isError)
    
    let a = Number(delay) + Number(step)
       delay = `${a}`;
      }
}


