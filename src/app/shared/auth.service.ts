import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginUser, User} from '../model/models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedIn = false;
    admin = false;
    public http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
        console.log('apiUrl', environment.apiUrl);
    }

    getUser(): any {
        const sUser = localStorage.getItem('user');
        if (sUser !== null) {
            return JSON.parse(sUser);
        } else {
            return null;
        }
    }

    logIn(loginUser: LoginUser): string {
        let ret = null;
        const headers = new HttpHeaders({
            /*'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'*/
        });
        const response = this.http.post<any>(environment.apiUrl + 'user/login', loginUser, {headers});
        response.subscribe(result => {
            if (result.error !== null) {
                ret = result.error;
            } else {
                window.localStorage.setItem('token', result.data.token);
                window.localStorage.setItem('user', JSON.stringify(result.data.user));
            }
        });
        return ret;
    }

    /*logIn(login, password): Observable<any> {
        // typiquement, acceptera en paramètres un login et un password
        // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
        // si login/password non valides, positionner à false;

        if (login === 'admin') {
            this.admin = true;
        }

        this.loggedIn = true;
    }*/

    logOut(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    // exemple d'utilisation :
    // isAdmin.then(admin => { console.log("administrateur : " + admin);})
    isAdmin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const user = this.getUser();
            if (user != null) {
                const admin = user.role === 'Admin';
                resolve(admin);
            } else {
                resolve(false);
            }
        });
    }

    isLoged(): boolean {
        const token = localStorage.getItem('token');
        return token !== null;
    }
}
