import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Company, Log, Product, Subproduct, Unit, User } from '../models/helperModals';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEditOrDeleteAccess(): boolean {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj?.role === 'ADMIN';
    }
    return false;
  }

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

  updateProduct(companyId: string, productId: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${productId}/company/${companyId}`, product);
  }

  deleteProduct(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/products/${id}`, { responseType: "text" as 'json' });
  }

  // Subproduct CRUD operations
  getAllSubproducts(): Observable<Subproduct[]> {
    return this.http.get<Subproduct[]>(`${this.apiUrl}/sub-products`);
  }

  getSubproduct(id: string): Observable<Subproduct> {
    return this.http.get<Subproduct>(`${this.apiUrl}/sub-products/${id}`);
  }

  getSubproductsByProductId(id: string): Observable<Subproduct[]> {
    return this.http.get<Subproduct[]>(`${this.apiUrl}/sub-products/by-product/${id}`);
  }

  createSubproduct(productId: string, subproduct: Partial<Subproduct>): Observable<Subproduct> {
    return this.http.post<Subproduct>(`${this.apiUrl}/sub-products/product/${productId}`, subproduct);
  }

  updateSubproduct(productId: string, subproductId: string, subproduct: Partial<Subproduct>): Observable<Subproduct> {
    return this.http.put<Subproduct>(`${this.apiUrl}/sub-products/${subproductId}/product/${productId}`, subproduct);
  }

  deleteSubproduct(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/sub-products/${id}`, { responseType: "text" as 'json' });
  }

  getBarcodeImage(barcodeString: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/barcodes/${barcodeString}`, { responseType: 'blob' });
  }

  // User operations
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/getAll`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/get/${id}`);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/update/${id}`, user);
  }

  makeUserAdmin(username: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/admin/${username}`, {});
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/delete/${id}`, { responseType: "text" as 'json' });
  }

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.apiUrl}/logger/getLoggingDetails`);
  }

  getGlobalSearchResults(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/${searchTerm}`);
  }
}
