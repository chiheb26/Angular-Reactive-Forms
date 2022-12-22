import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularReactiveForms';
  reactiveForm:FormGroup;
  formStatus:string;
  ngOnInit(){
    this.reactiveForm= new FormGroup({
      personalDetails: new FormGroup({
        //new FormControl(value,syncValidators,asyncValidators)
        firstname:new FormControl(null,[Validators.required,this.noSpaceAllowed]),
        lastname:new FormControl(null,[Validators.required,this.noSpaceAllowed]),
        email:new FormControl(null,[Validators.required,Validators.email],[this.emailNotAllowed])
      }),
      gender:new FormControl('male'),
      country:new FormControl('india'),
      hobbies:new FormControl(null),
      skills:new FormArray([
        new FormControl(null,Validators.required)
      ])
    });
    //this.reactiveForm.get('personalDetails.firstname').valueChanges.subscribe((value)=>{
    //  console.log(value);
    // });
    //this.reactiveForm.valueChanges.subscribe((value)=>{
    // console.log(value);
    //});
    this.reactiveForm.statusChanges.subscribe((value)=>{
      console.log(value);
      this.formStatus=value;
    });
    /*setTimeout(()=>{
      this.reactiveForm.setValue({
        personalDetails:{
          firstname:'',
          lastname:'',
          email:'abc@example.com'
        },
        gender:'',
        country:'',
        hobbies:'',
        skills:[]
      });
    },4000);
  */
 setTimeout(()=>{
  this.reactiveForm.patchValue({
    personalDetails:{
      email:'example@email.com'
    }
  });
 },4000);
  }
  onSubmit(){
    console.log(this.reactiveForm);
    this.reactiveForm.reset({
      personalDetails:{
        firstname:'',
        lastname:'',
        email:'abc@example.com'
      },
      gender:'male',
      country:'india',
      hobbies:'',
      skills:[]
    });
  }
  addSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required));
  }
  removeSkills(){
    (<FormArray>this.reactiveForm.get('skills')).removeAt((<FormArray>this.reactiveForm.get('skills')).length-1);
  }
  noSpaceAllowed(control: FormControl){
    if(control.value && control.value.indexOf(' ')!==-1){
      return {noSpaceAllowed:true};
    }else{
      return null;
    }
  }
  emailNotAllowed(control:FormControl):Promise<any> | Observable<any>{
    return  new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==="aa@example.com"){
          resolve({emailNotAllowed:true});
        }else{
          resolve(null);
        }
      },5000);
    });
  }
}
