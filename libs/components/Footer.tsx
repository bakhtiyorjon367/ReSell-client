import { Box, Stack } from "@mui/material"
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import useDeviceDetect from "../hooks/useDeviceDetect";
import moment from "moment";

const Footer = () => {
    const device = useDeviceDetect();

	if (device == 'mobile') {
        return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
                        <img src="/img/logo/favicon.svg" alt="" className={'logo'} />
						</Box>
						<Box component={'div'} className={'footer-box'}>
                        <span>customer care</span>
                        <p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
                        <span>Support?</span>
                        <p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'bottom'}>
							<div>
                                <strong>keep yourself up to date</strong>
                                <strong>Explore</strong>
                                <span> Categories</span>
                                <span>Sharing Products</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
                                <strong>Discover</strong>
                                <span>ReSell Kazakstan</span>
                                <span>ReSell Kirgizstan</span>
                                <span>ReSell Afghanista</span>
                                <span>ReSell Tadjikistan</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© Nestar - All rights reserved. Nestar {moment().year()}</span>
                    <span>Privacy · Terms · Sitemap</span>
				</Stack>
			</Stack>
		);
    }
    else {
		return (
        <Stack className={'footer-container'}>
        <Stack className={'main'}>
            <Stack className={'left'}>
                <Box component={'div'} className={'footer-box'}>
                    <img src="/img/logo/favicon.svg" alt="" className={'logo'} />
                    <p>ReSell</p>
                </Box>
                <Box component={'div'} className={'footer-box'}>
                    <span>customer care</span>
                    <p>+82 10 4867 2909</p>
                </Box>
                <Box component={'div'} className={'footer-box'}>
                    <span>Support?</span>
                    <p>+82 10 4867 2909</p>
                    
                </Box>
                <Box component={'div'} className={'footer-box'}>
                    <p>follow us on social media</p>
                    <div className={'media-box'}>
                        <FacebookOutlinedIcon />
                        <TelegramIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                    </div>
                </Box>
            </Stack>
            <Stack className={'right'}>
                <Box component={'div'} className={'top'}>
                    <strong>keep yourself up to date</strong>
                    <div>
                        <input type="text" placeholder={'Your Email'} />
                        <span>Subscribe</span>
                    </div>
                </Box>
                <Box component={'div'} className={'bottom'}>
                    <div>
                        <strong>Explore</strong>
                        <span> Categories</span>
                        <span>Sharing Products</span>
                       
                    </div>
                    <div>
                        <strong>Quick Links</strong>
                        <span>Terms of Use</span>
                        <span>Privacy Policy</span>
                        <span>Pricing Plans</span>
                        <span>Our Services</span>
                        <span>Contact Support</span>
                        <span>FAQs</span>
                    </div>
                    <div>
                        <strong>Discover</strong>
                        <span>ReSell Kazakstan</span>
                        <span>ReSell Kirgizstan</span>
                        <span>ReSell Afghanista</span>
                        <span>ReSell Tadjikistan</span>
                    </div>
                </Box>
            </Stack>
        </Stack>
        <Stack className={'second'}>
            <span>© ReSell - All rights reserved. ReSell {moment().year()}</span>
            <span>Privacy · Terms · Sitemap</span>
        </Stack>
        </Stack>
        );
    }
};
export default Footer;  // export default Footer;