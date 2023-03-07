<template>
    <h1 class="text-3xl py-2 font-bold text-cyan-500 text-center">Registrar Producto</h1>
    <hr>

    <div class="flex justify-center align-middle">
        <div class="container lg:w-1/2 mb-7">
            <div class="my-4 bg-white shadow-black shadow-md rounded-lg h-full">

                <h1 class="text-center font-bold text-2xl py-6">Formulario de Producto</h1>
                <hr />
                <form class="gap-3 mx-14">
                    <div class="p-3 bg-red-700 text-white font-bold text-lg text-center rounded-lg"
                        v-if="messageError != ''">
                        Se produjo un error al momento de registrar, intente de nuevo o contactese con su administrador
                    </div>
                    <div class="py-2">
                        <label class="font-semibold text-lg" for="nameProduct">Nombre de Producto</label>
                        <input type="text" name="nameProduct" v-model="nameProduct" id="nameProduct"
                            class="p-3 w-full border-slate-300 border-2 rounded-lg my-2" />
                    </div>

                    <div class="py-2">
                        <label class="font-semibold text-lg" for="descriptionProduct">Descripcion de Producto</label>
                        <textarea name="descriptionProduct" v-model="descriptionProduct" id="descriptionProduct"
                            class="p-3 w-full border-slate-300 border-2 rounded-lg my-2"></textarea>
                    </div>

                    <div class="py-2 flex justify-center items-center">
                        <div class="mr-3">
                            <label class="font-semibold text-lg" for="price">Precio de Producto</label>
                            <input type="number" name="price" v-model="price" id="price"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2" />
                        </div>

                        <div>
                            <label class="font-semibold text-lg" for="stock">Stock de Producto</label>
                            <input type="number" name="stock" v-model="stock" id="stock"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2" />
                        </div>
                    </div>

                    <div class="py-2 flex justify-center items-center">
                        <div class="mr-3">
                            <label class="font-semibold text-lg" for="imageUrl">Url de Imagen</label>
                            <input type="url" name="imageUrl" v-model="imageUrl" id="imageUrl"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2" />
                        </div>

                        <div>
                            <img :src="imageUrl === '' ? '' : imageUrl">
                        </div>
                    </div>

                    <div class="py-2 flex justify-center items-center">
                        <div class="mr-3">
                            <label class="font-semibold text-lg" for="rating">Calificacion de Producto</label>
                            <input type="number" name="rating" v-model="rating" id="rating"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2" />
                        </div>

                        <div>
                            <label class="font-semibold text-lg" for="categoryId">Categoria</label>
                            <select name="categoryId" id="categoryId" v-model="categoryId"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2">
                                <option :value="null">Seleccione una opcion</option>
                                <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                        <!-- <button @click="OpenModal" data-modal-target="modalEl" data-modal-toggle="modalEl"
                            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-7 ml-3 px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                            type="button">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button> -->
                    </div>

                    <div class="text-center my-3">
                        <button type="submit" @click="HandleRegister"
                            class="p-3 bg-cyan-600 text-white hover:bg-cyan-800 hover:transition-colors w-full rounded-lg font-semibold">
                            <font-awesome-icon icon="fa-solid fa-check" /> Registrar Producto
                        </button>
                        <button type="button" @click="$router.go(-1)"
                            class="p-3 mt-2 bg-red-700 text-white hover:bg-red-800 hover:transition-all w-full rounded-lg font-semibold">
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
import { registerProduct } from '../services/product.service';
// import ModalComponent from '../components/ModalComponent.vue';
// import { Modal } from 'flowbite'

// const $targetEl = document.getElementById('modalEl');

// options with default values
// const options = {
//     placement: 'bottom-right',
//     backdrop: 'dynamic',
//     backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
//     closable: true,
//     onHide: () => {
//         console.log('modal is hidden');
//     },
//     onShow: () => {
//         console.log('modal is shown');
//     },
//     onToggle: () => {
//         console.log('modal has been toggled');
//     }
// };

// const options = {}

// const modal = new Modal($targetEl, options);

export default {
    name: 'CreateProduct',
    data() {
        return {
            categories: [],
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

        async HandleRegister(e) {
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

            const data = await registerProduct(product);

            if (data.success) {
                this.$swal({
                    title: 'Registro Completo',
                    text: 'Registro de Producto Correcto',
                    icon: 'success'
                })
                router.push('/products');
            } else {
                this.$swal({
                    title: 'Error de Registro',
                    text: 'No se pudo registrar intente de nuevo o contactese con su administador',
                    icon: 'error'
                })
            }
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>