import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { GET_NOTICES } from '../../../apollo/admin/mutation';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import {  Notices } from '../../types/notice/notice';
import { NoticesInquiry } from '../../types/notice/notice.input';
import { NoticeCategory } from '../../enums/notice.enum';

const Notice = ({initialInquiry, ...props}:any) => {
	const device = useDeviceDetect();
	const [noticeInquiry, setNoticeInquiry] = useState<NoticesInquiry>(initialInquiry);
	const [notices, setNotices] = useState<Notices[]>([]);
	
	/** APOLLO REQUESTS **/
	const {
		loading: getNotices,
		data: getNoticesData,
		error: getNoticesError,
		refetch:getNoticesRefetch
	} = useQuery(GET_NOTICES, {
		fetchPolicy:'network-only',
		variables:{ input: noticeInquiry },
		notifyOnNetworkStatusChange:true,
		onCompleted:(data:T) => {
			setNotices(data?.getNotices?.list || [])
		},
	});
	/** LIFECYCLES **/

	/** HANDLERS **/
	const termsHandler = async (event: any, newValue: NoticeCategory) => {
		const updatedInquiry = {
			...noticeInquiry,
			search: {
				noticeCategory: newValue
			}
		};
		setNoticeInquiry(updatedInquiry);
		await getNoticesRefetch({ input: updatedInquiry });
	};
	

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<div>
					<span style={{marginRight:'20px',textDecoration:'underline', cursor:'pointer'}} className={'title'} onClick={(e)=>{termsHandler(window.location.reload(),NoticeCategory.EVENT)}} >Notice</span>
					<span style={{marginRight:'20px',textDecoration:'underline', cursor:'pointer'}} className={'title'} onClick={(e)=>{termsHandler(e,NoticeCategory.TERMS)}}>Terms</span>
				</div>
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>title</span>
						<span>Content</span>
						<span>date</span>
					</Box>
					<Stack className={'bottom'}>
						{notices.map((notice: any) => (
							<div className={`notice-card ${notice?.noticeCategory === NoticeCategory.EVENT && 'event'}`} key={notice?.noticeTitle}>
								{notice?.noticeCategory === NoticeCategory.EVENT ? <div>event</div> : <span className={'notice-number'}>{notice?.noticeTitle}</span>}
								<span className={'notice-title'}>{notice?.noticeCategory === NoticeCategory.EVENT ? notice?.noticeTitle : notice?.noticeContent}</span>
								<span className={'notice-date'}>{notice?.noticeCategory === NoticeCategory.EVENT ? notice?.noticeEventDate : notice?.createdAt}</span>
								
							</div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};
Notice.defaultProps = {
    initialInquiry: {
        page: 1,
        limit: 10,
        sort: 'createdAt',
        search: {
            noticeCategory: NoticeCategory.EVENT
        },
    },
};
export default Notice;
