import axios from 'axios';

export const getCtv = async () => {
    const response = await axios.get('http://localhost:4000/ctv');
    return response.data
}

export function addNewCtv(obj) {
    axios.post('http://localhost:4000/ctv/add', obj)
    .then(res => console.log(res.data));
}

export function updateCtv(id, obj) {
    axios.post(`http://localhost:4000/ctv/update/${id}`, obj)
    .then(res => console.log(res.data))
}