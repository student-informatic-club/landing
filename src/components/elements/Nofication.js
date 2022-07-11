import React from "react";
import {NotificationManager} from 'react-notifications';

const createNotification = (type, message) => {
    switch(type) {
        case 'info':
            NotificationManager.info(message);
            break;
        case 'success':
            NotificationManager.success(message, 'Thành Công', 2000);
            break;
        case 'warning':
            NotificationManager.warning(message, 'Cảnh Báo');
            break;
        case 'error':
            NotificationManager.error(message, 'Lỗi',  2000);
            break;
        default:
    }
}

export default createNotification