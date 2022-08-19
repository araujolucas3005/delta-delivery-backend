import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  isAvailable: yup.boolean().notRequired(),
  price: yup.number().required(),
  imageUrl: yup.string().notRequired(),
  productType: yup.lazy((_, { parent }) => {
    if (!parent.productTypeId) {
      return yup.object().shape({
        name: yup.string().min(3).required(),
      });
    }

    return yup.object().strip();
  }),
  productTypeId: yup.lazy((_, { parent }) => {
    if (!parent.productType) {
      return yup.string().uuid().required();
    }

    return yup.string().strip();
  }),
});
