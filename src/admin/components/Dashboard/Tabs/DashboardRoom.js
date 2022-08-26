import React, { useEffect, useRef, useState } from "react";
import {
  addNewSinhVien,
  updateSinhVien,
} from "../../../../server/controllers/sinhvien.controller";
import {
  BarcodeScanner,
  enableBarcodeScanner,
  disableBarcodeScanner,
  setHistoryInfo,
} from "react-usb-barcode-scanner";
import { MdRemoveCircle } from "react-icons/md";
import { Table } from "antd";

const DashboardRoom = (props) => {
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
  return (
    <div className="Dashboard-room">
      <BarcodeScanner config={props.config} />
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
                onClick={() => (formAddMember.current.style.display = "none")}
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
        <Table
          dataSource={data.filter((item) => item.enterRoom === true)}
          columns={[
            {
              title: "Mã Sinh Viên",
              dataIndex: ["svId"],
            },
            {
              title: "Họ Tên",
              dataIndex: ["name"],
            },
            {
              title: "Ngày Sinh",
              dataIndex: ["date"],
            },
            {
              title: "Lớp",
              dataIndex: ["class"],
            },
            {
              title: "Chức Năng",
              dataIndex: ["_id"],
              render(value) {
                <MdRemoveCircle
                  onClick={() => {
                    updateSinhVien(value, {
                      enterRoom: false,
                    });
                  }}
                />;
              },
            },
          ]}
        />
        {/* <div className="inner-room-content">
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
        </div> */}
      </div>
    </div>
  );
};

export default DashboardRoom;
