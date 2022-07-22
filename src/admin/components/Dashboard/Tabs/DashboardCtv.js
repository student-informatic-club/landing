import { useEffect, useState, memo } from "react"
import {collection, getDoc} from "firebase/firestore"
import db from '../../../../db.config';
import Table from "../../../../components/elements/table";
import { async } from "@firebase/util";

const header = [
    'Họ Tên',
    'Email',
    'Số Điện Thoại',
    'Lớp',
    'Ban Lựa Chọn',
    'Lời Nhắn'
]


const DashboardCtv = () => {
    const [data, setData] = useState([]);
    const ctvCollectionRef = collection(db, 'ctv');
    useEffect(() => {
        const getData = async () => {
            const ctvData = await getDoc(ctvCollectionRef);
            setData(ctvData.docs.map(((doc) => ({...doc.data(), id: doc.id}))))
        }
        console.log(data);
    })
    return (
        <>
            <Table headers={header} datas={data}/>
        </>
    )
}

export default memo(DashboardCtv);