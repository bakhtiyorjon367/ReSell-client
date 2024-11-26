import React from 'react';
import { NotificationStatus } from '../enums/notification.enum';
interface NotificationProps {
    notifications: { id: string; title: string }[]; 
    onClose: () => void;
    updateNotificationHandler:any;
}

const NotificationBadge : React.FC<NotificationProps> = ({ notifications, onClose,updateNotificationHandler}) => {
    return (
        <div className={"notificationContainer"}>
            <button onClick={onClose} className={"closeButton"}>Close</button>
            {notifications.map((ele, index) => (
                <div key={index} className={"notificationBox"}>
                    <p onClick={()=> updateNotificationHandler({_id:ele.id, notificationStatus:NotificationStatus.READ})}>{ele.title} </p>
                </div>
            ))}
        </div>
    );
};


export default NotificationBadge;