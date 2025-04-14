import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Company, Product, Unit } from '../models/helperModals';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Unit CRUD operations
  getAllUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.apiUrl}/units/getAll`);
  }

  createUnit(unit: Partial<Unit>): Observable<Unit> {
    return this.http.post<Unit>(`${this.apiUrl}/units/create`, unit);
  }

  updateUnit(id: string, unit: Partial<Unit>): Observable<Unit> {
    return this.http.put<Unit>(`${this.apiUrl}/units/update/${id}`, unit);
  }

  deleteUnit(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/units/delete/${id}`, { responseType: "text" as 'json' });
  }

  // Company CRUD operations
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies/getAll`);
  }

  getCompaniesByUnitId(id: string): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies/by-unit/${id}`);
  }

  createCompany(unitId: string, company: Partial<Company>): Observable<Company> {
    return this.http.post<Company>(`${this.apiUrl}/companies/create/unit/${unitId}`, company);
  }

  updateCompany(UnitId: string, CompanyId: string, company: Partial<Company>): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/companies/update/${CompanyId}/unit/${UnitId}`, company);
  }

  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/companies/delete/${id}`, { responseType: "text" as 'json' });
  }

  // Product CRUD operations
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCompanyId(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/by-company/${id}`);
  }

  createProduct(companyId: string, product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/company/${companyId}`, product);
  }

  updateProduct(companyId : string, productId: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${productId}/company/${companyId}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

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
