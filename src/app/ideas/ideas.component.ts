import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { Idea } from '../shared/idea.model';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit, OnDestroy {
  ideas: Array<Idea>;
  modeEnabled: boolean = false;
  modeToggleSubscription: Subscription;
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.ideas = this.dataService.ideas;
    this.dataService.dataRetrieved.subscribe( ()=> {
      this.ideas = this.dataService.ideas;
      console.log("DUPADUPA")
      console.log(this.dataService.ideas)
    })

    this.modeToggleSubscription = this.dataService.modeToggleEmitter.subscribe( (data) => this.modeEnabled = data );
  }



  ngOnDestroy() {
    this.modeToggleSubscription.unsubscribe();
  }

}
