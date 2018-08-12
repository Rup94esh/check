import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface RegisterResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uploadData (uploadForm) {

    return this.http.post<RegisterResponse>('/user/submit', uploadForm);
  }

}
