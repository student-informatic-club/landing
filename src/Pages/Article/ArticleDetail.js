/* eslint-disable react/jsx-no-target-blank */
import React, { useLayoutEffect } from "react";
import Header from "../../components/layout/Header";
import navLinks from "../../components/layout/partials/HeaderNav";
import { eventsData } from "../../components/sections/event/eventsData";
import { blogData } from "../../components/sections/blog/blogData";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Cta from "../../components/sections/Cta";
import Footer from "../../components/layout/Footer";
import { useParams } from "react-router-dom";
import { Markup } from "interweave"; // for converting string to html
import { Comment, LikeAndShare, LoginFacebook } from "../../assets/facebook/Facebook";
const ArticleDetail = ({ type }) => {
  const { postID } = useParams();
  const articleData = type === "event" ? eventsData : blogData;
  const index = articleData.findIndex((para) => para.id === postID);
  const item = articleData[index];
  const { title, image, content, tags, updatedAt, author } = item;
  const urlPost = `http://localhost:3000/${type}/${postID} `
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
            <img src={require(`../../assets/images/${type}/${image}`)} alt="" />
            {/* <p>{content}</p> */}
            <p>
              <Markup content={content} />
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
            {/* <LoginFacebook></LoginFacebook> */}
            <div className="form-comment">
              <Comment url={urlPost}></Comment>
            </div>
          </div>
          <div className="article-right">
            <div className="article-info">
              <div className="article-item primary">
                <BsFillCalendarFill></BsFillCalendarFill>
              </div>
              {updatedAt.slice(0, 10)}
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
