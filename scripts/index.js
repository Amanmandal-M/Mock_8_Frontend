// Api and their endpoints
const BaseUrl = `https://olx-classifieds-backend-app.onrender.com`;
const SignupUrl= `${BaseUrl}/api/signup`;
const loginUrl= `${BaseUrl}/api/login`;

// SignUp materials
const mainContainerSignup = document.querySelector('#mainContainerSignup');
const signUpToggleButton = document.querySelector('.signup');
const signupButton = document.querySelector('.signUpButton');
const SignupEmail = document.querySelector('.signupEmail')
const SignupPassword = document.querySelector('.signupPassword');

// Heading 
const nameHeader = document.querySelector('.nameValid');

// Login materials
const mainContainerLogin = document.querySelector('#mainContainerLogin');
const loginToggleButton = document.querySelector('.login');
const loginButton = document.querySelector('.loginButton');
const loginEmail = document.querySelector('.loginEmail')
const loginPassword = document.querySelector('.loginPassword');

const signupText = document.querySelector('.SignupText')

// Toggle when you click login or signup buttons
signUpToggleButton.addEventListener('click',(e)=>{
    mainContainerSignup.style.display = "block";
    mainContainerLogin.style.display = 'none';
    signUpToggleButton.style.background = "blue";
    loginToggleButton.style.background = "white";
    nameHeader.textContent = "Signup Form"
});

loginToggleButton.addEventListener('click',(e)=>{
    mainContainerLogin.style.display = "block";
    mainContainerSignup.style.display = "none";
    signUpToggleButton.style.background = "white";
    loginToggleButton.style.background = "blue";
    nameHeader.textContent = "Login Form"
});

signupText.addEventListener("click", (e)=>{
    mainContainerSignup.style.display = "block";
    mainContainerLogin.style.display = 'none';
    signUpToggleButton.style.background = "blue";
    loginToggleButton.style.background = "white";
    nameHeader.textContent = "Signup Form"
})


// Signup
signupButton.addEventListener("click", (e)=>{
    e.preventDefault();
    let data = {
        "email":SignupEmail.value,
        "password":SignupPassword.value
    };
    
    if(SignupEmail.value=="" || SignupPassword.value=="") return alert('Invalid Credentials')

    mainContainerSignup.innerHTML = ""
    mainContainerSignup.innerHTML = "<h2 style='text-align:center'>Please wait it takes time....</h2>"
    registerData(data);
});
const registerData = async (data) => {
    try {
        const apiResponse = await fetch(SignupUrl,{
            method: 'POST',
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify(data)
        });

        handleSignUpFunctionalities();
        if(apiResponse.status==201) return alert('Signup Successful');
        else if(apiResponse.status==401) return alert(`User already registered`)
    } catch (error) {
        alert("Contact to administrator")
    }
};

function handleSignUpFunctionalities(){
       (SignupEmail.value="" , SignupPassword.value="");
        mainContainerSignup.innerHTML = ""

        mainContainerLogin.style.display = "block";
        mainContainerSignup.style.display = "none";
        signUpToggleButton.style.background = "white";
        loginToggleButton.style.background = "blue";
        nameHeader.textContent = "Login Form"
}


// Login
loginButton.addEventListener("click", (e)=>{
    e.preventDefault();

    
    let data = {
        "email":loginEmail.value,
        "password":loginPassword.value
    }

    if(loginEmail.value=="" || loginPassword.value=="") return alert('Invalid Credentials');

    mainContainerLogin.innerHTML = ""
    mainContainerLogin.innerHTML = "<h2 style='text-align:center'>Please wait it takes time....</h2>"
    loginData(data);
});
const loginData = async (data) => {


    try {
        const apiResponse = await fetch(loginUrl,{
            method: 'POST',
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify(data)
        });

        const dataOfResponse = await apiResponse.json();

        (loginEmail.value="", loginPassword.value="");
        
        localStorage.setItem('token', dataOfResponse.Token)
        
        mainContainerLogin.innerHTML = ""

        if(apiResponse.status==201)      return alert('Login Successful', window.location.href="../html/productForm.html");
        else if(apiResponse.status==401) return alert(`User Not Found`)
        else                             return alert(`Invalid credentials`);
    } catch (error) {
        alert("Contact to administrator")
    }
};