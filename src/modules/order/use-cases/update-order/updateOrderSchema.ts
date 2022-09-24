import * as yup from "yup";

export const updateOrderSchema = yup.object().shape({
  statusId: yup.string().uuid().required(),
});
