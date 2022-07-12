import React, { useRef, useState } from "react";
import './assets/style.scss';
import { AdminDashboard } from "../../store";
import { useHistory } from "react-router-dom";
import {BarcodeScanner, enableBarcodeScanner, disableBarcodeScanner, setHistoryInfo} from 'react-usb-barcode-scanner';
import {connect} from 'react-redux';
import config from "../../../components/Scanner/config";
import { STORE_MEMBER } from "../../store/constant";

const DashboardTab = ({props, indexTab}) => {
    const regex = /\n|\r\n|\n\r|\r/gm;
    const getHtml = (data) => data.replace(regex, '');
    const svID = useRef(null);
    const storeMember = localStorage.getItem(STORE_MEMBER)
    switch(indexTab) {
        case 1: return (
            <div className="Dashboard-room">
                <div className="over-lay"></div>
                <BarcodeScanner config = {config}/>
                { props.isBusy ? <p>Scanning...</p> : (props.data !== '' && (
                    <div className="form-add-room">
                        <div className="form-input">
                            <label>Mã Sinh Viên: </label>
                            <div className="sv-id" dangerouslySetInnerHTML={{ __html: getHtml(props.data) }} ref={svID}/>
                        </div>
                        <div className="form-input">
                            <label>Họ Tên: </label>
                            <input type="text" value={storeMember && storeMember.map((item, i) => {
                                return (
                                    item.id === props.data ? item.name : ''
                                )
                            })}/>
                        </div>
                        <div className="form-input">
                            <label>Ngày Sinh: </label>
                            <input type="text" value={storeMember && storeMember.map((item, i) => {
                                return (
                                    item.id === props.data ? item.date : ''
                                )
                            })}/>
                        </div>
                        <div className="form-input">
                            <label>Lớp: </label>
                            <input type="text" value={storeMember && storeMember.map((item, i) => {
                                return (
                                    item.id === props.data ? item.class : ''
                                )
                            })}/>
                        </div>
                    </div>
                ))}
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