import * as yup from "yup";

export const OrderStatusSchema = yup.object().shape({
  status: yup.string().min(3).required(),
});
