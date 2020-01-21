import { Component } from '@angular/core';
import { ExampleYAML } from './constants/example-yaml';
import YAML from 'yaml';
import { BayesianSensor } from './classes/bayesian-sensor.class';
import { ISensor } from './interfaces/sensor.interface'

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
  public simulatedSensors: ISensor[] = [];
  public calculatedProbability: number = 0;
  public get calculatedResult(): boolean {
    return !!this.bayesianSensor && this.calculatedProbability >= this.bayesianSensor.probability_threshold;
  }

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
      this.importSensors();

      this.updateBayesianSensor();
    } catch(error) {
      this.hasImportError = true;
      this.importError = error;
    }
  }

  public updateCode(): void {
    this.textInput = YAML.stringify({ binary_sensor: this.bayesianSensor });
  }

  /**
   * Creates simulated sensors based off of the observations list
   */
  private importSensors(): void {
    this.bayesianSensor.observations
      .filter(obs => !this.simulatedSensors.find(s => s.entity_id === obs.entity_id))
      .forEach(obs => {
        this.simulatedSensors.push({
          entity_id: obs.entity_id,
          state: false,
        });
      });
  }

  private updateBayesianSensor(): void {
    if (!this.bayesianSensor) return;
    let prior = this.bayesianSensor.prior;
    for (let obs of this.bayesianSensor.observations)
      prior = this.updateProbability(prior, obs.prob_given_true, obs.prob_given_false);

    this.calculatedProbability = prior;
  }

  private updateProbability(prior: number, prob_true: number, prob_false: number = 1 - prob_true): number {
    const numerator = prob_true * prior
    const denominator = numerator + prob_false * (1 - prior)
    const probability = numerator / denominator
    return probability;
  }
}
