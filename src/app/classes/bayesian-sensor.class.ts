export enum ObservationPlatform {
  state = 'state',
  numeric_state = 'numeric_state',
  template = 'template',
}

export class BayesianSensor {
  public binary_sensor: {
    platform: 'bayesian',
    prior: number,
    name?: string,
    probability_threshold?: number,
    observations: Array<{
      platform: ObservationPlatform;
      entity_id?: string;
      prob_given_true: number;
      prob_given_false?: number;
      to_state?: string;
    }>,
  } = {
    platform: 'bayesian',
    prior: 0,
    observations: [{
      platform: ObservationPlatform.state,
      prob_given_true: 1,
    }],
  };
}