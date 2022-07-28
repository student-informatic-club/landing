import React, { useEffect, useRef, useState } from "react";
import "./assets/style.scss";
import { AdminDashboard } from "../../store";
import { useHistory } from "react-router-dom";
import {
  BarcodeScanner,
  enableBarcodeScanner,
  disableBarcodeScanner,
  setHistoryInfo,
} from "react-usb-barcode-scanner";
import { connect } from "react-redux";
import config from "../../../components/Scanner/config";
import { STORE_MEMBER } from "../../store/constant";
//  import icons
import { MdRemoveCircle } from "react-icons/md";
// import backend
import {
  getSinhVien,
  addNewSinhVien,
  updateSinhVien,
} from "../../../backend/controllers/sinhvien.controller";
import DashboardCtv from "./Tabs/DashboardCtv";
import { Button } from "@mui/material";
const sv = require("../../../backend/models/sinhvien.model");

let ctvData;
const DashboardTab = ({ props, indexTab }) => {
  // let storeMember = [];
  const history = useHistory();
  const DateTime = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const regex = /\n|\r\n|\n\r|\r/gm;
  const getHtml = (data) => data.replace(regex, "");
  const svID = useRef(null);
  // console.log(storeMember);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [classes, setClasses] = useState("");
  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const classRef = useRef(null);
  const formAddMember = useRef(null);
  const [data, setData] = useState([]);
  let existMember;
  const checkSV = (id) => {
    existMember = data.filter((item) => item.svId === id);
    return existMember;
  };
  const deleteMember = (id) => {};
  switch (indexTab) {
    case 1:
      return (
        <>
          <div className="Dashboard-room">
            <BarcodeScanner config={config} />
            {props.isBusy ? (
              <p>Scanning...</p>
            ) : (
              props.data !== "" && (
                <div className="form-add-room" ref={formAddMember}>
                  <div className="group-input">
                    <div className="form-input">
                      <label>Mã Sinh Viên: </label>
                      <div
                        className="sv-id"
                        dangerouslySetInnerHTML={{
                          __html: getHtml(props.data),
                        }}
                        ref={svID}
                      />
                    </div>
                    <div className="form-input">
                      <label>Họ Tên: </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        value={
                          checkSV(props.data).length !== 0
                            ? checkSV(props.data)
                                .map((item) => item.name)
                                .join("")
                            : name
                        }
                        ref={nameRef}
                      />
                    </div>
                  </div>
                  <div className="group-input">
                    <div className="form-input">
                      <label>Ngày Sinh: </label>
                      <input
                        type="text"
                        ref={dateRef}
                        onChange={(e) => setDate(e.target.value)}
                        value={
                          checkSV(props.data).length !== 0
                            ? checkSV(props.data)
                                .map((item) => item.date)
                                .join("")
                            : date
                        }
                      />
                    </div>
                    <div className="form-input">
                      <label>Lớp: </label>
                      <input
                        type="text"
                        ref={classRef}
                        onChange={(e) => setClasses(e.target.value)}
                        value={
                          checkSV(props.data).length !== 0
                            ? checkSV(props.data)
                                .map((item) => item.class)
                                .join("")
                            : classes
                        }
                      />
                    </div>
                  </div>
                  <div className="group-input">
                    <button
                      className="confirm-btn"
                      onClick={() => {
                        addNewSinhVien({
                          svId: props.data,
                          name: name,
                          date: date,
                          class: classes,
                          enterRoom: true,
                        });
                        formAddMember.current.style.display = "none";
                      }}
                    >
                      Xác Nhận
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() =>
                        (formAddMember.current.style.display = "none")
                      }
                    >
                      Hủy Bỏ
                    </button>
                  </div>
                </div>
              )
            )}
            <div className="inner-room">
              <h3 className="inner-room-form--heading">
                Danh Sách Sinh Viên Vào Phòng
              </h3>
              <div className="inner-room-content">
                <div className="inner-form-heading">
                  <div>Mã Sinh Viên</div>
                  <div>Họ Tên</div>
                  <div>Ngày Sinh</div>
                  <div>Lớp</div>
                  <div>Chức Năng</div>
                </div>
                <div className="inner-room-form">
                  <div className="inner-room-main">
                    {data
                      .filter((item) => item.enterRoom === true)
                      .map((item, i) => {
                        return (
                          <div className="inner-room-member">
                            <div>{item.svId}</div>
                            <div>{item.name}</div>
                            <div>{item.date}</div>
                            <div>{item.class}</div>
                            <div>
                              <MdRemoveCircle
                                onClick={() => {
                                  updateSinhVien(item._id, {
                                    enterRoom: false,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="group-input">
              <div className="form-input">
                <label>Ngày Sinh: </label>
                <input
                  type="text"
                  ref={dateRef}
                  onChange={(e) => setDate(e.target.value)}
                  value={
                    checkSV(props.data).length !== 0
                      ? checkSV(props.data)
                          .map((item) => item.date)
                          .join("")
                      : date
                  }
                />
              </div>
              <div className="form-input">
                <label>Lớp: </label>
                <input
                  type="text"
                  ref={classRef}
                  onChange={(e) => setClasses(e.target.value)}
                  value={
                    checkSV(props.data).length !== 0
                      ? checkSV(props.data)
                          .map((item) => item.class)
                          .join("")
                      : classes
                  }
                />
              </div>
            </div>
            <div className="group-input">
              <button
                className="confirm-btn"
                onClick={() => {
                  addNewSinhVien({
                    svId: props.data,
                    name: name,
                    date: date,
                    class: classes,
                    enterRoom: true,
                  });
                  formAddMember.current.style.display = "none";
                }}
              >
                Xác Nhận
              </button>
              <button
                className="cancel-btn"
                onClick={() => (formAddMember.current.style.display = "none")}
              >
                Hủy Bỏ
              </button>
            </div>
          </div>

          <div className="inner-room">
            <h3 className="inner-room-form--heading">
              Danh Sách Sinh Viên Vào Phòng
            </h3>
            <div className="inner-room-content">
              <div className="inner-form-heading">
                <div>Mã Sinh Viên</div>
                <div>Họ Tên</div>
                <div>Ngày Sinh</div>
                <div>Lớp</div>
                <div>Chức Năng</div>
              </div>
              <div className="inner-room-form">
                <div className="inner-room-main">
                  {data
                    .filter((item) => item.enterRoom === true)
                    .map((item, i) => {
                      return (
                        <div className="inner-room-member">
                          <div>{item.svId}</div>
                          <div>{item.name}</div>
                          <div>{item.date}</div>
                          <div>{item.class}</div>
                          <div>
                            <MdRemoveCircle
                              onClick={() => {
                                updateSinhVien(item._id, {
                                  enterRoom: false,
                                });
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <DashboardCtv />
        </>
      );
    case 3:
      return <div>3</div>;
    case 4:
      return <div>4</div>;
    default:
      return;
  }
};

const Dashboard = (props) => {
  const tabDashboard = AdminDashboard((state) => state.dashboard);
  const currentTab = AdminDashboard((state) => state.currentTab);
  const [indexTab, setIndexTab] = useState(currentTab);
  const history = useHistory();
  console.log(indexTab);
  return (
    <section>
      <div className="select-options">
        {tabDashboard.map((item, i) => {
          return (
            <div
              className={item.status ? "option option--active" : "option"}
              key={i}
              onClick={() => {
                tabDashboard.map((it) =>
                  it.id === item.id ? (it.status = true) : (it.status = false)
                );
                AdminDashboard.setState({ dashboard: tabDashboard });
                AdminDashboard.setState({ currentTab: item.id });
                setIndexTab(item.id);
              }}
            >
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
      <div className="Dashboard-main-content">
        <DashboardTab props={props} indexTab={indexTab} />
      </div>
    </section>
  );
};

const mapStateToProps = ({ barcodeScanner: { isBusy, data, history } }) => ({
  isBusy,
  data,
  barcodeHistory: history,
});

export default connect(mapStateToProps, {
  enableBarcodeScanner,
  disableBarcodeScanner,
  setHistoryInfo,
})(Dashboard);
