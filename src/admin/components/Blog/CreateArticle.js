/* eslint-disable default-case */
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import createNotification from "../../../components/elements/Nofication";
import db from "../../../db.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
const storage = getStorage();
let urlImg = "";
const handleSubmit = async (obj) => {
  try {
    const collectionRef = collection(db, "article");
    await addDoc(collectionRef, {
      title: obj.title,
      shortDes: obj.shortDes,
      categorize: obj.categorize,
      text: obj.text,
      tags: obj.tags,
      image: urlImg,
      createdAt: serverTimestamp(),
    });
    createNotification("success", "Tạo thành công");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (err) {
    createNotification("error", "Tạo thất bại");
    console.log(err);
  }
  console.log(obj);
};
const handleUploadImage = (e) => {
  const file = e.target.files[0];
  file.preview = URL.createObjectURL(file);
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          console.log("Nothing");
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        urlImg = downloadURL;
      });
    }
  );
};

const CreateArticle = () => {
  const [image, setImage] = useState();
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link"],
        [{ color: ["#FFFFFF", "#e60000"] }],
      ],
    }),
    []
  );
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          shortDes: "",
          categorize: "",
          text: "",
          tags: "",
          image: "",
        }}
        onSubmit={(values) => {
          handleSubmit({ ...values, createAt: serverTimestamp() });
          // stateFunc(false);

          // console.log(values);
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
              <div>
                <label className="article_name_tag">Photo</label>
                <Field
                  render={({ field }) => {
                    // return <GetPhoto></GetPhoto>;
                    return (
                      <input
                        type="file"
                        className="input file"
                        onChange={(e) => {
                          setFieldValue("image", e.target.files[0]);
                          setImage(e.target.files[0]);
                          handleUploadImage(e);
                        }}
                      />
                    );
                  }}
                />
                {image && (
                  <div className="article_image_preview">
                    <img src={image.preview} alt="" width="300px" />
                  </div>
                )}
              </div>
              <Field
                render={({ field }) => {
                  return (
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={field.value.text}
                      onChange={(value) =>
                        setFieldValue("text", handleUploadImage(value))
                      }
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
