export const ExampleYAML = `binary_sensor:
  platform: bayesian
  prior: 0.25
  name: in_bed
  probability_threshold: 0.95
  observations:
    - platform: state
      entity_id: sensor.living_room_motion
      prob_given_true: 0.4
      prob_given_false: 0.2
      to_state: off
    - platform: state
      entity_id: sensor.basement_motion
      prob_given_true: 0.5
      prob_given_false: 0.4
      to_state: off
    - platform: state
      entity_id: sensor.bedroom_motion
      prob_given_true: 0.5
      to_state: on
    - platform: state
      entity_id: sun.sun
      prob_given_true: 0.7
      to_state: below_horizon`;
