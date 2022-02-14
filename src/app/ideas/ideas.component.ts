import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { Idea } from '../shared/idea.model';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit, OnDestroy, DoCheck {

  ideas: Array<Idea>;

  modeEnabled: boolean = false;

  modeToggleSubscription: Subscription;

  dataRetrievedSubscription: Subscription;

  filterType = "all";

  constructor(private dataService : DataService, private router:Router) { }

  ngOnInit(): void {
    console.log("ngOnInit of ideas component fired!")
    this.dataService.getIdeas().subscribe( ideas => { 
      this.ideas = ideas;
      console.log(ideas)
    })

    this.dataService.dataChanged.subscribe( ()=> {
    this.dataService.getIdeas().subscribe(ideas => {
      this.ideas = ideas;
      console.log(ideas)

    })})

    // this.dataRetrievedSubscription = this.dataService.dataRetrieved.subscribe( ()=> {
    //   this.ideas = this.dataService.ideas;
    //   console.log("DUPADUPA")
    //   console.log(this.dataService.ideas)
    // })
      // this doesnt work anymore
    this.modeToggleSubscription = this.dataService.modeToggleEmitter.subscribe( (data) => this.modeEnabled = data );
  }


  changeFilterType(type: string) {
    this.filterType = type;
    console.log(this.filterType)
  }

  onDeleteAll() {
    this.dataService.deleteAllIdeas()
  }
  
  ngDoCheck() {
    console.log("do check ble ble")
    console.log(this.filterType)
  }

  ngOnDestroy() {
    this.modeToggleSubscription.unsubscribe();
    // this.dataRetrievedSubscription.unsubscribe();
  }

}
