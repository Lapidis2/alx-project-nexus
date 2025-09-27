
export interface Product {
	id: number; 
	name: string;
	price: number;
	img: string;
	quantity: number;
  }
  




  export interface CartItem {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	addedAt: string;
	img?: string;
  }
  
  export interface Cart {
	userId: string;
	items: CartItem[];
	updatedAt?: Date;
  }
  
  