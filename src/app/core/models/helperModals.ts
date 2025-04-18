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
  rank: string,
  firstName: string,
  lastName: string,
  armyNumber: string,
  company: string,
}

export interface Log {
  id: number,
  detail: string,
  updatedAt: string,
}

export interface GlobalSearchResult {
  id: number,
  name: string,
  type: 'UNIT' | 'COMPANY' | 'PRODUCT' | 'SUBPRODUCT',
  productName: string | null,
  companyName: string | null,
  unitName: string,
  quantity: number | null,
  barcode: string | null,
  unitId: number,
  companyId: number | null,
  productId: number | null,
}
