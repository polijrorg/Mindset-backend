import userSchema from './user';
import appointmentSchema from './appointment';
import cardSchema from './card';
import sexDataSchema from './sexData';
import specialityDataComponent from './specialityData';

const schema = {
  ...userSchema,
  ...appointmentSchema,
  ...cardSchema,
  ...sexDataSchema,
  ...specialityDataComponent,
};

export default schema;
