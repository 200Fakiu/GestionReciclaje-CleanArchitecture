import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Plant } from '../models/Plant';
import { PlantFilter } from '../models/plantFilter';
import { PagedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  baseApiUrl = environment.apiUrl + 'plant/';

  constructor(private http: HttpClient) {}


  getAll(filters: PlantFilter): Observable<PagedResult<any[]>> {
    let params = new HttpParams();
    const paginatedResult: PagedResult<any[]> = new PagedResult<any[]>();
    params = params.append('pageNumber', filters.pageNumber != null ? filters.pageNumber .toString() :  null );

    params = params.append('pageSize',  filters.pageSize != null ? filters.pageSize .toString() :  null);    
    params = params.append('name', filters.name);

    return this.http.get(this.baseApiUrl , { observe: 'response', params})
    .pipe(
      map(response => {
          paginatedResult.filters.pageSize = response.body['pageSize'];
          paginatedResult.filters.pageNumber = response.body['pageNumber'];
          paginatedResult.filters.totalRecords = response.body['totalRecords'];
          paginatedResult.entity = response.body['plants'];
          return paginatedResult;
      }));
  }

  getPlantById(id): Observable<Plant> {
    return this.http.get<Plant>(this.baseApiUrl + id);
  }

  updatePlant(plant: Plant) {
    return this.http.put(this.baseApiUrl, plant);
  }

  deletePlant(id) {
    return this.http.delete(this.baseApiUrl + id);
  }

  create(plant: Plant) {
    return this.http.post(this.baseApiUrl + 'create', plant);
  }
}
