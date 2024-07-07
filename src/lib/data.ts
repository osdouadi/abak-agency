import { BellRing, CalendarCheck2, CalendarClock, Mail, MapPin, MessageCircleQuestion, Phone, Video } from "lucide-react";

const navigationLinks = [
    { title: "الرئيسية", href: "/site", },
    { title: "من نحن", href: "/about" },
    { title: "مشاريعنا", href: "/projects" },
    { title: "التسعير", href: "/pricing" },
  { title: "التوظيف", href: "/recuitment" },
];

const consultingServiceFeatures = [
  {
    title: "احجز موعد يناسبك",
    description: "عبي إستمارة البيانات و اختار توقيت إجتماع تشوفه مناسب",
    icon: CalendarCheck2,
  },
  {
    title: "اتلقى إشعار الإجتماع",
    description: "فريقنا رح يدرس طلبك و يرسلك إشعار في أقرب وقت",
    icon: BellRing,
  },
  {
    title: "إجتماعك عبر الإنترنت",
    description: "مستشارنا رح يقدملك الإستشارة عن بعد",
    icon: Video,
  },
  {
    title: "رضاك اكثر ما يهمنا",
    description: "خبرائنا يخلوا كل استفساراتك عندها حلول",
    icon: MessageCircleQuestion,
  },
];

const agencyInfo = [
  {
    title: "رقم الهاتف",
    details: "2169 122 53 966+",
    icon: Phone,
  },
  {
    title: "البريد الإلكتروني",
    details: "info@abak.com.sa",
    icon: Mail,
  },
  {
    title: "العنوان",
    details: "الرياض الملز شارع الظهران -المملكة العربية السعودية",
    icon: MapPin,
  },
  {
    title: "ساعات العمل",
    details:
     " لأحد إلى الخميس من الساعة الثامنة صباحا الى غاية الرابعة مساءا || يوم السبت من الساعة الواحدة مساءا ألى غاية الرابعة مساءا",
    icon: CalendarClock,
  },
];

export { navigationLinks, consultingServiceFeatures, agencyInfo };
