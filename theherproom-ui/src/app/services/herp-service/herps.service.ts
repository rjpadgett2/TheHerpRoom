import { Injectable } from '@angular/core';
import {Herp} from "../../shared/models/herp.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserHerps} from "../../shared/models/user-herps.model";
import {User} from "../../shared/models/user.model";
import {Observable} from "rxjs";
import {HerpFormModel} from "../../shared/models/herp-form.model";

const API_URL = "http://localhost:9090/api/";
let httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class HerpsService {




  constructor(
      private http: HttpClient
  ) { }

  getAllUserHerps(): Observable<any> {
      let user: User = JSON.parse(localStorage.getItem("currentUser"));
    return this.http.get(API_URL + "userHerp/" + user.id,
        {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
  }

  deleteUserHerp(id: string): Observable<any>{
      let user: User = JSON.parse(localStorage.getItem("currentUser"));
      return this.http.delete<any>(API_URL + "userHerp/" + user.id + '/' + id,
          {
              headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  "Content-type": "application/json; charset=UTF-8"}
          });
  }

  postUserHerp(herp: HerpFormModel): Observable<any>{
      let user: User = JSON.parse(localStorage.getItem("currentUser"));
      return this.http.post<any>(API_URL + "userHerp/" + user.id, JSON.stringify(herp),
          {
              headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        "Content-type": "application/json; charset=UTF-8"}
          });
  }

  editUserHerp(herp: HerpFormModel, id: string): Observable<any> {
      let user: User = JSON.parse(localStorage.getItem("currentUser"));
      return this.http.put<any>(API_URL + "userHerp/" + user.id + '/' + id, JSON.stringify(herp),
          {
              headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  "Content-type": "application/json; charset=UTF-8"}
          });
  }

  searchAllHerps(term, category){
    return this.http.get(API_URL + "herps/search",
        {
          headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
          params: ({'term' : term, 'category' : category})
        });
  }


}
