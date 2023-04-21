import { TicketOrder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { z } from "zod";

interface Props {
  loading?: boolean;
  onSubmit: (order: Form) => unknown;
}

type Form = Omit<TicketOrder, "tickets">;

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone),
});

export const OrderContact: FC<Props> = ({ onSubmit, loading }) => {
  const [consent, setConsent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors: { root, ...errors },
    },
  } = useForm<Form>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const labelProps = (key: keyof Form) => ({
    ...register(key),
    error: !!errors[key],
    helperText: errors[key]?.message,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Card>
          <CardContent>
            <Stack gap={2}>
              <TextField
                required
                label="Celé jméno"
                variant="filled"
                {...labelProps("name")}
              />

              <TextField
                required
                label="Email"
                variant="filled"
                {...labelProps("email")}
              />

              <TextField
                required
                label="Telefonní číslo"
                variant="filled"
                {...labelProps("phone")}
              />

              <FormControlLabel
                required
                control={
                  <Checkbox
                    checked={consent}
                    onChange={() => setConsent((s) => !s)}
                  />
                }
                label="Souhlasím s úplně vším"
              />
            </Stack>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          type="submit"
          disabled={!consent || !!Object.keys(errors).length}
          startIcon={loading && <CircularProgress color="info" size={24} />}
        >
          Odeslat
        </Button>
      </Stack>
    </form>
  );
};
