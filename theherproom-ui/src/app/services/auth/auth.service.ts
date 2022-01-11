import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../shared/models/user.model";
import * as moment from 'moment';
const API_URL = "http://localhost:9090/api/auth/";



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


    constructor(
        private http: HttpClient,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    login(user: User): Observable<any> {
        return this.http.post<any>(API_URL + "signin",  JSON.stringify(user), {headers: {"Content-type": "application/json; charset=UTF-8"}})
            .pipe(map(response => {
                if(response){
                    console.log(response);
                    this.setSession(response);
                }
                return response;
            }))
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        this.currentUserSubject.next(null);
    }

    register(user: User): Observable<any> {
        return this.http.post(API_URL + "signup", JSON.stringify(user),
            {headers: {"Content-type": "application/json; charset=UTF-8"}});
    }

    resetPassword(email: string): Observable<any> {
        const params = new HttpParams()
            .set('email', email);
        return this.http.post("http://localhost:9090/api/reset/forgot",    JSON.stringify(email),
            {headers: {"Content-type": "application/json; charset=UTF-8"}});
    }

    isAuthenticated(): boolean {
        const currentTime = new Date();
        return moment(currentTime).isBefore(this.getExpiration());
    }

    getExpiration() {
        return moment(localStorage.getItem('expiration'));
    }

    private setSession(authResult) {
        this.initializeCurrentUser(authResult);
        const expiresAt = moment(authResult.expires_in);
        this.currentUserSubject.next(authResult);
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('expiration', expiresAt.toString());
    }

    private initializeCurrentUser(user) {
        let currentUser: User = new User();
        currentUser.username = user.username;
        currentUser.email = user.email;
        currentUser.id = user.id;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    getCurrentUser() {
        return localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : null;
    }

}
