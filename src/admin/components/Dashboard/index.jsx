import React, { useRef, useState } from "react";
import './assets/style.scss';
import { AdminDashboard } from "../../store";
import { useHistory } from "react-router-dom";
import {BarcodeScanner, enableBarcodeScanner, disableBarcodeScanner, setHistoryInfo} from 'react-usb-barcode-scanner';
import {connect} from 'react-redux';
import config from "../../../components/Scanner/config";
import { STORE_MEMBER } from "../../store/constant";
import { string } from "yup";

const DashboardTab = ({props, indexTab}) => {
    const DateTime = new Date().toLocaleString([], {hour: '2-digit', minute:'2-digit'});
    const regex = /\n|\r\n|\n\r|\r/gm;
    const getHtml = (data) => data.replace(regex, '');
    const svID = useRef(null);
    const storeMember = JSON.parse(localStorage.getItem(STORE_MEMBER)) || [];
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [classes, setClasses] = useState('');
    const [closeForm, setCloseForm] = useState(false);
    const handleAddRoom = (obj) => {
        const newStoreMember = storeMember;
        newStoreMember.push(obj);
        localStorage.setItem(STORE_MEMBER, JSON.stringify(newStoreMember));
    }
    let existMember;
    const checkSV = (id) => {
        existMember = storeMember.filter((item) => item.svId === id);
        console.log(existMember);
        return existMember
    }
    switch(indexTab) {
        case 1: return (
            <div className="Dashboard-room">
                <BarcodeScanner config = {config}/>
                { props.isBusy ? <p>Scanning...</p> : (props.data !== '' && (
                    <div className="form-add-room">
                        <div className="group-input">
                            <div className="form-input">
                                <label>Mã Sinh Viên: </label>
                                <div className="sv-id" dangerouslySetInnerHTML={{ __html: getHtml(props.data) }} ref={svID}/>
                            </div>
                            <div className="form-input">
                                <label>Họ Tên: </label>
                                <input type="text" onChange={(e) => {
                                    console.log(e.target.value);
                                    setName(e.target.value)
                                    console.log(name);
                                }} value={
                                    checkSV(props.data).length !== 0 ? checkSV(props.data).map(item => item.name) : name
                                }/>
                            </div>
                        </div>
                        <div className="group-input">
                            <div className="form-input">
                                <label>Ngày Sinh: </label>
                                <input type="text" onChange={(e) => setDate(e.target.value)} value={checkSV(props.data).length !== 0 ? checkSV(props.data).map(item => item.date) : date}/>
                            </div>
                            <div className="form-input">
                                <label>Lớp: </label>
                                <input type="text" onChange={(e) => setClasses(e.target.value)} value={checkSV(props.data).length !== 0 ? checkSV(props.data).map(item => item.class) : classes}/>
                            </div>
                        </div>
                        <div className="group-input">
                            <button className="confirm-btn" onClick={() => {handleAddRoom({
                                svId: props.data,
                                name: name,
                                date: date,
                                class: classes,
                                time: DateTime
                            })
                                console.log('success');
                            }}>Xác Nhận</button>
                            <button className="cancel-btn">Hủy Bỏ</button>
                        </div>
                    </div>
                ))}
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
                            <div>Thời Gian Vào</div>
                        </div>
                        <div className="inner-room-form">
                            <div className="inner-room-main">
                                {storeMember && storeMember.map((item, i) => {
                                    return (
                                        <div className="inner-room-member">
                                            <div>{item.svId}</div>
                                            <div>{item.name}</div>
                                            <div>{item.date}</div>
                                            <div>{item.class}</div>
                                            <div>{DateTime}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        case 2: return (
            <div>2</div>
        )
        case 3: return (
            <div>3</div>
        )
        case 4: return (
            <div>4</div>
        )
        default:
            return
    }
}

const Dashboard = (props) => {
    const tabDashboard = AdminDashboard((state) => state.dashboard)
    const [indexTab, setIndexTab] = useState(1);
    const history = useHistory();
    return (
        <section>
            <div className="select-options">
                {tabDashboard.map((item, i) => {
                    return (
                        <div className={item.status ? 'option option--active' : 'option'} key={i} onClick={() => {
                            tabDashboard.map((it) => it.id === item.id ? it.status = true : it.status = false)
                            AdminDashboard.setState({dashboard: tabDashboard})
                            setIndexTab(item.id)
                            history.push("/admin/Dashboard")
                        }}>
                            <span>{item.name}</span>
                        </div>
                    )
                })}
            </div>
            <div className="Dashboard-main-content">
                <DashboardTab props={props} indexTab = {indexTab}/>
            </div>
        </section>
    )
}

const mapStateToProps = ({ barcodeScanner: { isBusy, data, history } }) => ({ isBusy, data, barcodeHistory: history });

export default connect(mapStateToProps, {enableBarcodeScanner, disableBarcodeScanner, setHistoryInfo})(Dashboard);