import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
// import 'datatables.net';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  emplist: any = [];
  public languages = [
    { title: 'Telugu', value: 'Telugu' },
    { title: 'Marathi', value: 'Marathi' },
    { title: 'Kannada', value: 'Kannada' },
    { title: 'Tamil', value: 'Tamil' },
    { title: 'Hindi', value: 'Hindi' },
    { title: 'English', value: 'English' }
  ];
  updateemp: FormGroup;

  constructor(private formbuilder: FormBuilder, private empservice: AuthenticationService) { 
    this.updateemp = formbuilder.group({
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
    this.get_all_emp();
  };

  // Get all employees
  get_all_emp() {
    this.empservice.getallemp().subscribe(res => {
      this.emplist = res;
    },
    err => {
      console.log(err);
    });
  };

  // Get languages values
  onChange(event: any) {
    const formArray: FormArray = this.updateemp.get('languages') as FormArray;
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
  };

}
