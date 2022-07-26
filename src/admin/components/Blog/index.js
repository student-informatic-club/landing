import CommingSoon from "../../../components/CommingSoon";
import "./assets/style.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import CreateArticle from "./CreateArticle";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../../db.config";
import { AiFillDelete } from "react-icons/ai";

let data = [];

function handleDeleteArticle(id) {

}
const BlogAdmin = () => {
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [article, setArticle] = useState();

  useEffect(() => {
    const q = collection(db, "article");
    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((item) => {
          data.push({
            id: item.id,
            ...item.data(),
          });
        });
        setArticle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showCreateArticle]);
  return (
    <div style={{ position: "relative", height: "100%", overflow: "scroll" }}>
      <Button
        variant="contained"
        sx={{ marginBottom: "10px" }}
        onClick={() => setShowCreateArticle(true)}
      >
        New Article
      </Button>
      {showCreateArticle && (
        <div className="article_create">
          <span
            className="article_create_close"
            onClick={() => setShowCreateArticle(false)}
          >
            Close
          </span>
          <CreateArticle stateFunc={setShowCreateArticle}></CreateArticle>
        </div>
      )}

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
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Page</TableCell>
              <TableCell align="center">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {article?.map((row, index) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.categorize}</TableCell>
                  <TableCell align="center">
                    <div className="article_admin_list_option">
                      <AiFillDelete
                        className="article_admin_option delete"
                        onClick={() => handleDeleteArticle(row.id)}
                      ></AiFillDelete>
                      <AiFillDelete
                        className="article_admin_option"
                      ></AiFillDelete>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogAdmin;
