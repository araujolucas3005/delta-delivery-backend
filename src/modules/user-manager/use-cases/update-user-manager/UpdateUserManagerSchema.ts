import * as yup from "yup";

export const UpdateUserManagerSchema = yup.object().shape({
  name: yup.string().min(3),
  login: yup.string().min(3),
  password: yup.string().min(3),
});
