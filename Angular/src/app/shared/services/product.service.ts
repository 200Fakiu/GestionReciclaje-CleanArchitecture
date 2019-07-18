import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ProductFilter } from '../../models/product-filter';
import { PagedResult } from '../../models/pagination';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseApiUrl = environment.apiUrl + 'Product/';

  constructor(private http: HttpClient) {}


  getAll(filters: ProductFilter): Observable<PagedResult<any[]>> {

    let params = new HttpParams();
    const paginatedResult: PagedResult<any[]> = new PagedResult<any[]>();
    params = params.append('pageNumber', filters.pageNumber != null ? filters.pageNumber .toString() :  null );

    params = params.append('pageSize',  filters.pageSize != null ? filters.pageSize .toString() :  null);
    params = params.append('name', filters.name);

    return this.http.get(this.baseApiUrl , { observe: 'response', params})
    .pipe(
      map(response => {
          paginatedResult.entity = response.body['list'];
          paginatedResult.filters.totalRecords = response.body['totalRecords'];
          return paginatedResult;
      }));
  }

  getById(id): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + id);
  }

  update(product: Product) {
    return this.http.put(this.baseApiUrl, product);
  }

  delete(id) {
    return this.http.delete(this.baseApiUrl + id);
  }

  create(product: Product) {
    return this.http.post(this.baseApiUrl, product);
  }
}
