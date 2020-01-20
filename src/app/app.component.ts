import { Component } from '@angular/core';
import { ExampleYAML } from './constants/example-yaml';
import YAML from 'yaml';
import { BayesianSensor } from './classes/bayesian-sensor.class';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  public hasImportError: boolean = false;
  public importError: string = '';
  public showImport: boolean = false;
  public textInput: string = ExampleYAML;
  public bayesianSensor: BayesianSensor;

  constructor() { }

  public importInput(): void {
    let parsedInput: any;
    this.hasImportError = false;

    try {
      parsedInput = YAML.parse(this.textInput);
      this.bayesianSensor = new BayesianSensor(parsedInput);
    } catch(error) {
      this.hasImportError = true;
      this.importError = error;
    }
  }
}
