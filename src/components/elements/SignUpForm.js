import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import "./../../assets/css/style.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CountDown from "../../utils/CountDown";
import { motion } from "framer-motion";
import {
  infoContact,
  textMainBase,
  basicQues,
  chooseQues,
} from "../sections/signUpForm/signUpFormQues";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import createNotification from "./Nofication";
import db from '../../db.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { Timestamp } from "mongodb";
const propTypes = {
  ...SectionProps.types,
  status: PropTypes.bool,
};


// Create create component

const handleSubmit = async (obj) => {
  try {
    await addDoc(collection(db, 'ctv'), obj)
    createNotification('success', 'Đã Đăng Ký Thành Công');
  }
  catch (err){
    createNotification('error', 'Có Lỗi Xảy Ra Khi Đăng Ký');
    console.log(err);
  }
}

function formatText(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

const defaultProps = {
  ...SectionProps.defaults,
  status: false,
};

const signUpFormVariants = {
  init: {
    y: "-100vh",
  },
  ani: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      duration: 0.2,
    },
  },
};

const SignUpForm = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  status,
  ...props
}) => {
  const outerClasses = classNames(
    ` signUpForm
    `
  );
  // Định dạng mẫu: 2022-12-24T00:00:00
  const dayOut =
    textMainBase.yearEnd +
    "-" +
    textMainBase.monthEnd +
    "-" +
    textMainBase.dayEnd +
    "T00:00:00";
  const dateData = CountDown(dayOut);

  const innerClasses = classNames("signUpForm-inner");

  return (
    <section className={outerClasses}>
      <motion.div
        className="container"
        style={{ position: "relative" }}
        variants={signUpFormVariants}
        initial="init"
        animate="ani"
      >
        <span className="closeBtn" onClick={props.stateFunc}>
          <AiFillCloseCircle size="25px"></AiFillCloseCircle>
        </span>
        <div className={innerClasses}>
          <div className="signUpForm--left flex-col">
            <div className="flex-child">
              {textMainBase.title}

              <p>
                Hãy điền đầy đủ thông tin dưới đây để chúng mình có thể liên lạc
                với bạn trong khoảng thời gian sớm nhất nhé!
              </p>
              <div className="contact">
                {infoContact.map((info) => (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="contact__info"
                    key={info.data}
                    href={info.href || ""}
                  >
                    {info.icon}
                    <span>{info.data}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="signUpForm__footer flex-child">
              {!dateData.isTimeOut ? (
                <span style={{ fontSize: "15px" }}>
                  Hạn đăng kí: Còn <strong>{formatText(dateData.days)}</strong>{" "}
                  ngày <strong>{formatText(dateData.hours)}</strong> giờ{" "}
                  <strong>{formatText(dateData.min)}</strong> phút{" "}
                  <strong>{formatText(dateData.second)}</strong> giây{" "}
                </span>
              ) : (
                <span style={{ fontSize: "15px" }}>Đã hết hạn đăng kí</span>
              )}
            </div>
          </div>
          <div className="signUpForm--right flex-col">
            <Formik
              initialValues={{
                fullName: "",
                phone: "",
                email: "",
                class: "",
                answer: [],
                message: "",
              }}
              validationSchema={Yup.object({
                fullName: Yup.string().required("Vui Lòng Điền Trường Này"),
                phone: Yup.string().required("Vui Lòng Điền Trường Này"),
                email: Yup.string()
                  .email("E-mail của bạn không hợp lệ")
                  .required("Vui Lòng Điền Trường Này"),
                class: Yup.string().required("Vui Lòng Điền Trường Này"),
              })}
              onSubmit={(values) => {
                handleSubmit({...values, createAt: serverTimestamp()});
                props.stateFunc();
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form className="flex-col">
                    <div className="basic-info gridCol-2 flex-child">
                      {basicQues.map((item) => (
                        <div className="basic-info__item" key={item.quesTitle}>
                          <Field
                            type="text"
                            placeholder=" "
                            name={item.quesName}
                            id={item.quesName}
                          />
                          <label htmlFor={item.quesName} className="title">
                            {item.quesTitle}
                          </label>
                          {errors[item.quesName] && touched[item.quesName] ? (
                            <span className="errorMessage">
                              {errors[item.quesName]}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                    <div
                      className="choose-info flex-child"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <label htmlFor={chooseQues.quesName} className="title">
                        {chooseQues.quesTitle}
                      </label>
                      <div className="gridCol-2">
                        {chooseQues.ans.map((item) => (
                          <label style={{ color: "#000" }} key={item}>
                            <Field
                              type="checkbox"
                              name={chooseQues.quesName}
                              value={item}
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="message flex-col">
                      <label className="title flex-child">
                        {textMainBase.messageTitle}
                      </label>
                      <Field
                        className="message__text flex-child"
                        as="textarea"
                        name="message"
                        placeholder="Câu trả lời của bạn . . ."
                        rows={3}
                      ></Field>
                    </div>
                    <div className="signUpForm__footer ">
                      <button
                        className="button button-sm"
                        onClick={props.stateFunc}
                      >
                        HUỶ
                      </button>
                      <button
                        className="button button-primary button-sm"
                        disabled={dateData.isTimeOut}
                        type="submit"
                      >
                        NỘP
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

export default SignUpForm;
