import userSchema from './user';
import appointmentSchema from './appointment';
import cardSchema from './card';
import sexDataSchema from './sexData';
import specialityDataComponent from './specialityData';
import configsComponent from './configs';

const schema = {
  ...userSchema,
  ...appointmentSchema,
  ...cardSchema,
  ...sexDataSchema,
  ...specialityDataComponent,
  ...configsComponent,
};

export default schema;
