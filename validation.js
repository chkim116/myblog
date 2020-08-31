import Joi from "@hapi/joi";

// 레지스터 validation
export const registerValidation = (data) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = {
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  };
  return schema.validate(data);
};
