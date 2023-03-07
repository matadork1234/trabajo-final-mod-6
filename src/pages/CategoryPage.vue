<template>
    <div class="w-full flex justify-between items-center px-10">
        <h1 class="text-3xl py-2 font-bold text-cyan-500 "> Lista de Categorias</h1>
        <button @click="$router.push('/categories/create')" class="bg-teal-400 text-white p-3 rounded-lg hover:bg-teal-700 hover:transition-all">
            <font-awesome-icon icon="fa-solid fa-plus" /> Agregar Categoria
        </button>
    </div>
    <hr class="mx-10 my-3" />

    <div class="w-full px-10 my-5">
        <table class="table-auto w-full rounded-lg">
            <thead class="bg-cyan-500 text-white font-semibold text-center">
                <tr>
                    <th class="border-b py-3">Nombre Categoria</th>
                    <th class="border-b py-3">Estado</th>
                    <th class="border-b py-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in listCategories" :key="item.id" class="text-center">
                    <td class="border-b border-slate-300 dark:border-slate-700 p-2 pl-8 text-slate-500 dark:text-slate-400">{{ item.name }}</td>
                    <td class="border-b border-slate-300 dark:border-slate-700 p-2 pl-8 text-slate-500 dark:text-slate-400">{{ item.isActive ? 'Activo' : 'Inactivo' }}</td>
                    <td class="flex justify-center border-b border-slate-300 dark:border-slate-700 p-2 pl-8 text-slate-500 dark:text-slate-400">
                        <button @click="EditCategory(item.id)" class="bg-indigo-600 py-3 px-4 text-white rounded-lg mr-2 border-indigo-800 hover:bg-indigo-800 hover:transition-all">
                            <font-awesome-icon icon="fa-solid fa-edit" />
                        </button>
                        <button @click="DeleteConfirm(item.id)" class="bg-red-600 py-3 px-4 text-white rounded-lg border-red-800 hover:bg-red-800 hover:transition-all">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { getAllCategories, deleteCategory } from '../services/category.service';

export default {
    name: 'CategoryPage',
    data() {
        return {
            listCategories: []
        }
    },
    methods: {
        async getAllCategories() {
            this.listCategories = await getAllCategories()
        },
        EditCategory(id) {
            this.$router.push(`/categories/${ id }/edit`);
        },
        DeleteConfirm(id) {
            this.$swal({
                title: 'Eliminar Categoria',
                text: 'Seguro que desea eliminar la Categoria?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Eliminar',
            }).then(async result => {
                if (result.value) {
                    const data = await deleteCategory(id);
                    this.getAllCategories();    
                    if (data.success) {
                        this.$swal({
                            title: 'Eliminacion Correcta',
                            text: 'Se elimino correctamente la categoria',
                            icon: 'success'
                        });
                    } else {
                        this.$swal({
                            title: 'Error al Eliminar',
                            text: 'Se produjo un error al momento de eliminar la categoria',
                            icon: 'error'
                        });
                    }
                }
            })
        }
    },
    mounted() {
        this.getAllCategories()
    }
}
</script>