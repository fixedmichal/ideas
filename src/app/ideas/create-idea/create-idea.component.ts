import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { Idea } from 'src/app/shared/idea.model';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.scss']
})
export class CreateIdeaComponent implements OnInit {
  ideaForm: FormGroup;
  radioButtons: string[] = ['observation', 'idea', 'gratitude']
  forbiddenNames: string[] = ["Test", "Bob"];
  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.ideaForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)], this.forbiddenNameValidatorAsync.bind(this)),
      content: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      type: new FormControl(null, Validators.required)
    })
    // valuechanges observable
    // this.ideaForm.valueChanges.subscribe( () => console.log(this.ideaForm))
  }

  createDate() {
    let date = new Date();
    let dateString = date.toDateString();
    let timeString = date.toTimeString().replace(" GMT+0100 (Central European Standard Time)", "");
    return `${dateString} ${timeString}`;
  }

  createIdea() : void {
    const {title, content, type} = this.ideaForm.value;
    const idea : Idea = <Idea>{
      title: title,
      content: content,
      type: type,
      creationDate: this.createDate()
    };

    console.log("createidea method idea: ", idea)
    this.ideaForm.reset();
    this.dataService.postIdea(idea)
  }

  onCancel() {
    this.ideaForm.reset()
  }

  onGetIdeasArray() {
    console.log(this.dataService.ideas)
  }

  onGetIdeas() {
    this.dataService.getIdeas();
  }

  onDeleteAll() {
    this.dataService.deleteAllIdeas()
  }

  forbiddenNameValidator(control: FormControl) : {[s: string]: boolean} {
    if(this.forbiddenNames.indexOf(control.value) !== -1) {
      console.log(control.value)
      return {'nameIsForbidden' : true}
    }
    else return null;

  }

  forbiddenNameValidatorAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout( () => {
        if(this.forbiddenNames.indexOf(control.value) !== -1)
        {
          resolve({'nameIsForbidden': true})
        }
        else resolve(null)
      }, 3000)
    })
    return promise;
  }





  // forbiddenNameValidatorAsync(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>( (resolve, reject) => {
  //     setTimeout( () => {
  //       if(this.forbiddenNames.find( element => {element === control.value;} ))
  //       {
  //         resolve({'nameIsForbidden': true})
  //       }
  //       else resolve(null)
  //     })
  //   })
  //   return promise;
  // }
}
