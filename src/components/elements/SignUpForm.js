import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
// import Input from "../elements/Input";
import "./../../assets/css/style.css";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { signUpQues, infoContact, textMainBase } from "../sections/signUpForm/signUpFormQues";
import {AiFillCloseCircle} from 'react-icons/ai'


const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const SignUpForm = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  // const formik = useFormik({
  //   initialValues: {
  //     fullName: "",
  //     phone: "",
  //     email: "",
  //     class: "",
  //     toggle: false,
  //     ans: [],
  //   },
  //   validationSchema: Yup.object({
  //     fullName: Yup.string().required("You need to fill this text"),
  //     phone: Yup.string().required("You need to fill this text"),
  //     email: Yup.string().required("You need to fill this text"),
  //     class: Yup.string().required("You need to fill this text"),
  //   }),

  //   onSubmit: (values) => console.log(values),
  // });
  const outerClasses = classNames(
    ` signUpForm
    `
    // topOuterDivider && "has-top-divider",
    // bottomOuterDivider && "has-bottom-divider",
    // hasBgColor && "has-bg-color",
    // invertColor && "invert-color",
    // className
  );

  const innerClasses = classNames(
    "signUpForm-inner "
    // topDivider && "has-top-divider",
    // bottomDivider && "has-bottom-divider",
    // split && "cta-split"
  );

  return (
    <section className={outerClasses}>
      <Formik
        initialValues={{
          fullName: "",
          phone: "",
          email: "",
          class: "",
          toggle: false,
          answer: [],
          message:'',
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("You need to fill this text"),
          phone: Yup.string().required("You need to fill this text"),
          email: Yup.string().email().required("You need to fill this text"),
          class: Yup.string().required("You need to fill this text"),
        })}
        onSubmit={(values) => console.log(values)}
      >
        <div className={innerClasses}>
          <div className="signUpForm--left flex-col">
            <div>
              {/* <h3> */}
                {textMainBase.title}
              {/* </h3> */}
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
            <div className="signUpForm__footer">Còn x ngày đến han đăng kí</div>
          </div>
          <div className="signUpForm--right flex-col">
                  <span className='closeBtn' onClick={props.stateFunc}>
                    <AiFillCloseCircle size='25px' ></AiFillCloseCircle>
                  </span>
            <Form className="flex-col">
              <div className="basic-info gridCol-2">
                {/* <div> */}
                {signUpQues[0].ques.map((item) => (
                  <div className="basic-info__item">
                    <label htmlFor={item.quesName} className="title">{item.quesTitle}</label>
                    <Field
                      type="text"
                      placeholder={item.quesExample}
                      name={item.quesName}
                      id={item.quesName}
                    />
                    {/* Warning noti */}
                    {/* {formik.touched[`${item.quesName}`] ? (
                    <h4>{formik.errors[`${item.quesName}`]}</h4>
                  ) : null} */}
                  </div>
                ))}
              </div>
              <div
                className="choose-info"
                role="group"
                aria-labelledby="checkbox-group"
              >
                <label htmlFor={signUpQues[1].quesName} className='title'>
                  {signUpQues[1].quesTitle}
                </label>
                <div className="gridCol-2">
                  {signUpQues[1].ans.map((item) => (
                    <label style={{color:'#000'}}>
                      <Field
                        type="checkbox"
                        name={signUpQues[1].quesName}
                        value={item}
                        // style={{display:'inline-flex', gap:'5px'}}
                      />
                      {item}
                    </label>
                  ))}
                </div>
                {/* </div> */}
              </div>
              <div className="message flex-col">
                <label className="title">{textMainBase.messageTitle}</label>
                <Field className='message__text' as='textarea'  name='message' placeholder='Your message'></Field>
              </div>
              {/* <div className="main-info"></div> */}
            </Form>
            <div className="signUpForm__footer ">
              <button className="button button-sm" onClick={props.stateFunc}>CANCEL</button>
              <button className="button button-primary button-sm" type="submit">Submit</button>
            </div>
          </div>
        </div>
      </Formik>
    </section>
  );
};

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

export default SignUpForm;
