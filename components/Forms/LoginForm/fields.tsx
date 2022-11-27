export {}
// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import GenderField from "../../GenderField";
// import BirthdayField from "../../BirthdayField";
// import { Inputs } from "./index";
// import { UseFormReturn } from "react-hook-form";

// interface FieldsProps {
//   formHook: UseFormReturn<Inputs, any>;
// }

// interface textFields {
//   id: "email" | "password";
//   type?: undefined | "email" | "password";
// }

// const Fields: React.FC<FieldsProps> = ({ formHook }) => {
//   const {
//     register,
//     formState: { errors },
//   } = formHook;

//   const textFields: textFields[] = [
//     { id: "email", type: "email" },
//     { id: "password", type: "password" },
//   ];

//   return (
//     <Stack spacing={2} sx={{ marginY: 2 }}>
//       {textFields.map((item, i) => (
//         <TextField
//           label={item.id}
//           type={item.type}
//           key={i}
//           error={!!errors[item.id]}
//           {...register(item.id, { required: true })}
//         />
//       ))}
//     </Stack>
//   );
// };

// export default Fields;
