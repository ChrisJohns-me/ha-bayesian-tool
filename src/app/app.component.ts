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
  public calculatedProbability: number = 0;
  public calculatedResult: boolean = false;

  constructor() {
    this.importInput(); // Display example from YAML
    this.updateCode();
  }

  public importInput(): void {
    let parsedInput: any;
    this.hasImportError = false;

    try {
      parsedInput = YAML.parse(this.textInput);
      this.bayesianSensor = new BayesianSensor(parsedInput.binary_sensor);

      this.updateBayesianSensor();
    } catch(error) {
      this.hasImportError = true;
      this.importError = error;
    }
  }

  public updateCode(): void {
    this.textInput = YAML.stringify({ binary_sensor: this.bayesianSensor });
  }

  private updateBayesianSensor(): void {
    if (!this.bayesianSensor) return;
    let prior = this.bayesianSensor.prior;
    for (let obs of this.bayesianSensor.observations)
      prior = this.updateProbability(prior, obs.prob_given_true, obs.prob_given_false);

    this.calculatedProbability = prior;
  }

  private updateProbability(prior: number, prob_true: number, prob_false: number): number {
    const numerator = prob_true * prior
    const denominator = numerator + prob_false * (1 - prior)
    const probability = numerator / denominator
    return probability;
  }
}
