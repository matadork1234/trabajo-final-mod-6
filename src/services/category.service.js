import { ClientAxios } from '../helpers/ClientAxios';

export const getAllCategories = async () => {
    const { data } = await ClientAxios('/categories');
    return data;
}

export const getCategoryId = async (id) => {
    const { data } = await ClientAxios(`/categories/${ id }`);
    return data;
}

export const registerCategory = async (dataCategory) => {
    try {
        const { data } = await ClientAxios.post('/categories', dataCategory);

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

export const updateCategory = async (id, dataCategory) => {
    try {
        const { data } = await ClientAxios.put(`/categories/${ id }`, dataCategory);

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

export const deleteCategory = async (id) => {
    try {
        const { data } = await ClientAxios.delete(`/categories/${ id }`);

        if (data) {
            return  {
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