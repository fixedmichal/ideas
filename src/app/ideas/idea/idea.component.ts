import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Idea } from 'src/app/shared/idea.model';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {
  @Input() idea: Idea;
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    console.log("oninit of IDEA component fired")
    
  }

  onIdeaEdit(ideaId: string) {
    this.router.navigate([`/${ideaId}`, 'details']);
  }

}
