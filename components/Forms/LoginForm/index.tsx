import * as React from "react";
import Fields from "./fields";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "./mutation.gql";
import dayjs from "dayjs";
import { useI18next, Trans } from 'gatsby-plugin-react-i18next';
import { useCookies } from "react-cookie";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type Inputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const form = useForm<Inputs>();
  const [registerMutation, { loading, error, reset }] = useMutation(
    REGISTER_MUTATION,
    {
      onError: (err) => {
        console.error(err);
      },
    }
  );
  const { t, navigate } = useI18next();
  const [_cookies, setCookie] = useCookies(["accessToken", "expiresIn"]);

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    const { data, errors } = await registerMutation({
      variables: {
        email: form.email,
        password: form.password,
      },
    });

    if (!!error || !!errors) {
      console.error(errors);
      return;
    }

    setCookie("accessToken", data.login.accessToken, { path: "/" });
    setCookie("expiresIn", data.login.expiresIn, { path: "/" });

    navigate("/feed");
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
          {!loading && <Trans i18nKey="continue" />}
          {loading && <Trans i18nKey="loading" />}
        </Button>
        <Button
          onClick={() => navigate("/auth/register")}
          fullWidth
          variant="text"
          sx={{ marginY: 2 }}
        >
          <Trans i18nKey="not_registered" />
        </Button>
      </form>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={reset}
      >
        <Alert onClose={reset} severity="error" sx={{ width: "100%" }}>
          {error?.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default LoginForm;
