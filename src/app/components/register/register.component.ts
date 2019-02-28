import { Component, OnInit } from '@angular/core';
import { DBService } from '../../db.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private db: DBService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
      this.registerForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required],
          phone: '',
          major: '',
          name: ''
      });
  }

  ngOnInit() {
  }

  register(uname, email, major, name, phone, password) {
    this.db.register(uname, email, major, name, phone, password).subscribe((res: any) => {
      console.log(res);
      if (res.affectedRows > 0) {
          this.snackBar.open('Registered successfully', 'OK', {
              duration: 3000
          });
      }
    });
    this.router.navigate(['/Home']);
  }
}
