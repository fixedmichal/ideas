import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-idea-details-menu',
  templateUrl: './idea-details-menu.component.html',
  styleUrls: ['./idea-details-menu.component.scss']
})
export class IdeaDetailsMenuComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
  }

  goToEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    this.dataService.modeChosenSubject.next(true)
  }

  goToDelete() {
    this.router.navigate(['delete'], {relativeTo: this.route})
    this.dataService.modeChosenSubject.next(true)

  }

  goBack() {
    this.router.navigate(['/ideas'])

  }

}
