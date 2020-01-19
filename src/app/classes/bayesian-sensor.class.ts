export enum ObservationPlatform {
  state = 'state',
  numeric_state = 'numeric_state',
  template = 'template',
}

export class BayesianSensor {
  public platform: 'bayesian' = 'bayesian';
  public prior: number = 0;
  public name?: string;
  public probability_threshold?: number;
  public observations: Array<{
    platform: ObservationPlatform;
    entity_id?: string;
    prob_given_true: number;
    prob_given_false?: number;
    to_state?: string;
  }> = [{
    platform: ObservationPlatform.state,
    prob_given_true: 1,
  }];
}