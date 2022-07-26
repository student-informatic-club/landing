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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../../db.config";

const BlogAdmin = () => {
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [article, setArticle] = useState([]);

  let data = [];
  async function getData() {
    const q = collection(db, "article");
    onSnapshot(q, (querySnapshot) => {
      data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    });
    console.log(data);
  }
  useEffect(() => {
    getData().then(() => {
      setArticle(data);
      //   console.log(article)
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
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Page</TableCell>
              <TableCell align="center">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {article.map((row) => {
              return (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{}</TableCell>
                  <TableCell align="center">{row.catagorize}</TableCell>
                  <TableCell align="center">{}</TableCell>
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogAdmin;
