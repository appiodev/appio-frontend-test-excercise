import { TicketOrder, TicketVariant } from "@/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";

interface Props {
  variants: TicketVariant[];

  initialValue?: TicketOrder["tickets"];

  onSubmit: (tickets: TicketOrder["tickets"]) => unknown;
}

export const OrderTickets: FC<Props> = ({
  variants,
  initialValue,
  onSubmit,
}) => {
  const [tickets, setTickets] = useState<TicketOrder["tickets"]>(
    initialValue ?? {}
  );

  const valid = Object.values(tickets).reduce((acc, x) => acc + x, 0);

  return (
    <>
      {variants.map((v) => (
        <Card key={v.id}>
          <CardContent sx={{ pb: 1 }}>
            <Stack gap={1}>
              <Stack gap={2} direction="row" alignItems="center">
                <Typography variant="h3" width="100%">
                  {v.title}
                </Typography>
                <Box flex="1 0 auto">{v.price.toLocaleString("cs")} CZK</Box>

                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined primary button group"
                >
                  <Button
                    onClick={() =>
                      setTickets((s) => ({
                        ...s,
                        [v.id]: Math.max((s[v.id] ?? 0) - 1, 0),
                      }))
                    }
                  >
                    -
                  </Button>
                  <Button
                    component="div"
                    sx={{
                      borderRadius: 0,
                      marginLeft: "-1px",
                      fontFamily: "monospace",
                    }}
                    disableRipple
                    disableElevation
                  >
                    {tickets[v.id] ?? 0}
                  </Button>
                  <Button
                    onClick={() =>
                      setTickets((s) => ({
                        ...s,
                        [v.id]: (s[v.id] ?? 0) + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Stack>
              <Typography paragraph sx={{ marginBottom: 0 }}>
                {v.text}
              </Typography>
            </Stack>
          </CardContent>
          {tickets[v.id] > 0 && (
            <Stack sx={{ p: 2, borderTop: "1px dashed" }} direction="row">
              <Box width="100%">Celková cena</Box>
              <Box flex="1 0 auto">
                {(v.price * tickets[v.id]).toLocaleString("cs")} CZK
              </Box>
            </Stack>
          )}
        </Card>
      ))}

      <Paper sx={{ p: 2 }}>
        <Stack gap={1}>
          <Stack gap={2} direction="row" alignItems="center">
            <Typography fontWeight={600} width="100%">
              Celková cena
            </Typography>
            <Box flex="1 0 auto" fontWeight={600}>
              {Object.entries(tickets)
                .reduce(
                  (acc, [id, amount]) =>
                    acc + variants.find((v) => v.id === +id)!.price * amount,
                  0
                )
                .toLocaleString("cs")}{" "}
              CZK
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Button
        variant="contained"
        onClick={() => onSubmit(tickets)}
        disabled={!valid}
      >
        Další krok
      </Button>
    </>
  );
};
