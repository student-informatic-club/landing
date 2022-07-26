import { useEffect, useState, memo, Suspense } from "react"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
const header = [
    'Họ Tên',
    'Email',
    'Số Điện Thoại',
    'Lớp',
    'Ban Lựa Chọn',
    'Lời Nhắn'
]

let ctvData = [];

const TableCTV = ({data}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, margin: 0 }} aria-label="simple table">
                <TableHead sx={{
                    backgroundColor: '#6B6DFF',
                    ['th']: {
                        color: '#fff'
                    }
                }}>
                <TableRow>
                    <TableCell align="center">Họ Tên</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Số Điện Thoại</TableCell>
                    <TableCell align="center">Lớp</TableCell>
                    <TableCell align="center">Ban Lựa Chọn</TableCell>
                    <TableCell align="center">Lời Nhắn</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row) => {
                    return (
                    <TableRow
                        key={row.fullName}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">
                            {row.fullName}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.class}</TableCell>
                        <TableCell align="center">{row.answer.join(', ')}</TableCell>
                        <TableCell align="center">{row.message}</TableCell>
                    </TableRow>
                )})}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


const DashboardCtv = ({Data}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(Data)
    }, [data])
    return (
        <>
            <TableCTV data = {data}/>
        </>
    )
}

export default DashboardCtv;