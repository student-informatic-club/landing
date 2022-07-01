import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import "./../../assets/css/style.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CountDown from "../../utils/CountDown";
import {
  signUpQues,
  infoContact,
  textMainBase,
} from "../sections/signUpForm/signUpFormQues";
import { AiFillCloseCircle } from "react-icons/ai";

const propTypes = {
  ...SectionProps.types,
  status: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  status: false,
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
    const dayLeft = textMainBase.yearEnd+'-'+textMainBase.monthEnd+'-'+textMainBase.dayEnd+'T00:00:00';
    console.log(dayLeft)
    // 2022-12-24T00:00:00
  const innerClasses = classNames("signUpForm-inner ", status && "appear");

  return (
    <section className={outerClasses}>
      <div className={innerClasses}>
        <div className="signUpForm--left flex-col">
          <div>
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
                  href={info.href || ""}
                >
                  {info.icon}
                  <span>{info.data}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="signUpForm__footer">
          <span>
            Hạn đăng kí:{' '} 
            <CountDown date={dayLeft}/>  
          </span>
          </div>
        </div>
        <div className="signUpForm--right flex-col">
          <span className="closeBtn" onClick={props.stateFunc}>
            <AiFillCloseCircle size="25px"></AiFillCloseCircle>
          </span>
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
            onSubmit={(values) => console.log(values)}
          >
            {({ errors, touched }) => {
              return (
                <Form className="flex-col">
                  <div className="basic-info gridCol-2">
                    {signUpQues[0].ques.map((item) => (
                      <div className="basic-info__item">
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
                    className="choose-info"
                    role="group"
                    aria-labelledby="checkbox-group"
                  >
                    <label htmlFor={signUpQues[1].quesName} className="title">
                      {signUpQues[1].quesTitle}
                    </label>
                    <div className="gridCol-3">
                      {signUpQues[1].ans.map((item) => (
                        <label style={{ color: "#000" }}>
                          <Field
                            type="checkbox"
                            name={signUpQues[1].quesName}
                            value={item}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="message flex-col">
                    <label className="title">{textMainBase.messageTitle}</label>
                    <Field
                      className="message__text"
                      as="textarea"
                      name="message"
                      placeholder="Your message"
                      rows={3}
                    ></Field>
                  </div>
                  <div className="signUpForm__footer ">
                    <button
                      className="button button-sm"
                      onClick={props.stateFunc}
                    >
                      CANCEL
                    </button>
                    <button
                      className="button button-primary button-sm"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

export default SignUpForm;
