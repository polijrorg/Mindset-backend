import userSchema from './user';
import appointmentSchema from './appointment';
import cardSchema from './card';
import genreDataSchema from './genreData';

const schema = {
  ...userSchema,
  ...appointmentSchema,
  ...cardSchema,
  ...genreDataSchema,
};

export default schema;
