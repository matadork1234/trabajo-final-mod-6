<template>
    <h1 class="text-3xl py-2 font-bold text-cyan-500 text-center"> Lista de Productos</h1>
    <hr>
    <div class="container flex justify-between">
        <div class="lg:w-1/3">
            <input 
                type="search" 
                name="search" 
                id="search"
                v-model="search"
                @keypress="searchProduct"
                placeholder="Ingrese el criterio de busqueda"
                class="border-stone-200 border-2 my-2 w-full rounded-lg border-solid p-3" 
            />
        </div>
        <div class="py-2">
            <button class="bg-cyan-500 border-cyan-800 rounded-lg text-white font-semibold p-3" @click="$router.push('/products/create')">
                <font-awesome-icon icon="fa-solid fa-plus" /> Nuevo Producto
            </button>
        </div>
    </div>
    <div class="w-full flex justify-center">
        <button @click="FilterCategory(0)"  type="button" class="border-solid rounded-xl mr-2 hover:bg-gray-600 hover:text-white hover:transition-all hover:border-gray-800 border-gray-500 border-2 p-3">
            Todo
        </button>
        <button @click="FilterCategory(item.id)"  type="button" class="border-solid rounded-xl mr-2 hover:bg-gray-600 hover:text-white hover:transition-all hover:border-gray-800 border-gray-500 border-2 p-3" v-for="item in categories" :key="item.id">
            {{ item.name }}
        </button>
    </div>
    <div class="flex mx-auto content-center my-4 flex-wrap">
        <CardProduct v-for="item in this.listProducts" :key="item.id" :dataProduct="item" v-on:productId="getProduct" v-on:deleleProduct="getDeleteProduct"/>
    </div>
</template>
<script>
import CardProduct from '@/components/CardProduct.vue';
import router from '@/router/router';
import { getAllProducts, deleteProduct, filterProductsByCategory } from '../services/product.service';
import { getAllCategories } from '../services/category.service';
export default {
    name: 'ProductPage',
    components: {
        CardProduct
    },
    data() {
        return {
            listProducts: [],
            categories: [],
            product: {},
            search: ''
        }
    },
    methods: {
        async getProducts(search = '') {
            this.listProducts = await getAllProducts(search);
        },

        async getCategoriesActive() {
            const data = await getAllCategories();
            this.categories = data.filter(s => s.isActive == true);
        },

        async FilterCategory(id) {
            if (id == 0) {
                this.listProducts = await getAllProducts();
            } else {
                this.listProducts = await filterProductsByCategory(id);
            }
        },
        async searchProduct(e) {
            if (e.key == 'Enter') {
                this.listProducts = await getAllProducts(this.search);
            }
        },
        getDeleteProduct(id) {
            this.$swal({
                icon: 'question',
                title: 'Eliminar Producto',
                text: 'Seguro que desea eliminar el producto?',
                confirmButtonText: 'Eliminar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar' 
            }).then( async result => {
                if (result.value) { 
                    const data = await deleteProduct(id);
                    this.getProducts();
                    if (data.success) {
                        this.$swal({
                            icon: 'success',
                            title: 'Eliminacion correcta',
                            text: 'Se elimino correctamente el Producto'
                        });
                    } else {
                        this.$swal({
                            icon: 'error',
                            title: 'Error de borrado',
                            text: 'Se pprodujo un error al momento de eliminar el producto, intente de nuevo'
                        });
                    }
                }
            });
        },
        async getProduct(id) {
            router.push(`/products/${id}/edit`);
        }
    },
    mounted() {
        this.getProducts(this.search);
        this.getCategoriesActive();
        
    }
}
</script>