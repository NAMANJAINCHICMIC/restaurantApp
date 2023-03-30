export interface Cart {

    items: ItemDetails;
    totalAmt: number;
}

export interface ItemDetails {
  [id: string]: {
    quantity: number;
    itemId: string;
    category: string;
    name: string;
    price: string;
    imageUrl: string;
    timeToPrepare: string;
  };
}
