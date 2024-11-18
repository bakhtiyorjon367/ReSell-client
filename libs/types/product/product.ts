import { ProductCategory, ProductLocation, ProductStatus } from '../../enums/product.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Product {
	_id: string;
	productCategory:ProductCategory;
	productStatus: ProductStatus;
	productLocation:ProductLocation;
	dealAddress:string;
	productTitle:string;
	productPrice:number;
	productViews: number;
	productLikes: number;
	productComments: number;
	productRank: number;
	productImages: string[];
	productDesc?: string;
	productBarter?: boolean;
	productSharing?:boolean
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	manufacturedAt?:Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Products {
	list: Product[];
	metaCounter: TotalCounter[];
}
