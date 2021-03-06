const Livr = require("livr");
Livr.Validator.defaultAutoTrim(true);

const Movie = require("../../models/movie");
const Base = require("../base");

class Delete extends Base {
  async validate(data) {
    const rules = {
      id: ["required"]
    };

    const validator = new Livr.Validator(rules);
    this.validator = validator;
    return validator.validate(data);
  }

  async execute(cleanData) {
    const { id = "" } = cleanData;

    const savedMovie = await Movie.findByPk(id);

    if (!savedMovie) {
      return { status: 404, data: "There no such movie" };
    }

    const movie = await savedMovie.destroy();

    return { status: 201, data: { id } };
  }
}

module.exports = Delete;
