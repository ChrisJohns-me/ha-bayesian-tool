export const ExampleYAML = `binary_sensor:
  platform: bayesian
  prior: 0.65
  name: Home Presence
  probability_threshold: 0.7
  observations:
    - platform: state
      entity_id: binary_sensor.user1_presence
      prob_given_true: 0.8
      to_state: on
    - platform: state
      entity_id: binary_sensor.user2_presence
      prob_given_true: 0.85
      to_state: on
    - platform: state
      entity_id: binary_sensor.user3_presence
      prob_given_true: 0.6
      to_state: on`;
