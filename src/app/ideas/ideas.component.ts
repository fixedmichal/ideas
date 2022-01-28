import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
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
  dataRetrievedSubscription: Subscription;
  constructor(private dataService : DataService, private router:Router) { }

  ngOnInit(): void {
    console.log("ngOnInit of ideas component fired!")
    this.dataService.getIdeas().subscribe( ideas => {
      this.ideas = ideas;
    })

    this.dataService.dataChanged.subscribe( ()=> {
    this.dataService.getIdeas().subscribe(ideas => {
      console.log()
      this.ideas = ideas;
    })})

    // this.dataRetrievedSubscription = this.dataService.dataRetrieved.subscribe( ()=> {
    //   this.ideas = this.dataService.ideas;
    //   console.log("DUPADUPA")
    //   console.log(this.dataService.ideas)
    // })

    this.modeToggleSubscription = this.dataService.modeToggleEmitter.subscribe( (data) => this.modeEnabled = data );
  }

  

  ngOnDestroy() {
    this.modeToggleSubscription.unsubscribe();
    // this.dataRetrievedSubscription.unsubscribe();
  }

}
