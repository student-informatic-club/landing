import { useEffect, useState, memo, Suspense } from "react"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { Box } from "@mui/system";
import { async } from "@firebase/util";
const header = [
    'Họ Tên',
    'Email',
    'Số Điện Thoại',
    'Lớp',
    'Ban Lựa Chọn',
    'Lời Nhắn'
]


const TableCTV = ({data}) => {
    const [openModel, setOpenModel] = useState(false);
    const [modalDetail, setModalDetail] = useState({})
    let currentCtv;
    const modelStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: '#000'
    }
    const handleOpen = (id) => {
        setModalDetail({
            name: data.filter((item) => item.id === id)[0].fullName,
            message: data.filter((item) => item.id === id)[0].message
        })
        setOpenModel(true)
    }
    const handleClose = () => {
        setOpenModel(false)
    }
    console.log(data);
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '70vh'}}>
            <Table sx={{ minWidth: 650, margin: 0, overflowY: 'scroll' }} aria-label="Basic table">
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
                        <TableCell align="center">
                            <Button variant="contained" color="info" sx={{textTransform: 'capitalize'}} onClick={() => {
                                currentCtv = row.id
                                handleOpen(currentCtv);
                                console.log(row.id);
                            }}>Xem Chi Tiết</Button>
                            {openModel && (
                                <Modal
                                    open
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description">
                                <Box sx={modelStyle}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {modalDetail.name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        {modalDetail.message}
                                    </Typography>
                                </Box>
                                </Modal>
                            )}
                        </TableCell>
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