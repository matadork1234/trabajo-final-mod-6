import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ProductPage from '../pages/ProductPage.vue';
import CreateProduct from '../pages/CreateProduct.vue';
import EditProduct from '../pages/EditProduct.vue';
import CategoryPage from '../pages/CategoryPage.vue';
import CreateCategory from '../pages/CreateCategory.vue';
import EditCategory from '../pages/EditCategory.vue';

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/products',
        component: ProductPage,
    },
    {
        path: '/products/create',
        component: CreateProduct
    },
    {
        path: '/products/:id/edit',
        component: EditProduct
    },
    {
        path: '/categories',
        component: CategoryPage
    },
    {
        path: '/categories/create',
        component: CreateCategory
    },
    {
        path: '/categories/:id/edit',
        component: EditCategory
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;