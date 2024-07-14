import {
  BellRing,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CalendarClock,
  CircleAlert,
  House,
  Mail,
  MapPin,
  MessageCircleQuestion,
  Phone,
  Video,
  Wallet,
} from "lucide-react";

const navigationLinks = [
  { title: "recuitment", href: "/recuitment", icon: BriefcaseBusiness },
  { title: "contactUs", href: "/contact-us", icon: BriefcaseBusiness },
  { title: "pricing", href: "/pricing", icon: Wallet },
  { title: "blogs", href: "/blogs", icon: Building2 },
  { title: "aboutUs", href: "/about-us", icon: CircleAlert },
  { title: "home", href: "/site", icon: House },
];

const consultingServiceFeatures = [
  {
    title: "cardFeatureAppointmentTitle",
    description: "cardFeatureAppointmentDescription",
    icon: CalendarCheck2,
  },
  {
    title: "cardFeatureNotificationTitle",
    description: "cardFeatureNotificationDescription",
    icon: BellRing,
  },
  {
    title: "cardFeatureMeetingTitle",
    description: "cardFeatureMeetingDescription",
    icon: Video,
  },
  {
    title: "cardFeatureSatisfactionTitle",
    description: "cardFeatureSatisfactionDescription",
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

const adminNavigationLinks = [
  { title: "لوحة التحكم الرئيسية", href: "/site", icon: House },
  { title: "الخدمات الهندسية", href: "/admin-dashboard/engineering-services", icon: CircleAlert },
  { title: "الإستشارات", href: "/projects", icon: Building2 },
  { title: "التسعير", href: "/pricing", icon: Wallet },
  { title: "التوظيف", href: "/recuitment", icon: BriefcaseBusiness },
  { title: "الدعم الفني", href: "/recuitment", icon: BriefcaseBusiness },
];

export { navigationLinks, consultingServiceFeatures, agencyInfo, adminNavigationLinks };
