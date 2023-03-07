<template>
    <h1 class="text-3xl py-2 font-bold text-cyan-500 text-center"> Registrar Categoria</h1>
    <hr>

    <div class="flex justify-center align-middle">
        <div class="container lg:w-1/2 mb-7">
            <div class="my-4 bg-white shadow-black shadow-md rounded-lg h-full">

                <h1 class="text-center font-bold text-2xl py-6">Formulario de Producto</h1>
                <hr />
                <form class="gap-3 mx-14">

                    <div class="py-2">
                        <label class="font-semibold text-lg" for="name">Nombre de Categoria</label>
                        <input type="text" name="name" v-model="name" id="name"
                            class="p-3 w-full border-slate-300 border-2 rounded-lg my-2" />
                    </div>

                    <div class="py-2">
                        <label class="font-semibold text-lg" for="isActive">Estado</label>
                        <select name="isActive" id="isActive" v-model="isActive"
                                class="p-3 w-full border-slate-300 border-2 rounded-lg my-2">
                            <option :value="null">Seleccione una opcion</option>
                            <option :value="false">No Habilitado</option>
                            <option :value="true">Habilitado</option>
                        </select>
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
import {registerCategory  } from '../services/category.service'
export default {
    name: 'CreateCategory',
    data() {
        return {
            name: '',
            isActive: null
        };
    },
    methods: {
        async HandleRegister(e) {
            e.preventDefault();

            let dataCategory = {
                name: this.name,
                isActive: this.isActive
            };

            const dataResult = await registerCategory(dataCategory);

            if (dataResult.success) {
                this.$router.push('/categories');
                this.$swal({
                    title: 'Registro exitoso',
                    text: 'Se registro la categoria correctamente',
                    icon: 'success'
                });
            } else {
                this.$swal({
                    title: 'Error de Registro',
                    text: 'Se produjo un error al momento de registrar la Categoria',
                    icon: 'error'
                });
            }
        }
    }
}
</script>