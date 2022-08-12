import * as yup from "yup";

export const createProductTypeSchema = yup.object().shape({
  name: yup.string().min(3).required(),
});
