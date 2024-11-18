import { ProductCategory, ProductLocation, ProductStatus} from '../../enums/product.enum';
import { Direction } from '../../enums/common.enum';

export interface ProductInput {
	productCategory:ProductCategory
	productLocation:ProductLocation;
	dealAddress:string
	productTitle:string
	productPrice:number
	productImages: string[];
	productDesc?: string;
	productBarter?: boolean;
	productSharing?:boolean
	memberId?: string;
	manufacturedAt?:Date;
}

interface PISearch {
	memberId?: string;
	locationList?: ProductLocation[];
	typeList?: ProductCategory[];
	options?: string[];
	pricesRange?: Range;
	text?: string;
}

export interface ProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	productStatus?: ProductStatus;
}

export interface UserProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	productStatus?: ProductStatus;
	productLocationList?: ProductLocation[];
}

export interface AllProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}
