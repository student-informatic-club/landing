import {
  Button, Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
// import CommingSoon from "../../../components/CommingSoon"
// import db from "../../../db.config";
import * as Yup from "yup";
import Loading from "../../../utils/Loading";
const QTV = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  async function getAdminData() {
    // const newData = [];
    // const q = collection(db, "admin");
    // getDocs(q)
    //   .then((snapshot) => {
    //     snapshot.forEach((item) => {
    //       newData.push({
    //         id: item.id,
    //         ...item.data(),
    //       });
    //     });
    //     setData(newData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  useEffect(() => {
    getAdminData();
  }, []);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const formStyle = {
    width: '40%',
    padding: '45px 25px',
    backgroundColor: '#191A2E',
    borderRadius: '8px',
  }
  const handleSubmit = async (obj) => {
    // const found = data.find((item) => item.msv === obj.msv);
    // if (found) {
    //   createNotification("error", "Mã Sinh Viên này đã có");
    // } else {
    //   try {
    //     await addDoc(collection(db, "admin"), obj)
    //       .then(() => {
    //         createNotification("success", "Đã Đăng Ký Thành Công");
    //       })
    //   } catch (err) {
    //     createNotification("error", "Có Lỗi Xảy Ra Khi Đăng Ký!");
    //     console.log(err);
    //   }
    // }
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{
          marginBottom: "15px",
        }}
        onClick={handleOpenModal}
      >
        New <AiFillPlusCircle />
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Formik
          initialValues={{
            msv: '',
            fullName: '',
            email: '',
            phone: '',
            class: '',
            role: ''
          }}
          validationSchema={Yup.object({
            msv: Yup.string().required("Vui Lòng Điền Trường Này"),
            fullName: Yup.string().required("Vui Lòng Điền Trường Này"),
            email: Yup.string().email("E-mail của bạn không hợp lệ").required("Vui Lòng Điền Trường Này"),
            phone: Yup.string().required("Vui Lòng Điền Trường Này"),
            class: Yup.string().required("Vui Lòng Điền Trường Này"),
            role: Yup.string().required("Vui Lòng Điền Trường Này")
          })}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          {({errors, touched}) => {
            return (
              <Form style={formStyle}>
                <Typography variant="h5" sx={{marginBottom: '20px'}}>Create Admin</Typography>
                <Stack direction='row' gap='50px'>
                  <Stack direction='column' sx={{
                    gap: '20px'
                  }}>
                    <Box>
                      <label>Mã Sinh Viên</label>
                      <Field style={{padding: '5px 15px'}} type='text' id='msv' placeholder='' name='msv'/>
                      {errors.msv && touched.msv ? (
                        <span className="errorMessage">{errors.msv}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <label>Họ Tên</label>
                      <Field style={{padding: '5px 15px'}} type='text' id='fullName' placeholder='' name='fullName'/>
                      {errors.fullName && touched.fullName ? (
                        <span className="errorMessage">{errors.fullName}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <label>Email</label>
                      <Field style={{padding: '5px 15px'}} type='text' id='email' placeholder='' name='email'/>
                      {errors.email && touched.email ? (
                        <span className="errorMessage">{errors.email}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Stack>
                  <Stack direction='column' sx={{
                    gap: '20px'
                  }}>
                    <Box>
                      <label>Lớp</label>
                      <Field style={{padding: '5px 15px'}} type='text' id='class' placeholder='' name='class'/>
                      {errors.class && touched.class ? (
                        <span className="errorMessage">{errors.class}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <label>Số Điện Thoại</label>
                      <Field style={{padding: '5px 15px'}} type='text' id='phone' placeholder='' name='phone'/>
                      {errors.phone && touched.phone ? (
                        <span className="errorMessage">{errors.phone}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <label>Chức Vụ</label>
                      <Field style={{padding: '5px 15px'}} type='text' id='role' placeholder='' name='role'/>
                      {errors.role && touched.role ? (
                        <span className="errorMessage">{errors.role}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Stack>
                </Stack>
                <Stack>
                  <Button variant="contained" color='info' sx={{marginTop: '20px'}} type='submit'>Create Admin</Button>
                </Stack>
              </Form>
            )
          }}
        </Formik>
      </Modal>
      {data ? (
        <TableQTV data={data} />
      ) : (
        <Box
          height="70vh"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loading />
        </Box>
      )}
    </>
  );
};

const TableQTV = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "65vh", position: "relative" }}
    >
      <Table
        sx={{ minWidth: 650, margin: 0, overflowY: "scroll" }}
        aria-label="Basic table"
      >
        <TableHead
          sx={{
            backgroundColor: "#6B6DFF",
            "th": {
              color: "#fff",
            },
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          <TableRow>
            <TableCell align="center">MSV</TableCell>
            <TableCell align="center">Họ Tên</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Số Điện Thoại</TableCell>
            <TableCell align="center">Lớp</TableCell>
            <TableCell align="center">Chức Vụ</TableCell>
            <TableCell align="center">Tùy Chọn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            console.log(row);
            return (
              <TableRow
                key={row.msv}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.msv}</TableCell>
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.class}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">
                  <div className="article_admin_list_option">
                    <AiFillDelete className="article_admin_option delete"></AiFillDelete>
                    <BsFillPenFill className="article_admin_option"></BsFillPenFill>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QTV;
