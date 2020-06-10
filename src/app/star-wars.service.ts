import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StarWarsService {

    private characters = [
        { name: 'Luke Skywalker', side: '' },
        { name: 'Darth Vader', side: '' },
        { name: 'Han Solo', side: '' },
    ];
    private logService: LogService;
    charactersChanged = new Subject<void>();
    httpClient: HttpClient;

    constructor(logService: LogService, httpClient: HttpClient) {
        this.logService = logService;
        this.httpClient = httpClient;
    }

  fetchCharacters() {
    this.httpClient.get('https://swapi.dev/api/people').subscribe(
      (data) => {
        const res = data['results'];
        this.characters = res.map(char => {
          return { name: char.name, side: '' };
        });
        this.charactersChanged.next();
      }
    );
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(receivedName, receivedSide) {
    const pos = this.characters.findIndex((char) => {
      return char.name === receivedName;
    });
    if (pos !== -1) {
      return;
    }
    const newChar = {name: receivedName, side: receivedSide};
    this.characters.push(newChar);
  }
}
