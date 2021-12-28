import { Injectable } from '@angular/core';
import {Herp} from "../../shared/models/herp.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserHerps} from "../../shared/models/user-herps.model";
import {User} from "../../shared/models/user.model";
import {Observable} from "rxjs";
import {HerpFormModel} from "../../shared/models/herp-form.model";
import {Feeders} from "../../shared/models/feeders.model";
import {Length} from "../../shared/models/herp-length.model";
import {Weight} from "../../shared/models/herp-weight.model";

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

  getAllHerpFeeders(userHerpId: string): Observable<any> {
      return this.http.get(API_URL + "userHerp/herpFeeders/" + userHerpId,
          {
              headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
          });
  }

    postHerpFeeders(feeder: Feeders, userHerpId: string): Observable<any> {
        return this.http.post(API_URL + "userHerp/herpFeeders/" + userHerpId, JSON.stringify(feeder),
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-type": "application/json; charset=UTF-8"}
            });
    }

  getAllFeeders(): Observable<any> {
      return this.http.get(API_URL + "userHerp/feeders",
          {
              headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
          });
  }

    deleteHerpFeeders(userHerpsId: string, herpFeederId: string): Observable<any>{
        return this.http.delete<any>(API_URL + "userHerp/herpFeeders/" + herpFeederId + '/' + userHerpsId,
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
    }

  getHerpLengths(userHerpsId: string): Observable<any> {
      return this.http.get(API_URL + "userHerp/herpLength/" + userHerpsId,
          {
              headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
          });
  }

    postHerpLengths(length: Length, userHerpId: string): Observable<any> {
        return this.http.post(API_URL + "userHerp/herpLength/" + userHerpId, JSON.stringify(length),
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-type": "application/json; charset=UTF-8"}
            });
    }

    deleteHerpLengths(userHerpsId: string, herpLengthId: string): Observable<any>{
        return this.http.delete<any>(API_URL + "userHerp/herpLength/" + herpLengthId + '/' + userHerpsId,
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
    }

    getHerpWeights(userHerpsId: string): Observable<any> {
        return this.http.get(API_URL + "userHerp/herpWeight/" + userHerpsId,
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
    }

    postHerpWeights(weight: Weight, userHerpId: string): Observable<any> {
        return this.http.post(API_URL + "userHerp/herpFeeders/" + userHerpId, JSON.stringify(weight),
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-type": "application/json; charset=UTF-8"}
            });
    }

    deleteHerpWeights(userHerpsId: string, herpWeightId: string): Observable<any>{
        return this.http.delete<any>(API_URL + "userHerp/herpWeight/" + herpWeightId + '/' + userHerpsId,
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
    }
}



