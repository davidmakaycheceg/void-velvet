import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const BOOKSY_URL = "https://booksy.com/es-es/167828_sky-club_barberia_58087_valencia";
export const INSTAGRAM_URL = "https://www.instagram.com/skyclub_es/";
export const SKY_STORE_MEN_URL = "https://hormaycuero.lovable.app";
export const MARY_KAY_SHOP_URL = "https://www.marykay.es/skyskinclub/es/cuidado-de-la-piel?utm_source=shopmanager&utm_medium=QRCode&utm_campaign=sharemyshop";

// Keep the club's distributor attribution until its direct shop URL is supplied.
export const FUXION_SHOP_URL = buildWhatsAppUrl(
  "Hola SKY CLUB, quiero el enlace de compra de vuestro distribuidor FuXion.",
);
export const JEWELRY_URL = buildWhatsAppUrl(
  "Hola SKY CLUB, me interesa comprar joyería. ¿Podéis enviarme las piezas disponibles y sus precios?",
);
export const DIET_URL = buildWhatsAppUrl("Hola SKY CLUB, quiero una dieta personalizada.");
export const ROUTINE_URL = buildWhatsAppUrl("Hola SKY CLUB, quiero una rutina personalizada.");
export const FULL_PLAN_URL = buildWhatsAppUrl("Hola SKY CLUB, quiero el pack de dieta y rutina personalizadas.");
