// let SignIn = document.querySelector('#sign');
// let SignUp = document.getElementById('tab_sign_up');

// let SignInContainer = document.getElementsByClassName('SignIn')[0];
// let SignUpContainer = document.getElementsByClassName('SignUp')[0];

// let container_auth = document.getElementsByClassName('container_auth')[0];
// let error_login = document.getElementsByClassName('error_login')[0];


class Forms {
    constructor(id) {
        this.elem = document.getElementById(id);
    }
    submit(func) {
        this.elem.addEventListener('submit', (event) => {
            event.preventDefault();
            func(this.elem);
        });
    }
    getInputs() {
        let inputs = this.elem.querySelectorAll('input');
        let obj = {};
        console.log(inputs);
        for (const iterator of inputs) {
            if (iterator.name) {
                obj[iterator.name] = iterator
            }
        }
        return obj
    }
    validateEmail() {
        let email = this.getInputs().email;
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value));
    }
    validatePassword() {
        let password = this.getInputs().password;
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return password.value.match(passw);
        return true;
    }
    submitFetch = async function postData(data) {
        const response = await fetch(this.elem.action, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        let m;
        if (!response.redirected) {
            m = await response.json();
        } else {
            m = response
        }

        return m
    }
}

let SignInForm = new Forms('sign');
let SignUpForm = new Forms('sign_up');

SignUpForm.submit(async (elem) => {
    let inputs = SignUpForm.getInputs();
    if (!SignUpForm.validateEmail()) {
        inputs.email.placeholder = 'ведите коректный email';
        inputs.email.value = '';
        // inputs.email.parentElement.classList.add('danger_placeholder');
    }

    if (!SignUpForm.validatePassword()) {
        inputs.password.placeholder = 'ведите коректный пароль';
        inputs.password.value = '';
        // inputs.password.parentElement.classList.add('danger_placeholder');
    }

    if (SignUpForm.validatePassword() && SignUpForm.validateEmail()) {
        let m = await SignUpForm.submitFetch({
            email: inputs.email.value,
            password: inputs.password.value,
        });
        if (m.message) {
            MyError(m.message);
        } else {
            location.reload(true);
        }
    }
});

SignInForm.submit(async (elem) => {
    let inputs = SignInForm.getInputs();
    if (!SignInForm.validateEmail()) {
        inputs.email.placeholder = 'ведите коректный email';
        inputs.email.value = '';
        // inputs.email.parentElement.classList.add('danger_placeholder');
    }

    if (!SignInForm.validatePassword()) {
        inputs.password.placeholder = 'ведите коректный пароль';
        inputs.password.value = '';
        // inputs.password.parentElement.classList.add('danger_placeholder');
    }

    if (SignInForm.validatePassword() && SignInForm.validateEmail()) {
        let m = await SignInForm.submitFetch({
            email: inputs.email.value,
            password: inputs.password.value,
            name: inputs.name.value,
            lastname: inputs.lastname.value,
            image: inputs.image.value,
            code: inputs.code.value,
            phone: inputs.phone.value
        });

        if (m.message) {
            MyError(m.message);
        } else {
            location.reload(true);
        }
    }
});



function MyError(message){
    alert(message);
}
