import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../shared/data.service';
import { Idea } from '../shared/idea.model';

@Component({
  selector: 'app-idea-wrapper',
  templateUrl: './idea-wrapper.component.html',
  styleUrls: ['./idea-wrapper.component.scss']
})
export class IdeaWrapperComponent implements OnInit {
  idea: Idea;
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params)=> {
      this.dataService.getIdea(params['id']).subscribe( idea => {
        console.log(params['id']);
        this.idea = idea;
        console.log(idea)
      })
    })
  }

}
