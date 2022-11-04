import * as yup from "yup";

export const updateStoreStatusSchema = yup.object().shape({
  status: yup.bool().required(),
});
