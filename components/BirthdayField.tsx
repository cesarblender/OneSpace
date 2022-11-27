import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { UseFormReturn } from "react-hook-form";
import { Inputs } from "./Forms/RegisterForm/index";

interface BirthdayField {
  label: string;
  formHook: UseFormReturn<Inputs, any>;
}

const BirthdayField: React.FC<BirthdayField> = ({ label, formHook }) => {
  const [birthday, setBirthday] = React.useState<Dayjs | null>(
    dayjs("2000-01-01")
  );

  const { register } = formHook;

  const handleBirthday = (birthday: Dayjs | null) => {
    setBirthday(birthday);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={label}
        value={birthday}
        onChange={handleBirthday}
        inputFormat={"DD/MM/YYYY"}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register("birthday", { required: true })}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default BirthdayField;
