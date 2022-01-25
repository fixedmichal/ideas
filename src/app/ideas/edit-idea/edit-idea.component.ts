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
  edited: boolean = false;
  modeEnabled: boolean = false;
  radioButtons: string[] = ['observation', 'idea']
  @ViewChild('editIdeaForm') editIdeaForm : NgForm;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.id = params['id'];
      // copying idea object (not a reference)
      this.idea = JSON.parse(JSON.stringify(this.dataService.getIdea(this.id)))
    })
    console.log(this.idea);
  }

  goToNextIdea() {
    const nextId: string = this.dataService.findNextIdeaId(this.id)
    console.log("next id: ", nextId)
    console.log(nextId);
    this.router.navigate(['/ideas', nextId, 'edit'], {relativeTo: this.route });
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
    // this.dataService.postIdea({strongId: 'sssssssss', title: 'nowaaa', content: 'abcdefghhjklomnqrstpuwz', creationDate: '2087', type: 'idea'});
    this.dataService.editIdea(this.id, this.idea)
  }
}
