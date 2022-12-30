import {validationResult} from 'express-validator';

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('errors you retard');

    res.status(400);
    res.json({errors: errors.array()});
  } else {
    next();
  }
};
