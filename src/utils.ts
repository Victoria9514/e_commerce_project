export abstract class Utils {
  public static generateUUID(): string {
    return self.crypto.randomUUID().toString();
  }
}

export const STATIC_URLS = {
  ADDCATEGORY: 'http://localhost:3300/category/add',
  ADDSUBCATEGORY: 'http://localhost:3300/sub-category/add',
  GETALLCATEGORIES: 'http://localhost:3300/category/getAll',
  GETALLSUBCATEGORIES: 'http://localhost:3300/sub-category/getAll',
  GETALLPRODUCTSADMIN: 'http://localhost:3300/admin/products/',
  GETALLUSERSADMIN: 'http://localhost:3300/admin',
  ADDPRODUCT: 'http://localhost:3300/add-product',
  GETALLPRODUCTS: 'http://localhost:3300/getAll',
  DELETEORUPDATEPRODUCT: 'http://localhost:3300/admin/products',
  UPDATEAVATAR: 'http://localhost:3300/avatars',
  DELETEORUPDATEUSER:  `http://localhost:3300/admin/users`
};
