import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import GenderField from "../../GenderField";
import BirthdayField from "../../BirthdayField";
import { Inputs } from "./index";
import { UseFormReturn } from "react-hook-form";

interface FieldsProps {
  formHook: UseFormReturn<Inputs, any>;
}

interface textFields {
  id: "first_name" | "last_name" | "user_name" | "email" | "password";
  type?: undefined | "email" | "password";
  l: string;
}

const Fields: React.FC<FieldsProps> = ({ formHook }) => {
  const {
    register,
    formState: { errors },
  } = formHook;

  const textFields: textFields[] = [
    { id: "first_name", l: "Primer nombre" },
    { id: "last_name", l: "Apellido" },
    { id: "user_name", l: "Nombre de usuario" },
    { id: "email", type: "email", l: "Correo electrónico" },
    { id: "password", type: "password", l: "Contraseña" },
  ];

  return (
    <Stack spacing={2} sx={{ marginY: 2 }}>
      {textFields.map((item, i) => (
        <TextField
          label={item.l}
          type={item.type}
          key={i}
          error={!!errors[item.id]}
          {...register(item.id, { required: true })}
        />
      ))}
      <GenderField label={"Género"} formHook={formHook} />
      <BirthdayField label={"Cumpleaños"} formHook={formHook} />
    </Stack>
  );
};

export default Fields;
