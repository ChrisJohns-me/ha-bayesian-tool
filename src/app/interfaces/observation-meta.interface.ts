import { BayesianSensor, IObservation } from '../classes/bayesian-sensor.class';

export interface IObservationMeta {
  simulateState?: string;
  hoursGivenTrue?: number;
  hoursGivenFalse?: number;
  totalHours?: number;
  observation: IObservation;
}
