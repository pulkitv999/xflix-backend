const genreList = ["Education", "Sports", "Comedy", "Lifestyle","All"];

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message("{{#label}} must be a valid mongo id");
  }
  return value;
};

const videoLink = (value, helpers) => {
  if (
    !value.match(
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    )
  ) {
    return helpers.message("Invalid Youtube video link");
  }
  return value;
};

const release = (value, helpers) => {
  const date = new Date(value);

  if (isNaN(date)) {
    return helpers.error('any.invalid');
  }

  return date.toISOString();
};

const genre = (value, helpers) => {
  if (value.indexOf(",") > -1) {
      let valueList = value.split(",");

      for (let i = 0; i < valueList.length; i++) {
          if (!genreList.includes(valueList[i]))
          {
              return helpers.message('"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
          }
      }
  }
  else if(!genreList.includes(value))
  {
      return helpers.message('"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
  }
  return value;
};



module.exports = {
    objectId,
    videoLink,
    release,
    genre
  };