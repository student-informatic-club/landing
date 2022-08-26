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
} from "../../../server/controllers/sinhvien.controller";
import DashboardCtv from "./Tabs/DashboardCtv";
import { Button } from "@mui/material";
import DashboardBlog from "./Tabs/DashboardBlog";
import DashboardRoom from "./Tabs/DashboardRoom";
const sv = require("../../../server/models/sinhvien.model");

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
          <DashboardRoom config={config} data={props.data} />
        </>
      );
    case 2:
      return (
        <>
          <DashboardCtv />
        </>
      );
    case 3:
      return <DashboardBlog/>;
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
