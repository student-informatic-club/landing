import { useEffect, useState, memo, Suspense } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Stack,
  TextField,
  IconButton,
  Input,
  FormLabel,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { BiSearchAlt } from "react-icons/bi";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import db from "../../../../db.config";

const TableCTV = ({ data }) => {
  const [openModel, setOpenModel] = useState(false);
  const [modalDetail, setModalDetail] = useState({});
  let currentCtv;
  const modelStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "#000",
    overflow: "hidden",
    borderRadius: "8px",
    opacity: 1
  };
  const handleOpen = (id) => {
    setModalDetail({
      name: data.filter((item) => item.id === id)[0].fullName,
      message: data.filter((item) => item.id === id)[0].message,
    });
    setOpenModel(true);
  };
  const handleClose = () => {
    setOpenModel(false);
  };
  console.log(data);
  return (
    <>
      {data ? (
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
                ["th"]: {
                  color: "#fff",
                },
                position: "sticky",
                top: 0,
                zIndex: 999,
              }}
            >
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
                console.log(row);
                return (
                  <TableRow
                    key={row.fullName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.fullName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.class}</TableCell>
                    <TableCell align="center">
                      {row.answer.join(", ")}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => {
                          currentCtv = row.id;
                          handleOpen(currentCtv);
                          console.log(row.id);
                        }}
                      >
                        Xem Chi Tiết
                      </Button>
                      {openModel && (
                        <Modal
                          open
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{
                            backgroundColor: 'rgba(0,0,0,0.2)'
                          }}
                        >
                          <Box overflow="hidden" sx={modelStyle}>
                            <Box
                              width="410px"
                              height="400px"
                              sx={{ overflowX: "hidden", overflowY: "scroll" }}
                            >
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{
                                  color: "#000",
                                }}
                              >
                                {modalDetail.name}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                                width="80%"
                                textAlign="justify"
                              >
                                {modalDetail.message === ""
                                  ? "Không có lời nhắn nào cả"
                                  : modalDetail.message}
                              </Typography>
                            </Box>
                          </Box>
                        </Modal>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          height="70vh"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              color: "#f36430",
            }}
            variant="h5"
          >
            chưa có đơn đăng ký ctv
          </Typography>
        </Box>
      )}
    </>
  );
};

const SearchBar = ({ setSearchQuery, handleSubmit }) => (
  <form
    style={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    <Stack direction="row" position="relative" alignItems="center">
      <FormLabel
        sx={{
          marginRight: "10px",
        }}
      >
        Tìm Kiếm
      </FormLabel>
      <Input
        sx={{
          ["input"]: {
            marginBottom: "0 !important",
          },
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Stack>
    <IconButton
      type="submit"
      aria-label="search"
      onClick={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <BiSearchAlt />
    </IconButton>
  </form>
);

const DashboardCtv = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  async function getCtvData() {
    const q = collection(db, "ctv");
    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((item) => {
          ctvData.push({
            id: item.id,
            ...item.data(),
          });
        });
        setData(ctvData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let ctvData = [];
  function filterCtvData(query) {
    let ctvData = [];
    const q = collection(db, "ctv");
    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((item) => {
          ctvData.push({
            id: item.id,
            ...item.data(),
          });
        });
        setData(ctvData.filter((item) => item.fullName === query));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getCtvData();
  }, []);
  return (
    <>
      <Stack margin="10px 0">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{ marginBottom: "10px" }}
            onClick={getCtvData}
          >
            Refresh
          </Button>
          <SearchBar
            setSearchQuery={setSearchQuery}
            handleSubmit={() => filterCtvData(searchQuery)}
          />
        </Stack>
        <Stack>
          <Typography color="#000">
            Tổng Số CTV Đăng Ký: {data.length} Đơn
          </Typography>
        </Stack>
      </Stack>
      <TableCTV data={data} />
    </>
  );
};

export default DashboardCtv;
