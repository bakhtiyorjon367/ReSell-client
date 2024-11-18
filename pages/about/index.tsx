import React from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { Stack } from '@mui/material';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const About: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>ABOUT PAGE MOBILE</div>;
	} else {
		return (
			<Stack className={'about-page'}>
				<Stack className={'intro'} sx={{height:'800px'}}>
					<img src="/img/about/aboutPage1.jpeg" alt="About Us"  style={{height:'1100px'}}/>	
				
					
				</Stack>
				<Stack className={'why'}>
						<Stack className={'container'}>
						<div>ReSell brings people together to build closely-knit local communities</div>
							<p>
								<b>Why?</b> <br /><br />
									If we’ve learned anything over the past few years, it’s that community matters. When we were bubbled up in our homes, we searched for connection that went beyond any feeling that chats, reels or curated feeds could give us. We needed something more. We needed togetherness—even the kind that’s found online.

									But finding togetherness on the World Wide Web? Well, that can feel pretty intimidating.

									Sure, our generation is well versed in communicating with Facebook groups, close-friend lists, Reddit threads, and meta marketplaces, but what about connecting with Riley-down-the-road about those vintage cups she wants to rehome, or Brandon-around-the-block about the toddler chair his kid’s already grown out of?

									That kind of connection requires a bit more than a “will-you-go-down-to-ten” mentality. And that’s exactly what our generation needs.

									Because we’re not always looking for a quick sale or to save a few bucks. Sometimes, we just want to know that we’re helping out a friend, a neighbour, or those newlyweds that just moved in down the hall.

									We want to feel like we’re doing something good. And doing good, together.
								<br />
								<br />
								<br />
								<b>Overview</b> <br /><br />
								ReSell is a community-driven super app from Korea that is committed to nurturing local interactions. We offer a wide range of services, including buying and selling goods, community groups, job listings, real estate and auto listings, and payment solutions. With a thriving community of over 30 million users, we are passionate about enriching local connections, starting with our secondhand marketplace
									Our North American division aims to expand our communities across the US & Canada, starting with Toronto, Vancouver, and New York City. We’re designing a delightful way for communities to connect online in a way that’s safe, easy, and centered around living - and listing - better, together.
									<br/>
									<br/>
									<br />
								<b>Team</b> <br /><br />
								ReSell's team is composed of dynamic, passionate, and entrepreneurial individuals. Our executive leadership, with past experiences in globally recognized tech companies such as Google, Kakao, Naver, and Ritual, brings a wealth of expertise and guidance to the organization.
							</p>
							<Stack className={'boxes'}>
								<div className={'box'}>
									<div>
										<img src="/img/icons/garden.svg" alt="" />
									</div>
									<span>Modern</span>
									<p>Nullam sollicitudin blandit Nullam maximus.</p>
								</div>
								<div className={'box'}>
									<div>
										<img src="/img/icons/securePayment.svg" alt="" />
									</div>
									<span>Secure Payment</span>
									<p>Nullam sollicitudin blandit Nullam maximus.</p>
								</div>
							</Stack>
						</Stack>
					</Stack>
				<Stack className={'options'}>
					<img src="/img/about/aboutPage2.jpg" alt="" className={'about-banner'} />
					<Stack className={'container'}>
						<strong>Let’s find the right selling option for you</strong>
						<Stack className='box'>
							<div className={'icon-box'}>
								<img src="/img/icons/security.svg" alt="" />
							</div>
							<div className={'text-box'}>
								<span>Product Management</span>
								<p>Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.</p>
							</div>
						</Stack>
						<Stack className='box'>
							<div className={'icon-box'}>
								<img src="/img/icons/keywording.svg" alt="" />
							</div>
							<div className={'text-box'}>
								<span>Product Management</span>
								<p>Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.</p>
							</div>
						</Stack>
						<Stack className='box'>
							<div className={'icon-box'}>
								<img src="/img/icons/investment.svg" alt="" />
							</div>
							<div className={'text-box'}>
								<span>Product Management</span>
								<p>Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.</p>
							</div>
						</Stack>
						<Stack className={'btn'}>
							Learn More
							<img src="/img/icons/rightup.svg" alt="" />
						</Stack>
					</Stack>
				</Stack>
				<Stack className={'partners'}>
					<Stack className={'container'}>
						<span>Trusted by the world's best</span>
						<Stack className={'wrap'}>
							<img src="/img/icons/brands/amazon.svg" alt="" />
							<img src="/img/icons/brands/amd.svg" alt="" />
							<img src="/img/icons/brands/cisco.svg" alt="" />
							<img src="/img/icons/brands/dropcam.svg" alt="" />
							<img src="/img/icons/brands/spotify.svg" alt="" />
						</Stack>
					</Stack>
				</Stack>

			</Stack>
		);
	}
};

export default withLayoutFull(About);
