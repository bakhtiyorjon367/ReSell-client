import React from 'react';
import { Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../../types/product/product';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';

interface ProductCardType {
	product: Product;
	likeProductHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const ProductCard = (props: ProductCardType) =>{
    const { product, likeProductHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = product?.productImages[0]
		? `${REACT_APP_API_URL}/${product?.productImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>Product CARD</div>;
	} else {
		return (
        <Stack className="card-config">
            <Stack className="top">
                <Link 
                    href= {{
                        pathname: "/product/detail",
                        query: { id: product?._id },
                    }}
                >
                    <img src={imagePath} alt="" />
                </Link>
            </Stack>
            <Stack className="bottom">
                <Stack className="name-address">
                    <Stack className="name">
                        <Link  
                          href={{
                            pathname: "/product/detail",
                            query: { id: product?._id },
                          }}
                        > <Typography>{product.productTitle ?? "No title"}</Typography>
                        </Link>
                    </Stack>
                    <Stack className="address">
                        <Typography>
							{product.dealAddress}, {product.dealAddress}
						</Typography>
                    </Stack>
                </Stack>
                <Stack className="type-buttons">
                    <Stack className="type">
						  <div>
								{product.productSharing ? 
									<p className='share'>Sharing</p> 
								: 
									<p className='price'>{product.productPrice},000</p>
								} 
						  </div>
                    </Stack>
                    {!recentlyVisited && (
							<Stack className="buttons">
								<Typography className="view-cnt">Views { product?.productViews}</Typography>
								<IconButton color={'success'} onClick={() => likeProductHandler(user, product?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : product?.meLiked && product?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{product?.productLikes}</Typography>
							</Stack>
						)}
                </Stack>
            </Stack>
        </Stack>
        
        );
    }
};
export default ProductCard; 