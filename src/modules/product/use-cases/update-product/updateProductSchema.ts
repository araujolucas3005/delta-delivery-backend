import * as yup from "yup";

export const updateProductSchema = yup.object().shape({
  name: yup.string().min(3).notRequired(),
  description: yup.string().min(3).notRequired(),
  isAvailable: yup.boolean().notRequired(),
  price: yup.number().notRequired(),
  imageUrl: yup.string().notRequired(),
});
