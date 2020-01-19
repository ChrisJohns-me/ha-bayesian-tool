import { Component, OnInit } from '@angular/core';
import { ExampleYAML } from './constants/example-yaml';
import YAML from 'yaml';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public get textInput(): string { return this._textInput; }
  public set textInput(value: string) {
    this._textInput = value;
    this.refresh();
  }
  public textOutput: string;

  private _textInput: string = ExampleYAML;

  constructor() { }

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    const parsedInput = YAML.parse(this.textInput);
    const jsonInput = JSON.stringify(parsedInput);
    this.textOutput = jsonInput;
  }

  private isBinarySensorObj(obj: any): boolean {
    return !!obj && !!obj.binary_sensor && typeof(obj.binary_sensor) === 'object';
  }
}
