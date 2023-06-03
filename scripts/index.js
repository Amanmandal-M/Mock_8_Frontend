const BaseUrl = `https://olx-classifieds-backend-app.onrender.com`;
const SignupUrl= `${BaseUrl}/api/signup`;
const loginUrl= `${BaseUrl}/api/login`;

const mainContainerSignup = document.querySelector('#mainContainerSignup');
const signUpToggleButton = document.querySelector('.signup');
const signupButton = document.querySelector('.signUpButton');

const nameHeader = document.querySelector('.nameValid');

const mainContainerLogin = document.querySelector('#mainContainerLogin');
const loginToggleButton = document.querySelector('.login');
const loginButton = document.querySelector('.loginButton');


// Input Values
const SignupEmail = document.querySelector('.signupEmail')
const SignupPassword = document.querySelector('.signupPassword');

const loginEmail = document.querySelector('.loginEmail')
const loginPassword = document.querySelector('.loginPassword');

signUpToggleButton.addEventListener('click',(e)=>{
    mainContainerSignup.style.display = "block";
    mainContainerLogin.style.display = 'none';
    signUpToggleButton.style.background = "blue";
    loginToggleButton.style.background = "white";
    nameHeader.textContent = "Signup Form"
})

loginToggleButton.addEventListener('click',(e)=>{
    mainContainerLogin.style.display = "block";
    mainContainerSignup.style.display = "none";
    signUpToggleButton.style.background = "white";
    loginToggleButton.style.background = "blue";
    nameHeader.textContent = "Login Form"
})


signupButton.addEventListener("click", (e)=>{
    e.preventDefault();
    let data = {
        "email":SignupEmail.value,
        "password":SignupPassword.value
    }
    registerData(data);
})

const registerData = async (data) => {

    if(data.email.value=="" || data.password.value=="") return alert('Invalid Credentials')

    try {
        const apiResponse = await fetch(SignupUrl,{
            method: 'POST',
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify(data)
        });

        SignupEmail.value=""
        SignupPassword.value=""

        if(apiResponse.status==201) return alert('Signup Successful');
        else if(apiResponse.status==401) return alert(`User already registered`)
    } catch (error) {
        alert("Contact to administrator")
    }
}


loginButton.addEventListener("click", (e)=>{
    e.preventDefault();

    
    let data = {
        "email":loginEmail.value,
        "password":loginPassword.value
    }
    loginData(data);
});

const loginData = async (data) => {

    if(data.email.value=="" || data.password.value=="") return alert('Invalid Credentials');

    try {
        const apiResponse = await fetch(loginUrl,{
            method: 'POST',
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify(data)
        });

        const dataOfResponse = await apiResponse.json();

        loginEmail.value=""
        loginPassword.value=""
        
        localStorage.setItem('token', dataOfResponse.Token)

        if(apiResponse.status==201) return alert('Login Successful');
        else if(apiResponse.status==401) return alert(`User Not Found`)
        else return alert(`Invalid credentials`);
    } catch (error) {
        alert("Contact to administrator")
    }
}