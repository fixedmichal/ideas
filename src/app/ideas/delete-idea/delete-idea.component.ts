import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Idea } from 'src/app/shared/idea.model';

@Component({
  selector: 'app-delete-idea',
  templateUrl: './delete-idea.component.html',
  styleUrls: ['./delete-idea.component.scss']
})
export class DeleteIdeaComponent implements OnInit {
  idea: Idea;
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe( (params: Params)=> {
      this.dataService.getIdea(params['id']).subscribe( idea => {
        this.idea = idea;
      })
    })
  }

  onIdeaDelete() {
    this.dataService.deleteIdea(this.idea.strongId).subscribe( response => {
      console.log(response)
      this.router.navigate(["../deleted"], {relativeTo: this.route});

    })
  }
  
  goBack() {
    this.router.navigate([".."], {relativeTo: this.route});
    this.dataService.modeChosenSubject.next(false)

  }

}
