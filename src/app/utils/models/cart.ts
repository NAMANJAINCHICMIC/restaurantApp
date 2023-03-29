export interface Cart {
    items: {
        addedOn: string;
        quantity: number;
        itemId: string;
        category: string;
        name: string;
        price: string;
        imageUrl: string
      };
    totalAmt: number;
}