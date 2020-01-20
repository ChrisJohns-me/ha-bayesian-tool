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

      this.updateBayesianSensor();
    } catch(error) {
      this.hasImportError = true;
      this.importError = error;
    }
  }

  private updateBayesianSensor(): void {
    if (!this.bayesianSensor || this.bayesianSensor.binary_sensor) return;
    let prior = this.bayesianSensor.binary_sensor.prior;
    for (let obs of this.bayesianSensor.binary_sensor.observations)
      prior = this.updateProbability(prior, obs.prob_given_true, obs.prob_given_false);

    this.bayesianSensor.binary_sensor.prior = prior;
  }

  private updateProbability(prior: number, prob_true: number, prob_false: number): number {
    const numerator = prob_true * prior
    const denominator = numerator + prob_false * (1 - prior)
    const probability = numerator / denominator
    return probability;
  }
}
