import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

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

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<string>('product');
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	
	/** HANDLERS **/
	const changeCategoryHandler = (category: string) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const data: any = {
		product: [
			{
				id: '00f5a45ed8897f8090116a01',
				subject: 'Are the products displayed on the site reliable?',
				content: 'Of course we only have verified products',
			},
			{
				id: '00f5a45ed8897f8090116a22',
				subject: 'What types of products do you offer?',
				content: 'We offer used items from neighborhood',
			},
			{
				id: '00f5a45ed8897f8090116a21',
				subject: 'How can I search for products on your website?',
				content: 'Simply use our search bar to enter location, price range or product type.',
			},
			{
				id: '00f5a45ed8897f8090116a23',
				subject: 'Do you provide secure transition for buyers?',
				content: 'No, till now users do their transactions on their own, but near future we will provide',
			},
			{
				id: '00f5a45ed8897f8090116a24',
				subject: 'What should I consider when buying a product?',
				content: 'Location, condition, size, amenities.',
			},
			{
				id: '00f5a45ed8897f8090116a29',
				subject: 'What happens if I encounter issues with the product after purchase?',
				content: 'Typicly seller will say about refund and return',
			},
			{
				id: '00f5a45ed8897f8090116a28',
				subject: 'Do you offer products in specific neighborhoods?',
				content: 'Yes, we have listings in various neighborhoods based on your preferences.',
			},
			{
				id: '00f5a45ed8897f8090116a27',
				subject: 'Can I sell my product through your website?',
				content: 'Absolutely, we provide services for selling products as well.',
			},
			{
				id: '00f5a45ed8897f8090116b99',
				subject: 'What if I need help understanding legal aspects of product purchase?',
				content: 'Our team can provide basic guidance and recommend legal professionals if needed.',
			},
		],
		payment: [
			{
				id: '00f5a45ed8897f8090116a02',
				subject: 'How can I make the payment?',
				content: 'You make the payment directly with seller',
			},
			{
				id: '00f5a45ed8897f8090116a91',
				subject: 'Are there any additional fees for using your services?',
				content: 'No, our services are free for buyers and sellers.',
			},
			{
				id: '00f5a45ed8897f8090116a92',
				subject: 'Is there an option for installment payments?',
				content: 'Yes, we offer installment payment plans for certain products. Please inquire for more details.',
			},
			{
				id: '00f5a45ed8897f8090116a93',
				subject: 'Is my payment information secure on your website?',
				content:'Yes, we use industry-standard encryption technology to ensure the security of your payment information.',
			},
			{
				id: '00f5a45ed8897f8090116a94',
				subject: 'Can I make payments online through your website?',
				content: "Yes, you can securely make payments online through our website's payment portal.",
			},
			{
				id: '00f5a45ed8897f8090116a95',
				subject: "What happens if there's an issue with my payment?",
				content: 'If you encounter any issues with your payment, please contact our support team for assistance.',
			},
			{
				id: '00f5a45ed8897f8090116a96',
				subject: 'Do you offer refunds for payments made?',
				content:'Refund policies vary depending on seller circumstances. Please refer to seller refund descriptio or contact seller for more information.',
			},
			{
				id: '00f5a45ed8897f8090116a98',
				subject: 'Are there penalties for warnins from users?',
				content:
					'Penalties may apply depending on the terms of your agreement. Please refer to your contract or contact us for details.',
			},
		],
		buyers: [
			{
				id: '00f5a45ed8897f8090116a03',
				subject: 'What should buyers pay attention to?',
				content: 'Buyers should check and decide whether the product they want to buy is actually suitable!',
			},
			{
				id: '00f5a45ed8897f8090116a85',
				subject: 'How can I determine if a product is within my budget?',
				content: 
					'Calculate your budget by considering your income, down payment, and potential mortgage payments.',
			},
			{
				id: '00f5a45ed8897f8090116a84',
				subject: 'What documents do I need to provide when signing up?',
				content:
					"You'll typically need phone number or email or  identification. Our team will guide you through.",
			},
			{
				id: '00f5a45ed8897f8090116a83',
				subject: 'What factors should I consider when choosing a neighborhood?',
				content:
					'Consider factors such as location, transportation.',
			},
			{
				id: '00f5a45ed8897f8090116a82',
				subject: 'Can I negotiate the price of a product?',
				content:
					'Yes, you can negotiate the price of a product.',
			},
			{
				id: '00f5a45ed8897f8090116a81',
				subject: 'What are some red flags to watch out for when viewing products?',
				content:
					'Watch out for signs of structural damage, water damage, mold, outdated systems, and undesirable conditions.',
			},
			{
				id: '00f5a45ed8897f8090116a79',
				subject: 'How long does it typically take to find the right product?',
				content:
					'The timeframe varies depending on your preferences and location.',
			},
			{
				id: '00f5a45ed8897f8090116a77',
				subject: 'What happens if I change my mind about a product after making an offer?',
				content:
					'Depending on the terms of the offer and the stage of the transaction, you may have options to withdraw your offer.',
			},
		],
		community: [
			{
				id: '00f5a45ed8897f8090116a06',
				subject: 'What should I do if there is abusive or criminal behavior in the community section?',
				content: 'If you encounter this situation, please report it immediately or contact the admin!',
			},
			{
				id: '00f5a45ed8897f8090116a44',
				subject: 'How can I participate in the community section of your website?',
				content: 'Create an account and engage in discussions.',
			},
			{
				id: '00f5a45ed8897f8090116a45',
				subject: 'Are there guidelines for posting?',
				content: 'Yes, follow our community guidelines.',
			},
			{
				id: '00f5a45ed8897f8090116a46',
				subject: 'What should I do if I encounter spam or irrelevant posts?',
				content: 'Report them to the admin.',
			},
			{
				id: '00f5a45ed8897f8090116a47',
				subject: 'Can I connect with other members outside of the community section?',
				content: 'Currently, no.',
			},
			{
				id: '00f5a45ed8897f8090116a48',
				subject: 'Can I share personal experiences or recommendations?',
				content: 'Yes, if relevant you can share personal experiences and recommendations.',
			},
			{
				id: '00f5a45ed8897f8090116a49',
				subject: 'How can I ensure privacy?',
				content: 'Avoid sharing sensitive information.',
			},
			{
				id: '00f5a45ed8897f8090116a50',
				subject: 'How can I contribute positively?',
				content: 'Respect others and engage constructively.',
			},
			{
				id: '00f5a45ed8897f8090116a51',
				subject: 'What if I notice misinformation?',
				content: 'Provide correct information or report to the admin.',
			},
			{
				id: '00f5a45ed8897f8090116a52',
				subject: 'Are there moderators?',
				content: 'Yes, we have moderators.',
			},
		],
		other: [
			{
				id: '00f5a45ed8897f8090116a40',
				subject: 'Who should I contact if I want to buy your site?',
				content: 'We have no plans to sell the site at this time!',
			},
			{
				id: '00f5a45ed8897f8090116a39',
				subject: 'Can I advertise my services on your website?',
				content: 'We currently do not offer advertising opportunities on our site.',
			},
			{
				id: '00f5a45ed8897f8090116a38',
				subject: 'Are there sponsorship opportunities available on your platform?',
				content: 'At this time, we do not have sponsorship opportunities.',
			},
			{
				id: '00f5a45ed8897f8090116a36',
				subject: 'Can I contribute guest posts or articles to your website?',
				content: "We're not accepting guest posts or articles at the moment.",
			},
			{
				id: '00f5a45ed8897f8090116a35',
				subject: 'Is there a referral program for recommending your website to others?',
				content: "We don't have a referral program in place currently.",
			},
			{
				id: '00f5a45ed8897f8090116a34',
				subject: 'Do you offer affiliate partnerships for promoting your services?',
				content: 'Affiliate partnerships are not available at this time.',
			},
		],
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'product' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('product');
						}}
					>
						Product
					</div>
					<div
						className={category === 'payment' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('payment');
						}}
					>
						Payment
					</div>
					<div
						className={category === 'buyers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('buyers');
						}}
					>
						Buyers
					</div>
					<div
						className={category === 'community' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('community');
						}}
					>
						Community
					</div>
					<div
						className={category === 'other' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('other');
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{data[category] &&
						data[category].map((ele: any) => (
							<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography  className='content'> {ele?.subject}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography className='content'> {ele?.content}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

export default Faq;
