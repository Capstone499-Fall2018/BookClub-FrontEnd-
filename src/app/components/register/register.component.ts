import { Component, OnInit } from '@angular/core';
import { DBService } from '../../db.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private db: DBService, private fb: FormBuilder, private router: Router) {
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
    });
    this.router.navigate(['/Search']);
  }
}
