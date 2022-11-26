interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  defaultTransport?: string;
  defaultFuel?: string;
  enableResoluteness?: boolean;
}

export default IUpdateUserDTO;
