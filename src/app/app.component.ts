import { Component } from '@angular/core';
import { ExampleYAML } from './constants/example-yaml';
import YAML from 'yaml';
import { BayesianSensor } from './classes/bayesian-sensor.class';
import { IObserverMeta } from './interfaces/observer-meta.interface'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  public hasImportError: boolean = false;
  public importError: string = '';
  public showCode: boolean = false;
  public textInput: string = ExampleYAML;
  public bayesianSensor: BayesianSensor;
  public observerMetas: IObserverMeta[] = [];

  constructor() {
    this.importInput(); // Display example from YAML
  }

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
