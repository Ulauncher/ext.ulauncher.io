const validate = (values, step) => {
  const errors = {};

  if (1 == step) {

    if (!values.project_url) {
      errors.project_url = 'Project url is required';
    }else if (!values.project_url.match(/http(s)?:\/\/(www\.)?github\.com\/[A-z 0-9 _ -]+\/[A-z 0-9 _ -]+\/?/gi)){
      errors.project_url = 'Invalid project url ';
    }
  }

  if (2 == step) {

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.description) {
      errors.description = 'Description is required';
    }
  }
  return errors
};

export default validate