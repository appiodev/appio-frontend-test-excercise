import { EventType } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const event: EventType = {
  name: "Hezkej fesťák",
  place: "Argentinská 26, Praha",
  time: "4. dubna 2024",
  ticketVariants: [
    {
      id: 1,
      title: "Basic",
      price: 1200,
      text: `K ze by sleduje spodní zambezi ano oblečený monopol krásné,
    postavené, nalezeny světěpodzemní bombardují přes i ústní.
    Stole přes životním propadly, rybářský mé ně mi alpách u
    evropa materiál ať zveřejněná feromon k bobří slavnosti,
    ukázky podrobili a vzhledem. Síť snažit či prohlásil okouzlí.`,
    },
    {
      id: 2,
      title: "Premium",
      price: 1700,
      text: `K ze by sleduje spodní zambezi ano oblečený monopol krásné,
    postavené, nalezeny světěpodzemní bombardují přes i ústní.
    Stole přes životním propadly, rybářský mé ně mi alpách u
    evropa materiál ať zveřejněná feromon k bobří slavnosti,
    ukázky podrobili a vzhledem. Síť snažit či prohlásil okouzlí.`,
    },
    {
      id: 3,
      title: "Swag",
      price: 9999,
      text: `K ze by sleduje spodní zambezi ano oblečený monopol krásné,
    postavené, nalezeny světěpodzemní bombardují přes i ústní.
    Stole přes životním propadly, rybářský mé ně mi alpách u
    evropa materiál ať zveřejněná feromon k bobří slavnosti,
    ukázky podrobili a vzhledem. Síť snažit či prohlásil okouzlí.`,
    },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  res.status(200).json(event);
}
