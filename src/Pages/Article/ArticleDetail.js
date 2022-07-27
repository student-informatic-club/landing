/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/layout/Header";
import navLinks from "../../components/layout/partials/HeaderNav";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Cta from "../../components/sections/Cta";
import Footer from "../../components/layout/Footer";
import { useParams } from "react-router-dom";
import { Markup } from "interweave"; // for converting string to html
import { Comment, LikeAndShare } from "../../assets/facebook/Facebook";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../db.config";
import { handleChangeSeconsToDate } from "../../utils/ConvertSecondToDate";
const ArticleDetail = ({ type }) => {
  const { postID } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    const singleDoc = doc(db, "article", postID);
    onSnapshot(singleDoc, (snapshot) => {
      setData(snapshot.data());
    });
  }, [postID]);
  const { title, image, text, tags, createdAt, author } = data;
  const urlPost = `https://dev-web-sic.vercel.app/${type}/${postID} `;

  return (
    <>
      <Header
        navPosition="right"
        Nav={navLinks}
        className="Header-ban-pages"
      ></Header>
      <div className="article container">
        <h2>{title}</h2>
        <div className="grid-3">
          <div className="article-left">
            <img src={image} alt="" />
            <p>
              <Markup content={text} />
            </p>
            {tags && (
              <div className="article-tags">
                <span className="article-item primary">TAGS</span>
                {tags.map((tag) => (
                  <span className="article-item" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <LikeAndShare url={urlPost}></LikeAndShare>
            <div className="form-comment">
              <Comment url={urlPost}></Comment>
            </div>
          </div>
          <div className="article-right">
            <div className="article-info">
              <div className="article-item primary">
                <BsFillCalendarFill></BsFillCalendarFill>
              </div>
              {createdAt ? handleChangeSeconsToDate(createdAt.seconds) : ""}
            </div>
            <div className="article-info">
              <div className="article-item primary">
                <FaUser></FaUser>
              </div>
              {author}
            </div>
            <hr />
          </div>
        </div>
      </div>
      <Cta center />
      <Footer />
    </>
  );
};

export default ArticleDetail;
