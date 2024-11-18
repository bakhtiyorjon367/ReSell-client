import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Product } from "../../types/product/product";
import { REACT_APP_API_URL } from "../../config";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { useRouter } from "next/router";

interface PopularProduxtsProps {
	product: Product;
    likeProductHandler:any;
};

const PopularProductsCard = (props:PopularProduxtsProps) =>{
    const { product, likeProductHandler } = props;
    const user = useReactiveVar(userVar);
    const router = useRouter();

	/** HANDLERS **/
	const pushDetailHandler = async (productId:string) => {
		await router.push({pathname:'/product/detail', query:{id:productId}});
	};
    return (
        <Stack className="top-card-box" style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})` }}
        onClick={() => {pushDetailHandler(product._id)}}
        >
            
            <Box className={"info"}>
                    <div className="view-like-box">
                        <div>
                            <IconButton color={"default"}>
                            <RemoveRedEyeIcon/>
                            </IconButton>
                            <Typography className="view-cnt">{product?.productViews}</Typography>
                        </div>
                        <div>
                            <IconButton color={'default'} onClick={(e) => {e.stopPropagation(); likeProductHandler(user, product?._id)}} >
								{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
                            </IconButton>
                            <Typography className="view-cnt">{product?.productLikes}</Typography>
                        </div>
                    </div>
            </Box>
        </Stack>
    );
};
export default PopularProductsCard; 