import { TicketOrder, TicketVariant } from "@/types";
import { ArrowBack } from "@mui/icons-material";
import { LinearProgress, Stack, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
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

  const { error, isLoading, mutate } = useMutation<void, unknown, TicketOrder>({
    mutationFn: async (order) => {
      await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      });
    },
  });

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
        <>
          <Typography variant="h2">Lístky</Typography>
          <OrderTickets
            initialValue={order.tickets}
            variants={variants}
            onSubmit={(t) => {
              console.log(t);
              setOrder((s) => ({ ...s, tickets: t }));
              setStep("contact");
            }}
          />
        </>
      )}
      {step === "contact" && (
        <>
          <Stack gap={1} alignItems="flex-start">
            <Button
              startIcon={<ArrowBack fontSize="small" />}
              onClick={() => setStep("tickets")}
            >
              <Stack gap={0.5} direction="row" alignItems="center">
                <Typography>Zpět</Typography>
              </Stack>
            </Button>
            <Typography variant="h2">Vaše údaje</Typography>
          </Stack>
          <OrderContact
            loading={isLoading}
            onSubmit={(o) => {
              mutate({ ...order, ...o } as Required<TicketOrder>);
              setStep("done");
            }}
          />
          {error && (
            <Alert severity="error">
              <AlertTitle>Chyba</AlertTitle>
              <div>Nepodařilo se odeslat objednávku</div>
            </Alert>
          )}
        </>
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
