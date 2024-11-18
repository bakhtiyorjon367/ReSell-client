import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Product } from '../../types/product/product';
import { ProductsInquiry } from '../../types/product/product.input';
import { T } from '../../types/common';
import { useRouter } from 'next/router';
import { ProductCard } from '../mypage/ProductCard';

const MemberProducts: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { memberId } = router.query;
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>({ ...initialInput });
	const [userProducts, setUserProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/

	/** LIFECYCLES **/
	useEffect(() => {}, [searchFilter]);

	useEffect(() => {
		if (memberId)
			setSearchFilter({ ...initialInput, search: { ...initialInput.search, memberId: memberId as string } });
	}, [memberId]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	if (device === 'mobile') {
		return <div>ReSell Products MOBILE</div>;
	} else {
		return (
			<div id="member-products-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Products</Typography>
					</Stack>
				</Stack>
				<Stack className="products-list-box">
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
						</Stack>
						{userProducts?.length === 0 && (
							<p className={'no-data'}>
								No Product found!
							</p>
						)}
						{userProducts?.map((product: Product) => {
							return <ProductCard product={product} memberPage={true} key={product?._id} />;
						})}

						{userProducts.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										color="primary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} product available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MemberProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			memberId: '',
		},
	},
};

export default MemberProducts;