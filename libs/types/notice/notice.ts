import { FAQCategory, NoticeCategory, NoticeStatus } from "../../enums/notice.enum";
import { TotalCounter } from "../product/product";

export interface Notice {
    _id: string;
    noticeCategory: NoticeCategory;
    faqCategory:FAQCategory,
    noticeStatus: NoticeStatus;
    noticeTitle:String;
    noticeContent?:String;
    noticeEventDate?:string;
    memberId: string;
    createdAt:Date;
    updatedAt:Date;
}


export interface Notices {
    list: Notice[];
    metaCounter: TotalCounter[];
}