<template>
    <div class="w-full bg-slate-200 rounded-md lg:w-1/4 md:w-1/3 sm:w-1/2 mx-0.5 mb-4">
        <h4 class="text-sm font-semibold text-center py-3">{{ dataProduct.nameProduct }}</h4>
        <img :src="dataProduct.imageUrl" class="w-full px-3 rounded h-72">
        <div class="card-body p-3">
            <p class="font-light text-justify">
                {{ dataProduct.descriptionProduct }}
                <br />
                <b>Precio: </b> {{ dataProduct.price }} $us <br />
                <b>Calificacion: </b> {{ dataProduct.rating }}
            </p>
            <hr class="py-2" />
            <div class="container mt-3 flex justify-between items-center">
                <span class="border-solid border-stone-700 border-2 rounded-lg p-2">
                    {{ category.name  }}
                </span>
                <div class="section-button flex justify-between gap-2">
                    <button @click="handleEdit(dataProduct.id)" class="bg-indigo-600 border-indigo-800 hover:bg-indigo-900 hover:transition-all border-2 border-solid rounded-xl p-2 text-white font-semibold">
                        <font-awesome-icon icon="fa-solid fa-edit" /> Editar
                    </button>
    
                    <button @click="handleDelete(dataProduct.id)" class="bg-red-600 border-red-800 border-2 hover:bg-red-800 hover:transition-all border-solid rounded-xl p-2 text-white font-semibold">
                        <font-awesome-icon icon="fa-solid fa-trash" /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getCategoryId } from '../services/category.service';
    export default {
        name: 'CardProduct',
        data() {
            return {
                category: {}
            }
        },
        props: {
            dataProduct: {},
        },
        methods: {
            handleEdit(id) {
                this.$emit('productId', id);
            },
            handleDelete(id) {
                this.$emit('deleleProduct', id)
            },
            async getCategory() {
                this.category = await getCategoryId(this.dataProduct.categoryId);
            }
        },
        mounted() {
            this.getCategory()
        }
    }
</script>