import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { BarcodeScanner } from "react-usb-barcode-scanner";
import FormModal from "../components/formModal";
import Config from "../../../../db.config";

const DashboardRoom = ({ Data, config, isBusy }) => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setDetail({
      msv: Data,
    });
  }, [Data]);

  console.log(detail);

  const getData = () => {
    axios.get(`${Config.API_URL}/api/room`).then((res) => setData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const closeForm = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(isBusy){
      setOpen(true)
    }else {
      return
    }
  }, [isBusy])

  return (
    <div className="Dashboard-room">
      <BarcodeScanner config={config} />
      {/* {isBusy ? (<div>....</div>) : (
        Data !== "" && (
          )
          )
        } */}
        <FormModal visible={open} onCancel={closeForm} obj={detail} />
      <div className="inner-room">
        <h3 className="inner-room-form--heading">
          Danh Sách Sinh Viên Vào Phòng
        </h3>
        <Table
          dataSource={data.filter((item) => item.entered === true)}
          columns={[
            {
              title: "Mã Sinh Viên",
              dataIndex: ["msv"],
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
                <MdRemoveCircle onClick={() => {}} />;
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
