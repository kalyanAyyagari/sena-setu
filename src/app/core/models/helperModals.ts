export interface Unit {
  name: string,
  description: string,
  id: string,
  companyList: Company[],
}

export interface Company {
  name: string,
  description: string,
  id: string,
}

export interface Product {
  name: string,
  description: string,
  id: string,
}

export interface Subproduct {
  name: string,
  quantity: number,
  id: string,
  barcode: string,
}

export interface User {
  id: number,
  name: string,
  role: 'ADMIN' | 'USER',
  post: string
}
