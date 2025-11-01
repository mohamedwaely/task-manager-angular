import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs"

export interface User{
    id: number,
    username: string,
    email: string

}

export interface RegisterReq{
    username: string,
    email: string,
    password: string
}

export interface LoginReq{
    email: string,
    password: string
}

export interface LoginRes{
    token: string,
    user: User
}

export interface RegisterRes{
    mess: string
}

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private rootApiURL="https://localhost:7275";

    constructor(private http: HttpClient, private router: Router){}
    

    register(userInfo: RegisterReq): Observable<RegisterRes>{
        return this.http.post<RegisterRes>(`${this.rootApiURL}/register`, userInfo)
    }
   
    
    login(userInfo: LoginReq): Observable<LoginRes>{
        return this.http.post<LoginRes>(`${this.rootApiURL}/login`, userInfo)
    }

    logout(): void{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    isLoggedIn(): boolean{
        const token = localStorage.getItem('token')
        const expirationStr = localStorage.getItem('tokenExpirationTime')
        if(!token || !expirationStr){
            return false;
        }

        const exp=new Date(expirationStr);
        if(new Date() > exp){
            this.clearSession()
            return false
        }

        return true;
    }

    clearSession(): void{
        localStorage.removeItem('token')
        localStorage.removeItem('tokenCreationTime');
        localStorage.removeItem('tokenExpirationTime');
        this.router.navigate(['/login'])
    }

    getToken(): string | null {
        return localStorage.getItem('token')
    }

    getUser(): User | null{
        var userstr=localStorage.getItem('user');
        return userstr ? JSON.parse(userstr) : null;
    }



}

