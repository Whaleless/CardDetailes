
//Dynamic Data
let dynamicName = document.querySelector('.dynamic-name');
let dynamicNumber = document.querySelector('.dynamic-card-number');
let dynamicDate = document.querySelector('.dynamic-expiration-date');
let dynamicCvv = document.querySelector('.dynamic-cvv');

//Form Data
let formName = document.querySelector('.name');
let formNumber = document.querySelector('.number');
let formMonth = document.querySelector('.month');
let formYear = document.querySelector('.year');
let formCvv = document.querySelector('.cvv');
let confirmButton = document.querySelector('.submit-button');

//Helper
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

//--------------------------------Form Data Validation--------------------------------//
//Name
setInputFilter(formName, function(value) {
    return /^(([a-zA-Z\d]{0,15})( )?([a-zA-Z\d]){0,15})$/.test(value);
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

//Month
setInputFilter(formMonth, function(value) {
    return /^(0?[1-9]?)?(1?[0-2]?)?$/.test(value);
});

formMonth.addEventListener('input', (e) => {
    if (formMonth.value[0] != '1' && formMonth.value[0] != '0' && e.data != null) {
        formMonth.value = '0' + e.data;
    }

    monthChanger(e);
})

//Year
setInputFilter(formYear, function(value) {
    return /^\d{0,2}$/.test(value);
});

//CVV
setInputFilter(formCvv, function(value) {
    return /^\d{0,3}$/.test(value);
});

//Helper
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
    if(/\d/.test(e.data)) {
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

confirmButton.addEventListener('click', () => {

    }
)