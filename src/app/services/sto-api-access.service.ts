import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompactSTOModel, STOModel } from '../models/sto-model';

@Injectable({
  providedIn: 'root'
})
export class StoApiAccessService {
  basePath = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  /**
   * Get Api from Web Api application
   * Get the STO records available from the DB.
   */

  checkUserExists(userName: string, userPassword: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    return this.httpClient.get<boolean>(
      this.basePath +
        '/api/FirstMile/CheckUser?userName=' +
        userName +
        '&password=' +
        userPassword,
      httpOptions
    );
  }

  getSTORecords(stoListType): Observable<CompactSTOModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    return this.httpClient.get<CompactSTOModel[]>(
      this.basePath + '/api/FirstMile/GetSTOListByArgs?stoType=' + stoListType,
      httpOptions
    );
  }

  getSTORecordByID(firstMileGUID: string): Observable<STOModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    return this.httpClient.get<STOModel>(
      this.basePath + '/api/FirstMile/' + firstMileGUID,
      httpOptions
    );
  }

  deleteSTORecord(stoRec: CompactSTOModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.httpClient.put(
      this.basePath + '/api/FirstMile/InActivateSTO',
      stoRec,
      httpOptions
    );
  }

  saveSTORecord(stoRec: STOModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.httpClient.post(
      this.basePath + '/api/FirstMile/SaveSTO',
      stoRec,
      httpOptions
    );
  }

  updateSTORecord(stoRec: STOModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.httpClient.put(
      this.basePath + '/api/FirstMile/UpdateSTO',
      stoRec,
      httpOptions
    );
  }
}
