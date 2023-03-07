import { ClientAxios } from '../helpers/ClientAxios';

export const getAllProducts = async (search = '') => {

    var dataProducts ;

    if (search === '') {
        const { data } = await ClientAxios('/products?_embed=categories');
        dataProducts = data;
    } else {
        const { data } = await ClientAxios(`/products?q=${ search }`);
        dataProducts = data;
    }

    return dataProducts;
}

export const filterProductsByCategory = async (categoryId) => {
    const { data } = await ClientAxios(`/products?categoryId=${categoryId}`);
    return data;
}

export const registerProduct = async (product) => {
    
    try {
        const { data } = await ClientAxios.post('/products', product);

        if (data) {
            return {
                success: true
            }
        }
        
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

export const getProduct = async (id) => {
    try {
        const {data} = await ClientAxios(`/products/${ id }`);

        return data;
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

export const updateProduct = async (id, dataProduct) => {
    try {
        const { data } = await ClientAxios.put(`/products/${ id }`, dataProduct);

        if (data) {
            return {
                success: true
            }
        }
        
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

export const deleteProduct = async (id) => {
    try {
        const { data } = await ClientAxios.delete(`/products/${ id }`);

        if (data) {
            return {
                success: true
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}