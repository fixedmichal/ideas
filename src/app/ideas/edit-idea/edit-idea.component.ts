import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Idea } from 'src/app/shared/idea.model';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss']
})

export class EditIdeaComponent implements OnInit {
  idea: Idea;
  id: string;
  editingFinished: boolean = false;
  beingDeleted: boolean = false;
  modeEnabled: boolean = false;
  radioButtons: string[] = ['observation', 'idea', 'gratitude'];
  @ViewChild('editIdeaForm') editIdeaForm : NgForm;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  // copying idea object (not a reference)
  // this.idea = JSON.parse(JSON.stringify(this.dataService.getIdea(this.id)))
  ngOnInit(): void {
    console.log("oninit of EDIT IDEA component fired")
    this.route.parent.params.subscribe( (params: Params)=> {
      this.dataService.getIdea(params['id']).subscribe( idea => {
        console.log(params['id']);
        this.idea = idea;
        console.log(idea)
      })
    })
  }
  
  goToNextIdea() {
    this.dataService.findNextIdeaId(this.id).subscribe( nextId => {
      console.log("next id: ", nextId)
      this.router.navigate(['/ideas', nextId, 'edit'], {relativeTo: this.route });
    } )
  }

  toggleMode() {
    this.modeEnabled = !this.modeEnabled;
    this.dataService.modeToggleEmitter.next(this.modeEnabled)
    console.log(this.modeEnabled)
  }

  // onSubmit(form: NgForm) {
  onEditIdeaSubmit() {
    console.log(this.editIdeaForm);
    this.idea.title = this.editIdeaForm.value.ideaTitle
    this.idea.content = this.editIdeaForm.value.ideaContent
    this.dataService.putIdea(this.id, this.idea)
  }


  goBack() {
    this.router.navigate([".."], {relativeTo: this.route});
    this.dataService.modeChosenSubject.next(false)

  }
}
