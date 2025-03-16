import { FormControl } from '@angular/forms';

export interface IProduct {
  product_id: string;
  title: string;
  description: string;
  size: string[];
  category_id: number;
  sub_category: ProductClothesItem | ProductShoesItem;
  isActive: boolean | undefined;
  color: ProductColor;
  cart?: string[];
  quantity: number;
  gender: ProductGender;
  price: number;
  images_path?: string;
  favorite?: boolean;
}

export class Product implements IProduct {
  product_id: string;
  title: string;
  description: string;
  size: string[];
  category_id: number;
  sub_category: ProductClothesItem | ProductShoesItem;
  isActive: boolean | undefined;
  color: ProductColor;
  price: number;
  gender: ProductGender;
  images_path?: string | '';
  count?: string | undefined;
  images_name?: string | undefined;
  quantity!: number;
  cart?: string[] | undefined;
  favorite?: boolean | undefined;

  constructor(product: IProduct) {
    this.product_id = product.product_id;
    this.title = product.title;
    this.description = product.description;
    this.size = product.size;
    this.category_id = product.category_id;
    this.sub_category = product.sub_category;
    this.isActive = product.isActive;
    this.color = product.color;
    this.price = product.price;
    this.gender = product.gender;
    // this.favorite = product.favorite
  }
}
export const ProductCategory = {
  BAGS: 1,
  SHOES: 2,
  CLOTHES: 3,
  ACCESSOARS: 4,
};

export enum ProductClothesItem {
  JACKET = 'JACKET',
  COAT = 'COAT',
  DRESS = 'DRESS',
  SWEATER = 'SWEATER',
  TSHIRT = 'T-SHIRT',
  SKIRT = 'SKIRT',
  JEANS = 'JEANS',
}
export enum ProductShoesItem {
  SNEAKERS = 'SNEAKERS',
  RUNNINGSHOES = 'RUNNING SHOES',
  BOOT = 'BOOT',
  APRESQUES = 'APRESQUES',
  SANDALS = 'SANDALS',
}

export type ProductForm = {
  product_id: FormControl<string | null>;
  title: FormControl<string | null>;
  desc: FormControl<string | null>;
  quantity: FormControl<number | null>;
  size: FormControl<(ProductClothesSize | ProductShoesSize)[] | null>;
  category: FormControl<number | null>;
  sub_category: FormControl<(any | any)[] | null>;
  color: FormControl<ProductColor | null>;
  gender: FormControl<ProductGender | null>;
  price: FormControl<number | null>;
};

export enum ProductColor {
  RED = 'RED',
  GRAY = 'GRAY',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  PURPLE = 'PURPLE',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  BROWN = 'BROWN',
  PINK = 'PINK',
}

export enum ProductShoesSize {
  A = '36',
  B = '37',
  C = '38',
  D = '39',
  E = '40',
  F = '41',
  G = '42',
}

export enum ProductClothesSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XLL = 'XLL',
  XLLL = 'XLLL',
}

export enum ProductGender {
  WOMEN = 'WOMEN',
  MEN = 'MEN',
  KIDS = 'KIDS',
}

export const sizes = {
  1: {}, //bags
  2: Object.values(ProductShoesSize), //shoes
  3: Object.values(ProductClothesSize), // clothes
  4: {}, //accessoars
} as const;
