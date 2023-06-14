## Olx Delivey App Frontend 

<br>

##  Folder Structure

```
├── index.html
├── html
|    └── product.html
├── scripts
|    └── index.js
|    └── product.js     
├── styles
|    └── index.css
|    └── product.css
```

<br>

## API endpoints with Base Url

<br>

### BaseUrl : `https://olx-classifieds-backend-app.onrender.com`

<br>

<table>
    <thead>
        <tr>
            <th>METHOD</th>
            <th>ENDPOINT</th>
            <th>DESCRIPTION</th>
        </tr>
    </thead>
        <tbody>
        <tr>
            <td>POST</td>
            <td>`${BaseUrl}/api/signup`</td>
            <td>This endpoint should allow users to register. Hash the password on store.</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>`${BaseUrl}/api/login`</td>
            <td>This endpoint should allow users to login. Return JWT token on login.</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>`${BaseUrl}/api/products?limit=${limit}`</td>
            <td>This endpoint is for view all products.</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>`${BaseUrl}/api/products/:id`</td>
            <td>This endpoint is for view single product by Id.</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>`${BaseUrl}/api/productSearch?search=${searchData}`</td>
            <td>This endpoint is for view searched products.</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>`${BaseUrl}/api/productSort?sort=${asc/desc}`</td>
            <td>This endpoint is for view sort by date.</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>`${BaseUrl}/api/productFilter?category=${category name}`</td>
            <td>This endpoint is for view filter by category.</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>`${BaseUrl}/api/products`</td>
            <td>This endpoint is for add a new product.</td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>`${BaseUrl}/api/products/:id`</td>
            <td>This endpoint should allow the user to place an order.</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>`${BaseUrl}/api/products/:id`</td>
            <td>This endpoint is for delete products by id.</td>
        </tr>
    </tbody>
</table>


</details>