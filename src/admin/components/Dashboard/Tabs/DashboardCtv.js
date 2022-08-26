import {
  Button,
  FormLabel,
  IconButton,
  Input,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
// import db from "../../../../db.config";
import Loading from "../../../../utils/Loading";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import createNotification from "../../../../components/elements/Nofication";
import generateUUID from "../../../store/uuid";
import exportUsersToExcel from "../../../../utils/exportExcel";
import axios from "axios";
import config from "../../../../db.config";

const TOKEN_ADMIN = generateUUID();

const TableCTV = ({ data }) => {
  const [openModel, setOpenModel] = useState(false);
  const [ctvDetail, setCtvDetail] = useState({});
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
    opacity: 1,
  };
  const handleOpen = (id) => {
    handleCtvDetail(id).then((res) => setCtvDetail(res.data));
    setOpenModel(true);
  };
  const handleClose = () => {
    setOpenModel(false);
  };
  function handleDeleteCtv(id) {
    if (window.confirm("Bạn có chắc chắn muốn xoá đơn đăng ký này?") == true) {
      axios
        .get(`${config.API_URL}/api/ctv/delete/${id}`)
        .then(createNotification("success", "Xoá thành công! :3"))
        .catch((err) => {
          createNotification("error", "Lỗi Òy! T_T");
          console.log(err);
        });
    }
  }
  function handleCtvDetail(id) {
    return axios.get(`${config.API_URL}/api/ctv/${id}`);
  }
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
                th: {
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
                <TableCell align="center">Tùy Chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
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
                          handleOpen(row._id);
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
                            backgroundColor: "rgba(0,0,0,0.2)",
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
                                {ctvDetail.fullName}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                                width="80%"
                                textAlign="justify"
                              >
                                {ctvDetail.message === ""
                                  ? "Không có lời nhắn nào cả"
                                  : ctvDetail.message}
                              </Typography>
                            </Box>
                          </Box>
                        </Modal>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <div className="article_admin_list_option">
                        <AiFillDelete
                          className="article_admin_option delete"
                          onClick={() => handleDeleteCtv(row._id)}
                        ></AiFillDelete>
                        <BsFillPenFill className="article_admin_option"></BsFillPenFill>
                      </div>
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
          <Loading />
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
          input: {
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
      <AiOutlineSearch />
    </IconButton>
  </form>
);

const DashboardCtv = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [authorize, setAuthorize] = useState("");
  const workSheetColumnName = [
    "ID",
    "Họ Tên",
    "Lớp",
    "Email",
    "Số Điện Thoại",
    "Ban Lựa Chọn",
    "Lời Nhắn",
  ];
  const workSheetName = "Ctv";
  const filePath = "./outputFiles/ctv.xlsx";
  const handleExportCtv = () => {
    exportUsersToExcel(data, workSheetColumnName, workSheetName, filePath);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCtvData() {
    axios.get(`${config.API_URL}/api/ctv`).then((res) => setData(res.data));
  }
  const handleRefresh = useMemo(() => {
    getCtvData();
  }, [getCtvData]);

  function filterCtvData(query) {
    let filterData;
    if (query === "") {
      getCtvData();
    } else {
      filterData =
        data && data.filter((item) => item.fullName.includes(query) === true);
      setData(filterData);
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  async function clearCollection() {
    data && data.forEach((item) => handleDeleteCtv(item._id));
  }
  function handleDeleteCtv(id) {
    axios.get(`${config.API_URL}/api/ctv/delete/${id}`);
  }
  useEffect(() => {
    getCtvData();
  }, []);
  const modelStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 200,
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "#000",
    overflow: "hidden",
    borderRadius: "8px",
    opacity: 1,
  };
  return (
    <>
      <Stack margin="10px 0">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" gap="10px">
            <Button
              variant="contained"
              sx={{ marginBottom: "10px" }}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              sx={{ marginBottom: "10px" }}
              onClick={() => {
                console.log("Auth: ", TOKEN_ADMIN);
                setOpen(true);
              }}
              color="error"
              disabled={data.length === 0 ? true : false}
            >
              Delete All
            </Button>
            {open && (
              <Modal
                open
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}
              >
                <Box overflow="hidden" sx={modelStyle}>
                  <Typography color="#39FF14" variant="h6" letterSpacing="2px">
                    Authorize
                  </Typography>
                  <Input
                    placeholder="********"
                    sx={{
                      width: "100%",
                      margin: "10px 0",
                    }}
                    onChange={(e) => setAuthorize(e.target.value)}
                  />
                  <Box width="100%">
                    <Button
                      sx={{
                        float: "right",
                        marginTop: "10px",
                      }}
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        authorize === TOKEN_ADMIN
                          ? clearCollection()
                              .then(
                                createNotification(
                                  "success",
                                  "Xoá thành công! :3"
                                )
                              )
                              .catch((err) => {
                                createNotification("error", "Lỗi Òy! T_T");
                                console.log(err);
                              })
                          : createNotification("error", "Authorize Failed");
                        setOpen(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              </Modal>
            )}
            <Button
              variant="contained"
              sx={{ marginBottom: "10px" }}
              onClick={handleExportCtv}
              color="success"
              disabled={data.length === 0 ? true : false}
            >
              export <SiMicrosoftexcel />
            </Button>
          </Stack>
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
