import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public languages = [
    { title: 'Telugu', value: 'Telugu' },
    { title: 'Marathi', value: 'Marathi' },
    { title: 'Kannada', value: 'Kannada' },
    { title: 'Tamil', value: 'Tamil' },
    { title: 'Hindi', value: 'Hindi' },
    { title: 'English', value: 'English' }
  ];

  regemp: FormGroup;

  constructor(private formbuilder: FormBuilder, private router: Router, private empservice: AuthenticationService) { 
    this.regemp = formbuilder.group({
        username  : new FormControl(),
        password  : new FormControl(),
        fullname  : new FormControl(),
        email     : new FormControl(),
        mobile    : new FormControl(),
        gender    : new FormControl(),
        dob       : new FormControl(),
        languages : new FormArray([]),
        status    : new FormControl()
    });
  }

  ngOnInit(): void {
  }

  register() {
    // console.log(this.regemp.value);
    // this.regemp.value.languages.toString();
    // console.log(this.regemp.value.languages.toString());
    console.log(this.regemp.value);

    this.empservice.register(this.regemp.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onChange(event: any) {
    const formArray: FormArray = this.regemp.get('languages') as FormArray;
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));

    }
    /* unselected */
    else{
      // formArray.removeAt(event.target.value);
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl) => {
          if (ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }

          i++;
        });
    }
    console.log(formArray.value.toString());
  }
}
