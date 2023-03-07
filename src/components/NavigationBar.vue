<template>
    <nav class="bg-slate-100  py-6">
        <div class="container px-10 flex justify-between">
            <div class="nav-brand">
                <h3 class="font-bold text-slate-600 text-xl">Sistema de Productos</h3>
            </div>
            <div class="nav-container">
                <ul class="flex justify-between font-normal">
                    <li class="px-3">
                        <RouterLink active-class="active" to="/">Inicio</RouterLink>
                    </li>
                    <li class="px-3">
                        <RouterLink active-class="active" to="/products">Productos</RouterLink>
                    </li>
                    <li class="px-3">
                        <RouterLink active-class="active" to="/categories">Categorias</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'NavigationBar'
}
</script>

<style scoped>
    .active {
        font-weight: bold;
        color: #c92c10
    }
    a {
        transition: all .3s ease-in;
    }

    a:hover {
        color: #c92c10
    }
</style>