
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