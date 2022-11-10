interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  defaultTransport?: string;
  defaultFuel?: string;
  defaultResoluteness?: string;
}

export default IUpdateUserDTO;
