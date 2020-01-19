import { Component } from '@angular/core';
import { IBayesianSensor } from './interfaces/bayesian-sensor.interface';
import { ExampleYAML } from './constants/example-yaml';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {

  public get textInput(): string { return this._textInput; }
  public set textInput(value: string) {
    this._textInput = value;
    this.refresh();
  }

  private _textInput: string = ExampleYAML;

  constructor() { }

  public refresh(): void {
    
  }
}
