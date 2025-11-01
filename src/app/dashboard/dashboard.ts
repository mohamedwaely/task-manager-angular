import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { taskService } from '../task.services';
import { tick } from '@angular/core/testing';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIf, NgFor, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private taskService=inject(taskService)
  private authService = inject(AuthService)
  private router = inject(Router)
  tasks: Task[]=[]

  ngOnInit(): void {
    this.loadTasks()
    console.log(this.tasks);
  }

  loadTasks(){
    // this.taskService.getTasks().subscribe(data => this.tasks=data)
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('API response:', data);
        this.tasks = data;

      },
      error: (err)=>{
        console.log("Err", err);
        
      }
    })

  }

  

  addTask(){
    const newTask: Partial<Task>={
      description: "new Task",
      status: 'new',
      createdAt: new Date().toISOString()
    }

    this.taskService.createTask(newTask).subscribe(task => this.tasks.push(task));

  }

  updateTaskDesc(task: Task){

    this.taskService.updateDescription(task.taskId, task.description).subscribe( res => {})

  }
 
  
  updateTaskStatus(task: Task){

    this.taskService.updateStatus(task.taskId, task.status).subscribe( res => {})

  }

  deleteTask(id: number){
     this.taskService.deleteTask(id).subscribe(res => this.tasks=this.tasks.filter(t => t.taskId !== id));
  }

  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}



}
