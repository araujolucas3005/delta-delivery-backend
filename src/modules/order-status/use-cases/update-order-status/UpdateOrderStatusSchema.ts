import * as yup from "yup";

export const orderStatusSchema = yup.object().shape({
  status: yup.string().min(3).required(),
});
