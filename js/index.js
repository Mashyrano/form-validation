var form = document.getElementById("registrationForm");
var uname = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirm = document.getElementById("confirm");
var dob = document.getElementById("dob");
var terms = document.getElementById("terms");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = validateForm();
    if (valid) {
        console.log('make attempt');
        window.location.assign('../assignment 2/login.html');
    }


});

function validateForm() {
    let valid = true;
    const passLength = 8;
    
    // valid date name
    if (uname.value === "") {
        setErrorFor(uname, 'name cannot be null');
        valid = false;
    } else if (uname.value.trim().split(" ").length < 2){
        setErrorFor(uname,"Please provide the full name");
        valid = false;
    } else {
        setSuccessFor(uname, 'name is valid');
    }
    // validate email
    if (email.value === "") {
        setErrorFor(email, 'email cannot be null');
        valid = false;
    } else if (!isEmail(email.value)){
        setErrorFor(email,"Please provide a valid email");
        valid = false;
    } else {
        setSuccessFor(email, 'email is valid');
    }
    // validate password
    if (password.value === "") {
        setErrorFor(password, 'password cannot be null');
        valid = false;
    } else if (password.value.length < passLength){
        setErrorFor(password,"password must be atleast 8 characters");
        valid = false;
    } else {
        setSuccessFor(password, 'password is valid');

        if (confirm.value === '') {
            setErrorFor(confirm, 're-enter password');
            valid = false; 
        } else if (confirm.value !== password.value) {
            setErrorFor(confirm, 'passwords do not match');
            valid = false; 
        }
        else {
            setSuccessFor(confirm, 'passwords match');
        }
    }

    // validate dob
    if (dob.value === ''){
        setErrorFor(dob, 'please select a date');
        valid = false;
    } else if (!is18orOlder(dob.value)) {
        setErrorFor(dob, 'You must be 18 or older');
        valid = false;
    } else {
        setSuccessFor(dob, 'age accepted'); 
    }

    // validate terms and conditions
    if (!terms.checked){
        setErrorFor(terms, 'please read terms and tick check box');
        valid = false
    } else {
        setErrorFor(terms, '');
    }

    return valid;
}

function is18orOlder(dobString){
    const dob = new Date(dobString);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    // Check if the birth date is in a month and day that hasn't occurred this year yet
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        return age - 1 >= 18;
    }

    return age >= 18;
}

function isEmail(email){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function setErrorFor(input, message){
    const myInput = input.parentElement;
    myInput.className = 'my-input error';

    const span = myInput.querySelector('.error');
    span.innerText = message;
}

function setSuccessFor(input, message){
    const myInput = input.parentElement;
    myInput.className = 'my-input success';

    const span = myInput.querySelector('.error');
    span.innerText = message;
}

document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthMessage = document.getElementById('strengthMessage');
    const weakIndicator = document.getElementById('weak');
    const mediumIndicator = document.getElementById('medium');
    const strongIndicator = document.getElementById('strong');

    let strength = 0; // Initialize strength score

    // Password strength criteria
    if (password.length >= 6) strength++; // Length
    if (/[A-Z]/.test(password)) strength++; // Uppercase letter
    if (/[a-z]/.test(password)) strength++; // Lowercase letter
    if (/[0-9]/.test(password)) strength++; // Number
    if (/[\W_]/.test(password)) strength++; // Special character

    // Reset indicators
    weakIndicator.style.opacity = '0.3';
    mediumIndicator.style.opacity = '0.3';
    strongIndicator.style.opacity = '0.3';
    strengthMessage.innerText = '';

    // Evaluate strength
    switch (strength) {
        case 0:
        case 1:
            strengthMessage.innerText = 'Weak';
            weakIndicator.style.opacity = '1'; // Show weak indicator
            break;
        case 2:
        case 3:
        case 4:
            strengthMessage.innerText = 'Medium';
            weakIndicator.style.opacity = '1'; // Show weak indicator
            mediumIndicator.style.opacity = '1'; // Show medium indicator
            break;
        case 5:
            strengthMessage.innerText = 'Strong';
            weakIndicator.style.opacity = '1'; // Show weak indicator
            mediumIndicator.style.opacity = '1'; // Show medium indicator
            strongIndicator.style.opacity = '1'; // Show strong indicator
            break;
    }
});