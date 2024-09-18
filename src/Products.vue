<template>
    <Suspense>
        <template #default>
            <div>
                <span class="message">Hexagonal by express</span>
                <div class="container">
                    <div class="admin-product-form-container">
                        <form id="myForm" action="/user/v1" method="POST"> <!-- enctype="multipart/form-data" -->
                            <h3>add a new info</h3>
                            <!-- <input type="number" placeholder="Enter the user code" name="codigo" class="box"> -->
                            <input type="text" placeholder="Enter the name of product" name="name" class="box">
                            <input type="number" placeholder="Enter the price" name="price" class="box">
                            <input type="file" accept="image/png, image/jpeg, image/jpg" name="product_image"
                                class="box">
                            <input type="submit" class="btn" name="add" value="add">
                        </form>
                    </div>
                    <div class="product-display">
                        <table class="product-display-table">
                            <thead>
                                <tr>
                                    <td>Image</td>
                                    <td>No</td>
                                    <td>Name</td>
                                    <td>Precio</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody id="myTbody">
                                <tr v-for="(product, index) in products" :key="index">
                                    <td><img :src="product.imageUrl" height="100" alt="Product Image"></td>
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>
                                        <a href="#" class="btn" @click.prevent="editProduct(product)"> edit </a>
                                        <a href="#" class="btn" @click.prevent="deleteProduct(product._id)"> delete </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </template>
        <template #loading>
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </template>
    </Suspense>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Estado para manejar la lista de productos
const products = ref([]);

let name = ref('');
let price = ref('');
let photo = ref('');

// Función para obtener los productos al cargar la página
const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        products.value = data;
        console.log( products.value[0]);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Función para eliminar un protucto
const deleteProduct = async (productId) =>{
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`);
        }
        fetchProducts();
        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
    
    }
}


// Función para editar un producto
const editProduct = async (product) => {
    try {
        const response = await fetch(`/api/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`);
        }
        fetchProducts();
        console.log('Product updated successfully');
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

const addProduct = async () => {
    try {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('price', price.value);
        formData.append('product_image', photo.value);
        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`);
        }
        fetchProducts();
        console.log('Product added successfully');
    }
    catch (error) {
        console.error('Error adding product:', error);
    }   
}

onMounted( () => {
    // Obtener productos al cargar la página
    fetchProducts();
    
    

});
</script>

<style>
:root {
    --green: #27ae60;
    --black: #333;
    --white: #fff;
    --bg-color: #eee;
    --box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
    --border: .1rem solid var(--black);
}

* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
    text-transform: capitalize;
}

html {
    font-size: 62.5%;
    overflow-x: hidden;
}

.btn {
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: .5rem;
    margin-top: 1rem;
    font-size: 1.7rem;
    padding: 1rem 3rem;
    background: var(--green);
    color: var(--white);
    text-align: center;
}

.btn:hover {
    background: var(--black);
}

.message {
    display: block;
    background: var(--bg-color);
    padding: 1.5rem 1rem;
    font-size: 2rem;
    color: var(--black);
    margin-bottom: 2rem;
    text-align: center;
}

.container {
    display: flex;
    justify-content: space-around;
}

.admin-product-form-container.centered {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

}

.admin-product-form-container form {
    max-width: 50rem;
    padding: 2rem;
    border-radius: .5rem;
    background: var(--bg-color);
}

.admin-product-form-container form h3 {
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 1rem;
    text-align: center;
    font-size: 2.5rem;
}

.admin-product-form-container form .box {
    width: 100%;
    border-radius: .5rem;
    padding: 1.2rem 1.5rem;
    font-size: 1.7rem;
    margin: 1rem 0;
    background: var(--white);
    text-transform: none;
}

.product-display {
    /* margin: 2rem 0; */
    width: 65%;
    height: 85svh;
    overflow-y: auto;
}

.product-display .product-display-table {
    width: 100%;
    text-align: center;
}

.product-display .product-display-table thead {
    background: var(--bg-color);
}

.product-display .product-display-table th {
    padding: 1rem;
    font-size: 2rem;
}


.product-display .product-display-table td {
    padding: 1rem;
    font-size: 2rem;
    border-bottom: var(--border);
}

.product-display .product-display-table .btn:first-child {
    margin-top: 0;
}

.product-display .product-display-table .btn:last-child {
    background: crimson;
}

.product-display .product-display-table .btn:last-child:hover {
    background: var(--black);
}

@media (max-width:991px) {

    html {
        font-size: 55%;
    }

}

@media (max-width:768px) {
    .container {
        flex-direction: column;
        align-items: center;
    }

    .product-display {
        margin-top: 2rem;
        width: 100%;
        height: 100svh;
        overflow-y: scroll;
    }

}

@media (max-width:450px) {

    html {
        font-size: 50%;
    }

    .product-display .product-display-table {
        width: 80rem;
    }
}
</style>
