import * as React from "react";
import Typography from "@mui/material/Typography";
import RegisterForm from "../../components/Forms/RegisterForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function CheckEmail() {
  return (
    <AuthLayout>
      <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
        Verifica tu correo para el Pre-Registro
      </Typography>
      <Typography variant="body2" component="p" sx={{ textAlign: "center" }}>
        Hemos enviado un mensaje a tu correo, desde support@onespace.tk (Soporte para OneSpace). Al abrir el enlace, verificará automáticamente tu cuenta.
      </Typography>
    </AuthLayout>
  );
};
