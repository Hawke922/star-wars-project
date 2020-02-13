import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [{display: 'None', value: ''}, {display: 'Light', value: 'dark'}, {display: 'Dark', value: 'light'}];
  swService: StarWarsService;

  constructor(swSerivce: StarWarsService) {
    this.swService = swSerivce;
  }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    console.log(submittedForm.value);
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side);
  }
}
