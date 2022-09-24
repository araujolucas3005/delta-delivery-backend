import * as yup from "yup";

export const updateProductSizeSchema = yup.object().shape({
  unit: yup.string().notRequired(),
  value: yup.string().notRequired(),
});
