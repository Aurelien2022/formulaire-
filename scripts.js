const step = document.getElementsByClassName('step');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const continueBox = document.getElementById('q-box__buttons');
const form = document.getElementsByTagName('form')[0];
const bodyElement = document.querySelector('body');
const inputRadio = document.querySelectorAll('input[type="radio"]');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const zip = document.getElementById('zip');
let steps = [1,0,0,0,0,0,0];
let stepCheck = [];
let currentId = [''];
const continueBtn = '<button id="next-btn" class="btn btn-lg btn-primary rounded-pill px-5 py-3 w-100">Continue</button>';

form.onsubmit = () => {
  return false
}
let current_step = 0;
let stepCount = 8;
step[current_step].classList.add('d-block');
if (current_step == 0) {
  prevBtn.classList.add('disabled');
}

const progress = (value) => {
  document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
}

nextBtn.addEventListener('click', () => {
  current_step++;
  let previous_step = current_step - 1;
  if ((current_step > 0) && (current_step <= stepCount)) {
      prevBtn.classList.remove('disabled');
      step[current_step].classList.remove('d-none');
      step[current_step].classList.add('d-block');
      step[previous_step].classList.remove('d-block');
      step[previous_step].classList.add('d-none');
      if (current_step == stepCount - 1) {
          nextBtn.classList.remove('d-inline-block');
          nextBtn.classList.add('d-none');
      }
  } else {
      if (current_step > stepCount) {
          form.onsubmit = () => {
              return true
          }
      }
  }
  progress((100 / stepCount) * current_step);

  if (steps[current_step] === 0) {
    continueBox.style.display = 'none';
  }
});


prevBtn.addEventListener('click', () => {
  if (current_step > 0) {
      current_step--;
      let previous_step = current_step + 1;
      step[current_step].classList.remove('d-none');
      step[current_step].classList.add('d-block')
      step[previous_step].classList.remove('d-block');
      step[previous_step].classList.add('d-none');
      if (current_step < stepCount - 1) {
          nextBtn.classList.remove('d-none');
          nextBtn.classList.add('d-inline-block');
      }
  }

  if (current_step == 0) {
      prevBtn.classList.add('disabled');
      progress(10);
  } else {
      progress((100 / stepCount) * current_step);
  }

  if (steps[current_step] === 1) {
    continueBox.style.display = 'block';
  }
});


submitBtn.addEventListener('click', () => {
  current_step++;
  let previous_step = current_step - 1;
  if ((current_step > 0) && (current_step == stepCount)) {
      step[current_step].classList.remove('d-none');
      step[current_step].classList.add('d-block');
      step[previous_step].classList.remove('d-block');
      step[previous_step].classList.add('d-none');
  }
  progress((100 / stepCount) * current_step);
});


// Interactive displaying continue button
// run this function whenever the values of any of inputs change.
// this is to check if the input for all is valid.  if so, enable button.
// otherwise, disable it.
const current_checked = document.querySelectorAll('input[type="radio"]');
current_checked.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (element.checked && stepCheck.length == current_step && currentId[current_step] == e.target.id) {
      element.checked = false;
      steps[current_step] = 0;
      continueBox.style.display = 'none';
    } else {
      steps[current_step] = 1;
      continueBox.style.display = 'block';
    }
    stepCheck = document.querySelectorAll('input[type="radio"]:checked');
    currentId[current_step] = e.target.id;
  });
});

//last form
const checkEnableButton = () => {
  submitBtn.disabled = !(
      firstname.value && 
      lastname.value && 
      phone.value &&
      email.value &&
      zip.value
   );
}

firstname.addEventListener('input', checkEnableButton);
lastname.addEventListener('input', checkEnableButton);
phone.addEventListener('input', checkEnableButton);
email.addEventListener('input', checkEnableButton);
zip.addEventListener('input', checkEnableButton);

 

