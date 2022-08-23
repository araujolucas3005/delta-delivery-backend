import * as yup from "yup";

export const updateProductTypeSchema = yup.object().shape({
  // required because there is no other attribute
  name: yup.string().min(3).required(),
});
