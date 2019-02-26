import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DBService } from '../../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent implements OnInit {

  majorform: boolean;
  updatemajorform: FormGroup;
  majorupdated: boolean;
  nameform: boolean;
  updatenameform: FormGroup;
  nameupdated: boolean;
  phoneform: boolean;
  updatephonenumform: FormGroup;
  phoneupdated: boolean;
  info: boolean;
  account: boolean;
  displayMemberColumns = ['uname', 'name', 'major', 'phone', 'email'];
  data: {
      Uname: String,
      Name: String,
      Major: String,
      PhoneNum: String,
      Email: String
  };

  addBookForm: FormGroup;
  add: boolean;
  interested: boolean;
  interestedMemberBooks: {
    Isbn: String,
    Title: String,
    Author: String
  };
  member: any;
  deleteSuccess: boolean;
  success: boolean;
  showMemberBooks: boolean;
  displayedColumns = ['isbn', 'title', 'author', 'actions'];
  data1: {
    Isbn: String,
    Title: String,
    Author: String
  };

  constructor(private db: DBService, private fb: FormBuilder, private router: Router) {
    this.addBookForm = this.fb.group({
        isbn: ['', Validators.required],
        title: ['', Validators.required],
        author: ['', Validators.required],
        subject: '',
        description: '',
        oprice: '',
        cprice: ''
    });
    this.updatemajorform = this.fb.group({
        major: ['', Validators.required]

    });

    this.updatenameform = this.fb.group({
        name: ['', Validators.required]

    });

    this.updatephonenumform = this.fb.group({
        phone: ['', Validators.required]

    });
  }

  ngOnInit() {
    this.success = false;
    this.deleteSuccess = false;
    this.add = false;
    this.showMemberBooks = false;
    this.interested = false;
    this.majorform = false;
    this.majorupdated = false;
    this.nameform = false;
    this.nameupdated = false;
    this.phoneupdated = false;
    this.phoneform = false;
    this.account = false;
    this.info = false;
  }
  get userid(): any {
    return localStorage.getItem('userid');
  }
  get username(): any {
    return localStorage.getItem('username');
  }

  showForm() {
    this.ngOnInit();
    this.add = true;
  }

  createBook(isbn, title, author, description, subject, oprice, cprice) {
    this.ngOnInit();
    this.db.createBook(isbn, title, author, description, subject, oprice, cprice, this.userid).subscribe((res: any) => {
      console.log(res);
    });
    this.success = true;
    this.addBookForm.reset();
  }

  manageBooks() {
    this.ngOnInit();
    this.showMemberBooks = true;
    this.db.getMemberBooks(this.userid).subscribe((res: any) => {
      console.log(res);
      this.data1 = res;
    });
  }

  deleteBook(unid) {
    this.ngOnInit();
    this.db.delete(unid).subscribe((res: any) => {
      console.log(res);
    });
    this.deleteSuccess = true;
  }

  deleteIntBook(unid) {
    this.ngOnInit();
    this.db.deleteIntBook(unid).subscribe((res: any) => {
      console.log(res);
    });
    this.deleteSuccess = true;
  }

  settings() {
    this.ngOnInit();
    this.account = true;
  }

  interestedBooks() {
    this.ngOnInit();
    this.db.interestedMember(this.userid).subscribe((res: any) => {
      this.interestedMemberBooks = res;
      console.log(res);
    });
    this.interested = true;
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('user-jwt');
    this.router.navigate(['/Home']);
   }

  displaymajorform() {
      this.ngOnInit();
      this.majorform = true;
  }

  updatemajor(major, uname) {
      uname = localStorage.getItem('userid');
      this.db.updatemajor(major, uname).subscribe((res: any) => {
          if (res.affectedRows > 0) {
              this.majorupdated = true;
              this.updatemajorform.reset();
          }
          console.log(res);
      });
  }

  displaynameform() {
      this.ngOnInit();
      this.nameform = true;
  }

  updatename(name, uname) {
      uname = localStorage.getItem('userid');
      this.db.updatename(name, uname).subscribe((res: any) => {
          if (res.affectedRows > 0) {
              this.nameupdated = true;
              this.updatenameform.reset();
          }
          console.log(res);
      });
  }

  displayphoneform() {
      this.ngOnInit();
      this.phoneform = true;
  }

  updatephonenum(phone, uname) {
      uname = localStorage.getItem('userid');
      this.db.updatephonenum(phone, uname).subscribe((res: any) => {
          if (res.affectedRows > 0) {
              this.phoneupdated = true;
              this.updatephonenumform.reset();
          }
          console.log(res);
      });
  }

  displayinfo(uname) {
    this.ngOnInit();
    uname = localStorage.getItem('userid');
    this.db.getMember(uname).subscribe((res: any) => {
        console.log(res);
        this.data = res;
        this.info = true;

    });
  }

  cancel() {
      this.ngOnInit();
  }

}
