import axios from "axios";

export function getSinhVien() {
    axios.get('http://localhost:4000/sinhvien')
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err)
    })
}