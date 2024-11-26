import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { Direction } from "../../enums/common.enum";

export interface NotificationInput{
    notificationType:NotificationType;
    notificationStatus?:NotificationStatus;
    notificationGroup:NotificationGroup;
    notificationTitle:string;
    notificationDesc?:string;
	authorId: string;
	receiverId: string;
	productId: string;
	articleId: string;
}

interface NISearch {
	notificationStatus?: NotificationStatus;
}

export interface NotificationsInquiry {
    page:number;
    limit:number;
    sort?:string;
    direction?: Direction;
    search: NISearch;
}
