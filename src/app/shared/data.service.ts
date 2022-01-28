import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { Idea } from "./idea.model";

@Injectable({providedIn: 'root'})
export class DataService {
    ideas: Idea[] = [];

    mainUrl : string = 'https://ideas-db592-default-rtdb.firebaseio.com/';
    ideasNode: string = 'ideas';
    jsonExtension: string = ".json";
    ideasUrl: string = this.mainUrl + this.ideasNode
    dataChanged = new Subject<any>();
    dataRetrieved = new Subject<any>();
    modeChosenSubject = new Subject<boolean>();
    modeToggleEmitter = new Subject<boolean>();

    constructor(private http: HttpClient) {
      console.log("constructor of data service fired!")
      console.log(this.ideasUrl)
      // this.getIdeas().subscribe(ideas => {
      //   this.ideas = ideas
      // } );
      // this.dataChanged.subscribe( ()=> {
      //   this.getIdeas().subscribe(ideas => {
      //     this.ideas = ideas;

      //     this.dataRetrieved.next("");
      // })})
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


      return this.http.get<{[key: string] : Idea}[]>(finalUrl)
      .pipe(map(responseData => {
        const ideasArray = [];
        for(const key in responseData) {
          ideasArray.push({...responseData[key], strongId: key})
        }
        return ideasArray;
      }));
    }

    deleteAllIdeas() {
      const finalUrl = this.ideasUrl + this.jsonExtension;
      this.http.delete(finalUrl).subscribe((response)=> console.log("All responses deleted", response));
      this.ideas = [];
    }

    deleteIdea(id: string): Observable<any>{
      const finalUrl = this.ideasUrl + '/' + id + this.jsonExtension
      return this.http.delete(finalUrl);
    }

    getIdea(id: string) : Observable<Idea> {
      return this.getIdeas().pipe(map( ideasArray => {
        const foundIdea = ideasArray.find( s => {
          return s.strongId === id;
        });
        return foundIdea;
      }))
      
    }

    findNextIdeaId(id: string): Observable<string> {
      return this.getIdeas().pipe(map( ideasArray => {
        const foundIdea = ideasArray.find( s => {
          return s.strongId === id;
        });
        const nextIdeaIndex = ideasArray.indexOf(foundIdea) + 1;
        const nextIdeaId = ideasArray[nextIdeaIndex].strongId;
        return nextIdeaId;
      }))
      
    }
    // rather not going to be used anymore
    addIdea(idea : Idea) {
      this.ideas.push(idea)
    }
}


