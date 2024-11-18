import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import { Stack } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Categories from '../libs/components/homepage/Categories';
import FreeItems from '../libs/components/homepage/FreeItems';
import Furniture from '../libs/components/homepage/Furniture';
import WomenFashion from '../libs/components/homepage/WomenFashion';
import PopularProducts from '../libs/components/homepage/PopularProducts';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<div>ReSell Mobile Homepage</div>
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<Categories/>
				<FreeItems/>
				<PopularProducts/>
				<Furniture/>
				<WomenFashion/>
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
