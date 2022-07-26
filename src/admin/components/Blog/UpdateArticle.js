// const handleUpdatePost = async (e) => {
//     e.preventDefault();
//     const updateData = doc(db, "posts", postId);
//     await updateDoc(updateData, {
//       title: updateTitle,
//     });
//   };
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import {
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import createNotification from "../../../components/elements/Nofication";
import db from "../../../db.config";
const UpdateArticle = ({ post }) => {
  const [postId, setPostId] = useState();
  useEffect(() => {
    setPostId(post.id);
  }, []);
  const handleSubmit = async (obj) => {
    try {
      const updateData = doc(db, "article", postId);
      await updateDoc(updateData, obj);
      createNotification("success", "Cập nhật thành công");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      createNotification("error", "Cập nhật thất bại");
      console.log(err);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: post.title || "",
          shortDes: post.shortDes || "",
          categorize: post.categorize || "",
          text: post.text || "",
          tags: post.tags || "",
          //   image: "",
        }}
        onSubmit={(values) => {
          handleSubmit({ ...values, updatedAt: serverTimestamp() });
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form>
              <div className="group_article">
                <div>
                  <label className="article_name_tag">Title</label>
                  <Field
                    className="input"
                    name="title"
                    placeholder="Enter Article's Title"
                  ></Field>
                </div>
                <div>
                  <label className="article_name_tag">Short Description</label>
                  <Field
                    className="input"
                    name="shortDes"
                    placeholder="Enter Your Short Description . . ."
                  ></Field>
                </div>
                <div>
                  <label className="article_name_tag">Tags</label>
                  <Field
                    className="input"
                    name="tags"
                    placeholder="Enter Your Tags . . ."
                  ></Field>
                </div>
                <div>
                  <label className="article_name_tag">Categorize</label>
                  <div
                    className="article_name_tag_group"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <label>
                      <Field type="radio" name="categorize" value="Blog" />
                      Blog
                    </label>
                    <label>
                      <Field type="radio" name="categorize" value="Event" />
                      Event
                    </label>
                  </div>
                </div>
              </div>
              {/* <div>
                <label className="article_name_tag">Photo</label>
                <Field
                  render={({ field }) => {
                    return <GetPhoto></GetPhoto>;
                  }}
                />
              </div> */}
              <Field
                render={({ field }) => {
                  return (
                    <ReactQuill
                      theme="snow"
                      value={field.value.text}
                      onChange={(value) => setFieldValue("text", value)}
                    />
                  );
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: "10px" }}
              >
                Update
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateArticle;
