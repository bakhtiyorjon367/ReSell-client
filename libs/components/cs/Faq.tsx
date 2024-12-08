import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { GET_NOTICES } from '../../../apollo/admin/mutation';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import {  Notice } from '../../types/notice/notice';
import { NoticesInquiry } from '../../types/notice/notice.input';
import { FAQCategory, NoticeCategory } from '../../enums/notice.enum';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = ({initialInquiry, ...props}:any) => {
	const device = useDeviceDetect();
	const [faqCategory, setFaqCategory] = useState<FAQCategory>(FAQCategory.PRODUCT);
	const [expanded, setExpanded] = useState<string | false>(false);
	const [noticeInquiry, setNoticeInquiry] = useState<NoticesInquiry>(initialInquiry);
	const [notices, setNotices] = useState<Notice[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNotices,
		data: getNoticesData,
		error: getNoticesError,
		refetch:getNoticesRefetch
	} = useQuery(GET_NOTICES, {
		fetchPolicy:'cache-and-network',
		variables:{ input: noticeInquiry },
		notifyOnNetworkStatusChange:true,
		onCompleted:(data:T) => {
			setNotices(data?.getNotices?.list || [])
		},
	});
	/** LIFECYCLES **/
	
	/** HANDLERS **/
	const changeCategoryHandler = (faqCategory: FAQCategory) => {
		setFaqCategory(faqCategory);
		setNoticeInquiry({
			...noticeInquiry,
			search: {
				faqCategory: faqCategory, 
				noticeCategory: NoticeCategory.FAQ
			},
		});
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={faqCategory === `${FAQCategory.PRODUCT}` ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FAQCategory.PRODUCT);
						}}
					>
						Product
					</div>
					<div
						className={faqCategory ===  `${FAQCategory.PAYMENT}` ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FAQCategory.PAYMENT);
						}}
					>
						Payment
					</div>
					<div
						className={faqCategory ===  `${FAQCategory.BUYER}` ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FAQCategory.BUYER);
						}}
					>
						Buyers
					</div>
					<div
						className={faqCategory ===  `${FAQCategory.COMMUNITY}` ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FAQCategory.COMMUNITY);
						}}
					>
						Community
					</div>
					<div
						className={faqCategory ===  `${FAQCategory.OTHER}` ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FAQCategory.OTHER);
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{notices.length &&
						notices.map((ele: Notice) => (
							<Accordion expanded={expanded === ele?._id} onChange={handleChange(ele?._id)} key={ele?.noticeCategory}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography  className='content'> {ele?.noticeTitle}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography className='content'> {ele?.noticeContent}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};
Faq.defaultProps = {
    initialInquiry: {
        page: 1,
        limit: 10,
        sort: 'createdAt',
        search: {
            noticeCategory: NoticeCategory.FAQ
        },
    },
};
export default Faq;
