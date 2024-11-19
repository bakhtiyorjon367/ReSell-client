import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import { Product } from '../../types/product/product';
import { T } from '../../types/common';
import ProductCard from '../product/ProductCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FAVORITES } from '../../../apollo/user/query';
import { Messages } from '../../config';
import { sweetErrorAlert } from '../../sweetAlert';
import { LIKE_TARGET_PRODUCT } from '../../../apollo/user/mutation';

const MyFavorites: NextPage = () => {
	const device = useDeviceDetect();
	const [myFavorites, setMyFavorites] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchFavorites, setSearchFavorites] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
	const {
		loading: getFavoritesLoading,
		data: getFavoritesData,
		error: getFavoritesError,
		refetch: getFavoritesRefetch
	} = useQuery(GET_FAVORITES,{
		fetchPolicy: 'network-only',
		variables: { input: searchFavorites },
		notifyOnNetworkStatusChange:true,
		onCompleted(data:T)  {
			setMyFavorites(data.getFavorites?.list);
			setTotal(data.getFavorites.metaCounter?.[0]?.total || 0);
		}
	});
	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFavorites({ ...searchFavorites, page: value });
	};

	const likeProductHandler = async(user: any, id:string) => {
		try{
			if(!id) return;
			if(!user._id) throw new Error(Messages.error2);

			await likeTargetProduct({
				variables:{input:id}
			});
			await getFavoritesRefetch({input:searchFavorites});
		}catch(err:any){
			console.log('ERROR likeProductHandler', err.message);
			await sweetErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <div>RESELL MY FAVORITES MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Favorites</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{myFavorites?.length ? (
						myFavorites?.map((product: Product) => {
							return <ProductCard product={product} myFavorites={true} likeProductHandler={likeProductHandler}/>;
						})
					) : (
						<p className={'no-data'}>No Favorites found!</p>
					)}
				</Stack>
				{myFavorites?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFavorites.limit)}
								page={searchFavorites.page}
								shape="circular"
								color="primary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>
								Total {total} favorite propert{total > 1 ? 'ies' : 'y'}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default MyFavorites;
