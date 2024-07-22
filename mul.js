
/* When clicked on enter button */

const elementThree = document.querySelector('.enter');
elementThree.addEventListener('click',checkInput);

/* selecting value from the input sections */

const inputElement1 = document.querySelector('.value');
const inputElement2 = document.querySelector('.loop-val');

/* checking if the input section is not empty when submitted */

function checkInput (){
  if (!inputElement1.value || !inputElement2.value){
    alert('Fill the input section');
  } else {
    checkInput2();
  }
}

/* checking if the value entered is number */

function checkInput2() {

  const value1 = parseFloat(inputElement1.value);
  const value2 = parseFloat(inputElement2.value);

  if (isNaN(value1) || isNaN(value2)) {
    alert('Enter number value only');
  } else {
    multiply();
  }
}

/* adding enter event listener to the input section */

function addEnterKeyListener (element){
  if (element){
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter'){
        checkInput();
      }
    });
  }
}

addEnterKeyListener(inputElement1);
addEnterKeyListener(inputElement2);

/* storing the tables in a local storage */

let collectMulDiv = JSON.parse(localStorage.getItem('table')) || [];


generateHtml();

function multiply (){

  let collectMUl = [];

  const value = inputElement1.value;
  const looping = inputElement2.value;

  for(let i = 1; i <= looping; i++){
    collectMUl.push(`<p>${value} <i class="fas fa-times"></i> ${i} = ${value * i}</p>`);
  }

  collectMulDiv.push(`<h3>${value} times table to ${looping}</h3>${collectMUl.join('')}`);

  storeMul();
  
  inputElement1.value = '';
  inputElement2.value = '';

  generateHtml();

}

function generateHtml (){

  let generalHtml = '';
  
  collectMulDiv.forEach((value,index) => {

    let tableClass = index % 2 === 0 ? 'table':'table2';

    const html = `
      <div class="${tableClass}">
        ${value}
        <button data-index="${index}" class="delete">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    `;

    generalHtml += html;
  });

  if (!generalHtml){
    document.querySelector('.js-display')
      .innerHTML = '<p class="default-display">Tables Here</p>';
  } else {
    document.querySelector('.js-display')
      .innerHTML = generalHtml;
  }

  /* delete button code */
  document.querySelectorAll('.delete').forEach(button =>{
    button.addEventListener('click', (event) =>{
      const index = event.target.getAttribute('data-index');
      collectMulDiv.splice(index, 1);
      generateHtml();
      storeMul();
    });
  });
}

/* setting data in the local storage */
function storeMul(){
  localStorage.setItem('table', JSON.stringify(collectMulDiv));
}
