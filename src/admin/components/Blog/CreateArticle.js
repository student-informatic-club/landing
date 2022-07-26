import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import createNotification from "../../../components/elements/Nofication";
import db from "../../../db.config";
import { projectManagement } from "firebase-admin";

const handleSubmit = async (obj) => {
  //   console.log(obj);
  // try {
  //   const collectionRef = collection(db, "article");
  //   await addDoc(collectionRef, {
  //     title: obj.title,
  //     shortDes: obj.shortDes,
  //     categorize: obj.categorize,
  //     text: obj.text,
  //     tags: obj.tags,
  //     createdAt: serverTimestamp(),
  //   });
  //   createNotification("success", "Tạo thành công");
  // } catch (err) {
  //   createNotification("error", "Tạo thất bại");
  //   console.log(err);
  // }
};
// const GetPhoto = () => {
//   const [photo, setPhoto] = useState();
//   function handlePreviewPhoto(e) {
//     const file = e.target.files[0];
//     file.preview = URL.createObjectURL(file);
//     setPhoto(file);
//   }
//   useEffect(() => {
//     return () => {
//       photo && URL.revokeObjectURL(photo.preview);
//     };
//   }, [photo]);
//   return (
//     <div>
//       <>
//         <input type="file" onChange={handlePreviewPhoto} />
//       </>
//     </div>
//   );
// };

const CreateArticle = ({ stateFunc }) => {
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          shortDes: "",
          categorize: "",
          text: "",
          tags: "",
          //   image: "",
        }}
        onSubmit={(values) => {
          handleSubmit({ ...values, createAt: serverTimestamp() });
          stateFunc(false);
          console.log(values);
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
                Create
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateArticle;
