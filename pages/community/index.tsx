import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab, Typography, Button, Pagination } from '@mui/material';
import CommunityCard from '../../libs/components/common/CommunityCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { BoardArticle } from '../../libs/types/board-article/board-article';
import { T } from '../../libs/types/common';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BoardArticlesInquiry } from '../../libs/types/board-article/board-article.input';
import { BoardArticleCategory } from '../../libs/enums/board-article.enum';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../apollo/user/mutation';
import { GET_BOARD_ARTICLES } from '../../apollo/user/query';
import { Messages } from '../../libs/config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { userVar } from '../../apollo/store';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Community: NextPage = ({ initialInput, ...props }: T) => {
	const user = useReactiveVar(userVar);
	const device = useDeviceDetect();
	const router = useRouter();
	const { query } = router;
	const articleCategory = query?.articleCategory as string;
	const [searchCommunity, setSearchCommunity] = useState<BoardArticlesInquiry>(initialInput);
	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	if (articleCategory) initialInput.search.articleCategory = articleCategory;

	/** APOLLO REQUESTS **/
	const [likeTargetArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

	const {
		loading: boardArticlesLoading,
		data: boardArticlesData,
		error:boardArticlesError,
		refetch:boardArticlesRefetch
	}= useQuery
		(GET_BOARD_ARTICLES, {
			fetchPolicy:'cache-and-network',
			variables: {
				input: searchCommunity,
			},
			notifyOnNetworkStatusChange:true,
			onCompleted:(data:T) => {
				setBoardArticles(data?.getBoardArticles?.list);
				setTotalCount(data?.getBoardArticles?.metaCounter[0].total);
			},
		});

	/** LIFECYCLES **/
	useEffect(() => {
		if (!query?.articleCategory)
			router.push(
				{
					pathname: router.pathname,
					query: { articleCategory: 'FREE' },
				},
				router.pathname,
				{ shallow: true },
			);
	}, []);

	/** HANDLERS **/
	const tabChangeHandler = async (e: T, value: string) => {
		console.log(value);

		setSearchCommunity({ ...searchCommunity, page: 1, search: { articleCategory: value as BoardArticleCategory } });
		await router.push(
			{
				pathname: '/community',
				query: { articleCategory: value },
			},
			router.pathname,
			{ shallow: true },
		);
	};

	const paginationHandler = (e: T, value: number) => {
		setSearchCommunity({ ...searchCommunity, page: value });
	};

	const likeArticleHandler = async(e:any, user:any, id:string) => {
		try{
			e.stopPropagation();
			if(!id) return;
			if(!user._id) throw new Error(Messages.error2);

			await likeTargetArticle({
				variables:{
					input:id,
				},
			});
			await boardArticlesRefetch({input:searchCommunity});
			await sweetTopSmallSuccessAlert('success', 800);
		}catch(err:any){
			console.error('ERROR: likeArticleHandler',err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <h1>COMMUNITY PAGE MOBILE</h1>;
	} else {
		return (
			<div id="community-list-page">
				<div className="container">
					<TabContext value={searchCommunity.search.articleCategory}>
						<Stack className="main-box">
							<Stack className="right-config">
								<Stack className="panel-config">
									<Stack className="title-box">
										<Stack className="left">
											<Stack className="left-config">
												<TabList
													orientation="horizontal"
													aria-label="lab API tabs example"
													TabIndicatorProps={{
														style: { display: 'none' },
													}}
													onChange={tabChangeHandler}
												>
													<Tab
														value={'FREE'}
														label={'Free Board'}
														className={`tab-button ${searchCommunity.search.articleCategory == 'FREE' ? 'active' : ''}`}
													/>
													<Tab
														value={'RECOMMEND'}
														label={'Recommendation'}
														className={`tab-button ${searchCommunity.search.articleCategory == 'RECOMMEND' ? 'active' : ''}`}
													/>
													<Tab
														value={'HOBBY'}
														label={'Hobby'}
														className={`tab-button ${searchCommunity.search.articleCategory == 'HOBBY' ? 'active' : ''}`}
													/>
													<Tab
														value={'QUESTION'}
														label={'Question'}
														className={`tab-button ${searchCommunity.search.articleCategory == 'QUESTION' ? 'active' : ''}`}
													/>
												</TabList>
											{user._id && 	
												<Button
													onClick={() =>
														router.push({
															pathname: '/mypage',
															query: {
																category: 'writeArticle',
															},
														})
													}
													className="right"
												>
													Write
												</Button>
											}
											</Stack>
										</Stack>
									</Stack>

									<TabPanel value="FREE">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((boardArticle: BoardArticle) => {
													return <CommunityCard boardArticle={boardArticle} key={boardArticle?._id} likeArticleHandler={likeArticleHandler}/>;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>No Article found!</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="RECOMMEND">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((boardArticle: BoardArticle) => {
													return <CommunityCard boardArticle={boardArticle} key={boardArticle?._id} likeArticleHandler={likeArticleHandler}/>;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>No Article found!</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="NEWS">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((boardArticle: BoardArticle) => {
													return <CommunityCard boardArticle={boardArticle} key={boardArticle?._id} likeArticleHandler={likeArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>No Article found!</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="HOBBY">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((boardArticle: BoardArticle) => {
													return <CommunityCard boardArticle={boardArticle} key={boardArticle?._id} likeArticleHandler={likeArticleHandler}/>;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>No Article found!</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="QUESTION">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((boardArticle: BoardArticle) => {
													return <CommunityCard boardArticle={boardArticle} key={boardArticle?._id} likeArticleHandler={likeArticleHandler}/>;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>No Article found!</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
								</Stack>
							</Stack>
						</Stack>
					</TabContext>

					{totalCount > 0 && (
						<Stack className="pagination-config">
							<Stack className="pagination-box">
								<Pagination
									count={Math.ceil(totalCount / searchCommunity.limit)}
									page={searchCommunity.page}
									shape="circular"
									color="primary"
									onChange={paginationHandler}
								/>
							</Stack>
							<Stack className="total-result">
								<Typography>
									Total {totalCount} article{totalCount > 1 ? 's' : ''} available
								</Typography>
							</Stack>
						</Stack>
					)}
				</div>
			</div>
		);
	}
};

Community.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			articleCategory: 'FREE',
		},
	},
};

export default withLayoutFull(Community);
