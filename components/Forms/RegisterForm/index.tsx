import * as React from "react";
import Fields from "./fields";
import { SubmitHandler, useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";
import { useRouter } from "next/router";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  password: string;
  birthday: string;
  gender: string;
};

const RegisterForm: React.FC = () => {
  const form = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    try {
      setLoading(true);
      const { status, data } = await axios.post("/api/auth/register", {
        firstName: form.first_name,
        lastName: form.last_name,
        userName: form.user_name,
        email: form.email,
        password: form.password,
        gender: form.gender,
        birthday: form.birthday,
      });

      if (status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }

      router.replace("/auth/check-email");
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
      return;
    }
  };

  const reset = () => {
    setError("");
  };

  return (
    <React.Fragment>
      <form style={{ width: "100%" }} onSubmit={form.handleSubmit(onSubmit)}>
        <Fields formHook={form} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {!loading && "Continuar"}
          {loading && "Cargando..."}
        </Button>
        <Button onClick={() => {}} fullWidth variant="text" sx={{ marginY: 2 }}>
          Ya estoy registrado
        </Button>
      </form>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={reset}>
        <Alert onClose={reset} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default RegisterForm;
