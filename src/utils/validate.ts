import Joi from 'joi';

export const validateUser = (user: Record<string, any>) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string(),
  });

  return schema.validate(user);
};

