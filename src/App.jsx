import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  SlidersHorizontal,
  Package,
  Users,
  BarChart3,
  Share2,
  Trash2,
  Plus,
  Edit,
  Eye,
  MessageCircle,
  ShieldCheck,
  Truck,
  ArrowRight,
  X,
  Search,
  Copy,
  Settings,
  Palette,
  Scale,
  Sliders,
  ChevronDown,
  Layers,
  Sparkles,
  RefreshCw,
  MapPin,
  Check,
  Lock,
  Unlock,
  User,
  LogOut,
  Mail,
  Key,
  ShieldAlert,
  DollarSign,
  TrendingUp,
  CreditCard,
  Bell,
  Clock,
  Send,
  MessageSquare,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Percent,
  Wallet,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Printer,
  QrCode,
  Barcode,
  Sun,
  Moon,
  Compass
} from 'lucide-react';

// --- MASTER OWNER CREDENTIALS ---
const OWNER_EMAIL = 'gotrack777@gmail.com';
const OWNER_PASS = '123456789';

// مكون علامة الإنفينيتي بدقة هندسية عالية وتوافق تام مع حجم الحروف
const InfinityLogo = ({ className = "w-9 sm:w-11 h-6 sm:h-7 mx-1 inline-block" }) => (
  <svg
    viewBox="0 0 100 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="6.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M30 24 C30 14, 10 14, 10 24 C10 34, 30 34, 50 24 C70 14, 90 14, 90 24 C90 34, 70 34, 50 24 Z" />
  </svg>
);

// --- EGYPTIAN GOVERNORATES ---
const EGYPT_GOVERNORATES = [
  { id: 'cairo', name: 'Cairo (القاهرة)', defaultCost: 60 },
  { id: 'giza', name: 'Giza / Zayed / 6th Oct (الجيزة)', defaultCost: 60 },
  { id: 'alex', name: 'Alexandria (الإسكندرية)', defaultCost: 75 },
  { id: 'delta', name: 'Delta & Lower Egypt (الدلتا والوجه البحري)', defaultCost: 80 },
  { id: 'canal', name: 'Canal Cities (مدن القناة)', defaultCost: 85 },
  { id: 'upper', name: 'Upper Egypt (الصعيد)', defaultCost: 100 }
];

// --- INITIAL EDITORIAL THEME CONTENT ---
const INITIAL_THEME_CONFIG = {
  tickerEnabled: true,
  tickerText: 'EDITORIAL DROP 01 / HEAVYWEIGHT EGYPTIAN COTTON / FREE DOORSTEP FITTING',
  tickerArabicBadge: 'معاينة وقياس مجاني مع المندوب قبل الاستلام',
  heroPreBadge: 'AUTUMN / WINTER 2026',
  heroHeading: 'ARCHITECTURAL DRAPE',
  heroSubheading: 'Heavyweight 460 GSM combed cotton sculpted in oversized streetwear cuts. Pure monochrome presence.',
  heroCtaText: 'EXPLORE LOOKBOOK',
  heroSecondaryCta: 'SIZE & FIT ADVISOR',
  heroBgImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
  editorialImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85'
};

// --- INITIAL PRODUCTS CATALOG ---
const INITIAL_PRODUCTS = [
  {
    id: 'loom-01',
    ref: 'REF. 0482/101',
    title: 'THE INFINITE COMPLETE TRACKSUIT',
    subtitle: 'OVERSIZED HOODIE & RELAXED TROUSERS',
    category: 'sets',
    gender: 'UNISEX',
    price: 1100,
    salePrice: 899,
    cogs: 420,
    badge: 'RUNWAY EXCLUSIVE',
    fabric: '460 GSM Heavyweight Terry Cotton',
    stock: 42,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    description: 'Double-faced structured hood silhouette with continuous typographic ∞ run on leg and hood contour. Preshrunk Egyptian combed cotton.',
    highlight: 'وفر 200 ج عند طلب الطقم الكامل'
  },
  {
    id: 'loom-02',
    ref: 'REF. 0482/102',
    title: 'HEAVYWEIGHT INFINITE HOODIE',
    subtitle: 'BOXY DROPPED-SHOULDER FLEECE',
    category: 'hoodies',
    gender: 'UNISEX',
    price: 650,
    salePrice: 550,
    cogs: 240,
    badge: 'NEW',
    fabric: '480 GSM Dense Brushed Fleece',
    stock: 28,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    description: 'Clean seamless neckline and minimalist kangaroo volume. High-density tonal puff print at rear spinal axis.',
    highlight: 'الأعلى طلباً للكولكشن الحالي'
  },
  {
    id: 'loom-03',
    ref: 'REF. 0482/103',
    title: 'WIDE-LEG RELAXED INSEAM SWEATPANTS',
    subtitle: 'EXTENDED DRAPE WITH WAIST DRAWSTRING',
    category: 'pants',
    gender: 'UNISEX',
    price: 520,
    salePrice: 440,
    cogs: 200,
    badge: 'RUNWAY',
    fabric: '440 GSM Loopback Heavy Knit',
    stock: 35,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    description: 'Architectural wide leg cut cascading smoothly over footwear. Gunmetal-tipped cotton cord.',
    highlight: 'قصة انسيابية مريحة مع سنيكرز'
  },
  {
    id: 'loom-04',
    ref: 'REF. 0482/104',
    title: 'BOXY HEAVYWEIGHT EMBROIDERED TEE',
    subtitle: 'STRUCTURED MOCK NECK T-SHIRT',
    category: 'tees',
    gender: 'MEN',
    price: 380,
    salePrice: 320,
    cogs: 130,
    badge: 'LIMITED',
    fabric: '260 GSM Compact Cotton Jersey',
    stock: 50,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
    description: 'Reinforced 1x1 ribbed high collar with signature micro-infinity tonal chest embroidery.',
    highlight: 'خامة متماسكة وقطن مصري 100%'
  }
];

// --- HIERARCHICAL STAFF & PERFORMANCE DATA ---
const INITIAL_STAFF = [
  {
    id: 'staff-owner',
    name: 'Ibrahim Bakry',
    email: OWNER_EMAIL,
    roleTitle: 'Master Owner / Executive Director',
    rank: 'Level 1: Executive',
    isOwner: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'online',
    kpiScore: 100,
    ordersConfirmedToday: 18,
    chatsHandled: 24,
    avgResponseMinutes: 1.2,
    csat: 4.95,
    recentAction: 'Approved Q4 Financial Settlement & Payout',
    permissions: { design: true, products: true, orders: true, staff: true, marketing: true, analytics: true, finance: true, logistics: true, waybills: true }
  },
  {
    id: 'staff-gm',
    name: 'Tarek Hamed',
    email: 'tarek.gm@loom.com',
    roleTitle: 'General Operations Manager',
    rank: 'Level 2: Management',
    isOwner: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'online',
    kpiScore: 97,
    ordersConfirmedToday: 14,
    chatsHandled: 16,
    avgResponseMinutes: 1.9,
    csat: 4.9,
    recentAction: 'Audited inventory stock across Cairo warehouse',
    permissions: { design: true, products: true, orders: true, staff: true, marketing: true, analytics: true, finance: false, logistics: true, waybills: true }
  },
  {
    id: 'staff-logistics',
    name: 'Karim El-Sayed',
    email: 'karim.ops@loom.com',
    roleTitle: 'Logistics & Dispatch Officer',
    rank: 'Level 3: Operations',
    isOwner: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'online',
    kpiScore: 94,
    ordersConfirmedToday: 32,
    chatsHandled: 8,
    avgResponseMinutes: 2.4,
    csat: 4.8,
    recentAction: 'Generated 4x6 thermal waybills for Bosta pickup',
    permissions: { design: false, products: false, orders: true, staff: false, marketing: false, analytics: false, finance: false, logistics: true, waybills: true }
  },
  {
    id: 'staff-support',
    name: 'Sarah Nour',
    email: 'sarah.support@loom.com',
    roleTitle: 'Customer Support Lead',
    rank: 'Level 3: Operations',
    isOwner: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'busy',
    kpiScore: 96,
    ordersConfirmedToday: 21,
    chatsHandled: 48,
    avgResponseMinutes: 1.8,
    csat: 4.98,
    recentAction: 'Sent WhatsApp measurements consultation for #LM-9042',
    permissions: { design: false, products: false, orders: true, staff: false, marketing: false, analytics: false, finance: false, logistics: false, waybills: false }
  }
];

// --- SHIPPING PARTNERS ---
const INITIAL_COURIERS = [
  {
    id: 'bosta',
    name: 'Bosta Express (بوسطة)',
    active: true,
    isDefault: true,
    sla: '24-48 Hours',
    coverage: 'All Egypt (All Governorates)',
    rates: { cairo: 55, giza: 55, alex: 70, delta: 75, canal: 80, upper: 95 },
    collectedCodPending: 18450,
    settlementCycle: 'Bi-Weekly Bank Transfer',
    phone: '01002233445'
  },
  {
    id: 'mylerz',
    name: 'Mylerz Logistics',
    active: true,
    isDefault: false,
    sla: 'Same Day / Next Day',
    coverage: 'Greater Cairo & Alexandria',
    rates: { cairo: 60, giza: 60, alex: 75, delta: 85, canal: 90, upper: 110 },
    collectedCodPending: 7200,
    settlementCycle: 'Weekly Automated Transfer',
    phone: '01123456789'
  },
  {
    id: 'aramex',
    name: 'Aramex Domestic',
    active: true,
    isDefault: false,
    sla: '48 Hours',
    coverage: 'Nationwide & Regional',
    rates: { cairo: 75, giza: 75, alex: 90, delta: 95, canal: 100, upper: 125 },
    collectedCodPending: 3800,
    settlementCycle: 'Monthly Consolidated Invoice',
    phone: '16999'
  }
];

// --- PAYMENT CHANNELS ---
const INITIAL_GATEWAYS = [
  {
    id: 'cod',
    name: 'Cash On Delivery (الدفع عند الاستلام مع المعاينة والقياس)',
    badge: '90% OF ORDERS',
    description: 'Doorstep inspection and fitting allowed before settling payment with courier.',
    active: true,
    feePercentage: 0
  },
  {
    id: 'instapay',
    name: 'InstaPay Direct Transfer (انستاباي مباشر بدون عمولات)',
    badge: 'INSTANT TRANSFER',
    description: 'Instant settlement to IPA: loomstudios@instapay with photo proof upload.',
    active: true,
    feePercentage: 0
  },
  {
    id: 'paymob',
    name: 'Paymob Cards & Wallets (فيزا / ماستركارد / محافظ إلكترونية)',
    badge: 'ONLINE PAYMENT',
    description: 'Accept credit/debit cards, Meeza, and mobile telecom wallets.',
    active: true,
    feePercentage: 2.75
  }
];

// --- INITIAL ORDERS COLLECTION ---
const INITIAL_ORDERS = [
  {
    id: 'LM-9041',
    customerName: 'Youssef El-Menshawy',
    phone: '01019876543',
    city: 'New Cairo (Fifth Settlement)',
    governorate: 'cairo',
    address: 'South Academy, Villa 18, 2nd Floor',
    items: [{ name: 'THE INFINITE COMPLETE TRACKSUIT (L/XL)', qty: 1, price: 899, cogs: 420 }],
    totalAmount: 954,
    shippingCost: 55,
    courierId: 'bosta',
    status: 'Pending Confirmation',
    assignedStaff: 'Sarah Nour',
    paymentMethod: 'COD (معاينة وقياس مع المندوب)',
    date: 'Today, 10:40 AM',
    waybillNumber: 'BST-8942-0199'
  },
  {
    id: 'LM-9040',
    customerName: 'Farida Mostafa',
    phone: '01155443322',
    city: 'Giza (Sheikh Zayed)',
    governorate: 'giza',
    address: 'Beverly Hills, Compound 4, Apt 10',
    items: [{ name: 'HEAVYWEIGHT INFINITE HOODIE (M/L)', qty: 1, price: 550, cogs: 240 }],
    totalAmount: 605,
    shippingCost: 55,
    courierId: 'bosta',
    status: 'WhatsApp Verified',
    assignedStaff: 'Sarah Nour',
    paymentMethod: 'COD (معاينة وقياس مع المندوب)',
    date: 'Yesterday, 06:15 PM',
    waybillNumber: 'BST-8942-0198'
  },
  {
    id: 'LM-9039',
    customerName: 'Karim Abdel-Aziz',
    phone: '01223344556',
    city: 'Alexandria (Smouha)',
    governorate: 'alex',
    address: 'Fawzy Moaz St, Building 14',
    items: [
      { name: 'WIDE-LEG RELAXED INSEAM SWEATPANTS (M/L)', qty: 1, price: 440, cogs: 200 },
      { name: 'BOXY HEAVYWEIGHT EMBROIDERED TEE (M/L)', qty: 1, price: 320, cogs: 130 }
    ],
    totalAmount: 830,
    shippingCost: 70,
    courierId: 'mylerz',
    status: 'Dispatched with Courier',
    assignedStaff: 'Karim El-Sayed',
    paymentMethod: 'COD (معاينة وقياس مع المندوب)',
    date: 'Yesterday, 02:20 PM',
    waybillNumber: 'MYL-2026-9039'
  },
  {
    id: 'LM-9038',
    customerName: 'Nouran El-Gendy',
    phone: '01099887766',
    city: 'Cairo (Maadi)',
    governorate: 'cairo',
    address: 'Degla, St 218, Apt 4B',
    items: [{ name: 'THE INFINITE COMPLETE TRACKSUIT (M/L)', qty: 1, price: 899, cogs: 420 }],
    totalAmount: 954,
    shippingCost: 55,
    courierId: 'bosta',
    status: 'Delivered & Collected',
    assignedStaff: 'Karim El-Sayed',
    paymentMethod: 'COD (Collected by Courier)',
    date: '2 Days Ago',
    waybillNumber: 'BST-8942-0182'
  }
];

export default function App() {
  const [view, setView] = useState('store');
  const [adminTab, setAdminTab] = useState('waybills');
  const [theme, setTheme] = useState('noir');

  const [currentUser, setCurrentUser] = useState(INITIAL_STAFF[0]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: OWNER_EMAIL, password: OWNER_PASS });
  const [authError, setAuthError] = useState('');

  const [activeWaybillOrder, setActiveWaybillOrder] = useState(INITIAL_ORDERS[0]);
  const [waybillFormat, setWaybillFormat] = useState('4x6');
  const [barcodeType, setBarcodeType] = useState('code128');

  const [themeConfig, setThemeConfig] = useState(INITIAL_THEME_CONFIG);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [couriers, setCouriers] = useState(INITIAL_COURIERS);
  const [gateways, setGateways] = useState(INITIAL_GATEWAYS);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [showSizeAdvisor, setShowSizeAdvisor] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [isVisitorChatOpen, setIsVisitorChatOpen] = useState(false);
  const [visitorChatText, setVisitorChatText] = useState('');
  const [visitorMessages, setVisitorMessages] = useState([
    { sender: 'bot', text: 'مرحباً بك في استوديو LOOM 🖤. هل لديك استفسار بخصوص المقاسات أو خامة الميلتون 460 GSM؟', time: '10:45 AM' }
  ]);

  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    governorate: 'cairo',
    cityArea: '',
    address: '',
    notes: '',
    paymentGateway: 'cod'
  });

  const [calcWeight, setCalcWeight] = useState(76);
  const [calcHeight, setCalcHeight] = useState(179);

  const recommendedSize = useMemo(() => {
    if (calcWeight <= 78 && calcHeight <= 178) {
      return { size: 'M / L', fit: 'Editorial Relaxed Fit (Standard Oversized)' };
    }
    return { size: 'L / XL', fit: 'Architectural Exaggerated Fit (Statement Boxy)' };
  }, [calcWeight, calcHeight]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const activeCourier = useMemo(() => {
    return couriers.find((c) => c.isDefault && c.active) || couriers.find((c) => c.active) || couriers[0];
  }, [couriers]);

  const calculatedShippingCost = useMemo(() => {
    if (!activeCourier || !activeCourier.rates) return 60;
    return activeCourier.rates[checkoutData.governorate] || 60;
  }, [activeCourier, checkoutData.governorate]);

  const themeStyles = useMemo(() => {
    switch (theme) {
      case 'ash':
        return {
          wrapper: 'bg-[#1c1c1e] text-[#f2f2f7]',
          card: 'bg-[#2c2c2e] border-neutral-700',
          header: 'bg-[#1c1c1e]/90 border-neutral-700',
          subtext: 'text-neutral-400',
          highlight: 'bg-white text-black',
          border: 'border-neutral-700'
        };
      case 'blanc':
        return {
          wrapper: 'bg-[#FFFFFF] text-[#000000]',
          card: 'bg-[#F9F9F8] border-neutral-200',
          header: 'bg-white/95 border-neutral-200 shadow-sm',
          subtext: 'text-neutral-600',
          highlight: 'bg-black text-white',
          border: 'border-neutral-200'
        };
      case 'noir':
      default:
        return {
          wrapper: 'bg-black text-[#F5F5F3]',
          card: 'bg-[#080808] border-neutral-800',
          header: 'bg-black/90 border-neutral-900',
          subtext: 'text-neutral-400',
          highlight: 'bg-white text-black',
          border: 'border-neutral-800'
        };
    }
  }, [theme]);

  const financialMetrics = useMemo(() => {
    let grossSales = 0;
    let totalCogs = 0;
    let totalShippingCost = 0;
    let collectedCash = 0;
    let inTransitCash = 0;

    orders.forEach((o) => {
      grossSales += o.totalAmount;
      totalShippingCost += o.shippingCost;
      o.items.forEach((it) => {
        totalCogs += (it.cogs || it.price * 0.45) * it.qty;
      });

      if (o.status === 'Delivered & Collected') {
        collectedCash += o.totalAmount;
      } else if (o.status !== 'Returned') {
        inTransitCash += o.totalAmount;
      }
    });

    const netProfit = grossSales - totalCogs - totalShippingCost;
    const netMarginPercent = grossSales > 0 ? Math.round((netProfit / grossSales) * 100) : 0;

    return {
      grossSales,
      totalCogs,
      totalShippingCost,
      netProfit,
      netMarginPercent,
      collectedCash,
      inTransitCash,
      ordersCount: orders.length
    };
  }, [orders]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (loginForm.email.toLowerCase() === OWNER_EMAIL.toLowerCase() && loginForm.password === OWNER_PASS) {
      setCurrentUser(INITIAL_STAFF[0]);
      setShowAuthModal(false);
      showToast(`MASTER OWNER AUTHENTICATED (${OWNER_EMAIL})`);
      return;
    }

    const match = staff.find(
      (s) => s.email.toLowerCase() === loginForm.email.toLowerCase()
    );

    if (match) {
      setCurrentUser(match);
      setShowAuthModal(false);
      showToast(`AUTHENTICATED AS: ${match.name} [${match.roleTitle}]`);
      return;
    }

    setAuthError('Invalid credentials. For Owner, use: gotrack777@gmail.com with password: 123456789');
  };

  const switchAccount = (member) => {
    setCurrentUser(member);
    setShowAuthModal(false);
    showToast(`SWITCHED ROLE: ${member.name} (${member.roleTitle})`);
  };

  const addToCart = (product, sizeChoice) => {
    const chosenSize = sizeChoice || product.sizes[0];
    const key = `${product.id}-${chosenSize}`;
    const exists = cart.find((i) => i.key === key);

    if (exists) {
      setCart(cart.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCart([
        ...cart,
        {
          key,
          id: product.id,
          title: product.title,
          price: product.salePrice || product.price,
          cogs: product.cogs || 200,
          size: chosenSize,
          image: product.image,
          quantity: 1
        }
      ]);
    }
    showToast(`ADDED TO BAG: ${product.title} (${chosenSize})`);
  };

  const removeFromCart = (key) => {
    setCart(cart.filter((i) => i.key !== key));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your bag is currently empty.');
      return;
    }
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address) {
      showToast('Please enter your full name, telephone, and delivery address.');
      return;
    }

    const orderId = `LM-${Math.floor(1000 + Math.random() * 9000)}`;
    const courierCode = activeCourier.id === 'bosta' ? 'BST' : activeCourier.id === 'mylerz' ? 'MYL' : 'ARX';
    const waybillNumber = `${courierCode}-${Date.now().toString().slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder = {
      id: orderId,
      customerName: checkoutData.name,
      phone: checkoutData.phone,
      city: `${checkoutData.governorate.toUpperCase()} - ${checkoutData.cityArea}`,
      governorate: checkoutData.governorate,
      address: checkoutData.address,
      items: cart.map((c) => ({ name: `${c.title} (${c.size})`, qty: c.quantity, price: c.price, cogs: c.cogs })),
      totalAmount: cartSubtotal + calculatedShippingCost,
      shippingCost: calculatedShippingCost,
      courierId: activeCourier.id,
      status: 'Pending Confirmation',
      assignedStaff: 'Sarah Nour',
      paymentMethod:
        checkoutData.paymentGateway === 'cod'
          ? 'COD (معاينة وقياس مع المندوب)'
          : checkoutData.paymentGateway === 'instapay'
          ? 'InstaPay Direct Transfer'
          : 'Card Payment (Paymob)',
      date: 'Just Now',
      waybillNumber
    };

    setOrders([newOrder, ...orders]);
    setActiveWaybillOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);

    showToast(`ORDER REGISTERED: #${newOrder.id}. Instant notification sent to Owner.`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleVisitorChatSend = (e) => {
    e.preventDefault();
    if (!visitorChatText.trim()) return;

    const userMsg = { sender: 'user', text: visitorChatText, time: 'Just now' };
    setVisitorMessages((prev) => [...prev, userMsg]);
    setVisitorChatText('');

    setTimeout(() => {
      setVisitorMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'تم استلام استفسارك! جاري تحويلك لخدمة العملاء (سارة نور) لتأكيد المقاسات والشحن عبر الواتساب.',
          time: 'Just now'
        }
      ]);
    }, 700);
  };

  return (
    <div className={`min-h-screen ${themeStyles.wrapper} font-sans antialiased selection:bg-neutral-300 selection:text-black flex flex-col transition-colors duration-300`}>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#F5F5F3] text-black px-6 py-3.5 shadow-2xl font-mono text-[11px] tracking-[0.2em] uppercase border border-neutral-300 flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-black"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP TICKER BAR */}
      {themeConfig.tickerEnabled && (
        <aside aria-label="Announcement" className="border-b border-neutral-800/60 py-2 px-6 text-[10px] tracking-[0.25em] flex items-center justify-between font-mono uppercase bg-black/40">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-sans tracking-normal text-neutral-300">{themeConfig.tickerArabicBadge}</span>
          </div>

          <div className="mx-auto truncate max-w-xl text-center text-neutral-300">
            {themeConfig.tickerText}
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <Truck className="w-3 h-3" />
              <span>COURIER: {activeCourier.name.split(' ')[0]}</span>
            </span>
            <span>•</span>
            <span className="font-sans tracking-normal text-neutral-400">خدمة عملاء وقياس منزلي</span>
          </div>
        </aside>
      )}

      {/* PRIMARY EDITORIAL STICKY HEADER */}
      <header className={`sticky top-0 z-40 ${themeStyles.header} backdrop-blur-md border-b transition-all duration-300`}>
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between gap-6">
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400">
            <button onClick={() => setSelectedCategory('all')} className={`transition cursor-pointer ${selectedCategory === 'all' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>COLLECTION</button>
            <button onClick={() => setSelectedCategory('sets')} className={`transition cursor-pointer ${selectedCategory === 'sets' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>SUITS</button>
            <button onClick={() => setSelectedCategory('hoodies')} className={`transition cursor-pointer ${selectedCategory === 'hoodies' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>HOODIES</button>
            <button onClick={() => setSelectedCategory('pants')} className={`transition cursor-pointer ${selectedCategory === 'pants' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>TROUSERS</button>
            <button onClick={() => setSelectedCategory('tees')} className={`transition cursor-pointer ${selectedCategory === 'tees' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>BASICS</button>
          </nav>

          {/* Center: Iconic Stark Zara-Style LOOM Typography with 360° Rotating Infinity Logo */}
          <div
            onClick={() => setView('store')}
            className="cursor-pointer text-center group select-none flex flex-col items-center"
          >
            <div className="text-3xl sm:text-4xl font-light tracking-[0.22em] font-serif flex items-center leading-none">
              <span>L</span>
              <span className="inline-flex items-center justify-center transform group-hover:rotate-[360deg] transition-transform duration-1000 ease-out">
                <InfinityLogo className="w-8 sm:w-10 h-5 sm:h-6 mx-0.5 text-inherit" />
              </span>
              <span>O</span>
              <span>M</span>
            </div>
            <span className="text-[8px] font-mono tracking-[0.45em] opacity-60 uppercase mt-1.5">
              STUDIOS
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px] tracking-[0.2em] uppercase">
            <div className="flex items-center border border-neutral-700/60 p-0.5 bg-black/30 rounded-sm">
              <button onClick={() => { setTheme('noir'); showToast('THEME: NOIR (DEEP LUXURY DARK)'); }} className={`px-2 py-1 text-[9px] transition ${theme === 'noir' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}>NOIR</button>
              <button onClick={() => { setTheme('ash'); showToast('THEME: ASH (EDITORIAL MUTED GRAY)'); }} className={`px-2 py-1 text-[9px] transition ${theme === 'ash' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}>ASH</button>
              <button onClick={() => { setTheme('blanc'); showToast('THEME: BLANC (HIGH-FASHION WHITE)'); }} className={`px-2 py-1 text-[9px] transition ${theme === 'blanc' ? 'bg-black text-white font-bold' : 'text-neutral-400 hover:text-black'}`}>BLANC</button>
            </div>

            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="opacity-70 hover:opacity-100 transition hidden sm:flex items-center gap-1.5 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setView(view === 'admin' ? 'store' : 'admin')}
                className={`px-3 py-1.5 border text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 transition cursor-pointer ${
                  currentUser.isOwner
                    ? 'border-amber-400 text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 font-bold'
                    : 'border-neutral-700 text-neutral-300 hover:border-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span className="hidden md:inline">{currentUser.isOwner ? 'MASTER OWNER' : currentUser.name.split(' ')[0]}</span>
                <span className="md:hidden">CMS</span>
              </button>

              <button onClick={() => setShowAuthModal(true)} className="p-1.5 border border-neutral-700/70 hover:border-white transition cursor-pointer" title="Login / Switch Role">
                <Key className="w-3.5 h-3.5" />
              </button>
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative opacity-80 hover:opacity-100 transition flex items-center gap-1.5 cursor-pointer" aria-label="Shopping Bag">
              <span className="hidden sm:inline">BAG</span>
              <span className="text-xs">[{cart.reduce((s, i) => s + i.quantity, 0)}]</span>
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-t border-neutral-800/80 bg-black/95 px-6 py-4 animate-fadeIn">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-neutral-500" />
              <input
                type="text"
                autoFocus
                placeholder="TYPE TO SEARCH 460GSM, TRACKSUITS, HOODIES, TROUSERS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-mono tracking-[0.15em] uppercase text-white placeholder-neutral-600 focus:outline-none"
              />
              <button onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }} className="text-neutral-500 hover:text-white text-xs font-mono cursor-pointer">
                CLOSE
              </button>
            </div>
          </div>
        )}
      </header>

      {/* AUTHENTICATION & ROLE SWITCHER MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="border border-neutral-800 bg-[#0e0e0e] max-w-lg w-full p-8 relative font-mono shadow-2xl text-white">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1.5 mb-6">
              <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase block">LOOM ENTERPRISE ACCESS</span>
              <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-white uppercase">SECURITY CHECKPOINT</h3>
              <p className="text-xs text-neutral-400 font-sans">Sign in with Master Owner credentials or test staff roles.</p>
            </div>

            {authError && (
              <div className="mb-4 p-3 border border-rose-800 bg-rose-950/40 text-rose-300 text-xs font-sans">
                {authError}
              </div>
            )}

            <div className="border border-amber-500/50 bg-amber-950/20 p-4 space-y-3 mb-6">
              <div className="flex items-center justify-between text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                <span>MASTER OWNER PRESET</span>
                <span className="bg-amber-400 text-black px-1.5 py-0.5">UNRESTRICTED</span>
              </div>
              <button
                onClick={() => {
                  setLoginForm({ email: OWNER_EMAIL, password: OWNER_PASS });
                  setCurrentUser(INITIAL_STAFF[0]);
                  setShowAuthModal(false);
                  showToast(`LOGGED IN AS MASTER OWNER: ${OWNER_EMAIL}`);
                }}
                className="w-full py-3 bg-white text-black font-mono text-xs tracking-[0.15em] font-bold hover:bg-neutral-200 transition flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>SIGN IN AS {OWNER_EMAIL} (PW: 123456789)</span>
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3 border-t border-neutral-800 pt-4 mb-6">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase block mb-1">GMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 uppercase block mb-1">PASSWORD</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white focus:border-white outline-none"
                />
              </div>

              <button type="submit" className="w-full py-2.5 bg-neutral-900 border border-neutral-600 text-white font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-800 cursor-pointer">
                VERIFY CREDENTIALS
              </button>
            </form>

            <div className="space-y-2">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">OR SWITCH TO TEAM ROLE:</span>
              <div className="space-y-1.5">
                {staff
                  .filter((s) => !s.isOwner)
                  .map((mem) => (
                    <button
                      key={mem.id}
                      onClick={() => switchAccount(mem)}
                      className="w-full p-2 bg-black border border-neutral-800 hover:border-neutral-500 text-left flex items-center justify-between text-xs transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <img src={mem.avatar} alt={mem.name} className="w-5 h-5 rounded-full object-cover" />
                        <div>
                          <div className="text-white font-bold">{mem.name}</div>
                          <div className="text-[9px] text-neutral-400">{mem.roleTitle}</div>
                        </div>
                      </div>
                      <span className="text-[9px] text-neutral-500 uppercase">{mem.rank}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. STOREFRONT VIEW (ZARA LOOKBOOK) */}
      {view === 'store' && (
        <main className="flex-1 w-full">
          <section className="relative w-full h-[82vh] min-h-[580px] bg-neutral-950 overflow-hidden border-b border-neutral-800/80">
            <img
              src={themeConfig.heroBgImage}
              alt="Zara-style Editorial"
              className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90 hover:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            <div className="absolute inset-x-0 bottom-0 max-w-[1720px] mx-auto px-6 sm:px-12 pb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl text-white">
                <span className="font-mono text-[10px] tracking-[0.35em] text-neutral-400 uppercase block mb-3">
                  {themeConfig.heroPreBadge}
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.15em] uppercase leading-none mb-4">
                  {themeConfig.heroHeading}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans tracking-wide leading-relaxed max-w-lg">
                  {themeConfig.heroSubheading}
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] uppercase">
                <button
                  onClick={() => {
                    const el = document.getElementById('lookbook-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-white text-black font-semibold hover:bg-neutral-200 transition cursor-pointer"
                >
                  {themeConfig.heroCtaText}
                </button>
                <button
                  onClick={() => setShowSizeAdvisor(true)}
                  className="px-6 py-3.5 bg-transparent text-white border border-neutral-600 hover:border-white transition cursor-pointer"
                >
                  {themeConfig.heroSecondaryCta}
                </button>
              </div>
            </div>
          </section>

          {/* MANIFESTO BANNER */}
          <section className="border-b border-neutral-800/60 py-16 px-6 sm:px-12 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="text-[9px] font-mono tracking-[0.4em] opacity-60 uppercase block">
                ATELIER MANIFESTO
              </span>
              <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed">
                "Pure density. Architectural proportions. Designed in Cairo to transcend transient streetwear trends."
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-[0.2em] opacity-80 uppercase">
                <span>100% COMBED HEAVYWEIGHT COTTON</span>
                <span>•</span>
                <span>ZERO SHRINKAGE</span>
                <span>•</span>
                <span>DOORSTEP TRY-ON WITH COURIER</span>
              </div>
            </div>
          </section>

          {/* LOOKBOOK PRODUCTS GRID */}
          <section id="lookbook-grid" className="max-w-[1720px] mx-auto px-6 sm:px-10 py-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-neutral-800/80 gap-4 mb-12">
              <div className="font-mono text-[11px] tracking-[0.25em] opacity-70 uppercase">
                INDEX [{filteredProducts.length} DESIGNS]
              </div>

              <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.2em] uppercase opacity-80 overflow-x-auto pb-2 sm:pb-0">
                {[
                  { id: 'all', label: 'VIEW ALL' },
                  { id: 'sets', label: 'FULL SUITS' },
                  { id: 'hoodies', label: 'HOODIES' },
                  { id: 'pants', label: 'TROUSERS' },
                  { id: 'tees', label: 'BASICS' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`transition cursor-pointer ${
                      selectedCategory === tab.id ? 'opacity-100 font-bold border-b border-current pb-0.5' : 'hover:opacity-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => {
                const discount =
                  product.salePrice &&
                  Math.round(((product.price - product.salePrice) / product.price) * 100);

                return (
                  <div key={product.id} className="group flex flex-col justify-between">
                    <div className="relative aspect-[3/4] bg-neutral-950 overflow-hidden mb-5">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center filter grayscale-[20%] group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {product.detailImage && (
                        <img
                          src={product.detailImage}
                          alt={`${product.title} detail`}
                          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        />
                      )}

                      {product.badge && (
                        <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-200 bg-black/80 px-2 py-1 border border-neutral-800">
                          {product.badge}
                        </div>
                      )}

                      {discount > 0 && (
                        <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.2em] text-white bg-neutral-900 px-2 py-1">
                          -{discount}%
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
                        <span className="text-neutral-400">SELECT SIZE:</span>
                        <div className="flex gap-2">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product, sz);
                              }}
                              className="px-2.5 py-1 bg-white text-black hover:bg-neutral-200 transition font-bold cursor-pointer"
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 font-mono">
                      <div className="flex items-center justify-between text-[10px] tracking-[0.25em] opacity-60 uppercase">
                        <span>{product.ref}</span>
                        <span>{product.fabric}</span>
                      </div>

                      <h3
                        onClick={() => setActiveModalProduct(product)}
                        className="text-sm font-normal tracking-[0.12em] uppercase hover:opacity-70 transition cursor-pointer"
                      >
                        {product.title}
                      </h3>

                      <p className="text-[11px] opacity-70 font-sans tracking-wide">
                        {product.subtitle}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-baseline gap-2.5 text-xs font-mono tracking-wider">
                          <span className="font-bold">{product.salePrice || product.price} EGP</span>
                          {product.salePrice && (
                            <span className="opacity-50 line-through text-[11px]">
                              {product.price} EGP
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => setActiveModalProduct(product)}
                          className="text-[10px] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 underline underline-offset-4 cursor-pointer"
                        >
                          + DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* LOCAL EGYPTIAN TRUST PILLARS */}
          <section className={`border-t ${themeStyles.border} py-14 px-6 sm:px-12 bg-black/20`}>
            <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs tracking-wider">
              <div className={`border ${themeStyles.border} p-6 space-y-2`}>
                <span className="text-[10px] block uppercase tracking-[0.25em] opacity-60">01 / INSPECTION</span>
                <h4 className="font-serif text-base uppercase">DOORSTEP TRY-ON</h4>
                <p className="text-[11px] font-sans opacity-80">
                  معاينة وقياس القطعة مع مندوب الشحن قبل دفع أي مبلغ للتأكد من المقاس وجودة الميلتون 460GSM.
                </p>
              </div>

              <div className={`border ${themeStyles.border} p-6 space-y-2`}>
                <span className="text-[10px] block uppercase tracking-[0.25em] opacity-60">02 / DISPATCH PARTNER</span>
                <h4 className="font-serif text-base uppercase">{activeCourier.name}</h4>
                <p className="text-[11px] font-sans opacity-80">
                  شحن مؤمن لجميع المحافظات خلال 24 لـ 48 ساعة مع ميزة تتبع الشحنة المباشر.
                </p>
              </div>

              <div className={`border ${themeStyles.border} p-6 space-y-2`}>
                <span className="text-[10px] block uppercase tracking-[0.25em] opacity-60">03 / EXCHANGES</span>
                <h4 className="font-serif text-base uppercase">14-DAY REPLACEMENT</h4>
                <p className="text-[11px] font-sans opacity-80">
                  إمكانية استبدال المقاس دون أي تعقيد عبر مندوب الاستبدال السريع.
                </p>
              </div>
            </div>
          </section>

          {/* VISITOR FLOATING CHAT BUTTON */}
          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsVisitorChatOpen(!isVisitorChatOpen)}
              className="bg-white text-black font-mono text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-3 shadow-2xl flex items-center gap-2 hover:bg-neutral-200 transition cursor-pointer border border-neutral-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>LIVE ATELIER SUPPORT</span>
            </button>
          </div>

          {isVisitorChatOpen && (
            <div className="fixed bottom-20 left-6 z-40 w-80 sm:w-96 border border-neutral-800 bg-[#0a0a0a] shadow-2xl font-mono text-xs flex flex-col h-96 text-white">
              <div className="p-3.5 border-b border-neutral-800 bg-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-white font-bold text-[11px] tracking-wider uppercase">LOOM SUPPORT DESK</span>
                </div>
                <button onClick={() => setIsVisitorChatOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                {visitorMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 max-w-[85%] rounded ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-neutral-800 text-white text-right'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <span className="text-[9px] text-neutral-500 block mt-1 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleVisitorChatSend} className="p-3 border-t border-neutral-800 flex gap-2 bg-black">
                <input
                  type="text"
                  placeholder="اكتب استفسارك هنا..."
                  value={visitorChatText}
                  onChange={(e) => setVisitorChatText(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-white font-sans"
                />
                <button type="submit" className="px-3 bg-white text-black font-bold uppercase hover:bg-neutral-200 text-[10px]">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </main>
      )}

      {/* 2. ADMIN ENTERPRISE SUITE */}
      {view === 'admin' && (
        <div className="flex-1 max-w-[1720px] mx-auto px-6 sm:px-10 py-8 w-full flex flex-col md:flex-row gap-8 font-mono">
          <aside className={`w-full md:w-80 border ${themeStyles.border} ${themeStyles.card} p-5 shrink-0 h-fit space-y-6`}>
            <div className={`border-b ${themeStyles.border} pb-4`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] tracking-[0.3em] opacity-60 uppercase">ENTERPRISE CONSOLE</span>
                {currentUser.isOwner ? (
                  <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.5 font-bold">MASTER OWNER</span>
                ) : (
                  <span className="text-[9px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5">{currentUser.roleTitle.split('/')[0]}</span>
                )}
              </div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase">LOOM OPERATIONS</h2>
              <div className="text-[10px] opacity-70 truncate mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{currentUser.email}</span>
              </div>
            </div>

            <nav className="space-y-1 text-xs tracking-[0.2em] uppercase">
              {(currentUser.isOwner || currentUser.permissions.waybills) && (
                <button
                  onClick={() => setAdminTab('waybills')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'waybills' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Printer className="w-3.5 h-3.5" />
                    <span>WAYBILL STUDIO (4×6)</span>
                  </div>
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1 py-0.5 font-bold">THERMAL</span>
                </button>
              )}

              <button
                onClick={() => setAdminTab('performance')}
                className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                  adminTab === 'performance' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>STAFF PERFORMANCE</span>
                </div>
                <span className="text-[10px]">[{staff.length}]</span>
              </button>

              {currentUser.isOwner && (
                <button
                  onClick={() => setAdminTab('revenue')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'revenue' ? 'bg-amber-400 text-black font-bold' : 'text-amber-300 hover:bg-amber-950/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>NET REVENUE & COGS</span>
                  </div>
                  <span className="text-[9px] bg-black/40 text-amber-300 px-1 py-0.5">OWNER</span>
                </button>
              )}

              {(currentUser.isOwner || currentUser.permissions.orders) && (
                <button
                  onClick={() => setAdminTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'orders' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ORDERS & DISPATCH</span>
                  </div>
                  <span className="text-[10px]">[{orders.length}]</span>
                </button>
              )}

              {(currentUser.isOwner || currentUser.permissions.logistics) && (
                <button
                  onClick={() => setAdminTab('couriers')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'couriers' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>COURIER PARTNERS</span>
                  </div>
                  <span className="text-[10px]">[{couriers.length}]</span>
                </button>
              )}

              {currentUser.isOwner && (
                <button
                  onClick={() => setAdminTab('gateways')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'gateways' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>PAYMENT GATEWAYS</span>
                  </div>
                  <span className="text-[10px]">[{gateways.length}]</span>
                </button>
              )}

              {(currentUser.isOwner || currentUser.permissions.products) && (
                <button
                  onClick={() => setAdminTab('products')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'products' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-3.5 h-3.5" />
                    <span>CATALOG & DROPS</span>
                  </div>
                  <span className="text-[10px]">[{products.length}]</span>
                </button>
              )}

              {(currentUser.isOwner || currentUser.permissions.design) && (
                <button
                  onClick={() => setAdminTab('design')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'design' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Palette className="w-3.5 h-3.5" />
                    <span>THEME & CONTENT</span>
                  </div>
                </button>
              )}

              {(currentUser.isOwner || currentUser.permissions.staff) && (
                <button
                  onClick={() => setAdminTab('staff')}
                  className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${
                    adminTab === 'staff' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>HIERARCHY & ROLES</span>
                  </div>
                </button>
              )}
            </nav>

            <div className={`pt-4 border-t ${themeStyles.border} space-y-2 text-[10px] opacity-60`}>
              <div className="flex justify-between">
                <span>ACTIVE COURIER:</span>
                <span className="font-bold">{activeCourier.name.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>WAYBILL PRINTER:</span>
                <span className="text-emerald-400 font-bold">READY (4×6")</span>
              </div>
            </div>
          </aside>

          {/* Admin Workspace Content */}
          <div className={`flex-1 border ${themeStyles.border} ${themeStyles.card} p-6 sm:p-8 min-h-[680px]`}>
            {/* 1. WAYBILL & SHIPPING LABEL STUDIO */}
            {adminTab === 'waybills' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      WAYBILL & SHIPPING LABEL ENGINE (PRINT STUDIO)
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      Multi-format thermal label & docket printer supporting 4×6 inch Zebra/Xprinter, A4 dockets, and A6 stickers.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => window.print()}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Printer className="w-4 h-4" />
                      <span>PRINT WAYBILL NOW</span>
                    </button>
                  </div>
                </div>

                <div className={`border ${themeStyles.border} p-4 bg-black/30 flex flex-wrap items-center justify-between gap-4 text-xs`}>
                  <div className="flex items-center gap-3">
                    <span className="opacity-70 uppercase tracking-widest text-[10px]">SELECT ORDER:</span>
                    <select
                      value={activeWaybillOrder.id}
                      onChange={(e) => {
                        const found = orders.find((o) => o.id === e.target.value);
                        if (found) setActiveWaybillOrder(found);
                      }}
                      className="bg-black border border-neutral-700 px-3 py-1.5 text-xs text-white"
                    >
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          #{o.id} — {o.customerName} ({o.totalAmount} EGP)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="opacity-70 uppercase tracking-widest text-[10px]">LABEL SIZE:</span>
                    <div className="flex border border-neutral-700">
                      <button
                        onClick={() => setWaybillFormat('4x6')}
                        className={`px-3 py-1 text-[10px] uppercase font-bold transition ${
                          waybillFormat === '4x6' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        4×6" THERMAL (100×150MM)
                      </button>
                      <button
                        onClick={() => setWaybillFormat('a4')}
                        className={`px-3 py-1 text-[10px] uppercase font-bold transition ${
                          waybillFormat === 'a4' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        A4 DOCKET (DESKTOP)
                      </button>
                      <button
                        onClick={() => setWaybillFormat('a6')}
                        className={`px-3 py-1 text-[10px] uppercase font-bold transition ${
                          waybillFormat === 'a6' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        A6 COMPACT
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="opacity-70 uppercase tracking-widest text-[10px]">BARCODE:</span>
                    <div className="flex border border-neutral-700">
                      <button
                        onClick={() => setBarcodeType('code128')}
                        className={`px-2.5 py-1 text-[10px] uppercase ${barcodeType === 'code128' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
                      >
                        CODE 128
                      </button>
                      <button
                        onClick={() => setBarcodeType('qr')}
                        className={`px-2.5 py-1 text-[10px] uppercase ${barcodeType === 'qr' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
                      >
                        QR CODE
                      </button>
                    </div>
                  </div>
                </div>

                {/* VISUAL WAYBILL CANVAS CONTAINER */}
                <div className="flex justify-center p-6 bg-neutral-950/70 border border-neutral-800 overflow-x-auto">
                  {waybillFormat === '4x6' && (
                    <div className="w-[380px] bg-white text-black border-2 border-black p-5 shadow-2xl font-mono flex flex-col justify-between space-y-4">
                      <div className="border-b-2 border-black pb-3 flex items-start justify-between">
                        <div>
                          <div className="text-2xl font-serif font-black tracking-widest uppercase flex items-center">
                            <span>L</span>
                            <InfinityLogo className="w-7 h-4 mx-0.5" />
                            <span>M</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-wider block font-bold">
                            HEAVYWEIGHT ATELIER CAIRO
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black border-2 border-black px-2 py-0.5 uppercase bg-black text-white block">
                            {activeCourier.name.split(' ')[0]}
                          </span>
                          <span className="text-[9px] font-bold block mt-1">STANDARD EXPRESS</span>
                        </div>
                      </div>

                      <div className="text-center py-2 border-b-2 border-black space-y-1">
                        {barcodeType === 'code128' ? (
                          <div className="h-12 flex items-center justify-center space-x-1 overflow-hidden px-4">
                            {[2,4,1,3,2,5,1,2,4,2,3,1,4,2,1,5,3,2,4,1,2,3,4,1,3,2,5,1,4,2,3,1].map((w, idx) => (
                              <div key={idx} className="bg-black h-full" style={{ width: `${w * 2}px` }}></div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-1 flex justify-center">
                            <QrCode className="w-16 h-16 text-black" />
                          </div>
                        )}
                        <span className="text-xs font-black tracking-[0.25em]">{activeWaybillOrder.waybillNumber}</span>
                      </div>

                      <div className="border-2 border-black bg-neutral-100 p-2 text-center">
                        <span className="text-xs font-black block font-sans">
                          ★ مسموح بالمعاينة والقياس مع المندوب قبل الدفع ★
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-wider block text-neutral-700">
                          DOORSTEP INSPECTION & FITTING AUTHORIZED
                        </span>
                      </div>

                      <div className="space-y-2 border-b-2 border-black pb-3 text-xs">
                        <div className="flex justify-between">
                          <span className="font-bold text-neutral-600">RECIPIENT:</span>
                          <span className="font-black font-sans uppercase">{activeWaybillOrder.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-neutral-600">PHONE:</span>
                          <span className="font-black font-mono">{activeWaybillOrder.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-neutral-600">GOVERNORATE:</span>
                          <span className="font-black uppercase">{activeWaybillOrder.governorate.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="font-bold text-neutral-600 block">DELIVERY ADDRESS:</span>
                          <span className="font-sans font-bold block text-sm leading-snug mt-0.5">
                            {activeWaybillOrder.address} — {activeWaybillOrder.city}
                          </span>
                        </div>
                      </div>

                      <div className="border-b-2 border-black pb-3 text-[10px] space-y-1">
                        <span className="font-bold text-neutral-600 block uppercase">ORDER CONTENT:</span>
                        {activeWaybillOrder.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between font-sans font-medium">
                            <span>• {it.name}</span>
                            <span className="font-bold font-mono">x{it.qty}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-black text-white p-3 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold tracking-widest block uppercase text-neutral-300">
                            CASH TO COLLECT (COD)
                          </span>
                          <span className="text-[11px] font-sans font-bold text-neutral-200">
                            المطلوب تحصيله نقدياً
                          </span>
                        </div>
                        <div className="text-2xl font-black font-mono">
                          {activeWaybillOrder.totalAmount} EGP
                        </div>
                      </div>

                      <div className="text-[8px] text-neutral-500 text-center tracking-wider uppercase pt-1">
                        LOOM STUDIOS ATELIER • DISPATCH HUB CAIRO • RETURN IF UNDELIVERED IN 5 DAYS
                      </div>
                    </div>
                  )}

                  {waybillFormat === 'a4' && (
                    <div className="w-[620px] bg-white text-black border border-neutral-300 p-8 shadow-2xl font-mono text-xs space-y-6">
                      <div className="border-b pb-4 flex justify-between items-start">
                        <div>
                          <div className="text-3xl font-serif font-black uppercase">LOOM STUDIOS</div>
                          <p className="text-[10px] text-neutral-600">OFFICIAL PACKING MANIFEST & TAX DOCKET</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm block">ORDER REF: #{activeWaybillOrder.id}</span>
                          <span className="text-[10px] text-neutral-500">DATE: {activeWaybillOrder.date}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border p-4 bg-neutral-50">
                        <div>
                          <span className="text-[10px] font-bold text-neutral-500 uppercase block">SHIP TO:</span>
                          <div className="font-bold font-sans text-sm">{activeWaybillOrder.customerName}</div>
                          <div className="font-sans text-xs">{activeWaybillOrder.phone}</div>
                          <div className="font-sans text-xs mt-1">{activeWaybillOrder.address}</div>
                          <div className="font-bold uppercase text-xs mt-1">{activeWaybillOrder.city}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-neutral-500 uppercase block">DISPATCH ROUTE:</span>
                          <div className="font-bold text-xs">CARRIER: {activeCourier.name}</div>
                          <div className="font-bold text-xs">TRACKING #: {activeWaybillOrder.waybillNumber}</div>
                          <div className="font-sans font-bold text-emerald-800 text-xs mt-1">
                            ✓ يسمح بفتح الشحنة وقياسها قبل السداد
                          </div>
                        </div>
                      </div>

                      <table className="w-full text-left text-xs border">
                        <thead className="bg-neutral-100 border-b">
                          <tr>
                            <th className="p-2">Description</th>
                            <th className="p-2 text-center">Qty</th>
                            <th className="p-2 text-right">Price</th>
                            <th className="p-2 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {activeWaybillOrder.items.map((it, idx) => (
                            <tr key={idx}>
                              <td className="p-2 font-sans font-medium">{it.name}</td>
                              <td className="p-2 text-center">{it.qty}</td>
                              <td className="p-2 text-right font-mono">{it.price} EGP</td>
                              <td className="p-2 text-right font-mono">{it.price * it.qty} EGP</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="border-t font-bold">
                          <tr>
                            <td colSpan={3} className="p-2 text-right">SHIPPING SUBSIDY ({activeCourier.name.split(' ')[0]}):</td>
                            <td className="p-2 text-right font-mono">{activeWaybillOrder.shippingCost} EGP</td>
                          </tr>
                          <tr className="text-sm bg-neutral-100">
                            <td colSpan={3} className="p-2 text-right">FINAL COD DUE AMOUNT:</td>
                            <td className="p-2 text-right font-mono font-black">{activeWaybillOrder.totalAmount} EGP</td>
                          </tr>
                        </tfoot>
                      </table>

                      <div className="border-t pt-4 text-[10px] text-neutral-500 flex justify-between">
                        <span>PRINTED FROM ATELIER MASTER CONSOLE</span>
                        <span>CUSTOMER SIGNATURE: _______________________</span>
                      </div>
                    </div>
                  )}

                  {waybillFormat === 'a6' && (
                    <div className="w-[300px] bg-white text-black border-2 border-black p-4 shadow-xl font-mono text-xs space-y-3">
                      <div className="flex justify-between items-center border-b border-black pb-2">
                        <span className="font-serif font-black text-xl flex items-center">
                          <span>L</span>
                          <InfinityLogo className="w-5 h-3 mx-0.5" />
                          <span>M</span>
                        </span>
                        <span className="bg-black text-white text-[9px] px-2 py-0.5 font-bold uppercase">
                          {activeCourier.name.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-black text-sm block">#{activeWaybillOrder.id}</span>
                        <span className="text-[10px] text-neutral-600 block">{activeWaybillOrder.waybillNumber}</span>
                      </div>
                      <div className="border border-black p-2 bg-neutral-100 text-[10px] font-sans font-bold text-center">
                        معاينة وقياس قبل السداد
                      </div>
                      <div className="text-[11px] font-sans space-y-0.5">
                        <div className="font-bold">{activeWaybillOrder.customerName}</div>
                        <div>{activeWaybillOrder.phone}</div>
                        <div className="text-[10px] leading-tight text-neutral-800">{activeWaybillOrder.address}</div>
                      </div>
                      <div className="bg-black text-white p-2 flex justify-between items-center">
                        <span className="text-[9px] uppercase font-bold">COLLECT:</span>
                        <span className="text-lg font-black font-mono">{activeWaybillOrder.totalAmount} EGP</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. STAFF PERFORMANCE */}
            {adminTab === 'performance' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      EMPLOYEE PERFORMANCE & AGENT PRODUCTIVITY MATRIX
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      Real-time accountability matrix: tracking WhatsApp order confirmations, customer chat handling, and SLA scores.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="opacity-70">TEAM STATUS:</span>
                    <span className="text-emerald-400 font-bold">4 AGENTS ACTIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {staff.map((member) => (
                    <div
                      key={member.id}
                      className={`border ${themeStyles.border} bg-black/40 p-4 space-y-4 hover:border-neutral-500 transition`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold uppercase truncate">{member.name}</h4>
                          <span className="text-[10px] opacity-70 block truncate">{member.roleTitle}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="opacity-60 uppercase">PRODUCTIVITY KPI</span>
                          <span className="font-bold">{member.kpiScore}%</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${member.kpiScore >= 95 ? 'bg-emerald-400' : 'bg-white'}`}
                            style={{ width: `${member.kpiScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className={`grid grid-cols-2 gap-2 text-[10px] border-t border-b ${themeStyles.border} py-2.5`}>
                        <div>
                          <span className="opacity-60 block">ORDERS CONFIRMED</span>
                          <span className="font-bold text-xs">{member.ordersConfirmedToday} اليوم</span>
                        </div>
                        <div>
                          <span className="opacity-60 block">CHATS RESOLVED</span>
                          <span className="font-bold text-xs">{member.chatsHandled} محادثة</span>
                        </div>
                        <div>
                          <span className="opacity-60 block">AVG SPEED</span>
                          <span className="font-bold text-xs">{member.avgResponseMinutes} min</span>
                        </div>
                        <div>
                          <span className="opacity-60 block">SATISFACTION</span>
                          <span className="text-amber-300 font-bold text-xs">★ {member.csat}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] opacity-60 uppercase block mb-1">LATEST ACTION:</span>
                        <p className="text-[10px] opacity-90 font-sans leading-tight">
                          {member.recentAction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. REVENUE & NET PROFIT INTELLIGENCE */}
            {adminTab === 'revenue' && currentUser.isOwner && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-950/40 border border-amber-500/30 px-2 py-0.5">
                        MASTER FINANCIAL LEDGER
                      </span>
                      <span className="text-[10px] opacity-60 font-mono">ENCRYPTED & OWNER-ONLY</span>
                    </div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase mt-1">
                      GROSS REVENUE VS NET EARNINGS & COD RECONCILIATION
                    </h3>
                  </div>
                  <button
                    onClick={() => showToast('FINANCIAL SETTLEMENT STATEMENT DOWNLOADED')}
                    className="px-4 py-2 bg-amber-400 text-black font-bold text-xs uppercase hover:bg-amber-300 flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>EXPORT LEDGER (EXCEL)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-1`}>
                    <span className="text-[10px] opacity-60 tracking-[0.2em] uppercase block">GROSS SALES</span>
                    <div className="text-2xl font-serif">{financialMetrics.grossSales.toLocaleString()} EGP</div>
                    <span className="text-[10px] opacity-70">{financialMetrics.ordersCount} Total Verified Orders</span>
                  </div>

                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-1`}>
                    <span className="text-[10px] opacity-60 tracking-[0.2em] uppercase block">TOTAL COGS (FABRICS & SEWING)</span>
                    <div className="text-2xl font-serif text-rose-300">-{financialMetrics.totalCogs.toLocaleString()} EGP</div>
                    <span className="text-[10px] opacity-70">Direct Cost of Terry/Fleece</span>
                  </div>

                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-1`}>
                    <span className="text-[10px] opacity-60 tracking-[0.2em] uppercase block">COURIER DISPATCH FEES</span>
                    <div className="text-2xl font-serif text-amber-200">-{financialMetrics.totalShippingCost.toLocaleString()} EGP</div>
                    <span className="text-[10px] opacity-70">Paid to Bosta / Couriers</span>
                  </div>

                  <div className="border border-amber-500/50 p-5 bg-amber-950/20 space-y-1">
                    <span className="text-[10px] text-amber-300 tracking-[0.2em] uppercase block font-bold">NET TAKE-HOME PROFIT</span>
                    <div className="text-3xl font-serif text-amber-400 font-bold">{financialMetrics.netProfit.toLocaleString()} EGP</div>
                    <span className="text-[10px] text-emerald-400 font-bold">Net Margin: {financialMetrics.netMarginPercent}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-4`}>
                    <div className={`flex items-center justify-between border-b ${themeStyles.border} pb-2`}>
                      <span className="text-xs font-bold uppercase tracking-wider">CASH ON DELIVERY STATUS (COD)</span>
                      <Wallet className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs opacity-70">Collected Cash in Courier Safe:</span>
                        <span className="font-bold">{financialMetrics.collectedCash.toLocaleString()} EGP</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs opacity-70">In-Transit Uncollected Parcels:</span>
                        <span className="text-amber-300 font-bold">{financialMetrics.inTransitCash.toLocaleString()} EGP</span>
                      </div>
                      <div className={`flex justify-between items-center pt-2 border-t ${themeStyles.border} text-xs`}>
                        <span className="opacity-60">Settlement Target Bank:</span>
                        <span>CIB Egypt / InstaPay Business</span>
                      </div>
                    </div>
                  </div>

                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-4`}>
                    <div className={`flex items-center justify-between border-b ${themeStyles.border} pb-2`}>
                      <span className="text-xs font-bold uppercase tracking-wider">UNIT ECONOMICS (TRACKSUIT)</span>
                      <Percent className="w-4 h-4 opacity-70" />
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="opacity-70">Retail Sale Price:</span>
                        <span className="font-bold">899 EGP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Fabric & Trim Cost (460GSM):</span>
                        <span>-420 EGP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Shipping Subsidy (Bosta):</span>
                        <span>-55 EGP</span>
                      </div>
                      <div className={`flex justify-between pt-2 border-t ${themeStyles.border} text-emerald-400 font-bold`}>
                        <span>Net Profit Per Suit Sold:</span>
                        <span>+424 EGP (47.1% Net)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. ORDERS PIPELINE */}
            {adminTab === 'orders' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      EGYPTIAN COD DISPATCH PIPELINE
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      Verify orders, trigger Arabic WhatsApp confirmations, print waybills, and export manifests.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const csvContent =
                        'data:text/csv;charset=utf-8,' +
                        'ID,Customer,Phone,City,Address,Total,Waybill\n' +
                        orders
                          .map((o) => `"${o.id}","${o.customerName}","${o.phone}","${o.city}","${o.address}","${o.totalAmount}","${o.waybillNumber}"`)
                          .join('\n');
                      const link = document.createElement('a');
                      link.setAttribute('href', encodeURI(csvContent));
                      link.setAttribute('download', `loom_dispatch_${Date.now()}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      showToast('COURIER CSV MANIFEST DOWNLOADED');
                    }}
                    className="px-5 py-2.5 bg-neutral-900 border border-neutral-700 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>EXPORT COURIER SHEET</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.map((order) => {
                    const waText = encodeURIComponent(
                      `أهلاً بحضرتك يا أستاذ ${order.customerName} في LOOM STUDIOS! 🖤\nنود تأكيد طلبك رقم: #${order.id}\nالقطع المطلوبة: ${order.items
                        .map((i) => `${i.name} (x${i.qty})`)
                        .join(' + ')}\nالمبلغ الإجمالي شامل الشحن: ${order.totalAmount} ج.م (الدفع عند الاستلام مع المعاينة والقياس مجاناً).\nالعنوان المسجل: ${order.address} - ${order.city}.\nبرجاء الرد بكلمة (تأكيد) لشحن طلبك فوراً!`
                    );
                    const waHref = `https://wa.me/2${order.phone.replace(/^0/, '')}?text=${waText}`;

                    return (
                      <div
                        key={order.id}
                        className={`border ${themeStyles.border} p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-black/40`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold uppercase tracking-wider">#{order.id}</span>
                            <span className="opacity-40">|</span>
                            <span className="font-sans font-bold">{order.customerName}</span>
                            <span className="opacity-60">({order.phone})</span>
                            <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5">
                              {order.waybillNumber}
                            </span>
                          </div>
                          <div className="opacity-80 font-sans text-xs flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 opacity-60" />
                            <span>{order.city} — {order.address}</span>
                          </div>
                          <div className="opacity-60 text-[11px]">
                            {order.items.map((i) => `${i.name} [x${i.qty}]`).join(' • ')}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold text-sm">{order.totalAmount} EGP</div>
                            <div className="text-[10px] opacity-70 font-sans">{order.paymentMethod}</div>
                          </div>

                          <button
                            onClick={() => {
                              setActiveWaybillOrder(order);
                              setAdminTab('waybills');
                              showToast(`WAYBILL LOADED FOR ORDER #${order.id}`);
                            }}
                            className="px-3 py-1.5 bg-neutral-800 text-white hover:bg-neutral-700 text-xs flex items-center gap-1.5 font-mono cursor-pointer"
                            title="Generate 4x6 Waybill"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>WAYBILL</span>
                          </button>

                          <select
                            value={order.status}
                            onChange={(e) => {
                              const updated = orders.map((o) =>
                                o.id === order.id ? { ...o, status: e.target.value } : o
                              );
                              setOrders(updated);
                              showToast(`STATUS: ${e.target.value}`);
                            }}
                            className="bg-black border border-neutral-700 px-3 py-1.5 text-xs text-white uppercase focus:border-white outline-none"
                          >
                            <option value="Pending Confirmation">Pending Confirmation</option>
                            <option value="WhatsApp Verified">WhatsApp Verified</option>
                            <option value="Dispatched with Courier">Dispatched</option>
                            <option value="Delivered & Collected">Delivered & Collected</option>
                            <option value="Returned">Returned</option>
                          </select>

                          <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 font-sans"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>تأكيد واتساب</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. COURIER PARTNERS */}
            {adminTab === 'couriers' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      SHIPPING PARTNERS & MULTI-COURIER MANAGEMENT
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      Enable or disable shipping companies, adjust regional rates per governorate, and toggle default couriers.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {couriers.map((c) => (
                    <div
                      key={c.id}
                      className={`border p-5 space-y-4 ${
                        c.isDefault ? 'border-emerald-500/50 bg-emerald-950/10' : `${themeStyles.border} bg-black/40`
                      }`}
                    >
                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${themeStyles.border} pb-3`}>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-bold uppercase">{c.name}</h4>
                            {c.isDefault && (
                              <span className="text-[9px] bg-emerald-400 text-black px-2 py-0.5 font-bold uppercase">
                                DEFAULT STOREFRONT COURIER
                              </span>
                            )}
                            <span className={`text-[10px] px-2 py-0.5 uppercase ${c.active ? 'text-emerald-400 border border-emerald-800' : 'opacity-60 border border-neutral-700'}`}>
                              {c.active ? 'ACTIVE' : 'DISABLED'}
                            </span>
                          </div>
                          <span className="text-xs opacity-70 font-sans mt-0.5 block">
                            SLA: {c.sla} • Coverage: {c.coverage} • Settlement: {c.settlementCycle}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setCouriers(
                                couriers.map((item) => ({
                                  ...item,
                                  isDefault: item.id === c.id
                                }))
                              );
                              showToast(`DEFAULT COURIER SET TO: ${c.name}`);
                            }}
                            className="px-3 py-1.5 border border-neutral-700 text-xs hover:border-white uppercase"
                          >
                            SET AS DEFAULT
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] opacity-60 uppercase tracking-widest block mb-2">
                          RATES PER GOVERNORATE (EGP):
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                          {Object.entries(c.rates).map(([zone, cost]) => (
                            <div key={zone} className="border border-neutral-800 bg-black/60 p-2 text-center">
                              <span className="text-[9px] opacity-60 uppercase block">{zone}</span>
                              <span className="font-bold text-xs">{cost} EGP</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PAYMENT GATEWAYS */}
            {adminTab === 'gateways' && currentUser.isOwner && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4`}>
                  <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                    PAYMENT GATEWAYS & SETTLEMENT PROVIDERS
                  </h3>
                  <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                    Select which payment channels to activate for Egyptian and international customers.
                  </p>
                </div>

                <div className="space-y-4">
                  {gateways.map((gw) => (
                    <div
                      key={gw.id}
                      className={`border p-5 space-y-4 ${
                        gw.active ? 'border-neutral-600 bg-black/40' : 'border-neutral-800 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-bold uppercase">{gw.name}</h4>
                            <span className="text-[9px] bg-neutral-800 text-neutral-300 px-2 py-0.5 uppercase tracking-wider">
                              {gw.badge}
                            </span>
                          </div>
                          <p className="text-xs opacity-70 font-sans mt-1">{gw.description}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setGateways(
                                gateways.map((g) => (g.id === gw.id ? { ...g, active: !g.active } : g))
                              );
                              showToast(`GATEWAY: ${gw.name} ${gw.active ? 'DISABLED' : 'ENABLED'}`);
                            }}
                            className={`px-4 py-2 text-xs font-bold uppercase transition ${
                              gw.active
                                ? 'bg-white text-black hover:bg-neutral-200'
                                : 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {gw.active ? 'ENABLED' : 'ACTIVATE'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. CATALOG CRUD */}
            {adminTab === 'products' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      CATALOG INVENTORY & DROPS
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      Adjust pricing, toggle runway drops, manage stock quantities and descriptions.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt('ENTER PIECE NAME:');
                      const price = prompt('ENTER SALE PRICE (EGP):');
                      if (name && price) {
                        const newItem = {
                          id: `loom-0${products.length + 1}`,
                          ref: `REF. 0482/10${products.length + 1}`,
                          title: name.toUpperCase(),
                          subtitle: 'NEW DROP ARCHIVE',
                          category: 'hoodies',
                          gender: 'UNISEX',
                          price: Number(price),
                          salePrice: Number(price) - 100,
                          cogs: Number(price) * 0.4,
                          badge: 'NEW DROP',
                          fabric: '480 GSM Mineral Terry',
                          stock: 30,
                          sizes: ['M/L', 'L/XL'],
                          image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
                          description: 'Generous boxy cut with double hood volume.',
                          highlight: 'إصدار خريفي جديد'
                        };
                        setProducts([newItem, ...products]);
                        showToast('NEW PIECE ADDED TO LOOKBOOK');
                      }
                    }}
                    className={`px-5 py-2.5 ${themeStyles.highlight} text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2 cursor-pointer`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD LOOKBOOK DESIGN</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-neutral-800 divide-y divide-neutral-800">
                    <thead>
                      <tr className="bg-black/60 opacity-70 tracking-[0.2em] uppercase">
                        <th className="py-3 px-3">Item / Reference</th>
                        <th className="py-3 px-3">Fabric GSM</th>
                        <th className="py-3 px-3">Cost (COGS)</th>
                        <th className="py-3 px-3">Price</th>
                        <th className="py-3 px-3">Sale</th>
                        <th className="py-3 px-3">Inventory</th>
                        <th className="py-3 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {products.map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-900/40">
                          <td className="py-3 px-3 flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-11 h-14 object-cover bg-neutral-900 filter grayscale-[20%]"
                            />
                            <div>
                              <div className="font-bold uppercase tracking-wider">{item.title}</div>
                              <div className="text-[10px] opacity-60">{item.ref}</div>
                            </div>
                          </td>
                          <td className="py-3 px-3 opacity-80">{item.fabric}</td>
                          <td className="py-3 px-3 opacity-70 font-mono">{item.cogs || 200} EGP</td>
                          <td className="py-3 px-3 opacity-50 line-through">{item.price} EGP</td>
                          <td className="py-3 px-3 font-bold">{item.salePrice || item.price} EGP</td>
                          <td className="py-3 px-3">
                            <span className="text-[10px] border border-neutral-700 px-2 py-0.5 uppercase">
                              {item.stock} UNITS
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  const pr = prompt('ENTER NEW SALE PRICE (EGP):', item.salePrice || item.price);
                                  if (pr) {
                                    setProducts(
                                      products.map((p) =>
                                        p.id === item.id ? { ...p, salePrice: Number(pr) } : p
                                      )
                                    );
                                    showToast('PRICE ADJUSTED');
                                  }
                                }}
                                className="p-1.5 opacity-70 hover:opacity-100 cursor-pointer"
                                title="Edit Price"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setProducts(products.filter((p) => p.id !== item.id));
                                  showToast('ITEM REMOVED FROM LOOKBOOK');
                                }}
                                className="p-1.5 opacity-50 hover:text-rose-400 cursor-pointer"
                                title="Delete Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. LOOKBOOK THEME & CONTENT */}
            {adminTab === 'design' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex items-center justify-between`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      EDITORIAL LOOKBOOK CONTROLLER
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      Customize campaign runway imagery, headlines, and announcement bar.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('LOOKBOOK EDITORIAL COMMITTED')}
                    className={`px-5 py-2.5 ${themeStyles.highlight} text-xs tracking-[0.2em] uppercase font-bold cursor-pointer`}
                  >
                    COMMIT
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`border ${themeStyles.border} p-5 space-y-4`}>
                    <span className="text-[10px] tracking-[0.25em] opacity-70 block uppercase">
                      TICKER BAR CONFIGURATION
                    </span>
                    <div>
                      <label className="text-[10px] opacity-60 block mb-1">TICKER MANIFESTO TEXT</label>
                      <input
                        type="text"
                        value={themeConfig.tickerText}
                        onChange={(e) => setThemeConfig({ ...themeConfig, tickerText: e.target.value })}
                        className="w-full bg-black/60 border border-neutral-700 px-3 py-2 text-xs text-white uppercase focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] opacity-60 block mb-1">LOCAL INSPECTION BADGE (ARABIC)</label>
                      <input
                        type="text"
                        value={themeConfig.tickerArabicBadge}
                        onChange={(e) => setThemeConfig({ ...themeConfig, tickerArabicBadge: e.target.value })}
                        className="w-full bg-black/60 border border-neutral-700 px-3 py-2 text-xs text-white font-sans focus:border-white outline-none"
                      />
                    </div>
                  </div>

                  <div className={`border ${themeStyles.border} p-5 space-y-4`}>
                    <span className="text-[10px] tracking-[0.25em] opacity-70 block uppercase">
                      RUNWAY HERO MEDIA
                    </span>
                    <div>
                      <label className="text-[10px] opacity-60 block mb-1">RUNWAY IMAGE URL</label>
                      <input
                        type="text"
                        value={themeConfig.heroBgImage}
                        onChange={(e) => setThemeConfig({ ...themeConfig, heroBgImage: e.target.value })}
                        className="w-full bg-black/60 border border-neutral-700 px-3 py-2 text-xs text-white focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] opacity-60 block mb-1">HERO HEADLINE</label>
                      <input
                        type="text"
                        value={themeConfig.heroHeading}
                        onChange={(e) => setThemeConfig({ ...themeConfig, heroHeading: e.target.value })}
                        className="w-full bg-black/60 border border-neutral-700 px-3 py-2 text-xs text-white uppercase focus:border-white outline-none font-serif"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. HIERARCHICAL STAFF & ROLES */}
            {adminTab === 'staff' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      ORGANIZATIONAL HIERARCHY & PERMISSIONS MATRIX
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      Assign custom roles across Executive, Management, and Operational levels.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {staff.map((member) => (
                    <div
                      key={member.id}
                      className={`border p-5 space-y-4 ${
                        member.isOwner
                          ? 'border-amber-500/50 bg-amber-950/10'
                          : `${themeStyles.border} bg-black/40`
                      }`}
                    >
                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b ${themeStyles.border} pb-3`}>
                        <div className="flex items-center gap-3">
                          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm uppercase">{member.name}</span>
                              <span className={`text-[10px] px-2 py-0.5 uppercase ${
                                member.isOwner
                                  ? 'bg-amber-400 text-black font-bold'
                                  : 'border border-neutral-700 opacity-70'
                              }`}>
                                {member.roleTitle}
                              </span>
                            </div>
                            <span className="text-xs opacity-60">{member.email} • {member.rank}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-400 uppercase tracking-widest">● {member.status.toUpperCase()}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { key: 'waybills', label: 'WAYBILL PRINTING' },
                          { key: 'orders', label: 'COURIER DISPATCH' },
                          { key: 'products', label: 'CATALOG & PRICING' },
                          { key: 'logistics', label: 'COURIER PARTNERS' },
                          { key: 'finance', label: 'FINANCE & COGS' },
                          { key: 'gateways', label: 'PAYMENT GATEWAYS' },
                          { key: 'design', label: 'LOOKBOOK DESIGN' },
                          { key: 'staff', label: 'STAFF CONTROL' }
                        ].map((perm) => (
                          <label
                            key={perm.key}
                            className={`flex items-center gap-2 bg-black border p-2 text-[10px] cursor-pointer ${
                              member.permissions[perm.key]
                                ? 'border-neutral-500 text-white'
                                : 'border-neutral-900 opacity-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              disabled={member.isOwner}
                              checked={member.permissions[perm.key] || false}
                              onChange={(e) => {
                                const updated = staff.map((s) => {
                                  if (s.id === member.id) {
                                    return {
                                      ...s,
                                      permissions: { ...s.permissions, [perm.key]: e.target.checked }
                                    };
                                  }
                                  return s;
                                });
                                setStaff(updated);
                                showToast('PERMISSIONS SYNCHRONIZED');
                              }}
                              className="accent-white"
                            />
                            <span>{perm.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SIZE & FIT ADVISOR MODAL */}
      {showSizeAdvisor && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 text-white">
          <div className="border border-neutral-800 bg-[#0a0a0a] max-w-lg w-full p-8 relative font-mono">
            <button onClick={() => setShowSizeAdvisor(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase block mb-1">
              ATELIER MEASUREMENTS
            </span>
            <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-white uppercase mb-6">
              SIZE & SILHOUETTE CALCULATOR
            </h3>

            <div className="space-y-6 mb-8 border border-neutral-900 p-6 bg-black">
              <div>
                <div className="flex justify-between text-xs mb-2 text-neutral-300">
                  <span>BODY WEIGHT:</span>
                  <span className="text-white font-bold">{calcWeight} KG</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="120"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2 text-neutral-300">
                  <span>HEIGHT:</span>
                  <span className="text-white font-bold">{calcHeight} CM</span>
                </div>
                <input
                  type="range"
                  min="155"
                  max="205"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>
            </div>

            <div className="border border-neutral-700 p-6 space-y-2 mb-6">
              <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase block">
                RECOMMENDED SILHOUETTE
              </span>
              <div className="text-2xl font-serif text-white">{recommendedSize.size}</div>
              <p className="text-xs text-neutral-400 font-sans tracking-wide">{recommendedSize.fit}</p>
            </div>

            <div className="text-neutral-400 font-sans text-xs flex items-center gap-2 border-t border-neutral-900 pt-4">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span>متاح قياس القطعة وتجربتها مع المندوب قبل دفع أي جنيه.</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRODUCT DETAIL MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 text-white">
          <div className="border border-neutral-800 bg-[#0a0a0a] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative font-mono">
            <button onClick={() => setActiveModalProduct(null)} className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[3/4] bg-neutral-950 overflow-hidden">
                <img src={activeModalProduct.image} alt={activeModalProduct.title} className="w-full h-full object-cover filter grayscale-[15%]" />
              </div>

              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">
                    {activeModalProduct.ref} • {activeModalProduct.fabric}
                  </div>
                  <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-white uppercase mb-2">
                    {activeModalProduct.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6">
                    {activeModalProduct.description}
                  </p>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-2xl font-serif text-white">
                      {activeModalProduct.salePrice || activeModalProduct.price} EGP
                    </span>
                    {activeModalProduct.salePrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        {activeModalProduct.price} EGP
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase block">
                      CHOOSE SIZE:
                    </span>
                    <div className="flex gap-3">
                      {activeModalProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => {
                            addToCart(activeModalProduct, sz);
                            setActiveModalProduct(null);
                            setIsCartOpen(true);
                          }}
                          className="flex-1 py-3 border border-neutral-700 hover:border-white text-xs tracking-[0.2em] uppercase text-white font-bold transition cursor-pointer"
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-900 font-sans text-xs text-neutral-400">
                  🛡️ شحن مؤمن عبر <strong>{activeCourier.name}</strong> مع المعاينة والقياس المجاني قبل الاستلام.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SLIDE-OUT SHOPPING BAG & COD DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end text-white">
          <div className="w-full max-w-md bg-[#0a0a0a] h-full border-l border-neutral-800 flex flex-col justify-between font-mono">
            <div className="p-6 border-b border-neutral-900 flex items-center justify-between text-xs tracking-[0.25em] uppercase">
              <span className="text-white font-bold">SHOPPING BAG [{cart.reduce((s, i) => s + i.quantity, 0)}]</span>
              <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="py-20 text-center text-neutral-600 space-y-3">
                  <div className="text-xs uppercase tracking-[0.2em]">YOUR BAG IS EMPTY</div>
                  <button onClick={() => setIsCartOpen(false)} className="px-6 py-2.5 border border-neutral-700 text-neutral-300 text-[10px] tracking-[0.2em] uppercase hover:border-white cursor-pointer">
                    RETURN TO LOOKBOOK
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.key} className="flex gap-4 border-b border-neutral-900 pb-4">
                        <img src={item.image} alt={item.title} className="w-14 h-18 object-cover bg-neutral-950 filter grayscale-[15%]" />
                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
                          <div className="text-[10px] text-neutral-500">SIZE: {item.size} • QTY: {item.quantity}</div>
                          <div className="text-xs text-white">{item.price} EGP</div>
                        </div>
                        <button onClick={() => removeFromCart(item.key)} className="text-neutral-500 hover:text-white cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handlePlaceOrder} className="pt-4 border-t border-neutral-900 space-y-4 font-sans">
                    <div className="flex items-center justify-between font-mono text-xs tracking-wider">
                      <span className="text-white uppercase font-bold">CHECKOUT & DISPATCH</span>
                      <span className="text-[11px] text-neutral-400">معاينة وقياس منزلي</span>
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="الاسم ثلاثي (Full Name)"
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="رقم الهاتف (WhatsApp Mobile)"
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={checkoutData.governorate}
                        onChange={(e) => setCheckoutData({ ...checkoutData, governorate: e.target.value })}
                        className="bg-black border border-neutral-800 p-3 text-xs text-white"
                      >
                        {EGYPT_GOVERNORATES.map((g) => {
                          const cost = activeCourier.rates[g.id] || g.defaultCost;
                          return (
                            <option key={g.id} value={g.id}>
                              {g.name} (+{cost}ج)
                            </option>
                          );
                        })}
                      </select>
                      <input
                        type="text"
                        required
                        placeholder="المنطقة أو الحي"
                        value={checkoutData.cityArea}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cityArea: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="العنوان التفصيلي (الشارع ورقم العمارة)"
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                        CHOOSE PAYMENT METHOD:
                      </span>
                      <div className="space-y-1.5 font-mono text-xs">
                        {gateways
                          .filter((g) => g.active)
                          .map((gw) => (
                            <label
                              key={gw.id}
                              className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                                checkoutData.paymentGateway === gw.id
                                  ? 'border-white bg-neutral-900 text-white'
                                  : 'border-neutral-800 text-neutral-400'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="pg"
                                  value={gw.id}
                                  checked={checkoutData.paymentGateway === gw.id}
                                  onChange={() => setCheckoutData({ ...checkoutData, paymentGateway: gw.id })}
                                  className="accent-white"
                                />
                                <span>{gw.name.split('(')[0]}</span>
                              </div>
                              <span className="text-[9px] text-neutral-500">{gw.badge}</span>
                            </label>
                          ))}
                      </div>
                    </div>

                    <div className="border border-neutral-900 p-4 space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-neutral-500">
                        <span>SUBTOTAL:</span>
                        <span>{cartSubtotal} EGP</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>COURIER ({activeCourier.name}):</span>
                        <span>{calculatedShippingCost} EGP</span>
                      </div>
                      <div className="flex justify-between text-white font-bold border-t border-neutral-900 pt-2">
                        <span>TOTAL DUE:</span>
                        <span>{cartSubtotal + calculatedShippingCost} EGP</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black font-mono text-xs tracking-[0.25em] uppercase font-bold hover:bg-neutral-200 transition cursor-pointer"
                    >
                      CONFIRM ORDER & DISPATCH
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="p-4 bg-black border-t border-neutral-900 text-[10px] text-neutral-500 text-center font-sans">
              معاينة وقياس مجاني مع مندوب {activeCourier.name} قبل دفع ثمن الأوردر.
            </div>
          </div>
        </div>
      )}

      {/* EDITORIAL FOOTER */}
      <footer className={`border-t ${themeStyles.border} py-16 font-mono text-xs opacity-70`}>
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-serif text-2xl tracking-[0.2em] uppercase mb-1 flex items-center group cursor-pointer">
              <span>L</span>
              <span className="inline-flex items-center justify-center transform group-hover:rotate-[360deg] transition-transform duration-1000 ease-out">
                <InfinityLogo className="w-7 h-4 mx-0.5 text-inherit" />
              </span>
              <span>O</span>
              <span>M</span>
              <span className="ml-2">STUDIOS</span>
            </div>
            <div className="text-[10px] tracking-[0.3em] opacity-60 uppercase">
              HEAVYWEIGHT COTTON ATELIER / CAIRO
            </div>
          </div>

          <div className="flex flex-wrap gap-8 text-[10px] tracking-[0.25em] uppercase">
            <span>COLLECTION 2026</span>
            <span>•</span>
            <span>DOORSTEP TRY-ON GUARANTEE</span>
            <span>•</span>
            <span>DISPATCH: {activeCourier.name}</span>
          </div>

          <div className="text-[10px] opacity-60 tracking-[0.2em]">
            © 2026 LOOM STUDIOS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
