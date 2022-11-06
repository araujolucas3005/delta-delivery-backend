import * as yup from "yup";
import { validateCPF } from "../../../../shared/utils/validateCPF";

export const createOrderSchema = yup.object().shape({
  clientName: yup.string().required(),
  clientPhoneNumber: yup.string().required(),
  streetName: yup.string().required(),
  houseNumber: yup.string().required(),
  neighborhood: yup.string().required(),
  cpf: yup
    .string()
    .required()
    .test("valid-cpf", (cpf?: string) =>
      validateCPF(cpf!.replaceAll(/[.-]/g, "")),
    ),
  zipcode: yup
    .string()
    .matches(/^([0-9]{8})|([0-9]{5}-[0-9]{3})$/, "Invalid zipcode (CEP)")
    .required(),
  change: yup.number().optional(),
  observation: yup.string().optional(),
  paymentMethod: yup.string().required(),
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().uuid().required(),
        productSizeId: yup.string().optional(),
        quantity: yup.number().optional(),
      }),
    )
    .min(1)
    .required(),
});
