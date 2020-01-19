import { BayesianSensorObservationPlatformEnum } from '../enums/bayesian-sensor-observation-platform.enum';

export interface IBayesianSensor {
  platform: string;
  prior: number;
  observations: IBayesianSensorObservation;
}

export interface IBayesianSensorObservation {
  entity_id: string;
  platform: BayesianSensorObservationPlatformEnum;
  value_template?: string;
  prob_given_true: number;
  prob_given_false?: number;
  to_state?: string;
}
