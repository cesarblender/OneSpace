import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import type { Inputs } from "./index";
import { UseFormReturn } from "react-hook-form";

interface FieldsProps {
  formHook: UseFormReturn<Inputs, any>;
}

interface textFields {
  id: "email" | "password";
  type?: undefined | "email" | "password";
  l: string;
}

const Fields: React.FC<FieldsProps> = ({ formHook }) => {
  const {
    register,
    formState: { errors },
  } = formHook;

  const textFields: textFields[] = [
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
    </Stack>
  );
};

export default Fields;
