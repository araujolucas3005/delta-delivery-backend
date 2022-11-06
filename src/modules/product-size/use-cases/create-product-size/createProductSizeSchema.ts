import * as yup from "yup";

export const createProductSizeSchema = yup.object().shape({
  unit: yup.string().required(),
  value: yup.string().required(),
});
