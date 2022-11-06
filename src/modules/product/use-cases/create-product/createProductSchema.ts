import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  isAvailable: yup.boolean().notRequired(),
  price: yup.lazy((_, { parent }) => {
    if (parent.sizes) {
      return yup.string().optional();
    }

    return yup.number().required();
  }),
  imageUrl: yup.string().notRequired(),
  sizes: yup.lazy((_, { parent }) => {
    if (parent.price) {
      return yup.array().optional();
    }

    return yup
      .array()
      .of(
        yup.object({
          id: yup.string().uuid().required(),
          price: yup.number().required(),
        }),
      )
      .min(1);
  }),
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
