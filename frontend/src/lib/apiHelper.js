import axios, {isCancel, AxiosError} from 'axios';

export const get = async (url, additionalHeaders = []) => {
    const authToken = localStorage.getItem('authToken');
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
        headers: {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${authToken}`,
            ...additionalHeaders
        }
    });
}

export const post = async (url, body, additionalHeaders = []) => {
    const authToken = localStorage.getItem('authToken');
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}${url}`, body, {
        headers: {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${authToken}`,
            ...additionalHeaders
        }
    });
}

export const del = async (url, additionalHeaders = []) => {
    const authToken = localStorage.getItem('authToken');
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
        headers: {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${authToken}`,
            ...additionalHeaders
        }
    });
}