import * as yup from "yup";

export const createUserManagerSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  login: yup.string().min(3).required(),
  password: yup.string().min(3).required(),
});
