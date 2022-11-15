import userSchema from './user';
import appointmentSchema from './appointment';
import cardSchema from './card';
import genreDataSchema from './genreData';
import specialityDataComponent from './specialityData';

const schema = {
  ...userSchema,
  ...appointmentSchema,
  ...cardSchema,
  ...genreDataSchema,
  ...specialityDataComponent,
};

export default schema;
