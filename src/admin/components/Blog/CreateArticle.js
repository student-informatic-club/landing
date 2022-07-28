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
const storage = getStorage();

// let urlImg = "";
function CreateArticle() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [targetInpuImage, setTargetInputImage] = useState("");
  const handleDeletePreviewImage = (image, targetInpuImage) => {
    setImage("");
    targetInpuImage.value = null;
  };
  const handleUploadImage = (image) => {
    if (!image) return "";
    else if (image) {
      image.preview = URL.createObjectURL(image);
      const file = image;
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  const handleSubmit = async (obj) => {
    if (!obj) return null;
    try {
      const collectionRef = collection(db, "article");
      let tags = obj.tags;
      if (!obj || !url) {
        obj.image.name = "";
      }
      try {
        tags = obj.tags.split(" ");
      } catch (err) {
        console.log(err);
      }
      // console.log(tags);
      await addDoc(collectionRef, {
        title: obj.title,
        shortDes: obj.shortDes,
        categorize: obj.categorize,
        text: obj.text,
        tags: tags,
        imageName: obj.image.name || "",
        image: url || "",
        author: "CLB Tin học sinh viên",
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
  };
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image, targetInpuImage]);
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
          tags: [],
          image: "",
        }}
        onSubmit={(values) => {
          handleSubmit({ ...values, createdAt: serverTimestamp() });
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form>
              <div className="group_article">
                <div className="">
                  <label className="article_name_tag">Title</label>
                  <Field
                    className="input"
                    name="title"
                    placeholder="Enter Article's Title"
                  ></Field>
                </div>
                <div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <label className="article_name_tag">Tags</label>
                    <p>(Mỗi 1 tag cách nhau bởi 1 khoảng trắng)</p>
                  </div>
                  <Field
                    className="input"
                    name="tags"
                    placeholder="Enter Your Tags . . ."
                  ></Field>
                </div>
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
                <div className="article_name_tag">Photo</div>
                <Field
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          type="file"
                          className="input file"
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                            setImage(e.target.files[0]);
                            handleUploadImage(e.target.files[0]);
                            setTargetInputImage(e.target); // for delete
                          }}
                        />
                      </>
                    );
                  }}
                />
                {image && (
                  <Button
                    variant="contained"
                    type="button"
                    sx={{ marginBottom: "10px" }}
                    onClick={() => {
                      handleDeletePreviewImage(image, targetInpuImage);
                    }}
                  >
                    Delete Image
                  </Button>
                )}
                {image && (
                  <div className="article_image_preview">
                    <img src={image.preview} alt="" width="300px" />
                  </div>
                )}
              </div>
              <div className="article_name_tag_container">
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
              <Field name="text">
                {({ field }) => (
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={field.value}
                    onChange={field.onChange(field.name)}
                  />
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: "10px", margin: "0 auto" }}
              >
                Create
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreateArticle;
