import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { Task } from "./models/task.model";

export interface resp{
    success: boolean,
    mess: string
}


@Injectable({
    providedIn: "root"
})

export class taskService{
    private ApiUrl="https://localhost:7275/tasks"

    constructor(private http: HttpClient){}

    private getAuthHeader(): HttpHeaders{
        const jwtToken=localStorage.getItem('token')
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        })
    }

   

    getTasks(): Observable<Task[]>{
        return this.http.get<Task[]>(`${this.ApiUrl}`, {headers: this.getAuthHeader()})
    }

    createTask(task: Partial<Task>): Observable<Task>{
        return this.http.post<Task>(this.ApiUrl, task, {headers: this.getAuthHeader()});
    }

    updateDescription(taskId: number, description: string): Observable<resp> {
        const body={taskId, description};
        return this.http.patch<resp>(`${this.ApiUrl}/description`, body, {headers: this.getAuthHeader()});
    }
 
    updateStatus(taskId: number, status: Task['status']): Observable<resp> {
        const body={taskId, status};
        return this.http.patch<resp>(`${this.ApiUrl}/status`, body, {headers: this.getAuthHeader()});
    }

    deleteTask(taskId: number): Observable<resp>{
        return this.http.delete<resp>(`${this.ApiUrl}/delete/${taskId}`, {headers: this.getAuthHeader()})
    }




}