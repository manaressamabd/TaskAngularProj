import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestModel } from './request.Model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit {
  serviceNames: string[] = ["VIP", "Class 1", "Class 2"];
  brandNames: string[] = ["Schindler", "Kone", "Fujitec"];
  productNames: string[] = ["Elevators", "Escalators"];
  modelNames: string[] = ["Passenger Elevator", "Service Elevator", "Dumbwaiter", "Residential Elevator"];
  requestForm: FormGroup;
  model: RequestModel;
  selectedFile: File = null;
  fileContent:string = null;

  constructor(private http: HttpClient) { }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Service: new FormControl(null, [Validators.required]),
      Product: new FormControl(null, [Validators.required]),
      Brand: new FormControl(null, [Validators.required]),
      Model: new FormControl(null, [Validators.required]),
      Message: new FormControl(null, [Validators.required]),
      File: new FormControl(null)
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('File', this.selectedFile);
    console.log(formData.get('File')); 
    // Construct RequestModel object
    const requestModel = {
      Name: this.requestForm.get('Name').value,
      Email: this.requestForm.get('Email').value,
      Service: this.requestForm.get('Service').value,
      Product: this.requestForm.get('Product').value,
      Brand: this.requestForm.get('Brand').value,
      Model: this.requestForm.get('Model').value,
      Message: this.requestForm.get('Message').value,
    };

    formData.append('RequestModel', JSON.stringify(requestModel));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post<any>('http://127.0.0.1:8000/AddRequest', formData).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: data.Message,
        });
        this.requestForm.reset();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error Occured!',
          text: error.error.message || 'Something went wrong!',
        });
      }
    );
  }
}
