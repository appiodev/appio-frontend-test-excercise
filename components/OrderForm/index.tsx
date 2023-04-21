import { TicketOrder, TicketVariant } from "@/types";
import { LinearProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { FC, useState } from "react";
import { OrderContact } from "./OrderContact";
import { OrderTickets } from "./OrderTickets";

type FormStep = "start" | "tickets" | "contact" | "done";

interface Props {
  variants: TicketVariant[];
}

export const OrderForm: FC<Props> = ({ variants }) => {
  const [order, setOrder] = useState<Partial<TicketOrder>>({});
  const [step, setStep] = useState<FormStep>("start");

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={
          {
            start: 0,
            tickets: 33,
            contact: 67,
            done: 100,
          }[step]
        }
      />

      {step === "start" && (
        <Button variant="contained" onClick={() => setStep("tickets")}>
          Objednat lístek
        </Button>
      )}
      {step === "tickets" && (
        <OrderTickets
          variants={variants}
          onSubmit={(t) => {
            setOrder((s) => ({ ...s, tickets: t }));
            setStep("contact");
          }}
        />
      )}
      {step === "contact" && (
        <OrderContact
          onSubmit={(o) => {
            const final = { ...order, ...o };

            setStep("done");
          }}
        />
      )}
      {step === "done" && (
        <>
          <Alert severity="success">
            <AlertTitle>Děkujeme!</AlertTitle>
            <div>Děkujeme za vaši objednávku a brzy vás budeme kontaktovat</div>
            <Button
              sx={{ mt: 3 }}
              variant="outlined"
              color="success"
              onClick={() => {
                setOrder({});
                setStep("start");
              }}
            >
              Objednat další
            </Button>
          </Alert>
        </>
      )}
    </>
  );
};
