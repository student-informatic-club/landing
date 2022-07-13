import React from "react";
import Header from "../../components/layout/Header";
import navLinks from "../../components/layout/partials/HeaderNav";
import { eventsData } from "../../components/sections/events/eventsData";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import demoImg from "../../assets/images/events/recovery12072022.jpg";
import Cta from "../../components/sections/Cta";
import Footer from "../../components/layout/Footer";
const ArticleDetail = (item) => {
  //   const {postID} = useParams();
  item = eventsData[0];
  const { title, image, content, tags, updatedAt, author } = item;

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
            <img src={demoImg} alt="" className="article-img" />
            <p>{content}</p>
            {tags && (
              <div className="article-tags">
                <span className="article-item primary">TAGS</span>
                {tags.map((tag) => (
                  <span className="article-item">{tag}</span>
                ))}
              </div>
            )}
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
      <Cta />
      <Footer />
    </>
  );
};

export default ArticleDetail;
