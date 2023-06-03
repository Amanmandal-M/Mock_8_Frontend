// Api and their endpoints
const BaseUrl = `https://olx-classifieds-backend-app.onrender.com/api`;
const allDataUrl = `${BaseUrl}/products`;
const singleDataUrl = `${BaseUrl}/products/:id`;
const searchByNameUrl = `${BaseUrl}/productSearch`;
const sortByDateUrl = `${BaseUrl}/productSort`;
const filterByCategoryUrl = `${BaseUrl}/productFilter`;
const editOrDeleteDataUrl = `${BaseUrl}/products`;

const token = localStorage.getItem('token');
if(!token) alert('Please login once' , window.location.href="../index.html");


const SelectCategory = document.querySelector('#category');
const ascToDescBtn = document.querySelector('.ascButton');
const descToAscBtn = document.querySelector('.descButton');
const formButton = document.querySelector('form');
const searchValue = document.querySelector('.searchByName');
const appendContainer =document.querySelector('#right');


window.addEventListener('load',(e)=>{
    appendContainer.innerHTML="Please wait a moment .....";
    getAllProducts();
});

// Get all products
const getAllProducts = async () => {
    try {
        const apiResponse = await fetch(`${allDataUrl}?limit=4`,{
            "method": "GET",
            headers:{
                'content-type': 'application/json',
                'Authorization': token
            }
        });
        const dataOfResponse = await apiResponse.json();
        appendContainer.innerHTML="";
        displayData(dataOfResponse);
    } catch (error) {
        console.log(error.message);
        alert('Contact to administrator')
    }
}


// Display Data on Browser.
const displayData = (data) => {
    appendContainer.innerHTML="";

    data.forEach((el)=>{
        let smallDiv = document.createElement('div');
        smallDiv.className="smallContainer";

        let image = document.createElement('img');
        image.src = el.image;
        image.alt = "Product Image"

        let productName = document.createElement('h2');
        productName.textContent=el.name;

        let category = document.createElement('p');
        category.textContent=el.category;
        category.className="categ";

        let description = document.createElement('p');
        description.textContent=el.description;
        description.className="descrip";

        let location = document.createElement('p');
        location.textContent=`Location: ${el.location}`;
        location.className="locate";

        let postedDate = document.createElement('p');
        postedDate.textContent=`Posted On : ${el.postedAt}`;
        postedDate.className="postedAtDate";

        let price = document.createElement('p');
        price.textContent=`Rs. ${el.price} /-`;
        price.className="price";

        let divButton = document.createElement('div');
        divButton.className="divButtons";

        let editBtn = document.createElement('button');
        editBtn.className = "editBtn";
        editBtn.textContent="Edit";
        editBtn.addEventListener('click',(e)=>{
            console.log(el);
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click',(e)=>{
            deleteData(el._id);
        });

        divButton.append(editBtn,deleteBtn);
        smallDiv.append(image,productName,category,description,location,postedDate,price,divButton);
        appendContainer.appendChild(smallDiv);
    });
};

// Fetch Data By Category
SelectCategory.addEventListener('change',(e)=>{

    if(SelectCategory.value=="") return getAllProducts();
    appendContainer.innerHTML="Please wait a moment .....";
    fetchDataByCategory();
})
const fetchDataByCategory = async () => {
    try {
        const apiResponse = await fetch(`${filterByCategoryUrl}?category=${SelectCategory.value}`,{
            "method": "GET",
            headers:{
                'content-type': 'application/json',
                'Authorization': token
            }
        });
        const data = await apiResponse.json();
        appendContainer.innerHTML="";
        displayData(data);
    } catch (error) {
        alert('Contact to administrator')
    }
}

// Sort in ascending order
ascToDescBtn.addEventListener('click', (e)=>{
    let value = "asc";
    appendContainer.innerHTML="Please wait a moment .....";
    SortedData(value);
})

// Sort in descending order
descToAscBtn.addEventListener('click', (e)=>{
    let value = "desc";
    appendContainer.innerHTML="Please wait a moment .....";
    SortedData(value);
})

const SortedData = async (value) => {
    try {
        const apiResponse = await fetch(`${sortByDateUrl}?sort=${value}`,{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': token
            }
        });
        const data = await apiResponse.json();
        appendContainer.innerHTML="";
        displayData(data);
    } catch (error) {
        console.log('Contact to administrator');
    }
}


// Search by name
formButton.addEventListener('submit', (e)=>{
    e.preventDefault();
    let data = searchValue.value;
    appendContainer.innerHTML="Please wait a moment .....";
    searchedData(data);
});

const searchedData = async (data) => {
    try {
        const apiResponse = await fetch(`${searchByNameUrl}?search=${data}`,{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': token
            }
        });
        const dataOfResponse = await apiResponse.json();

        appendContainer.innerHTML="";
        displayData(dataOfResponse);
    } catch (error) {
        alert('Contact to administrator')
    }
}


// Delete a product
const deleteData = async (id) => {
    try {
        const apiResponse = await fetch(`${editOrDeleteDataUrl}/${id}`,{
            method: 'DELETE',
            headers:{
                'content-type': 'application/json',
                'Authorization': token
            }
        });
        if(apiResponse.status==200) {
            alert('Product deleted successfully');
            appendContainer.innerHTML="Loading...";
            getAllProducts();
        }
        
    } catch (error) {
        alert('Contact to administrator');
    }
}