import { Component, OnInit } from '@angular/core';
import { DBService } from '../../../db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    majorform: boolean;
    updatemajorform: FormGroup;
    nameform: boolean;
    updatenameform: FormGroup;
    phoneform: boolean;
    updatephonenumform: FormGroup;
    info: boolean;
    data: {
        Uname: String,
        Name: String,
        Major: String,
        PhoneNum: String,
        Email: String
    };
    displayMemberColumns = ['uname', 'name', 'major', 'phone', 'email'];


    constructor(private db: DBService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
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
      this.majorform = false;
      this.nameform = false;
      this.phoneform = false;
      this.info = false;
  }

    displaymajorform() {
        this.ngOnInit();
        this.majorform = true;
    }

    updatemajor(major, uname) {
        uname = sessionStorage.getItem('userid');
        this.db.updatemajor(major, uname).subscribe((res: any) => {
            if (res.affectedRows > 0) {
                this.snackBar.open('Major updated', 'OK', {
                    duration: 3000
                });
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
        uname = sessionStorage.getItem('userid');
        this.db.updatename(name, uname).subscribe((res: any) => {
            if (res.affectedRows > 0) {
                this.snackBar.open('Name Updated', 'OK', {
                    duration: 3000
                });
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
        uname = sessionStorage.getItem('userid');
        this.db.updatephonenum(phone, uname).subscribe((res: any) => {
            if (res.affectedRows > 0) {
                this.snackBar.open('Phone updated', 'OK', {
                    duration: 3000
                });
                this.updatephonenumform.reset();
            }
            console.log(res);
        });
    }

    displayinfo(uname) {
        this.ngOnInit();
        uname = sessionStorage.getItem('userid');
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
