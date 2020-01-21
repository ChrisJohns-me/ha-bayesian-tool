export enum ObservationPlatform {
  state = 'state',
  numeric_state = 'numeric_state',
  template = 'template',
}

export interface IObservation {
  platform: ObservationPlatform;
  entity_id?: string;
  prob_given_true: number;
  prob_given_false?: number;
  to_state?: string; // if platform=state
  below?: number; // if platform=numeric_state
  above?: number; // if platform=numeric_state
  value_template?: string; // if platform=template
}

export class BayesianSensor {
  public platform: 'bayesian';
  public prior: number;
  public name?: string;
  public probability_threshold?: number;
  public observations: Array<IObservation>;

  constructor(private inputObj: BayesianSensor) {
    this.platform = inputObj.platform;
    this.prior = inputObj.prior;
    this.name = inputObj.name;
    this.probability_threshold = inputObj.probability_threshold;
    this.observations = inputObj.observations;
    delete this.inputObj;
  }
}