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
    }]
  };

  constructor(private inputObj: any) {
    if (this.isBinarySensorObj(inputObj)) this.binary_sensor = inputObj.binary_sensor;
    else this.binary_sensor = inputObj;
  }

  private isBinarySensorObj(obj: any): boolean {
    return !!obj && !!obj.binary_sensor && typeof(obj.binary_sensor) === 'object';
  }
}