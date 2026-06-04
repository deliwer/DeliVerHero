import { Helmet } from "react-helmet";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import mamzarHeroImg from "@assets/mamzar-hero.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Waves, MapPin, CheckCircle2, MessageCircle, ArrowRight,
  Building2, Eye, Sun, Users, Zap, Video, Star, Clock,
  Handshake, Globe2, Phone, TrendingUp, Shield, Award,
  ChevronRight, Rocket, Share2, BadgeCheck, Sparkles,
  CalendarClock, Wallet, Home, TreePine, Dumbbell, Coffee,
  Menu, X, Copy, Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { SiTelegram } from "react-icons/si";

const WA = "971523906019";
const TG = "https://t.me/+971523946311";
const waUrl = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const tgUrl = (msg: string) => `${TG}?start=${encodeURIComponent(msg)}`;

// ── i18n ──────────────────────────────────────────────────────────────────────
type Lang = "en" | "ru" | "zh";

const STRINGS = {
  en: {
    flag: "🇬🇧", label: "EN",
    // Nav
    navEoi: "Register EOI",
    // Hero
    heroHeadline: "Discover Dubai's Next Waterfront Neighbourhood Before Global Attention Arrives",
    heroSub: "Founder-guided virtual tours · Beachfront ownership from AED 849,000 · Priority access for investors and referral brokers",
    num1BR: "1BR from", numBook: "Booking fee", numPlan: "Payment plan", numDel: "Delivery",
    ctaEoi: "Register Priority Access", ctaTg: "Join Telegram", ctaWa: "WhatsApp Us",
    tgNote: "Telegram preferred · CIS · Russia · Asia · Global",
    brokersJoined: "brokers already registered",
    // Overview
    overviewLabel: "About the Project",
    overviewH: "Six towers. 325 metres of waterfront. One defining moment.",
    overviewP: "Alef Linar rises along the shores of Al Mamzar — Sharjah's most anticipated waterfront address — where the Arabian Gulf meets Dubai's skyline. Designed for families and investors who want Sharjah's calm with Dubai's nine-minute door.",
    statWaterfront: "Waterfront", statViews: "Sea views", statResidences: "Residences", statDelivery: "Delivery",
    // Units
    unitsLabel: "Pricing & Units",
    unitsH: "Pre-launch pricing. 30/70 plan.",
    unitsP: "AED 20,000 books your unit. 70% only on handover in 2030.",
    unitsFrom: "from",
    payPlanLabel: "30 / 70 Payment Plan",
    payPlanH: "AED 20,000 secures your unit today",
    payPlanSub: "30% during build · 70% on 2030 handover",
    payPlanBtn: "Secure My Unit",
    // Tour
    tourLabel: "Founder-Led Virtual Tour",
    tourH: "We're on the ground.\nYour clients can see it live.",
    tourP: "DeliWer founders are based at Mamzar Beach. We take your client on a live video walk of the site — the waterfront, the tower positions, the Dubai skyline. No flights. Close deals from anywhere.",
    tourBtn: "Book Founder Virtual Tour",
    tourF1T: "30 minutes, any time zone", tourF1D: "Scheduled around your client — UAE, UK, Pakistan, India, China.",
    tourF2T: "Arabic, English, Urdu, Hindi", tourF2D: "We match a founder to your client's language preference.",
    tourF3T: "Registered brokers only", tourF3D: "This service is reserved for DeliWer EOI-registered partners.",
    // Broker Platform
    brokerLabel: "Broker Distribution Platform",
    brokerH: "DeliWer is the infrastructure.\nYou are the distribution.",
    brokerP: "Every broker who registers becomes a tracked distribution channel. We handle site tours, follow-up, and paperwork. You bring the client and collect the commission.",
    brokerCountPrefix: "Join",
    brokerCountSuffix: "brokers already on the platform",
    step1Label: "Register", step1Desc: "Submit your EOI in 60 seconds. Get your unique broker tracking code instantly.",
    step2Label: "Refer", step2Desc: "Share your link with clients and sub-brokers. Every click and lead traces back to you.",
    step3Label: "Earn", step3Desc: "We close the deal on the ground. You earn direct commission plus sub-broker overrides.",
    earningsLabel: "Indicative earnings",
    earn1Unit: "1 Bedroom · AED 849K", earn1Note: "Direct commission",
    earn2Unit: "2 Bedroom · AED 1.384M", earn2Note: "Direct commission",
    earn3Unit: "Sub-broker close", earn3Note: "Trailing override (yours)",
    earningsDisclaimer: "Subject to partnership agreement. Figures are illustrative.",
    shareLabel: "Share & build your network",
    shareH: "Every broker you onboard earns you a trailing override.",
    shareP: "Register now. Share your referral code with other brokers. When they close, you earn too. Build your sub-network from Day 1 — no cost, no risk.",
    brokerCta: "Register & Get My Code", brokerShare: "Share via WhatsApp", brokerTg: "Share via Telegram",
    lbLabel: "Live Leaderboard", lbH: "Top Brokers by Network Size", lbRefs: "referrals", lbYou: "That's you!", lbEmpty: "Be the first to introduce another broker.",
    // Location
    locationLabel: "Location",
    locationH: "Sharjah's calm.\nDubai's 9-minute door.",
    locationP: "Direct access to Al Wuheida Road from Corniche and Al Taawun Street.",
    // EOI Form
    eoiLabel: "Priority Registration",
    eoiH: "Register your interest",
    eoiP: "60 seconds. You'll receive your broker code and a tour slot.",
    eoiName: "Full name", eoiPhone: "WhatsApp number",
    eoiUnit: "Unit interest", eoiUnitPh: "Which unit type?",
    eoiTourLabel: "Book a founder virtual tour",
    eoiTourDesc: "— live WhatsApp video from Mamzar Beach for your client",
    eoiEarlybirdLabel: "Early-bird programme",
    eoiEarlybirdDesc: "— first unit allocation, priority pricing, sub-broker overrides",
    eoiSubmit: "Get My Broker Code",
    eoiDisclaimer: "No commitment. All transactions are direct with Alef Group.",
    eoiSuccessH: "You're in.",
    eoiSuccessP: "A DeliWer partner will contact you on WhatsApp within 1 hour.",
    eoiCodeLabel: "Your Broker Code",
    eoiCodeNote: "Share this code — earn override on every sub-broker close",
    eoiBookTour: "Book Tour Now", eoiShareEarn: "Share & Earn",
    eoiRegisterAnother: "Register another →",
    // Final CTA
    finalH: "Questions? Talk to a DeliWer partner now.",
    finalP: "Available on Telegram & WhatsApp — UAE business hours + all global time zones.",
    finalTgNote: "Telegram preferred for CIS · Russia · China · Southeast Asia · Europe",
    tgPartner: "Telegram a Partner", waPartner: "WhatsApp a Partner",
    shareBtn: "Share with Brokers", shareWa: "Share on WhatsApp",
  },
  ru: {
    flag: "🇷🇺", label: "RU",
    navEoi: "Регистрация",
    heroHeadline: "Откройте следующий прибрежный район Дубая прежде, чем он привлечёт глобальное внимание",
    heroSub: "Виртуальные туры с основателем · Собственность у моря от AED 849 000 · Приоритетный доступ для инвесторов и брокеров",
    num1BR: "1-комн. от", numBook: "Залог", numPlan: "30/70", numDel: "Сдача",
    ctaEoi: "Приоритетный доступ", ctaTg: "Telegram", ctaWa: "WhatsApp",
    tgNote: "Telegram — выбор для СНГ и России",
    brokersJoined: "брокеров уже зарегистрировано",
    overviewLabel: "О проекте",
    overviewH: "Шесть башен. 325 метров береговой линии. Один ключевой момент.",
    overviewP: "Alef Linar возвышается вдоль берегов Аль-Мамзар — самого ожидаемого прибрежного адреса Шарджи, где Аравийский залив встречается с горизонтом Дубая. Создан для семей и инвесторов, которые хотят спокойствия Шарджи и девяти минут до Дубая.",
    statWaterfront: "Набережная", statViews: "Вид на море", statResidences: "Резиденций", statDelivery: "Сдача",
    unitsLabel: "Цены и планировки",
    unitsH: "Цены до запуска. Схема 30/70.",
    unitsP: "AED 20 000 бронирует квартиру. 70% — только при получении ключей в 2030.",
    unitsFrom: "от",
    payPlanLabel: "Схема оплаты 30 / 70",
    payPlanH: "AED 20 000 фиксирует вашу квартиру сегодня",
    payPlanSub: "30% в период строительства · 70% при сдаче в 2030",
    payPlanBtn: "Зафиксировать квартиру",
    tourLabel: "Виртуальный тур с основателем",
    tourH: "Мы на месте.\nВаши клиенты могут увидеть всё вживую.",
    tourP: "Основатели DeliWer находятся рядом с Mamzar Beach. Мы проводим вашего клиента в прямом видеоэфире по территории — набережная, расположение башен, горизонт Дубая. Без перелётов. Закрывайте сделки откуда угодно.",
    tourBtn: "Виртуальный тур с основателем",
    tourF1T: "30 минут, любой часовой пояс", tourF1D: "Время выбирается под клиента — ОАЭ, Великобритания, Пакистан, Индия, Китай.",
    tourF2T: "Арабский, английский, урду, хинди", tourF2D: "Мы подбираем основателя по языковым предпочтениям вашего клиента.",
    tourF3T: "Только для зарегистрированных брокеров", tourF3D: "Услуга доступна исключительно партнёрам DeliWer, зарегистрировавшим EOI.",
    brokerLabel: "Платформа для брокеров",
    brokerH: "DeliWer — инфраструктура.\nВы — дистрибуция.",
    brokerP: "Каждый зарегистрированный брокер становится отслеживаемым каналом продаж. Мы ведём туры, переговоры и документы. Вы приводите клиента и получаете комиссию.",
    brokerCountPrefix: "Уже присоединились",
    brokerCountSuffix: "брокеров",
    step1Label: "Регистрация", step1Desc: "Отправьте EOI за 60 секунд. Получите уникальный код отслеживания мгновенно.",
    step2Label: "Привлечение", step2Desc: "Делитесь ссылкой с клиентами и суб-брокерами. Каждый клик и лид привязывается к вам.",
    step3Label: "Заработок", step3Desc: "Мы закрываем сделку на месте. Вы получаете прямую комиссию и надбавки от суб-брокеров.",
    earningsLabel: "Примерный заработок",
    earn1Unit: "1-комн. · AED 849K", earn1Note: "Прямая комиссия",
    earn2Unit: "2-комн. · AED 1.384M", earn2Note: "Прямая комиссия",
    earn3Unit: "Сделка суб-брокера", earn3Note: "Ваша надбавка",
    earningsDisclaimer: "На основании партнёрского соглашения. Цифры ориентировочные.",
    shareLabel: "Делитесь и стройте свою сеть",
    shareH: "Каждый привлечённый брокер приносит вам надбавку.",
    shareP: "Зарегистрируйтесь. Поделитесь кодом с коллегами. Когда они заключат сделку — вы тоже заработаете. Стройте сеть с первого дня — без затрат и рисков.",
    brokerCta: "Зарегистрироваться и получить код", brokerShare: "Поделиться в WhatsApp", brokerTg: "Поделиться в Telegram",
    lbLabel: "Таблица лидеров", lbH: "Топ брокеров по размеру сети", lbRefs: "рефералов", lbYou: "Это вы!", lbEmpty: "Станьте первым, кто привлечёт коллегу.",
    locationLabel: "Расположение",
    locationH: "Спокойствие Шарджи.\nДо Дубая — 9 минут.",
    locationP: "Прямой выезд на Al Wuheida Road с набережной и улицы Al Taawun.",
    eoiLabel: "Приоритетная регистрация",
    eoiH: "Зарегистрируйте интерес",
    eoiP: "60 секунд. Получите брокерский код и слот для тура.",
    eoiName: "Полное имя", eoiPhone: "Номер WhatsApp",
    eoiUnit: "Тип квартиры", eoiUnitPh: "Выберите тип",
    eoiTourLabel: "Заказать виртуальный тур с основателем",
    eoiTourDesc: "— прямое видео с Mamzar Beach для вашего клиента",
    eoiEarlybirdLabel: "Ранний доступ",
    eoiEarlybirdDesc: "— первый выбор квартир, приоритетная цена, надбавки суб-брокерам",
    eoiSubmit: "Получить брокерский код",
    eoiDisclaimer: "Без обязательств. Все сделки — напрямую с Alef Group.",
    eoiSuccessH: "Вы в системе.",
    eoiSuccessP: "Партнёр DeliWer свяжется с вами в WhatsApp в течение 1 часа.",
    eoiCodeLabel: "Ваш брокерский код",
    eoiCodeNote: "Поделитесь кодом — получайте надбавку с каждой сделки суб-брокера",
    eoiBookTour: "Записаться на тур", eoiShareEarn: "Поделиться и заработать",
    eoiRegisterAnother: "Зарегистрировать ещё →",
    finalH: "Вопросы? Свяжитесь с партнёром DeliWer.",
    finalP: "Доступны в Telegram и WhatsApp — ОАЭ и все мировые часовые пояса.",
    finalTgNote: "Telegram — предпочтительный канал для СНГ · России · Европы",
    tgPartner: "Написать в Telegram", waPartner: "Написать в WhatsApp",
    shareBtn: "Поделиться с брокерами", shareWa: "Поделиться в WhatsApp",
  },
  zh: {
    flag: "🇨🇳", label: "中文",
    navEoi: "登记意向",
    heroHeadline: "在全球关注到来之前，率先发现迪拜下一个滨水街区",
    heroSub: "创始人亲导虚拟参观 · 海滨物业起价 AED 849,000 · 投资者与经纪人优先认购",
    num1BR: "一居室起价", numBook: "预订金", numPlan: "30/70付款", numDel: "竣工",
    ctaEoi: "登记优先认购", ctaTg: "加入 Telegram", ctaWa: "WhatsApp 咨询",
    tgNote: "Telegram 是亚洲客户首选渠道",
    brokersJoined: "名经纪人已注册",
    overviewLabel: "关于项目",
    overviewH: "六座塔楼，325米海岸线，一个关键时刻。",
    overviewP: "阿勒夫·利纳尔矗立于马姆扎尔海岸——沙迦最受期待的海滨地址，阿拉伯湾与迪拜天际线在此交汇。专为向往沙迦宁静、九分钟通达迪拜的家庭与投资者打造。",
    statWaterfront: "海岸线", statViews: "海景", statResidences: "住宅", statDelivery: "竣工",
    unitsLabel: "价格与户型",
    unitsH: "预售价格，30/70付款计划。",
    unitsP: "仅需 AED 2万 预订房源，70% 于2030年交付时支付。",
    unitsFrom: "起价",
    payPlanLabel: "30/70 付款计划",
    payPlanH: "今日仅需 AED 2万 锁定您的房源",
    payPlanSub: "建设期支付30% · 2030年交付时支付70%",
    payPlanBtn: "立即锁定房源",
    tourLabel: "创始人带领虚拟参观",
    tourH: "我们在现场，\n您的客户可以实时参观。",
    tourP: "DeliWer 创始人驻扎在马姆扎尔海滩，为您的客户提供实时视频参观——海滨、塔楼位置、迪拜天际线，无需出行即可成交。",
    tourBtn: "预约创始人虚拟导览",
    tourF1T: "30分钟，适配任何时区", tourF1D: "根据您的客户时间安排——阿联酋、英国、巴基斯坦、印度、中国。",
    tourF2T: "阿拉伯语、英语、乌尔都语、印地语", tourF2D: "我们根据您客户的语言偏好匹配合适的创始人。",
    tourF3T: "仅限注册经纪人", tourF3D: "此服务专为 DeliWer EOI 注册合作伙伴保留。",
    brokerLabel: "经纪人分销平台",
    brokerH: "DeliWer 是基础设施，\n您是分销渠道。",
    brokerP: "每位注册经纪人都成为可追踪的分销渠道。我们负责现场参观、跟进和文件处理，您负责带来客户并收取佣金。",
    brokerCountPrefix: "已有",
    brokerCountSuffix: "名经纪人加入平台",
    step1Label: "注册", step1Desc: "60秒完成EOI提交，立即获得您的专属经纪人追踪码。",
    step2Label: "推荐", step2Desc: "将您的链接分享给客户和子经纪人，每次点击和线索均追溯到您。",
    step3Label: "赚取", step3Desc: "我们在现场完成交易，您获得直接佣金及子经纪人超额奖励。",
    earningsLabel: "预计收益",
    earn1Unit: "一居室 · AED 849K", earn1Note: "直接佣金",
    earn2Unit: "两居室 · AED 1.384M", earn2Note: "直接佣金",
    earn3Unit: "子经纪人成交", earn3Note: "您的超额奖励",
    earningsDisclaimer: "以合作协议为准，数据仅供参考。",
    shareLabel: "分享并建立您的网络",
    shareH: "您推荐的每位经纪人都为您带来超额奖励。",
    shareP: "立即注册，将您的推荐码分享给其他经纪人。他们成交，您也获益。从第一天起构建您的子网络——零成本、零风险。",
    brokerCta: "注册并获取我的专属码", brokerShare: "通过WhatsApp分享", brokerTg: "通过Telegram分享",
    lbLabel: "实时排行榜", lbH: "网络规模最大的经纪人", lbRefs: "推荐人数", lbYou: "那就是您！", lbEmpty: "成为第一个介绍同行的经纪人。",
    locationLabel: "地理位置",
    locationH: "沙迦的宁静，\n迪拜九分钟通勤。",
    locationP: "从Corniche和Al Taawun街直达Al Wuheida路。",
    eoiLabel: "优先登记",
    eoiH: "登记您的意向",
    eoiP: "60秒完成，立即获得经纪人码和参观名额。",
    eoiName: "姓名", eoiPhone: "WhatsApp号码",
    eoiUnit: "意向户型", eoiUnitPh: "请选择户型",
    eoiTourLabel: "预约创始人虚拟导览",
    eoiTourDesc: "——为您的客户提供马姆扎尔海滩实时视频",
    eoiEarlybirdLabel: "加入早鸟计划",
    eoiEarlybirdDesc: "——优先选房、优先定价、子经纪人超额奖励",
    eoiSubmit: "获取我的经纪人码",
    eoiDisclaimer: "无任何承诺义务，所有交易直接与Alef集团进行。",
    eoiSuccessH: "注册成功。",
    eoiSuccessP: "DeliWer合作伙伴将在1小时内通过WhatsApp与您联系。",
    eoiCodeLabel: "您的经纪人专属码",
    eoiCodeNote: "分享此码——每笔子经纪人成交均可获得超额奖励",
    eoiBookTour: "立即预约参观", eoiShareEarn: "分享并赚取",
    eoiRegisterAnother: "再注册一位 →",
    finalH: "有疑问？立即联系 DeliWer 合作伙伴。",
    finalP: "Telegram 和 WhatsApp 均可联系 — 覆盖全球所有时区。",
    finalTgNote: "Telegram — 亚洲 · 东南亚 · 欧洲首选渠道",
    tgPartner: "Telegram 联系", waPartner: "WhatsApp 联系",
    shareBtn: "分享给经纪人", shareWa: "WhatsApp 分享",
  },
} as const;

type Strings = typeof STRINGS.en;

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; s: Strings }>({
  lang: "en", setLang: () => {}, s: STRINGS.en,
});

const UNIT_TYPES = ["1 Bedroom – from AED 849K", "2 Bedrooms – from AED 1.384M", "3 Bedrooms – from AED 2.249M", "4 Bedroom / Penthouse"];
const BUDGETS = ["AED 750K – 1.2M", "AED 1.2M – 1.8M", "AED 1.8M – 2.5M", "AED 2.5M – 4M", "AED 4M+"];
const NATIONALITIES = ["Pakistani", "Indian", "British", "Egyptian", "Sudanese", "Jordanian", "Lebanese", "Other Arab", "European", "East Asian", "Other"];

const AMENITIES = [
  { icon: Waves, label: "325m Waterfront" },
  { icon: Eye, label: "360° Sea Views" },
  { icon: Dumbbell, label: "Wellness Centre" },
  { icon: Coffee, label: "Curated F&B" },
  { icon: TreePine, label: "Landscaped Parks" },
  { icon: Users, label: "Co-Living Lounges" },
  { icon: Zap, label: "Smart Home Tech" },
  { icon: Sun, label: "Solar Energy" },
];

const UNITS = [
  { type: "1BR", sqm: 74.91, units: 212, price: 849000, accent: "from-cyan-500 to-blue-600", highlight: "Best entry, highest rental yield" },
  { type: "2BR", sqm: 115.02, units: 236, price: 1384000, accent: "from-emerald-500 to-teal-600", highlight: "Most popular with families" },
  { type: "3BR", sqm: 179.35, units: 48, price: 2249000, accent: "from-violet-500 to-purple-600", highlight: "Limited availability — act fast" },
  { type: "4BR / PH", sqm: 319.01, units: 4, price: 0, accent: "from-amber-500 to-orange-600", highlight: "Ultra-exclusive — only 4 units" },
];

const BROKER_PERKS = [
  { icon: Wallet, t: "Priority EOI Access", d: "Register now and get first access before public launch — lock clients into the best units at launch pricing." },
  { icon: Video, t: "Founder-Led Site Tour", d: "We're located near Mamzar Beach. Book a live video walkthrough hosted by DeliWer founders on the ground." },
  { icon: Award, t: "Commission Advantage", d: "Early-bird broker commission structure with premium payout on every qualified unit sold through your referral." },
  { icon: Share2, t: "Viral Referral Chain", d: "Share your unique broker code. Every sub-referral you bring earns you a trailing override — build a passive income stream." },
];

const LOCATION_FACTS = [
  { label: "Dubai Int'l Airport", value: "9–15 min" },
  { label: "Al Qiyadah Metro", value: "5 min" },
  { label: "Mamzar Park", value: "5 min" },
  { label: "Al Hamza Mall", value: "5 min" },
  { label: "Medcare Hospital", value: "5 min" },
  { label: "Sharjah Airport", value: "20–25 min" },
  { label: "Al Ittihad Road", value: "4 min" },
  { label: "Sahara Centre", value: "6 min" },
];

// ── DeliWer Lifestyle nav — Mamzar only ──────────────────────────────────────
const NAV_ITEMS_EN = [
  { label: "The Project", href: "#overview" },
  { label: "Units",       href: "#units"    },
  { label: "Tour",        href: "#tour"     },
  { label: "Location",    href: "#location" },
  { label: "Brokers",     href: "#brokers"  },
];

const LANG_FLAGS: Record<Lang, string> = { en: "🇬🇧", ru: "🇷🇺", zh: "🇨🇳" };
const LANG_LABELS: Record<Lang, string> = { en: "EN", ru: "RU", zh: "中文" };

function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useContext(LangCtx);
  const langs: Lang[] = ["en", "ru", "zh"];
  return (
    <div className={`flex items-center ${compact ? "gap-0.5" : "gap-1"} bg-slate-900 border border-slate-800 rounded-lg p-0.5`}>
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${
            lang === l
              ? "bg-cyan-500 text-slate-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {LANG_FLAGS[l]} {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

function MamzarNav() {
  const [open, setOpen] = useState(false);
  const { s } = useContext(LangCtx);

  const go = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-900/40 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-2">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Waves className="w-5 h-5 text-cyan-400" />
          <span className="font-black text-white tracking-tight">DeliWer</span>
          <span className="hidden sm:inline-block bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
            Lifestyle
          </span>
        </a>

        {/* Desktop section links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_ITEMS_EN.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go("#eoi")}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors ml-1"
          >
            {s.navEoi}
          </button>
        </div>

        {/* Desktop right: lang switcher + channels */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <LangSwitcher compact />
          <Button
            size="sm"
            variant="outline"
            className="border-sky-500/50 text-sky-400 hover:bg-sky-500/10 font-black"
            onClick={() => window.open(TG, "_blank")}
          >
            <SiTelegram className="w-3.5 h-3.5 mr-1.5" /> {s.ctaTg}
          </Button>
          <Button
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
            onClick={() => window.open(waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach pre-launch."), "_blank")}
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> {s.ctaWa}
          </Button>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher compact />
          <button
            className="p-2 text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-cyan-900/30 bg-slate-950 px-4 py-3 space-y-1">
          {NAV_ITEMS_EN.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="w-full text-left px-4 py-2.5 text-sm font-bold uppercase tracking-widest rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go("#eoi")}
            className="w-full text-left px-4 py-2.5 text-sm font-bold uppercase tracking-widest rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            {s.navEoi}
          </button>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-black"
              onClick={() => { setOpen(false); window.open(TG, "_blank"); }}>
              <SiTelegram className="w-3.5 h-3.5 mr-1" /> {s.ctaTg}
            </Button>
            <Button size="sm" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
              onClick={() => { setOpen(false); window.open(waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach pre-launch."), "_blank"); }}>
              <MessageCircle className="w-3.5 h-3.5 mr-1" /> {s.ctaWa}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

const MARKET_STATS = [
  { v: "AED 18.5B", l: "Sharjah RE transactions Q1 2026" },
  { v: "+40.7%", l: "Year-on-year growth" },
  { v: "AED 3.5B", l: "April 2026 transactions alone" },
  { v: "78%", l: "Sales in residential segment" },
];

type EoiForm = {
  brokerName: string;
  brokerPhone: string;
  brokerEmail: string;
  brokerage: string;
  reraLicense: string;
  country: string;
  unitType: string;
  budget: string;
  clientName: string;
  clientPhone: string;
  clientNationality: string;
  tourRequested: boolean;
  earlybirdOpted: boolean;
  notes: string;
  referredBy: string;
};

const EMPTY: EoiForm = {
  brokerName: "", brokerPhone: "", brokerEmail: "", brokerage: "",
  reraLicense: "", country: "", unitType: "", budget: "",
  clientName: "", clientPhone: "", clientNationality: "",
  tourRequested: false, earlybirdOpted: true, notes: "", referredBy: "",
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useCountUp(target: number, duration = 900) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (target === prev.current) return;
    const start = prev.current;
    const diff = target - start;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - startTime, duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (elapsed < duration) requestAnimationFrame(tick);
      else prev.current = target;
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return display;
}

const TOUR_LABEL: Record<Lang, string> = {
  en: "site tours booked",
  ru: "туров запрошено",
  zh: "场参观已预约",
};
const BROKER_LABEL: Record<Lang, string> = {
  en: "brokers registered",
  ru: "брокеров зарегистрировано",
  zh: "名经纪人已注册",
};

function LiveBrokerCounter({ stats, lang }: { stats: { total: number; tours: number } | null; lang: Lang }) {
  const total = useCountUp(stats?.total ?? 0);
  const tours = useCountUp(stats?.tours ?? 0);
  if (!stats || stats.total === 0) return null;
  return (
    <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-white tabular-nums">{total}</span>
        <span className="text-sm text-slate-400">{BROKER_LABEL[lang]}</span>
      </div>
      <div className="hidden sm:block w-px h-8 bg-slate-700" />
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-fuchsia-300 tabular-nums">{tours}</span>
        <span className="text-sm text-slate-400">{TOUR_LABEL[lang]}</span>
      </div>
    </div>
  );
}

type LbRow = { code: string; displayName: string; count: number };

const MEDAL = ["🥇", "🥈", "🥉"];

function LiveLeaderboard({ rows, myCode, s }: { rows: LbRow[]; myCode: string; s: typeof STRINGS["en"] }) {
  return (
    <div className="mt-10 rounded-2xl border border-amber-500/15 bg-amber-950/10 p-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
        </span>
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">{s.lbLabel}</p>
      </div>
      <h3 className="text-base font-bold text-white mb-5">{s.lbH}</h3>

      {rows.length === 0 ? (
        <p className="text-slate-600 text-sm text-center py-6">{s.lbEmpty}</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row, i) => {
            const isMe = myCode && row.code === myCode;
            return (
              <div
                key={row.code}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition ${isMe ? "border-amber-400/40 bg-amber-500/10" : "border-slate-800 bg-slate-900/40"}`}
              >
                <span className="text-xl w-7 shrink-0 text-center">
                  {i < 3 ? MEDAL[i] : <span className="text-slate-600 text-sm font-bold">#{i + 1}</span>}
                </span>
                <span className={`flex-1 font-semibold text-sm ${isMe ? "text-amber-300" : "text-white"}`}>
                  {row.displayName}
                  {isMe && <span className="ml-2 text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded-full">{s.lbYou}</span>}
                </span>
                <div className="flex items-baseline gap-1 shrink-0">
                  <span className={`text-xl font-black tabular-nums ${isMe ? "text-amber-300" : "text-emerald-300"}`}>{row.count}</span>
                  <span className="text-[10px] text-slate-500">{s.lbRefs}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function fmtAED(n: number) {
  if (!n) return "Call for price";
  return "AED " + n.toLocaleString("en-AE");
}

export default function MamzarBeach() {
  const { toast } = useToast();
  const [form, setForm] = useState<EoiForm>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [eoiRef, setEoiRef] = useState("");
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("dw-mamzar-lang") as Lang | null;
      return saved && ["en", "ru", "zh"].includes(saved) ? saved : "en";
    } catch { return "en"; }
  });
  const setLang = (l: Lang) => {
    try { localStorage.setItem("dw-mamzar-lang", l); } catch {}
    setLangState(l);
  };
  const s = STRINGS[lang];

  const { data: stats } = useQuery({
    queryKey: ["/api/mamzar/stats"],
    refetchInterval: 30000,
  });

  const { data: lbRows = [] } = useQuery<LbRow[]>({
    queryKey: ["/api/mamzar/leaderboard"],
    refetchInterval: 60000,
  });

  const submitEoi = useMutation({
    mutationFn: async (data: EoiForm) => {
      const res = await fetch("/api/mamzar/eoi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: (data) => {
      setSubmitted(true);
      setEoiRef(data.referralCode);
      toast({ title: "EOI Registered!", description: `Your ref: ${data.referralCode}` });
    },
    onError: () => {
      toast({ title: "Error", description: "Please try again or WhatsApp us directly.", variant: "destructive" });
    },
  });

  const valid = form.brokerName.length >= 2 && form.brokerPhone.length >= 7;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setForm(f => ({ ...f, referredBy: ref }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    submitEoi.mutate(form);
  };

  const baseUrl = `${window.location.origin}/mamzar`;
  const refUrl = eoiRef ? `${baseUrl}?ref=${eoiRef}` : baseUrl;
  const shareMsg = `🏖️ Pre-Launch Opportunity — Alef Linar, Mamzar Beach Sharjah\n\n• 5 towers on a 325m waterfront\n• 360° Arabian Gulf views\n• 1BR from AED 849K | 30/70 plan | AED 20K to book\n• Ready 2030 | 9 min from Dubai Airport\n\nRegister your EOI now: ${refUrl}\n\nVia DeliWer Real Estate`;

  return (
    <LangCtx.Provider value={{ lang, setLang, s }}>
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Helmet>
        <title>Alef Linar Mamzar Beach — Pre-Launch | DeliWer Real Estate</title>
        <meta name="description" content="Exclusive pre-launch opportunity: Alef Linar, Mamzar Beach Sharjah. 5 waterfront towers, 360° sea views. 1BR from AED 849K, 30/70 payment plan, AED 20K booking. Register your EOI now." />
        <meta property="og:title" content="Alef Linar Mamzar Beach — Pre-Launch | DeliWer Real Estate" />
        <meta property="og:description" content="325m beachfront, 6 towers, 360° views of Arabian Gulf. 1BR from AED 849K. 30/70 payment plan. Register EOI now before public launch." />
      </Helmet>

      {/* ── STICKY NAV ──────────────────────────────────────────────── */}
      <MamzarNav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[95vh] flex flex-col justify-end lg:justify-center">
        {/* Full-bleed aerial photo */}
        <div className="absolute inset-0">
          <img
            src={mamzarHeroImg}
            alt="Alef Linar Mamzar Beach aerial view"
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer overlay: strong left for text legibility, gentle right to keep image visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/75 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
          {/* Gold sunrise tint on the right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,_rgba(251,191,36,0.08)_0%,_transparent_60%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-2xl xl:max-w-3xl">
            {/* Pre-launch badges */}
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block mr-2 animate-ping" />
                PRE-LAUNCH · EOI OPEN
              </Badge>
              <Badge className="bg-white/10 text-white/80 border-white/20 backdrop-blur-sm">
                <MapPin className="w-3 h-3 mr-1" /> Mamzar Beach, Sharjah
              </Badge>
              <Badge className="bg-white/10 text-white/80 border-white/20 backdrop-blur-sm">
                <Building2 className="w-3 h-3 mr-1" /> Alef Group · 6 Towers
              </Badge>
              {stats && (stats as any).total > 0 && (
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                  <Users className="w-3 h-3 mr-1" /> {(stats as any).total} {s.brokersJoined}
                </Badge>
              )}
            </div>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-5 text-white drop-shadow-lg">
              {s.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-medium">
              {s.heroSub}
            </p>

            {/* Key numbers bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
              {[
                { v: "AED 849K", l: s.num1BR },
                { v: "AED 20K",  l: s.numBook },
                { v: "30 / 70", l: s.numPlan },
                { v: "2030",    l: s.numDel },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-sm px-4 py-3 text-center">
                  <div className="text-lg sm:text-xl font-black text-amber-300">{v}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-3">
              <Button
                size="lg"
                className="h-12 px-7 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-900/30"
                onClick={() => scrollTo("eoi")}
              >
                <BadgeCheck className="w-5 h-5 mr-2" />
                {s.ctaEoi}
              </Button>
              <Button
                size="lg"
                className="h-12 px-6 bg-sky-500/90 hover:bg-sky-400 text-white font-black backdrop-blur-sm"
                onClick={() => window.open(TG, "_blank")}
              >
                <SiTelegram className="w-4 h-4 mr-2" />
                {s.ctaTg}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm font-semibold"
                onClick={() => window.open(waUrl("Hi DeliWer — I want to book a founder virtual tour for Alef Linar, Mamzar Beach."), "_blank")}
              >
                <Video className="w-4 h-4 mr-2 text-cyan-400" />
                {s.tourBtn}
              </Button>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              {s.tgNote}
            </p>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* ── PROJECT OVERVIEW ──────────────────────────────────────────── */}
      <section id="overview" className="scroll-mt-20 py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">{s.overviewLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
              {s.overviewH}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {s.overviewP}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-800">
            {[
              { icon: Waves, v: "325 m", l: s.statWaterfront },
              { icon: Eye,   v: "360°",  l: s.statViews },
              { icon: Home,  v: "500",   l: s.statResidences },
              { icon: Sun,   v: "2030",  l: s.statDelivery },
            ].map(({ icon: Icon, v, l }) => (
              <div key={l} className="bg-slate-950 flex flex-col items-center justify-center gap-2 py-10 px-6 text-center">
                <Icon className="w-6 h-6 text-cyan-400" />
                <div className="text-3xl font-black text-white">{v}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIT TYPOLOGIES ───────────────────────────────────────────── */}
      <section id="units" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-violet-400 text-xs font-black uppercase tracking-widest mb-4">{s.unitsLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {s.unitsH}
            </h2>
            <p className="text-slate-500">{s.unitsP}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {UNITS.map(({ type, sqm, units, price, accent }) => (
              <div
                key={type}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-slate-700 transition cursor-pointer"
                onClick={() => {
                  document.getElementById("eoi")?.scrollIntoView({ behavior: "smooth" });
                  setForm(f => ({ ...f, unitType: UNIT_TYPES.find(u => u.startsWith(type.charAt(0))) || "" }));
                }}
              >
                <div className={`h-1 bg-gradient-to-r ${accent}`} />
                <div className="p-6">
                  <div className="text-2xl font-black text-white mb-1">{type}</div>
                  <div className="text-xs text-slate-500 mb-4">{sqm} sqm · {units} units</div>
                  <div className="text-xl font-bold text-amber-300">{fmtAED(price)}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.unitsFrom}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">{s.payPlanLabel}</div>
              <div className="text-xl font-bold text-white">{s.payPlanH}</div>
              <div className="text-sm text-slate-400 mt-1">{s.payPlanSub}</div>
            </div>
            <Button className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shrink-0" onClick={() => scrollTo("eoi")}>
              <Rocket className="w-4 h-4 mr-2" /> {s.payPlanBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* ── VIRTUAL SITE TOUR ─────────────────────────────────────────── */}
      <section id="tour" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-fuchsia-400 text-xs font-black uppercase tracking-widest mb-4">{s.tourLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
                {s.tourH.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {s.tourP}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="h-12 px-6 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-black"
                  onClick={() => window.open(waUrl("Hi DeliWer — I'd like to book a founder-led virtual site tour of Alef Linar, Mamzar Beach for my client. Please share available slots."), "_blank")}
                >
                  <Video className="w-4 h-4 mr-2" /> {s.tourBtn}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: Clock,  t: s.tourF1T, d: s.tourF1D },
                { icon: Globe2, t: s.tourF2T, d: s.tourF2D },
                { icon: Star,   t: s.tourF3T, d: s.tourF3D },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BROKER PLATFORM ───────────────────────────────────────────── */}
      <section id="brokers" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">{s.brokerLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
              {s.brokerH.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="text-slate-400 text-lg">
              {s.brokerP}
            </p>
            <LiveBrokerCounter stats={stats as any} lang={lang} />
          </div>

          {/* 3-step model */}
          <div className="grid sm:grid-cols-3 gap-px bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-800 mb-16">
            {[
              { step: "01", icon: BadgeCheck, label: s.step1Label, color: "text-amber-400", desc: s.step1Desc },
              { step: "02", icon: Share2,     label: s.step2Label, color: "text-cyan-400",  desc: s.step2Desc },
              { step: "03", icon: Wallet,     label: s.step3Label, color: "text-emerald-400", desc: s.step3Desc },
            ].map(({ step, icon: Icon, label, color, desc }) => (
              <div key={step} className="bg-slate-950 px-8 py-10 text-center">
                <div className={`text-5xl font-black ${color} opacity-20 mb-4`}>{step}</div>
                <Icon className={`w-7 h-7 ${color} mx-auto mb-3`} />
                <div className="text-lg font-bold text-white mb-3">{label}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>

          {/* Commission table + share */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">{s.earningsLabel}</p>
              <div className="space-y-4">
                {[
                  { unit: s.earn1Unit, comm: "~AED 25,000", note: s.earn1Note },
                  { unit: s.earn2Unit, comm: "~AED 41,000", note: s.earn2Note },
                  { unit: s.earn3Unit, comm: "~AED 5,000",  note: s.earn3Note },
                ].map(({ unit, comm, note }) => (
                  <div key={unit} className="flex items-center justify-between pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                    <div>
                      <div className="text-sm font-semibold text-white">{unit}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{note}</div>
                    </div>
                    <div className="text-emerald-300 font-black">{comm}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-600 mt-5">{s.earningsDisclaimer}</p>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
              <p className="text-xs font-black uppercase tracking-widest text-amber-400 mb-4">{s.shareLabel}</p>
              <h3 className="text-xl font-bold text-white mb-3">{s.shareH}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{s.shareP}</p>
              <div className="flex flex-col gap-3">
                <a
                  href={waUrl("Hi DeliWer — I'm a broker and want to register my EOI for Alef Linar Mamzar Beach and receive my referral code.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="h-11 w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black">
                    <BadgeCheck className="w-4 h-4 mr-2" /> {s.brokerCta}
                  </Button>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="h-11 w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Share2 className="w-4 h-4 mr-2" /> {s.brokerShare}
                  </Button>
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="h-11 w-full border-sky-700/60 text-sky-400 hover:bg-sky-950/40">
                    <SiTelegram className="w-4 h-4 mr-2" /> {s.brokerTg}
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* ── Leaderboard ────────────────────────────────────────────── */}
          <div className="max-w-lg mx-auto mt-4">
            <LiveLeaderboard rows={lbRows} myCode={eoiRef} s={s} />
          </div>
        </div>
      </section>

      {/* ── LOCATION ──────────────────────────────────────────────────── */}
      <section id="location" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">{s.locationLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {s.locationH.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="text-slate-500">{s.locationP}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATION_FACTS.map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
                <div className="text-2xl font-black text-emerald-300 mb-1">{value}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EOI FORM ──────────────────────────────────────────────────── */}
      <section id="eoi" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">{s.eoiLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{s.eoiH}</h2>
            <p className="text-slate-500">{s.eoiP}</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 py-6"
            >
              {/* Success header */}
              <div className="text-center space-y-3">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{s.eoiSuccessH}</h3>
                  <p className="text-slate-400 text-sm">{s.eoiSuccessP}</p>
                </div>
              </div>

              {/* Broker code — tap to copy */}
              <button
                data-testid="button-copy-broker-code"
                onClick={() => {
                  navigator.clipboard.writeText(eoiRef);
                  setCodeCopied(true);
                  setTimeout(() => setCodeCopied(false), 2000);
                }}
                className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/8 hover:bg-amber-500/14 transition-colors p-6 text-center group"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2">{s.eoiCodeLabel}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-black text-white tracking-widest font-mono">{eoiRef}</span>
                  <span className="text-amber-400/60 group-hover:text-amber-400 transition-colors">
                    {codeCopied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  {codeCopied
                    ? (lang === "ru" ? "Скопировано!" : lang === "zh" ? "已复制！" : "Copied to clipboard!")
                    : s.eoiCodeNote}
                </p>
              </button>

              {/* Referral link */}
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">
                  {lang === "ru" ? "Ваша реферальная ссылка" : lang === "zh" ? "您的专属推荐链接" : "Your referral link"}
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-slate-300 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 truncate select-all">
                    {refUrl}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    data-testid="button-copy-referral-link"
                    className="shrink-0 border-slate-600 text-slate-300 min-w-[72px]"
                    onClick={() => {
                      navigator.clipboard.writeText(refUrl);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2000);
                    }}
                  >
                    {linkCopied
                      ? <><Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /><span className="text-xs font-bold text-emerald-400">{lang === "ru" ? "Готово" : lang === "zh" ? "完成" : "Done"}</span></>
                      : <><Copy className="w-3.5 h-3.5 mr-1" /><span className="text-xs font-bold">{lang === "ru" ? "Копировать" : lang === "zh" ? "复制" : "Copy"}</span></>
                    }
                  </Button>
                </div>
                <p className="text-[10px] text-slate-600 mt-2">
                  {lang === "ru" ? "Когда коллега регистрируется по вашей ссылке, вы оба отслеживаетесь в системе." : lang === "zh" ? "当同事通过您的链接注册时，系统会同时追踪双方。" : "When a colleague registers via your link, both of you are tracked in the system."}
                </p>
              </div>

              {/* Share CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  data-testid="button-book-tour-whatsapp"
                  className="h-11 bg-emerald-500 text-slate-950 font-black"
                  onClick={() => window.open(waUrl(`Hi DeliWer — I just registered my EOI for Alef Linar Mamzar (ref: ${eoiRef}). When can we schedule the founder site tour?`), "_blank")}
                >
                  <Video className="w-4 h-4 mr-2" /> {s.eoiBookTour}
                </Button>
                <Button
                  data-testid="button-share-whatsapp"
                  variant="outline"
                  className="h-11 border-slate-700 text-slate-300"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`, "_blank")}
                >
                  <Share2 className="w-4 h-4 mr-2" /> {s.eoiShareEarn}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(refUrl)}&text=${encodeURIComponent(shareMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    data-testid="button-share-telegram"
                    variant="outline"
                    className="w-full h-10 border-sky-700/50 text-sky-400 text-sm"
                  >
                    <SiTelegram className="w-4 h-4 mr-2" /> {lang === "ru" ? "Поделиться в Telegram" : lang === "zh" ? "通过Telegram分享" : "Share via Telegram"}
                  </Button>
                </a>
                {"share" in navigator && (
                  <Button
                    data-testid="button-native-share"
                    variant="outline"
                    className="h-10 border-slate-700 text-slate-400 text-sm"
                    onClick={() =>
                      (navigator as any).share({ title: "Alef Linar Mamzar Beach", text: shareMsg, url: refUrl }).catch(() => {})
                    }
                  >
                    <Share2 className="w-4 h-4 mr-2" /> {lang === "ru" ? "Поделиться через устройство" : lang === "zh" ? "通过设备分享" : "Share via Device"}
                  </Button>
                )}
              </div>

              <button
                data-testid="button-register-another"
                onClick={() => { setSubmitted(false); setCodeCopied(false); setLinkCopied(false); }}
                className="w-full text-xs text-slate-600 hover:text-slate-400 transition pt-1"
              >
                {s.eoiRegisterAnother}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">{s.eoiName} *</Label>
                <Input
                  required
                  value={form.brokerName}
                  onChange={e => setForm(f => ({ ...f, brokerName: e.target.value }))}
                  placeholder="Ahmed Hassan"
                  className="bg-slate-900 border-slate-700 text-white h-12 placeholder:text-slate-600 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">{s.eoiPhone} *</Label>
                <Input
                  required
                  type="tel"
                  value={form.brokerPhone}
                  onChange={e => setForm(f => ({ ...f, brokerPhone: e.target.value }))}
                  placeholder="+971 50 000 0000"
                  className="bg-slate-900 border-slate-700 text-white h-12 placeholder:text-slate-600 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">{s.eoiUnit}</Label>
                <Select value={form.unitType} onValueChange={v => setForm(f => ({ ...f, unitType: v }))}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white h-12 rounded-xl">
                    <SelectValue placeholder={s.eoiUnitPh} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    {UNIT_TYPES.map(u => <SelectItem key={u} value={u} className="focus:bg-slate-800">{u}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-4">
                  <Checkbox
                    id="tour"
                    checked={form.tourRequested}
                    onCheckedChange={v => setForm(f => ({ ...f, tourRequested: !!v }))}
                    className="mt-0.5 border-fuchsia-400"
                  />
                  <label htmlFor="tour" className="text-sm text-slate-400 cursor-pointer leading-snug">
                    <span className="text-white font-semibold">{s.eoiTourLabel}</span> {s.eoiTourDesc}
                  </label>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <Checkbox
                    id="earlybird"
                    checked={form.earlybirdOpted}
                    onCheckedChange={v => setForm(f => ({ ...f, earlybirdOpted: !!v }))}
                    className="mt-0.5 border-amber-400"
                  />
                  <label htmlFor="earlybird" className="text-sm text-slate-400 cursor-pointer leading-snug">
                    <span className="text-white font-semibold">{s.eoiEarlybirdLabel}</span> {s.eoiEarlybirdDesc}
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!valid || submitEoi.isPending}
                className="w-full h-13 bg-amber-400 text-slate-950 font-black text-base mt-2"
              >
                {submitEoi.isPending ? (
                  <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Registering…</span>
                ) : (
                  <span className="flex items-center gap-2"><Rocket className="w-4 h-4" /> {s.eoiSubmit}</span>
                )}
              </Button>
              <p className="text-center text-[10px] text-slate-600 pt-1">
                {s.eoiDisclaimer}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-slate-900 bg-gradient-to-r from-cyan-950/30 via-slate-950 to-blue-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            {s.finalH}
          </h3>
          <p className="text-slate-400 mb-2">
            {s.finalP}
          </p>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-6">
            {s.finalTgNote}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-12 px-6 bg-sky-500 hover:bg-sky-400 text-white font-black"
              onClick={() => window.open(TG, "_blank")}
            >
              <SiTelegram className="w-4 h-4 mr-2" /> {s.tgPartner}
            </Button>
            <Button
              size="lg"
              className="h-12 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
              onClick={() => window.open(waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach Sharjah and the broker EOI programme."), "_blank")}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> {s.waPartner}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white"
              onClick={() => scrollTo("eoi")}
            >
              <BadgeCheck className="w-4 h-4 mr-2" /> Register EOI
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 px-6 text-slate-400 hover:text-white"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Alef Linar Mamzar Beach", text: shareMsg, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(shareMsg);
                  toast({ title: "Copied!", description: "Share message copied." });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share with Brokers
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="font-black text-white">DeliWer</span>
            <span className="bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Lifestyle</span>
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <a href={TG} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-xs font-bold transition-colors">
              <SiTelegram className="w-4 h-4" /> Telegram
            </a>
            <a href={waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          <p className="text-[11px] text-slate-600 max-w-2xl mx-auto">
            DeliWer Lifestyle is a referral and concierge service. We are not a licensed real estate broker or developer. All transactions are direct between the buyer and Alef Group. Prices, availability and payment plans are subject to change without notice. Information on this page is general and does not constitute financial or investment advice. © {new Date().getFullYear()} DeliWer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </LangCtx.Provider>
  );
}
