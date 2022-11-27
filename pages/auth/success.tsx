import * as React from "react";
import Typography from "@mui/material/Typography";
import RegisterForm from "../../components/Forms/RegisterForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function CheckEmail() {
  return (
    <AuthLayout>
      <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
        Te haz registrado con éxito
      </Typography>
      <Typography variant="body2" component="p" sx={{ textAlign: "center" }}>
        A partir del lunes (28/11/2022) habilitaremos toda la plataforma para los usuarios registrados previamente. Para más información, comunícate con Soporte para OneSpace support@onespace.tk.
      </Typography>
    </AuthLayout>
  );
};
