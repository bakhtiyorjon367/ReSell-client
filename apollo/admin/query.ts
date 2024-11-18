import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
	
query GetAllMembersByAdmin ($input: MembersInquiry!){
    getAllMembersByAdmin(input: $input) {
        list {
            _id
            memberType
            memberStatus
            memberAuthType
            memberPhone
            memberNick
            memberImage
            memberAddress
            memberProduct
            memberPurchase
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
            memberWarnings
            memberBlocks
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
        metaCounter {
            total
        }
    }
}

`;

/**************************
 *        PRODUCTS        *
 *************************/

export const GET_ALL_PRODUCTS_BY_ADMIN = gql`
query GetAllProductsByAdmin($input: AllProductsInquiry!) {
    getAllProductsByAdmin(input: $input) {
        list {
            _id
            productCategory
            productStatus
            productLocation
            dealAddress
            productTitle
            productPrice
            productViews
            productLikes
            productImages
            productDesc
            productBarter
            productSharing
            memberId
            soldAt
            deletedAt
            manufacturedAt
            createdAt
            updatedAt
            memberData {
                _id
                memberType
                memberStatus
                memberAuthType
                memberPhone
                memberNick
                memberImage
                memberAddress
                memberProduct
                memberPurchase
                memberArticles
                memberFollowers
                memberFollowings
                memberPoints
                memberLikes
                memberViews
                memberComments
                memberRank
                memberWarnings
                memberBlocks
                deletedAt
                createdAt
                updatedAt
                accessToken
            }
        }
        metaCounter {
            total
        }
    }
}

`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_ALL_BOARD_ARTICLES_BY_ADMIN = gql`
	query GetAllBoardArticlesByAdmin($input: AllBoardArticlesInquiry!) {
		getAllBoardArticlesByAdmin(input: $input) {
			list {
				_id
				articleCategory
				articleStatus
				articleTitle
				articleContent
				articleImage
				articleViews
				articleLikes
				articleComments
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberImage
					memberAddress
					memberProduct
					memberPurchase
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}

`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberImage
					memberAddress
					memberProduct
					memberPurchase
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}

`;
