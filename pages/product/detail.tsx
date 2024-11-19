import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import { NextPage } from 'next';
import Review from '../../libs/components/product/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import ProductBigCard from '../../libs/components/common/ProductBigCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Product } from '../../libs/types/product/product';
import moment from 'moment';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CREATE_COMMENT, LIKE_TARGET_PRODUCT } from '../../apollo/user/mutation';
import { GET_COMMENTS, GET_PRODUCT, GET_PRODUCTS } from '../../apollo/user/query';
import { Direction, Message } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import 'swiper/css';
import 'swiper/css/pagination';

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const ProductDetail: NextPage = ({ initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [productId, setProductId] = useState<string | null>(null);
	const [product, setProduct] = useState<Product | null>(null);
	const [slideImage, setSlideImage] = useState<string>('');
	const [memberProducts, setMemberProducts] = useState<Product[]>([]);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [productComments, setProductComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);

	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.PRODUCT,
		commentContent: '',
		commentRefId: '',
	});

	/** APOLLO REQUESTS **/
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
	const [createComment] = useMutation(CREATE_COMMENT);
	const { 
		loading:getProductLoading,
		data:getProductData, 
		error:getProductError, 
		refetch:getProductRefetch
	} = useQuery(GET_PRODUCT, {
		fetchPolicy:"network-only",
		variables:{ input: productId},
		skip:!productId,
		notifyOnNetworkStatusChange:true,
		onCompleted:(data:T) => {
			if(data?.getProduct) setProduct(data?.getProduct);
			if(data?.getProduct) setSlideImage(data?.getProduct?.productImages[0]);
		},	
	});
	const memberId = product?.memberData?._id
	const { 
		loading:getProductsLoading,
		data:getProductsData, 
		error:getProductsError, 
		refetch:getProductsRefetch
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy:"cache-and-network",
		variables:{
		 input:{
			page:1,
			limit:4,
			sort:"createdAt",
			direction:Direction.DESC,
			search:{
				memberId:memberId
			}
		}},
		skip:!productId && !product,
		notifyOnNetworkStatusChange:true,
		onCompleted:(data:T) => {
			if(data?.getProducts?.list) setMemberProducts(data?.getProducts?.list);
		},
	});

	const { 
		loading:getCommentsLoading,
		data:getCommentsData, 
		error:getCommentsError, 
		refetch:getCommentsRefetch
	} = useQuery(GET_COMMENTS, {
		fetchPolicy:"cache-and-network",
		variables:{input:initialComment},
		skip:!commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange:true,
		onCompleted:(data:T) => {
			if(data?.getComments?.list) setProductComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		},
	});


	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.id) {
			setProductId(router.query.id as string);
			setCommentInquiry({
				...commentInquiry,
				search: {
					commentRefId: router.query.id as string,
				},
			});
			setInsertCommentData({
				...insertCommentData,
				commentRefId: router.query.id as string,
			});
		}
	}, [router]);

	useEffect(() => {
		if(commentInquiry.search.commentRefId){
			getCommentsRefetch({input:commentInquiry});
		}
	}, [commentInquiry]);

	/** HANDLERS **/
	const likeProductHandler = async(user:T, id:string) => {
		try{
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetProduct({
				variables:{input: id}
			});
			await getProductsRefetch({
				variables:{input: id}
			});
			
			await getProductRefetch({
				variables:{input: product?._id}
			});

		}catch(err:any){
			console.log("ERROR, likeTargetProductHandler", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
		try{
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await  createComment({variables:{input:insertCommentData}});

			setInsertCommentData({...insertCommentData, commentContent: ''});

			await getCommentsRefetch({input:commentInquiry});
		}catch(err:any){
			await sweetErrorHandling(err);
		}
	}

	if(getProductLoading){
		return (
			<Stack sx={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'1080px'}}>
				<CircularProgress size={'4rem'}/>
			</Stack>
		);
	}


	if (device === 'mobile') {
		return <div>Product DETAIL PAGE</div>;
	} else {
		return (
			<div id={'product-detail-page'}>
				<div className={'container'}>
					<Stack className={'product-detail-config'}>
						<Stack className={'product-info-config'}>
							<Stack className={'info'}>
								<Stack className={'left-box'}>
									<Typography className={'title-main'}>{product?.productTitle}</Typography>
									<Stack className={'top-box'}>
										<Typography className={'city'}>{product?.productLocation}</Typography>
										<Stack className={'divider'}></Stack>
										<Typography className={'date'}>{moment().diff(product?.createdAt, 'days')} days ago</Typography>
									</Stack>
								</Stack>
								<Stack className={'right-box'}>
									{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color='primary' fontSize={'medium'} />
									) : (
										<FavoriteBorderIcon
											color='secondary'
											fontSize={'medium'}
											// @ts-ignore
											onClick={() => likeProductHandler(user, product?._id)}
										/>
									)}
								</Stack>
							</Stack>
							<Stack className={'images'}>
								<Stack className={'main-image'}>
									<img
										src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/product/defaultDetailImage.webp'}
										alt={'main-image'}
									/>
								</Stack>
								<Stack className={'image-info'}>
										<Link href={`/member?memberId=${product?.memberData?._id}`}>
											<img
												className={'member-image'}
												src={
													product?.memberData?.memberImage
														? `${REACT_APP_API_URL}/${product?.memberData?.memberImage}`
														: '/img/profile/defaultUser.svg'
												}
											/>
										</Link>
										<Stack className={'name-phone-listings'}>
											<Link href={`/member?memberId=${product?.memberData?._id}`}>
												<Typography className={'name'}>{product?.memberData?.memberNick}</Typography>
											</Link>
											<Stack className={'phone-number'}>
												<Typography className={'number'}>{product?.memberData?.memberPhone}</Typography>
											</Stack>
										</Stack>
								</Stack>
							</Stack>
							<div className='divider'></div>
						</Stack>
						<Stack className={'product-desc-config'}>
							<Stack className={'left-config'}>
								<Stack className={'prop-desc-config'}>
									<Stack className={'top'}>
										<Typography className={'title'}>Product Description</Typography>
										<Typography className={'desc'}>{product?.productTitle ?? ''}</Typography>
										<Typography className={'desc'}>{product?.productDesc ?? 'No Description!'}</Typography>
										<Typography className={'category'}>{product?.productCategory}</Typography>
										{product?.productSharing ? 
											<p className='share' style={{color:'green', marginTop:'5px', fontSize:'20px'}}>Sharing</p> 
										: 
											<p className='price'>{product?.productPrice},000</p>
										} 
										<Stack className={'statistics'}>
											<Stack className="buttons">
												<Stack className="button-box">
													<div>Viewed</div>
													<Typography>{product?.productViews}</Typography>
												</Stack>
												<Stack className="button-box">
													<div>Liked</div>
													<Typography>{product?.productLikes}</Typography>
												</Stack>
											</Stack>
										</Stack>
									</Stack>
									<div className='divider'></div>
								</Stack>
								<Stack className={'address-config'}>
									<Box className={'dealing'}>
										<Typography className={'title'}>Dealing address</Typography>
										<Typography className={'title'}>{product?.dealAddress ? product?.dealAddress : 'Dealing address'}</Typography>
									</Box>
									<Stack className={'map-box'}>
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25867.098915951767!2d128.68632810247993!3d35.86402299180927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bba427bf179%3A0x1fc02da732b9072f!2sGeumhogangbyeon-ro%2C%20Dong-gu%2C%20Daegu!5e0!3m2!1suz!2skr!4v1695537640704!5m2!1suz!2skr"
											width="100%"
											height="100%"
											style={{ border: 0 }}
											allowFullScreen={true}
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										></iframe>
									</Stack>
								</Stack>
								{commentTotal !== 0 && (
									<Stack className={'reviews-config'}>
										<Stack className={'filter-box'}>
											<Stack className={'review-cnt'}>
												<Typography className={'reviews'}>{commentTotal} Comments</Typography>
											</Stack>
										</Stack>
										<Stack className={'review-list'}>
											{productComments?.map((comment: Comment) => {
												return <Review comment={comment} key={comment?._id} />;
											})}
											<Box component={'div'} className={'pagination-box'}>
												<MuiPagination
													page={commentInquiry.page}
													count={Math.ceil(commentTotal / commentInquiry.limit)}
													onChange={commentPaginationChangeHandler}
													shape="circular"
													color="primary"
												/>
											</Box>
										</Stack>
									</Stack>
								)}
								<Stack className={'leave-review-config'}>
									<textarea
										onChange={({ target: { value } }: any) => {
											setInsertCommentData({ ...insertCommentData, commentContent: value });
										}}
										value={insertCommentData.commentContent}
									></textarea>
									<Box className={'submit-btn'} component={'div'}>
										<Button
											className={'submit-review'}
											disabled={insertCommentData.commentContent === '' || user?._id === ''}
											onClick={createCommentHandler}
										>
											<Typography className={'title'}>Comment</Typography>
										</Button>
									</Box>
								</Stack>
							</Stack>
						</Stack>
						{memberProducts.length !== 0 && (
							<Stack className={'similar-products-config'}>
								<Stack className={'title-pagination-box'}>
									<Stack className={'title-box'}>
										<Typography className={'main-title'}>Other products from {product?.memberData?.memberNick}</Typography>
									</Stack>
									<Stack className={'pagination-box'}>
										<WestIcon className={'swiper-similar-prev'} />
										<div className={'swiper-similar-pagination'}></div>
										<EastIcon className={'swiper-similar-next'} />
									</Stack>
								</Stack>
								<Stack className={'cards-box'}>
									<Swiper
										className={'similar-homes-swiper'}
										slidesPerView={'auto'}
										spaceBetween={35}
										modules={[Autoplay, Navigation, Pagination]}
										navigation={{
											nextEl: '.swiper-similar-next',
											prevEl: '.swiper-similar-prev',
										}}
										pagination={{
											el: '.swiper-similar-pagination',
										}}
									>
										{memberProducts.map((product: Product) => {
											return (
												<SwiperSlide className={'similar-homes-slide'} key={product.productTitle}>
													<ProductBigCard product={product} key={product?._id} likeProductHandler={likeProductHandler}/>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</Stack>
							</Stack>
						)}
					</Stack>
				</div>
			</div>
		);
	}
};

ProductDetail.defaultProps = {
	initialComment: {
		page: 1,
		limit: 3,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutFull(ProductDetail);
