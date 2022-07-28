/* eslint-disable no-unreachable */
import CommingSoon from "../../../components/CommingSoon";
import "./assets/style.scss";

import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import db from "../../../db.config";
import ListArticle from "./ListArticle";

const BlogAdmin = () => {
  const [article, setArticle] = useState([]);
  const [sortedValue, setSortedValue] = useState("");

  let data = [];
  useEffect(() => {
    const q =
      sortedValue === ""
        ? collection(db, "article")
        : query(
            collection(db, "article"),
            where("categorize", "==", sortedValue)
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
  }, [sortedValue]);

  return (
    <>
      <ListArticle data={article} sortedFunc={setSortedValue}></ListArticle>
    </>
  );
};

export default BlogAdmin;
