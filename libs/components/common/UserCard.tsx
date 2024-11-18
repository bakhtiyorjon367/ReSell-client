import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface UserCardProps {
	user: any;
}

const UserCard = (props: UserCardProps) => {
	const { user } = props;
	const device = useDeviceDetect();
	const member = useReactiveVar(userVar);
	const imagePath: string = user?.memberImage
		? `${REACT_APP_API_URL}/${user?.memberImage}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>USER CARD</div>;
	} else {
		return (
			<Stack className="user-general-card">
				<Link
					href={{
						pathname: '/user/detail',
						query: { userId: user?._id },
					}}
				>
					<Box
						component={'div'}
						className={'user-img'}
						style={{
							backgroundImage: `url(${imagePath})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
					>
						<div>{user?.memberProducts} products</div>
					</Box>
				</Link>

				<Stack className={'user-desc'}>
					<Box component={'div'} className={'user-info'}>
						<Link
							href={{
								pathname: '/user/detail',
								query: { userId: 'id' },
							}}
						>
							<strong>{user?.memberNick ?? 'Unknown'}</strong>
						</Link>
						<span>user</span>
					</Box>
					<Box component={'div'} className={'buttons'}>
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{user?.memberViews}</Typography>
						<IconButton color={'default'}>
							{user?.meLiked && user?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon color={'primary'} />
							) : (
								<FavoriteBorderIcon />
							)}
						</IconButton>
						<Typography className="view-cnt">{user?.memberLikes}</Typography>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default UserCard;
