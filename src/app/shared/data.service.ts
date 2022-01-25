import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { Idea } from "./idea.model";

@Injectable({providedIn: 'root'})
export class DataService {
    ideas: Idea[] = []
    mainUrl : string = 'https://ideas-db592-default-rtdb.firebaseio.com/';
    ideasNode: string = 'ideas';
    jsonExtension: string = ".json";
    ideasUrl: string = this.mainUrl + this.ideasNode
    ideasCounter: number;
    dataChanged = new Subject<any>();
    dataRetrieved = new Subject<any>();

    modeToggleEmitter = new Subject<boolean>();

    constructor(private http: HttpClient) {
      this.getIdeas().subscribe(ideas => this.ideas = ideas);
      this.dataChanged.subscribe( ()=> {
        this.getIdeas().subscribe(ideas => {
          this.ideas = ideas;
          console.log("dupaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

          this.dataRetrieved.next("");
      })})
    }



    postIdea(body: Idea) {
      const finalUrl = this.ideasUrl + this.jsonExtension
      this.http.post<{name: string}>(finalUrl, body)
      .subscribe( response => console.log("POST request sent!", response));
      this.dataChanged.next("");
    }

    putIdea(strongId: string, body: Idea) {
      const finalUrl = this.ideasUrl + '/' + strongId + this.jsonExtension;
      this.http.put(finalUrl, body).subscribe(response=> {
        console.log("put request done", response);
        this.dataChanged.next("");
      });

    }

    getIdeas(): Observable<Idea[]> {
      const finalUrl = this.ideasUrl + this.jsonExtension;

      const ideasArray = [];

      return this.http.get<{[key: string] : Idea}[]>(finalUrl)
      .pipe(map(responseData => {
        for(const key in responseData) {
          ideasArray.push({...responseData[key], strongId: key})
        }
        return ideasArray;
      }));


    }

    deleteAllIdeas() {
      const ideasUrl = this.mainUrl + this.ideasNode;

      this.http.delete(ideasUrl).subscribe((response)=> console.log("All responses deleted", response));
      this.ideas = [];
    }


    // incrementIdeasCounter() : number {
    //   this.ideasCounter++;
    //   return this.ideasCounter;
    // }

    addIdea(idea : Idea) {
      this.ideas.push(idea)
    }

    getIdea(id: string) : Idea {
      const foundIdea = this.ideas.find( s => {
        return s.strongId === id;
      });
      return foundIdea;
    }

    findNextIdeaId(id: string) {
      const currentIdea = this.getIdea(id);
      const nextIdeaIndex = this.ideas.indexOf(currentIdea) + 1;
      const nextIdeaId = this.ideas[nextIdeaIndex].strongId;
      return nextIdeaId;
    }

    editIdea(id: string, idea: Idea) {
      // const foundIdea = this.ideas.find( s => {
      //   return s.strongId === id;
      // });
      // foundIdea.title = idea.title;
      // foundIdea.content = idea.content;
      this.putIdea(id, idea);
    }


}


