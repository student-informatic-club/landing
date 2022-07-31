import {
    Button, FormLabel, IconButton,
    Input, Paper, Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
  } from "@mui/material";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../../../db.config";
  
const DashboardBlog = () => {
    const [article, setArticle] = useState([]);

    // For Detail Page
    const [showDetailArticle, setShowDetailArticle] = useState(false); // show detail

    const [searchValue, setSearchValue] = useState("");
    let data = [];
    useEffect(() => {
        const q =
            query(
                collection(db, "article"),
                where("categorize", "==", "Event")
            );
        getDocs(q)
        .then((snapshot) => {
            snapshot.forEach((item) => {
            data.push({
                id: item.id,
                ...item.data(),
            });
            });
            data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
            setArticle(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, margin: 0 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#6B6DFF",
              ["th"]: {
                color: "#fff",
              },
            }}
          >
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Tiêu đề</TableCell>
              <TableCell align="center">Phân trang</TableCell>
              <TableCell align="center">Tuỳ chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {article.length > 0 && article ? (
              article
                .filter((value) => {
                  if (searchValue === "") {
                    return value;
                  } else if (
                    value.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((row, index) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.categorize}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableCell colSpan={4} align="center">
                Hiện không có bài viết nào!
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default DashboardBlog;