import { OrderForm } from "@/components/OrderForm";
import thumb from "@/public/thumb.jpg";
import type { EventType } from "@/types";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  CircularProgress,
  colors,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const { data, isLoading } = useQuery<EventType>({
    queryKey: [],
    queryFn: () => fetch("/api/event").then((r) => r.json()),
  });

  return (
    <>
      <Head>
        <title>Objednejte si lístky {data && ` - ${data.name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </Head>
      <Box sx={{ backgroundColor: colors.blueGrey[50], minHeight: "100vh" }}>
        <main>
          <Container sx={{ py: 5 }}>
            <Stack gap={4}>
              {!isLoading ? (
                data ? (
                  <>
                    <Card sx={{ display: "flex", flexDirection: "row" }}>
                      <CardContent sx={{ width: "100%" }}>
                        <Stack gap={3}>
                          <Typography variant="h1">{data.name}</Typography>

                          <Stack gap={1} direction="row">
                            <EventIcon /> {data.time}
                          </Stack>
                          <Stack gap={1} direction="row">
                            <LocationOnIcon /> {data.place}
                          </Stack>
                        </Stack>
                      </CardContent>
                      <Image
                        src={thumb}
                        alt="Festival thumbnail"
                        height={200}
                      />
                    </Card>

                    <OrderForm variants={data.ticketVariants} />
                  </>
                ) : (
                  <Alert severity="error">
                    <AlertTitle>Error:(</AlertTitle>
                  </Alert>
                )
              ) : (
                <CircularProgress />
              )}
            </Stack>
          </Container>
        </main>
      </Box>
    </>
  );
}
