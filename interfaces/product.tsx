
export interface ProductFormData {
	name: string;
	price: number;  
	category?: string;
	description?: string;
	quantity?: number;
	expiration?: string;
	images: string[];
  }
  
  export interface product extends ProductFormData {
	id: string;           
   
  }


  export interface AdminProductDetails {
	id: string;
	name: string;
	price: number;
	image?: string;          
	description?: string;
	quantity?: number;
	category?: string;
	expiration?: string;
	images?: string[];
  }

  export interface ApiResponse<T> {
	message: string;
	product?: T;
	products?: T[];
	id?: string;
  }
  