import * as yup from "yup";

export const UpdateUserManagerSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().min(3),
  login: yup.string().min(3),
  password: yup.string().min(3),
});
