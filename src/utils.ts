export abstract class Utils {
  static generateUUID(): string {
    return self.crypto.randomUUID().toString();
  }
  static selectFilteredItems<T extends { product_id: string }, P>(
    currentArray: T[],
    newArray: P[]
  ): T[] {
    return currentArray?.filter((item) =>
      newArray?.find((product_id: any) => product_id === item?.product_id)
    );
  }
}

export const STATIC_URLS = {
  ADDCATEGORY: 'http://localhost:3300/category/add',
  ADDSUBCATEGORY: 'http://localhost:3300/sub-category/add',
  GETALLCATEGORIES: 'http://localhost:3300/category/getAll',
  GETALLSUBCATEGORIES: 'http://localhost:3300/sub-category/getAll',
  GETALLSIZES: 'http://localhost:3300/size/getAll',
  GETALLPRODUCTSADMIN: 'http://localhost:3300/admin/products/',
  GETALLUSERSADMIN: 'http://localhost:3300/admin',
  ADDPRODUCT: 'http://localhost:3300/add-product',
  GETALLPRODUCTS: 'http://localhost:3300/getAll',
  DELETEORUPDATEPRODUCT: 'http://localhost:3300/admin/products',
  UPDATEAVATAR: 'http://localhost:3300/avatars',
  DELETEORUPDATEUSER: `http://localhost:3300/admin/users`,
};
