import { ProductCategory, ProductLocation, ProductStatus} from '../../enums/product.enum';

export interface ProductUpdate {
	_id: string;
	productCategory:ProductCategory;
	productStatus: ProductStatus;
	productLocation:ProductLocation;
	dealAddress:string;
	productTitle:string;
	productPrice:number;
	productDesc?: string;
	productBarter?: boolean;
	productSharing?:boolean
	soldAt?: Date;
	deletedAt?: Date;
	manufacturedAt?:Date;
}
