 function validateInput(inp) {
    const schema = Joi.object({
      genre: Joi.string().min(3).required(),
    });
  
    const result = schema.validate(inp);
  
    return result;
  }

  export default validateInput