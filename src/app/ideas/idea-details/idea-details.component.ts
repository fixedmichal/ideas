import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Idea } from 'src/app/shared/idea.model';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.scss']
})
export class IdeaDetailsComponent implements OnInit {
  idea: Idea;
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {

    // console.log("ONINIT!")
    // const id = +this.route.snapshot.params['id'];
    // const idea = this.dataService.getIdea(id);
    // this.idea = idea;

    this.route.params.subscribe( (params: Params) => {
      this.idea = this.dataService.getIdea(params['id']);
    })
  }

}
