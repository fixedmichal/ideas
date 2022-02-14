import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.module";

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

    userSubject: Subject<User> = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    registerUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcsTKDLLMAXuOJBbcWICXMzdz8d-MWkU0';
    loginUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcsTKDLLMAXuOJBbcWICXMzdz8d-MWkU0';

    constructor(
        private http: HttpClient) {}

    authenticate(email: string, password: string, inLoginMode: boolean) {
        const body = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        const url = inLoginMode ? this.loginUrl : this.registerUrl;

        return this.http.post<AuthResponseData>(url, body).pipe( catchError( errorResponse => {
            return this.handleError(errorResponse)
        }), tap( responseData => {

            if(inLoginMode) {
                const calculatedTimestamp = new Date().getTime() + +responseData.expiresIn * 1000
                const expirationDate = new Date(calculatedTimestamp);
                
                const user = new User(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    expirationDate)

                this.userSubject.next(user);
                const expirationDuration = +responseData.expiresIn * 1000;
                this.autoLogout(expirationDuration)
                localStorage.setItem('userData', JSON.stringify(user))
            }
        }))

    }

    handleError(errorResponse) {
        let errorMessage = "An unknown error occured!";

            if(!errorResponse.error || !errorResponse.error.error) {
                throwError(() => new Error(errorMessage));
            }

            switch(errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = "This email already exists!";
                case 'INVALID_EMAIL':
                    errorMessage = "Invalid credentials";
                case 'INVALID_PASSWORD':
                    errorMessage = "Invalid credentials";
            }
            
        return throwError(() => new Error(errorMessage));

    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        
        if(!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate));

        if(loadedUser.token) {
            this.userSubject.next(loadedUser);
            const expirationDuration = (new Date(userData._tokenExpirationDate).getTime() - new Date().getTime())
            console.log("dupa", expirationDuration)
            // this.autoLogout(expirationDuration)
            this.autoLogout(expirationDuration)

        }
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration)
        this.tokenExpirationTimer = setTimeout( () => {
            console.log("logout");
            this.logout();
        }, expirationDuration)

    }

    logout() {
        this.userSubject.next(null)

        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }
}