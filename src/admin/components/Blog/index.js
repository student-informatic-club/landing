import CommingSoon from "../../../components/CommingSoon";
import "./assets/style.scss";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../db.config";
import ListArticle from "./ListArticle";

const BlogAdmin = () => {
  const [article, setArticle] = useState([]);
  let data = [];
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
        data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        setArticle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <ListArticle data={article}></ListArticle>;
};

export default BlogAdmin;
