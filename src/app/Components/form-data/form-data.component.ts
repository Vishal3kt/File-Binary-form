import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit {
  form: FormGroup;
  resume: any;
  updateMode: boolean = false;
  editingRowId: any;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      resume: ['']
    });
  }

  addFile(e: any) {
    this.resume = e.target.files[0];
  }

  resetForm() {
    this.form.reset();
    this.updateMode = false;
    this.editingRowId = null;
  }

  editRow(row: any) {
    this.form.patchValue({
      name: row.name,
      email: row.email,
      city: row.city,
      resume: row.resume
    });

    this.updateMode = true;
    this.editingRowId = row.id;
    window.scrollTo(0, 0);
  }

  saveData(): void {
    const payload = {
      name: this.form.value.name,
      email: this.form.value.email,
      city: this.form.value.city,
      resume: this.resume
    };
    const formData = new FormData;

    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('city', payload.city);
    formData.append('resume', payload.resume)

    if (payload) {
      this.api.addData(formData).subscribe(
        (response) => {
          console.log('Data added successfully:', response);
          this.router.navigate(['/table']);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
