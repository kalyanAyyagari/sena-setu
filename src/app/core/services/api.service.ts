import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Company, Unit } from '../models/helperModals';
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

  getUnit(id: string): Observable<Unit> {
    return this.http.get<Unit>(`${this.apiUrl}/units/get/${id}`);
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

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/companies/get/${id}`);
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
