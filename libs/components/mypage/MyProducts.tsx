import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ProductCard } from './ProductCard';
import { useReactiveVar } from '@apollo/client';
import { Product } from '../../types/product/product';
import { UserProductsInquiry } from '../../types/product/product.input';
import { T } from '../../types/common';
import { ProductStatus } from '../../enums/product.enum';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';

const MyProducts: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<UserProductsInquiry>(initialInput);
	const [UserProducts, setUserProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: ProductStatus) => {
		setSearchFilter({ ...searchFilter, search: { productStatus: value } });
	};

	const deleteProductHandler = async (id: string) => {};

	const updateProductHandler = async (status: string, id: string) => {};

	if (user?.memberType !== 'USER') {
		router.back();
	}

	if (device === 'mobile') {
		return <div>RESELL Products MOBILE</div>;
	} else {
		return (
			<div id="my-product-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Products</Typography>
					</Stack>
				</Stack>
				<Stack className="product-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(ProductStatus.ACTIVE)}
							className={searchFilter.search.productStatus === 'ACTIVE' ? 'active-tab-name' : 'tab-name'}
						>
							Sale
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(ProductStatus.RESERVED)}
							className={searchFilter.search.productStatus === 'RESERVED' ? 'active-tab-name' : 'tab-name'}
						>
							Reserved
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(ProductStatus.SOLD)}
							className={searchFilter.search.productStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
						>
							Sold
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							<Typography className="title-text">Action</Typography>
						</Stack>

						{UserProducts?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Product found!</p>
							</div>
						) : (
							UserProducts.map((product: Product) => {
								return (
									<ProductCard
										product={product}
										deleteProductHandler={deleteProductHandler}
										updateProductHandler={updateProductHandler}
									/>
								);
							})
						)}

						{UserProducts.length !== 0 && (
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

MyProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			productStatus: 'ACTIVE',
		},
	},
};

export default MyProducts;
