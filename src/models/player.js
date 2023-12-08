export default class Player {
  constructor(
    first_name,
    last_name,
    position,
    height_feet,
    height_inches,
    weight_pounds,
    team,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.position = position;
    this.height_feet = height_feet;
    this.height_inches = height_inches;
    this.weight_pounds = weight_pounds;
    this.team = team;
  }

  static fromJSON(data) {
    return new Player(
      data.first_name,
      data.last_name,
      data.position,
      data.height_feet,
      data.height_inches,
      data.weight_pounds,
      data.team,
    );
  }
}
