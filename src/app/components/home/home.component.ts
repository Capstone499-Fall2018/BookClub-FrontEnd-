import { Component, OnInit } from '@angular/core';
import { DBService } from '../../db.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  loginError: boolean;
  show: boolean;

  constructor(private db: DBService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  login(email, password) {
    this.loginError = false;
    this.db.login(email, password).subscribe((res: any) => {
      console.log(res);
      if (res != null) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userid', res.Member.uname);
      localStorage.setItem('username', res.Member.name);
      localStorage.setItem('user-jwt', res.token);
      }
        },
      error => {
      this.loginError = true;
      },
        () => {
          this.router.navigate(['/Member']);
        });
  }

  ngOnInit() {
    console.log(localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn').charAt(0) === 'f' || localStorage.getItem('loggedIn') === null) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

}
