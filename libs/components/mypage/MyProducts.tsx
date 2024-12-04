import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/product/product';
import { UserProductsInquiry } from '../../types/product/product.input';
import { T } from '../../types/common';
import { ProductStatus } from '../../enums/product.enum';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { UPDATE_PRODUCT } from '../../../apollo/user/mutation';
import { GET_USER_PRODUCTS } from '../../../apollo/user/query';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';

const MyProducts: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<UserProductsInquiry>(initialInput);
	const [userProducts, setUserProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateProduct] = useMutation(UPDATE_PRODUCT);
	const {
		loading: getUserProductsLoading,
		data: getUserProductsData,
		error:getUserProductsError,
		refetch:getUserProductsRefetch
	} = useQuery(GET_USER_PRODUCTS,{
		fetchPolicy: 'network-only',
		variables: {input: searchFilter},
		notifyOnNetworkStatusChange:true,
		onCompleted: (data:T) => {
			setUserProducts(data?.getUserProducts?.list);
			setTotal(data?.getUserProducts?.metaCounter[0]?.total ?? 0);
		}
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: ProductStatus) => {
		setSearchFilter({ ...searchFilter, search: { productStatus: value } });
	};

	const deleteProductHandler = async (id: string) => {
		try{
			if(await sweetConfirmAlert(`Are you sure to delete?`)){
				await updateProduct({
					variables:{
						input: {
							_id:id,
							productStatus:'DELETE',
						},
					},
				});
				await getUserProductsRefetch({input:searchFilter});
			}
		}catch(err:any){
			await sweetErrorHandling(err);
		};
	};

	const updateProductHandler = async (status: string, id: string) => {
		try{
			await updateProduct({
				variables:{
					input: {
						_id:id,
						productStatus:status,
					},
				},
			});
			await getUserProductsRefetch({input: searchFilter});
		}catch(err:any){
			await sweetErrorHandling(err);
		}
	};

	if (user?.memberType !== 'USER') {
		router.back();
	}

	if (device === 'mobile') {
		return <div>RESELL PRODUCTS MOBILE</div>;
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
							<Typography className="title-text">Listing Title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							<Typography className="title-text">Action</Typography>
						</Stack>

						{userProducts?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Product found!</p>
							</div>
						) : (
							userProducts.map((product: Product) => {
								return (
									<ProductCard
										product={product}
										deleteProductHandler={deleteProductHandler}
										updateProductHandler={updateProductHandler}
									/>
								);
							})
						)}

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
