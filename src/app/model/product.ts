export class Product {
  constructor(initData?: Partial<Product>) {
    Object.assign(this, initData);
  }

  id!: number;

  name!: string;

  authors!: string[];

  company!: string;

  isSale!: boolean;

  imgUrl!: string;

  price!: number;
}
