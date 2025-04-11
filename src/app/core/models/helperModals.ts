export interface Unit{
  name: string,
  description: string,
  id: string,
  companyList: Company[],
}

export interface Company{
  name: string,
  description: string,
  id: string,
  productList: Product[],
}

export interface Product{
  name: string,
  description: string,
  id: string,
  subproductList: Subproduct[],
}

export interface Subproduct{
  name: string,
  description: string,
  id: string,
  barcode: string,
}
