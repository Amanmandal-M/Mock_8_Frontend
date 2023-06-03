// Api and their endpoints
const BaseUrl = `https://olx-classifieds-backend-app.onrender.com`;
const addProductUrl = `${BaseUrl}/api/products`;

const SubmitButton = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const selectValue = document.querySelector('#category');

const token = localStorage.getItem('token');

const Checking = () => {
    if(!token) return alert('Please login once' , window.location.href="../index.html");
};


SubmitButton.addEventListener('submit',(e)=>{
    e.preventDefault();

    let data={};
    for(let i=0;i<inputs.length-1;i++){
        data[inputs[i].id] = inputs[i].value;
        data[selectValue.id]=selectValue.value;
    }
    AddProduct(data);
});

const AddProduct = async (data) => {
    try {
        const apiResponse = await fetch(addProductUrl,{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                "Authorization":token
            },
            body : JSON.stringify(data)
        });

        for(let i=0;i<inputs.length-1;i++){
            inputs[i].value ="";
            selectValue.value ="";
        }

        if(apiResponse.status == 200) return alert('Product added successfully',Window.location.href="../html/product.html");
        else return alert('Contact to administrator')
        
    } catch (error) {
        alert(`Contact to administrator`);
    }
}