import * as yup from "yup";

export const createPaymentMethodSchema = yup.object().shape({
  type: yup.string().min(3).required(),
});
