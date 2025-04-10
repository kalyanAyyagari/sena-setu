import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Unit } from '../models/helperModals';
// import { User } from '../models/user.model';
// import { Unit } from '../models/unit.model';
// import { Company } from '../models/company.model';
// import { Product } from '../models/product.model';
// import { Subproduct } from '../models/subproduct.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Authentication endpoints
  // signup(userData: Partial<User>): Observable<{token: string, user: User}> {
  //   return this.http.post<{token: string, user: User}>(`${this.apiUrl}/signup`, userData);
  // }

  signup(credentials: { email: string, password: string }): Observable<any> {
    // Replace '/api/auth/login' with your actual login endpoint.
    return this.http.post<any>(`${this.apiUrl}/signup`, credentials);
  }
  // login(credentials: {email: string, password: string}): Observable<{token: string, user: User}> {
  //   return this.http.post<{token: string, user: User}>(`${this.apiUrl}/login`, credentials);
  // }

    // Login method that calls the backend login endpoint.
  login(credentials: { email: string, password: string }): Observable<any> {
    // Replace '/api/auth/login' with your actual login endpoint.
    return this.http.post<any>(`${this.apiUrl}/signup`, credentials);
  }

  // Unit CRUD operations
  getAllUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.apiUrl}/units/getAll`);
  }

  getUnit(id: string): Observable<Unit> {
    return this.http.get<Unit>(`${this.apiUrl}/units/${id}`);
  }

  createUnit(unit: Partial<Unit>): Observable<Unit> {
    return this.http.post<Unit>(`${this.apiUrl}/units`, unit);
  }

  updateUnit(id: string, unit: Partial<Unit>): Observable<Unit> {
    return this.http.put<Unit>(`${this.apiUrl}/units/${id}`, unit);
  }

  deleteUnit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/units/${id}`);
  }

  // // Company CRUD operations
  // getCompanies(unitId?: string): Observable<Company[]> {
  //   const url = unitId
  //     ? `${this.apiUrl}/units/${unitId}/companies`
  //     : `${this.apiUrl}/companies`;
  //   return this.http.get<Company[]>(url);
  // }

  // getCompany(id: string): Observable<Company> {
  //   return this.http.get<Company>(`${this.apiUrl}/companies/${id}`);
  // }

  // createCompany(company: Partial<Company>): Observable<Company> {
  //   return this.http.post<Company>(`${this.apiUrl}/companies`, company);
  // }

  // updateCompany(id: string, company: Partial<Company>): Observable<Company> {
  //   return this.http.put<Company>(`${this.apiUrl}/companies/${id}`, company);
  // }

  // deleteCompany(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/companies/${id}`);
  // }

  // // Product CRUD operations
  // getProducts(companyId?: string): Observable<Product[]> {
  //   const url = companyId
  //     ? `${this.apiUrl}/companies/${companyId}/products`
  //     : `${this.apiUrl}/products`;
  //   return this.http.get<Product[]>(url);
  // }

  // getProduct(id: string): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  // }

  // createProduct(product: Partial<Product>): Observable<Product> {
  //   return this.http.post<Product>(`${this.apiUrl}/products`, product);
  // }

  // updateProduct(id: string, product: Partial<Product>): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  // }

  // deleteProduct(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  // }

  // // Subproduct CRUD operations
  // getSubproducts(productId?: string): Observable<Subproduct[]> {
  //   const url = productId
  //     ? `${this.apiUrl}/products/${productId}/subproducts`
  //     : `${this.apiUrl}/subproducts`;
  //   return this.http.get<Subproduct[]>(url);
  // }

  // getSubproduct(id: string): Observable<Subproduct> {
  //   return this.http.get<Subproduct>(`${this.apiUrl}/subproducts/${id}`);
  // }


  // createSubproduct(subproduct: Partial<Subproduct>): Observable<Subproduct> {
  //   return this.http.post<Subproduct>(`${this.apiUrl}/subproducts`, subproduct);
  // }

  // updateSubproduct(id: string, subproduct: Partial<Subproduct>): Observable<Subproduct> {
  //   return this.http.put<Subproduct>(`${this.apiUrl}/subproducts/${id}`, subproduct);
  // }

  // deleteSubproduct(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/subproducts/${id}`);
  // }
}
