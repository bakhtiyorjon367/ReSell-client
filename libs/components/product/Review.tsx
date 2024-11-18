import React from 'react';
import { Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Comment } from '../../types/comment/comment';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface ReviewProps {
	comment: Comment;
}

const Review = (props: ReviewProps) => {
	const { comment } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [value, setValue] = React.useState<number | null>(2);
	const imagePath: string = comment?.memberData?.memberImage
		? `${REACT_APP_API_URL}/${comment?.memberData?.memberImage}`
		: '/img/profile/defaultUser.svg';

		const formatTimeAgo = (date: string | Date): string => {
			const now = new Date();
			const commentDate = typeof date === 'string' ? new Date(date) : date; // Ensure commentDate is a Date object
		
			const seconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000); // Difference in seconds
			const minutes = Math.floor(seconds / 60); 
			const hours = Math.floor(minutes / 60); 
			const days = Math.floor(hours / 24); 
		
			if (seconds < 60) {
				return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
			} else if (minutes < 60) {
				return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
			} else if (hours < 24) {
				return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
			} else {
				return `${days} day${days !== 1 ? 's' : ''} ago`;
			}
		};
	/** HANDLERS **/
	const goMemberPage = (id: string) => {
		if (id === user?._id) router.push('/mypage');
		else router.push(`/member?memberId=${id}`);
	};
	if (device === 'mobile') {
		return <div>REVIEW</div>;
	} else {
		return (
			<Stack className={'review-config'}>
				<Stack className={'review-mb-info'}>
					<Stack className={'img-name-box'}>
						<img src={imagePath} alt="" className={'img-box'} />
						<Stack>
							<Typography className={'name'} onClick={() => goMemberPage(comment?.memberData?._id as string)}>
								{comment.memberData?.memberNick}
							</Typography>
							<Typography className={'date'}>
								{formatTimeAgo(comment.createdAt)}
							</Typography>
							<Typography className={'description'}>{comment.commentContent}</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Review;
