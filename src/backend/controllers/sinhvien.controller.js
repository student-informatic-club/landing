import axios from "axios";


export async function getSinhVien() {
    return axios.get('http://localhost:3000/sinhvien')
}

export function addNewSinhVien(obj) {
    axios.post('http://localhost:3000/sinhvien/add', obj)
    .then(res => console.log(res.data));
}

export function updateSinhVien(id, obj) {
    axios.post(`http://localhost:3000/sinhvien/update/${id}`, obj)
    .then(res => console.log(res.data))
}