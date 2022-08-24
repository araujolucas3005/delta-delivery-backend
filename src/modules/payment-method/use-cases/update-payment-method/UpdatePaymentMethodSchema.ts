import * as yup from "yup";

export const UpdatePaymentMethodSchema = yup.object().shape({
  type: yup.string().min(3).required(),
});
