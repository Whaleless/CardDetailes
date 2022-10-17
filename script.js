
//Dynamic Data
let dynamicName = document.querySelector('.dynamic-name');
let dynamicNumber = document.querySelector('.dynamic-card-number');
let dynamicDate = document.querySelector('.dynamic-expiration-date');
let dynamicCvv = document.querySelector('.dynamic-cvv');

//Form Data
let form = document.querySelector('.card-details-form');
let formName = document.querySelector('.name');
let formNumber = document.querySelector('.number');
let formMonth = document.querySelector('.month');
let formYear = document.querySelector('.year');
let formCvv = document.querySelector('.cvv');
let confirmButton = document.querySelector('.submit-button');

//success
let successBlock = document.querySelector('.success-status');
let continueButton = document.querySelector('.continue-button');

//--------------------------------Form Data Validation--------------------------------//

//Checks

function isNotEmptyCheck(input) {
    if (input.value == '') {
        input.parentNode.classList.add('error_empty');
        return true;
    } else {
        input.parentNode.classList.remove('error_empty');
        return false;
    };
}

function containsDigits(input) {
    if (/\d+/.test(input.value)) {
        input.parentNode.classList.add('error_digits');
        return true;
    } else {
        input.parentNode.classList.remove('error_digits');
        return false;
    };
}

function containsLetters(input) {
    if (/[a-zA-Z]+/.test(input.value)) {
        input.parentNode.classList.add('error_letters');
        return true;
    } else {
        input.parentNode.classList.remove('error_letters');
        return false;
    };
}

function isTooLittle(input, howMuch) {
    if (input.value < howMuch && input.value != '') {
        input.parentNode.classList.add('error_too_little');
        return true;
    } else {
        input.parentNode.classList.remove('error_too_little');
        return false;
    };
}

function containsNotEnoughSymbols(input, howMuch) {
    if (input.value.length < howMuch && input.value != '') {
        input.parentNode.classList.add('error_not_enough');
        return true;
    } else {
        input.parentNode.classList.remove('error_not_enough');
        return false;
    };
}

//inputsCheckers
//Name
function nameInputCheckers(input) {
    let empty = isNotEmptyCheck(input);
    let digits = containsDigits(input);

    let errors = empty || digits;
    if (errors) {
        input.classList.add('error');
        return true;
    } else {
        input.classList.remove('error');
        return false;
    }
}

//Number
function numberInputCheckers(input) {
    let empty = isNotEmptyCheck(input);
    let notEnough = containsNotEnoughSymbols(input, 19);

    let errors = empty || notEnough;
    if (errors) {
        input.classList.add('error');
        return true;
    } else {
        input.classList.remove('error');
        return false;
    }
}

//Month
function monthInputCheckers(input) {
    let empty = isNotEmptyCheck(input);

    if (empty) {
        input.classList.add('error');
        return true;
    } else {
        input.classList.remove('error');
        return false;
    }
}

//Year
function yearInputCheckers(input) {
    let year = (new Date().getFullYear()).toString().substring(2,);

    let empty = isNotEmptyCheck(input);
    let tooLittle = isTooLittle(input, year);

    let errors = empty || tooLittle;
    if (errors) {
        input.classList.add('error');
        return true;
    } else {
        input.classList.remove('error');
        return false;
    }
}

//CVV
function cvvInputCheckers(input) {
    let empty = isNotEmptyCheck(input);
    let letters = containsLetters(input);
    let notEnough = containsNotEnoughSymbols(input, 3);

    let errors = empty || letters || notEnough;
    if (errors) {
        input.classList.add('error');
        return true;
    } else {
        input.classList.remove('error');
        return false;
    }
}

//Name
setInputFilter(formName, function(value) {
    return /^(([a-zA-Z\d]{0,15})( )?([a-zA-Z\d]){0,15})$/.test(value);
});

formName.addEventListener('change', () => {
    nameInputCheckers(formName);
});

//Number
setInputFilter(formNumber, function(value) {
    return /^(\d{0,4})*(\d{1,4} *){0,3}(\d){0,4}?$/.test(value);
});

formNumber.addEventListener('input', (e)=> {
    if(formNumber.value != '') {
        let parts = formNumber.value.match(/\d{1,4}/g);
        formNumber.value = parts.join(" ");
        if(formNumber.value.includes('  ')) {
            formNumber.value.replace('  ', ' ');
        }
    }
    numberChanger(e);
})

formNumber.addEventListener('change', () => {
    numberInputCheckers(formNumber);
})

//Month
setInputFilter(formMonth, function(value) {
    return /^(0?[1-9]?)?(1?[0-2]?)?$/.test(value);
});

formMonth.addEventListener('input', (e) => {
    if (/\d/.test(e.data) || e.data == null) {
        if (formMonth.value[0] != '1' && formMonth.value[0] != '0' && e.data != null) {
            formMonth.value = '0' + e.data;
        }

        monthChanger(e);
    }
})

formMonth.addEventListener('change', (e) => {
    if(formMonth.value == '1') {
        formMonth.value = '01';
    } else if (formMonth.value == 0) {
        formMonth.value = '';
    }

    monthChanger(e);
})

formMonth.addEventListener('change', () => {
    monthInputCheckers(formMonth);
})

//Year
setInputFilter(formYear, function(value) {
    return /^\d{0,2}$/.test(value);
});

formYear.addEventListener('change', () => {
    yearInputCheckers(formYear);
});

//CVV
setInputFilter(formCvv, function(value) {
    return /^[\da-zA-Z]{0,3}$/.test(value);
});

formCvv.addEventListener('change', () => {
    cvvInputCheckers(formCvv);
});

//Helpers
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

//------------------------------------Data Changer------------------------------------//

//Helper
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function defaultValues() {
    dynamicName.innerHTML = 'Jane Appleseed';
    dynamicNumber.innerHTML = '0000 0000 0000 0000';
    dynamicDate.innerHTML = '00/00';
    dynamicCvv.innerHTML = '000';
}

//Name
formName.addEventListener('input', (e) => {
    if(/\d/.test(e.data) || / /.test(e.data) || /[a-zA-Z]/.test(e.data) || e.data == null) {
            if(formName.value != '') {
                dynamicName.innerHTML = formName.value;
            } else {
                dynamicName.innerHTML = 'Jane Appleseed';
            }
    }
})

//Number
 numberChanger = (e) => {
     if(/\d/.test(e.data) || / /.test(e.data) || e.data == null) {
         for (let i = 0; i < formNumber.value.length; i++) {
             dynamicNumber.innerHTML = dynamicNumber.innerHTML.replaceAt(i, formNumber.value[i]);
         }
     }
     if (formNumber.value.length < 19) {
         for (let i = 18; i + 1 > formNumber.value.length; i--) {
             if((i + 1) % 5 == 0) {
                 dynamicNumber.innerHTML = dynamicNumber.innerHTML.replaceAt(i, ' ');
             } else {
                 dynamicNumber.innerHTML = dynamicNumber.innerHTML.replaceAt(i, '0');
             }
         }
     }
}

//Month
monthChanger = (e) => {
    if(/\d/.test(e.data) || e.data == null) {
        dynamicDate.innerHTML = dynamicDate.innerHTML.replaceAt(0, formMonth.value);
    }
    if (formMonth.value.length < 2) {
        for (let i = 1; i + 1 > formMonth.value.length; i--) {
            dynamicDate.innerHTML = dynamicDate.innerHTML.replaceAt(i, '0');
        }
    }
}

//Year
formYear.addEventListener('input', (e) => {
    if(/\d/.test(e.data) || e.data == null) {
        dynamicDate.innerHTML = dynamicDate.innerHTML.replaceAt(3, formYear.value);
    }
    if (formYear.value.length < 2) {
        for (let i = 1; i + 1 > formYear.value.length; i--) {
            dynamicDate.innerHTML = dynamicDate.innerHTML.replaceAt(i + 3, '0');
        }
    }
})

//CVV
formCvv.addEventListener('input', (e) => {
    if(/[\da-zA-Z]/.test(e.data)) {
        for (let i = 0; i < formCvv.value.length; i++) {
            dynamicCvv.innerHTML = dynamicCvv.innerHTML.replaceAt(i, formCvv.value[i]);
        }
    }
    if (formCvv.value.length < 3) {
        for (let i = 2; i + 1 > formCvv.value.length; i--) {
            dynamicCvv.innerHTML = dynamicCvv.innerHTML.replaceAt(i, '0');
        }
    }
})

//------------------------------------Confirmation------------------------------------//

function successChanger() {
    form.classList.toggle('hidden');
    successBlock.classList.toggle('hidden');
}

function FormValidation() {
    let errors = nameInputCheckers(formName);
    errors = errors || numberInputCheckers(formNumber);
    errors = errors || monthInputCheckers(formMonth);
    errors = errors || yearInputCheckers(formYear);
    errors = errors || cvvInputCheckers(formCvv);

    return errors;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    if(!FormValidation()) {
        const data = serializeForm(event.target)
        const {status} = await sendData(data);
        form.reset();
        successChanger();
    }
}

function serializeForm(formNode) {
    return new FormData(formNode)
}

async function sendData(data) {
    return await fetch('#', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: data,
    })
}

form.addEventListener('submit', handleFormSubmit);

continueButton.addEventListener('click', () => {
    defaultValues();
    successChanger();
})
