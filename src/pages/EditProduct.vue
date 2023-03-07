<template>
    <h1 class="text-3xl py-2 font-bold text-cyan-500 text-center">Modificar Producto</h1>
    <hr>

    <div class="flex justify-center align-middle">
        <div class="container lg:w-1/2 mb-7">
            <div class="my-4 bg-white shadow-black shadow-md rounded-lg h-full">

                <h1 class="text-center font-bold text-2xl py-6">Formulario de Producto</h1>
                <hr />
                <form class="gap-3 mx-14">
                    <div class="p-3 bg-red-700 text-white font-bold text-lg text-center rounded-lg" v-if="messageError != ''">
                        Se produjo un error al momento de registrar, intente de nuevo o contactese con su administrador
                    </div>
                    <div class="py-2">
                        <label class="font-semibold text-lg" for="nameProduct">Nombre de Producto</label>
                        <input 
                            type="text" 
                            name="nameProduct"
                            v-model="nameProduct" 
                            id="nameProduct"
                            class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"
                        />
                    </div>

                    <div class="py-2">
                        <label class="font-semibold text-lg" for="descriptionProduct">Descripcion de Producto</label>
                        <textarea 
                            name="descriptionProduct"
                            v-model="descriptionProduct"
                            id="descriptionProduct"
                            class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"
                        ></textarea>
                    </div>
                    
                    <div class="py-2 flex justify-center items-center">
                        <div class="mr-3">
                            <label class="font-semibold text-lg" for="price">Precio de Producto</label>
                            <input 
                                type="number" 
                                name="price"
                                v-model="price" 
                                id="price"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"
                            />
                        </div>

                        <div>
                            <label class="font-semibold text-lg" for="stock">Stock de Producto</label>
                            <input 
                                type="number" 
                                name="stock"
                                v-model="stock" 
                                id="stock"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"
                            />
                        </div>
                    </div>

                    <div class="py-2 flex justify-center items-center">
                        <div class="mr-3">
                            <label class="font-semibold text-lg" for="imageUrl">Url de Imagen</label>
                            <input 
                                type="url" 
                                name="imageUrl"
                                v-model="imageUrl" 
                                id="imageUrl"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"
                            />
                        </div>

                        <div>
                            <img :src="imageUrl === '' ? '' : imageUrl">
                        </div>
                    </div>

                    <div class="py-2 flex justify-center items-center">
                        <div class="mr-3">
                            <label class="font-semibold text-lg" for="rating">Calificacion de Producto</label>
                            <input 
                                type="number" 
                                name="rating"
                                v-model="rating" 
                                id="rating"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"
                            />
                        </div>

                        <div>
                            <label class="font-semibold text-lg" for="categoryId">Categoria</label>
                            <select 
                                name="categoryId" 
                                id="categoryId"
                                v-model="categoryId"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"
                            >
                                <option :value="null">Seleccione una opcion</option>
                                <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="text-center my-3">
                        <button type="submit" @click="HandleEditProduct" class="p-3 bg-cyan-600 text-white hover:bg-cyan-800 hover:transition-colors w-full rounded-lg font-semibold">
                            <font-awesome-icon icon="fa-solid fa-save" /> Guardar Cambios
                        </button>
                        <button type="button" @click="$router.go(-1)" class="p-3 mt-2 bg-red-700 text-white hover:bg-red-800 hover:transition-all w-full rounded-lg font-semibold">
                            <font-awesome-icon icon="fa-solid fa-x" /> Cancelar
                        </button>
                    </div>


                </form>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router/router';
import { getAllCategories } from '../services/category.service';
import { getProduct, updateProduct } from '../services/product.service';
    export default {
        name: 'EditProduct',
        data() {
            return {
                categories: [],
                Product: {},
                id: 0,
                descriptionProduct: '',
                nameProduct: '',
                price: 0,
                stock: 0,
                imageUrl: '',
                rating: 0,
                categoryId: null,
                messageError: ''
            }
        },
        methods: {
            async getCategories() {
                this.categories = await getAllCategories();
            },

            async getProduct(id) {
                this.Product = await getProduct(id);
                const { nameProduct, descriptionProduct, price, stock, imageUrl, rating, categoryId } = this.Product;
                this.id = this.Product.id;
                this.nameProduct = nameProduct;
                this.descriptionProduct = descriptionProduct;
                this.stock = stock;
                this.price = price;
                this.imageUrl = imageUrl;
                this.rating = rating;
                this.categoryId = categoryId;
            },

            async HandleEditProduct(e)  {
                e.preventDefault();

                const product = {
                    nameProduct: this.nameProduct,
                    descriptionProduct: this.descriptionProduct,
                    price: this.price,
                    stock: this.stock,
                    imageUrl: this.imageUrl,
                    rating: this.rating,
                    categoryId: this.categoryId
                }

                const data = await updateProduct(this.Product.id, product);

                if (data.success) {
                    this.$swal({
                        title: 'Actualizacion Completa',
                        text: 'Se guardo los cambios de manera correcta',
                        icon: 'success'
                    })
                    router.push('/products');
                } else {
                    this.$swal({
                        title: 'Error al actualizar',
                        text: 'Se produjo un error al momento de actualizar los datos',
                        icon: 'error'
                    })
                }
            }
        },
        mounted() {
            this.getCategories();
            this.getProduct(this.$route.params.id)
        }
    }
</script>