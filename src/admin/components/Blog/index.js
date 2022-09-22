/* eslint-disable no-unreachable */
import CommingSoon from "../../../components/CommingSoon";
import "./assets/style.scss";

import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
// import db from "../../../db.config";
import ListArticle from "./ListArticle";
import axios from "axios";
import dbConfig from "../../../db.config";

const BlogAdmin = () => {
  const [article, setArticle] = useState([]);
  const [sortedValue, setSortedValue] = useState("");

  useEffect(() => {
    axios
      .get(`${dbConfig.API_URL}/api/article`, {
        params: {
          categorize:
            sortedValue === "" || sortedValue === "All"
              ? ["Event", "Blog"]
              : sortedValue,
        },
      })
      .then((res) => {
        setArticle(res.data.reverse());
      });
  }, [sortedValue]);

  return (
    <>
      <ListArticle data={article} sortedFunc={setSortedValue}></ListArticle>
    </>
  );
};

export default BlogAdmin;
