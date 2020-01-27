import { Component } from '@angular/core';
import { ExampleYAML } from './constants/example-yaml';
import YAML from 'yaml';
import { BayesianSensor, IObservation } from './classes/bayesian-sensor.class';
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

  public findObservations(entityId: string): IObservation[] {
    return this.bayesianSensor.observations.filter(obs => obs.entity_id === entityId);
  }

  public findSensor(entityId: string): ISensor {
    return this.simulatedSensors.find(s => s.entity_id === entityId);
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
          state: 'off',
        });
      });
  }

  /**
   * Loosely based off of Home Assistant's Bayesian "async_added_to_hass" method
   */
  private updateBayesianSensor(): void {
    if (!this.bayesianSensor) return;
    let prior = this.bayesianSensor.prior;

    this.bayesianSensor.observations
      .filter(obs => !!this.simulatedSensors.find(s => s.entity_id === obs.entity_id && s.state === obs.to_state))
      .forEach(obs => prior = this.updateProbability(prior, obs.prob_given_true, obs.prob_given_false));

    this.calculatedProbability = prior;
  }

  /**
   * Based off of Home Assistant's Bayesian "update_probability" method
   */
  private updateProbability(prior: number, prob_true: number, prob_false: number = 1 - prob_true): number {
    const numerator = prob_true * prior
    const denominator = numerator + prob_false * (1 - prior)
    const probability = numerator / denominator
    return probability;
  }
}
