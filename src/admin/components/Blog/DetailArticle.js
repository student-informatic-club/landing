import React from "react";
import { Markup } from "interweave"; // for converting string to html

const DetailArticle = ({ post }) => {
  return (
    <div>
      <h4 className="title">{post.title}</h4>
      <Markup content={post.text} className="text" />
      <div className="tags">
        <div className="article-tags">
          <span className="article-item primary">TAGS</span>
          {/* {tags.map((tag) => ( */}
          <span
            className="article-item"
            //    key={tag}
          >
            {post.tags}
          </span>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default DetailArticle;
