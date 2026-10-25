import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  SlidersHorizontal,
  Package,
  Users,
  BarChart3,
  Trash2,
  Plus,
  Edit,
  MessageCircle,
  ShieldCheck,
  Truck,
  ArrowRight,
  X,
  Search,
  Copy,
  Settings,
  Palette,
  Sliders,
  ChevronDown,
  RefreshCw,
  MapPin,
  Check,
  User,
  LogOut,
  Mail,
  Key,
  DollarSign,
  TrendingUp,
  CreditCard,
  Send,
  Activity,
  Printer,
  QrCode,
  Image as ImageIcon,
  CheckCircle2,
  Tag,
  PhoneCall
} from 'lucide-react';

// --- بيانات اعتماد المالك الرسمي ---
const OWNER_EMAIL = 'gotrack777@gmail.com';
const OWNER_PASS = '123456789';

// شعار الإنفينيتي المتقن هندسياً
const InfinityLogo = ({ className = "w-8 sm:w-10 h-5 sm:h-6 mx-0.5 inline-block" }) => (
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

// المحافظات المصرية وتكاليف الشحن
const INITIAL_GOVERNORATES = [
  { id: 'cairo', name: 'القاهرة (Cairo)', cost: 60 },
  { id: 'giza', name: 'الجيزة وأكتوبر وزايد (Giza)', cost: 60 },
  { id: 'alex', name: 'الإسكندرية (Alexandria)', cost: 75 },
  { id: 'delta', name: 'الدلتا والوجه البحري (Delta)', cost: 80 },
  { id: 'canal', name: 'مدن القناة (Canal Cities)', cost: 85 },
  { id: 'upper', name: 'الصعيد (Upper Egypt)', cost: 100 }
];

// كتالوج المنتجات مع الألوان والمقاسات والصور المتعددة
const INITIAL_PRODUCTS = [
  {
    id: 'loom-01',
    ref: 'REF. 0482/101',
    title: 'THE INFINITE COMPLETE TRACKSUIT',
    subtitle: 'OVERSIZED HOODIE & RELAXED TROUSERS',
    category: 'sets',
    price: 1100,
    salePrice: 899,
    cogs: 420,
    badge: 'RUNWAY EXCLUSIVE',
    fabric: '460 GSM Heavyweight Terry Cotton',
    stock: 42,
    sizes: ['M/L', 'L/XL'],
    colors: [
      { name: 'Noir Black', hex: '#0a0a0a' },
      { name: 'Heather Gray', hex: '#6b7280' }
    ],
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    description: 'طقم كامل يتكون من هودي وبنطال بقصة أوفرسايز معمارية مريحة، خامة ميلتون قطن مصري ممشط 460 جرام معالج ضد الانكماش.'
  },
  {
    id: 'loom-02',
    ref: 'REF. 0482/102',
    title: 'HEAVYWEIGHT INFINITE HOODIE',
    subtitle: 'BOXY DROPPED-SHOULDER FLEECE',
    category: 'hoodies',
    price: 650,
    salePrice: 550,
    cogs: 240,
    badge: 'NEW',
    fabric: '480 GSM Dense Brushed Fleece',
    stock: 28,
    sizes: ['M/L', 'L/XL'],
    colors: [
      { name: 'Noir Black', hex: '#0a0a0a' },
      { name: 'Washed Ash', hex: '#374151' }
    ],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    description: 'هودي ثقيل بكتف ساقط، كابيشون مبطن بطبقتين مع جيب كانغرو مخفي وتطريز رمزي كثيف على الظهر.'
  },
  {
    id: 'loom-03',
    ref: 'REF. 0482/103',
    title: 'WIDE-LEG RELAXED INSEAM SWEATPANTS',
    subtitle: 'EXTENDED DRAPE WITH WAIST DRAWSTRING',
    category: 'pants',
    price: 520,
    salePrice: 440,
    cogs: 200,
    badge: 'RUNWAY',
    fabric: '440 GSM Loopback Heavy Knit',
    stock: 35,
    sizes: ['M/L', 'L/XL'],
    colors: [
      { name: 'Noir Black', hex: '#0a0a0a' }
    ],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    description: 'بنطال ميلتون بأرجل مستقيمة واسعة تتدفق فوق الأحذية الرياضية مع حبل شد قطني عريض وأطراف معدنية غير لامعة.'
  }
];

// فريق العمل والموظفين الإداريين
const INITIAL_STAFF = [
  {
    id: 'staff-owner',
    name: 'Ibrahim Bakry (المالك الرئيسي)',
    email: OWNER_EMAIL,
    roleTitle: 'Master Owner / المدير التنفيذي',
    isOwner: true,
    permissions: {
      products_create: true,
      products_edit: true,
      shipping_manage: true,
      gateways_manage: true,
      orders_manage: true,
      waybills_print: true,
      staff_manage: true,
      revenue_view: true
    }
  },
  {
    id: 'staff-manager',
    name: 'كريم عادل',
    email: 'karim.ops@loom.com',
    roleTitle: 'مسؤول العمليات والشحن',
    isOwner: false,
    permissions: {
      products_create: false,
      products_edit: true,
      shipping_manage: true,
      gateways_manage: false,
      orders_manage: true,
      waybills_print: true,
      staff_manage: false,
      revenue_view: false
    }
  }
];

// شركات الشحن
const INITIAL_COURIERS = [
  { id: 'bosta', name: 'Bosta Express (بوسطة)', isDefault: true, baseRate: 55, active: true },
  { id: 'mylerz', name: 'Mylerz Logistics (مايلرز)', isDefault: false, baseRate: 60, active: true },
  { id: 'aramex', name: 'Aramex Domestic (أرامكس)', isDefault: false, baseRate: 75, active: true }
];

// خيارات الدفع
const INITIAL_PAYMENT_METHODS = [
  { id: 'cod', name: 'الدفع عند الاستلام مع المعاينة والقياس (COD)', type: 'cash', active: true, desc: 'معاينة وقياس قبل السداد' },
  { id: 'instapay', name: 'تحويل انستاباي فوري (InstaPay)', type: 'transfer', active: true, desc: 'تحويل مباشر لحساب: loomstudios@instapay' },
  { id: 'deposit', name: 'عربون حجز شحن مسبق (Deposit)', type: 'deposit', active: true, desc: 'دفع عربون 100 ج.م لضمان الجدية واستكمال الباقي عند الاستلام' }
];

export default function App() {
  const [view, setView] = useState('store'); // 'store' | 'admin'
  const [adminTab, setAdminTab] = useState('products'); // 'products' | 'orders' | 'staff' | 'shipping' | 'gateways' | 'waybills'
  const [theme, setTheme] = useState('noir'); // 'noir' | 'ash' | 'blanc'

  // المستخدم المسجل الحالي (الافتراضي هو المالك إذا تم الدخول)
  const [currentUser, setCurrentUser] = useState(INITIAL_STAFF[0]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState(OWNER_EMAIL);
  const [loginPassword, setLoginPassword] = useState(OWNER_PASS);
  const [authError, setAuthError] = useState('');

  // البيانات التشغيلية
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [couriers, setCouriers] = useState(INITIAL_COURIERS);
  const [paymentMethods, setPaymentMethods] = useState(INITIAL_PAYMENT_METHODS);
  const [governorates, setGovernorates] = useState(INITIAL_GOVERNORATES);
  const [orders, setOrders] = useState([]);

  // حالة المتجر والسلة (مفتوحة لكل الزوار دون تسجيل دخول)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // حالة نموذج إتمام الطلب للعميل
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    altPhone: '', // رقم إضافي
    governorate: 'cairo',
    cityArea: '',
    address: '',
    paymentMethod: 'cod',
    notes: ''
  });

  // حالة نموذج إضافة/تعديل منتج في لوحة التحكم
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    subtitle: '',
    category: 'hoodies',
    price: '',
    salePrice: '',
    cogs: '',
    stock: '',
    fabric: '480 GSM Dense Cotton',
    image: '',
    detailImage: '',
    description: '',
    sizes: ['M/L', 'L/XL'],
    colors: [{ name: 'Noir Black', hex: '#0a0a0a' }]
  });

  // إضافة موظف/إداري جديد
  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    email: '',
    roleTitle: '',
    permissions: {
      products_create: true,
      products_edit: true,
      shipping_manage: false,
      gateways_manage: false,
      orders_manage: true,
      waybills_print: true,
      staff_manage: false,
      revenue_view: false
    }
  });

  // إشعار عائم
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // شركة الشحن الافتراضية
  const defaultCourier = useMemo(() => {
    return couriers.find(c => c.isDefault && c.active) || couriers[0];
  }, [couriers]);

  // حساب تكلفة الشحن
  const activeShippingCost = useMemo(() => {
    const gov = governorates.find(g => g.id === checkoutData.governorate);
    return gov ? gov.cost : 60;
  }, [governorates, checkoutData.governorate]);

  // إجمالي السلة
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // إضافة منتج للسلة مع اللون والمقاس المختارين
  const handleAddToCart = (product, chosenSize, chosenColor) => {
    const size = chosenSize || product.sizes[0];
    const color = chosenColor || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    const key = `${product.id}-${size}-${color}`;

    const exists = cart.find(i => i.key === key);
    if (exists) {
      setCart(cart.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([
        ...cart,
        {
          key,
          id: product.id,
          title: product.title,
          price: product.salePrice || product.price,
          cogs: product.cogs || 200,
          size,
          color,
          image: product.image,
          quantity: 1
        }
      ]);
    }
    showToast(`تمت الإضافة للحقيبة: ${product.title} (${size} - ${color})`);
    setIsCartOpen(true);
  };

  // تسجيل الطلب من قبل الزائر
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('سلة التسوق فارغة.');
      return;
    }

    const newOrder = {
      id: `LM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: checkoutData.name,
      email: checkoutData.email,
      phone: checkoutData.phone,
      altPhone: checkoutData.altPhone || 'غير مدخل',
      address: `${checkoutData.address} - ${checkoutData.cityArea}`,
      governorate: checkoutData.governorate,
      items: cart,
      subtotal: cartSubtotal,
      shippingCost: activeShippingCost,
      totalAmount: cartSubtotal + activeShippingCost,
      paymentMethod: checkoutData.paymentMethod,
      courier: defaultCourier.name,
      status: 'قيد التأكيد والمراجعة',
      date: new Date().toLocaleDateString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCartOpen(false);
    showToast(`تم تسجيل طلبك بنجاح برقم #${newOrder.id}، سنتواصل معك هاتفياً.`);
  };

  // حفظ أو تحديث المنتج في لوحة التحكم
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProductId) {
      // تعديل منتج قائم
      setProducts(products.map(p => p.id === editingProductId ? {
        ...p,
        ...productForm,
        price: Number(productForm.price),
        salePrice: productForm.salePrice ? Number(productForm.salePrice) : null,
        cogs: Number(productForm.cogs),
        stock: Number(productForm.stock)
      } : p));
      showToast('تم تعديل بيانات المنتج والأسعار بنجاح');
      setEditingProductId(null);
    } else {
      // إضافة منتج جديد
      const newProd = {
        ...productForm,
        id: `loom-${Date.now().toString().slice(-4)}`,
        ref: `REF. 0482/${Math.floor(100 + Math.random() * 900)}`,
        price: Number(productForm.price),
        salePrice: productForm.salePrice ? Number(productForm.salePrice) : null,
        cogs: Number(productForm.cogs) || Number(productForm.price) * 0.4,
        stock: Number(productForm.stock) || 10
      };
      setProducts([newProd, ...products]);
      showToast('تمت إضافة المنتج الجديد للكتالوج');
    }

    // تصفير النموذج
    setProductForm({
      title: '',
      subtitle: '',
      category: 'hoodies',
      price: '',
      salePrice: '',
      cogs: '',
      stock: '',
      fabric: '480 GSM Dense Cotton',
      image: '',
      detailImage: '',
      description: '',
      sizes: ['M/L', 'L/XL'],
      colors: [{ name: 'Noir Black', hex: '#0a0a0a' }]
    });
  };

  // تفعيل تعديل منتج
  const startEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title,
      subtitle: prod.subtitle,
      category: prod.category,
      price: prod.price,
      salePrice: prod.salePrice || '',
      cogs: prod.cogs || '',
      stock: prod.stock,
      fabric: prod.fabric,
      image: prod.image,
      detailImage: prod.detailImage || '',
      description: prod.description,
      sizes: prod.sizes || ['M/L', 'L/XL'],
      colors: prod.colors || [{ name: 'Noir Black', hex: '#0a0a0a' }]
    });
  };

  // إضافة إداري جديد
  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.email) return;

    const newMember = {
      id: `staff-${Date.now()}`,
      name: newStaffForm.name,
      email: newStaffForm.email,
      roleTitle: newStaffForm.roleTitle || 'إداري عمليات',
      isOwner: false,
      permissions: { ...newStaffForm.permissions }
    };

    setStaff([...staff, newMember]);
    setNewStaffForm({
      name: '',
      email: '',
      roleTitle: '',
      permissions: {
        products_create: true,
        products_edit: true,
        shipping_manage: false,
        gateways_manage: false,
        orders_manage: true,
        waybills_print: true,
        staff_manage: false,
        revenue_view: false
      }
    });
    showToast(`تمت إضافة الإداري وتعيين صلاحياته: ${newMember.name}`);
  };

  // تبديل صلاحية معينة لإداري
  const toggleStaffPermission = (staffId, permKey) => {
    setStaff(staff.map(s => {
      if (s.id === staffId && !s.isOwner) {
        return {
          ...s,
          permissions: {
            ...s.permissions,
            [permKey]: !s.permissions[permKey]
          }
        };
      }
      return s;
    }));
    showToast('تم تحديث الصلاحية بنجاح');
  };

  // تسجيل دخول الإدارة
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginEmail === OWNER_EMAIL && loginPassword === OWNER_PASS) {
      setCurrentUser(INITIAL_STAFF[0]);
      setShowAuthModal(false);
      setView('admin');
      showToast('تم الدخول بحساب المالك الرئيسي');
      return;
    }

    const member = staff.find(s => s.email.toLowerCase() === loginEmail.toLowerCase());
    if (member) {
      setCurrentUser(member);
      setShowAuthModal(false);
      setView('admin');
      showToast(`تم الدخول: ${member.name} (${member.roleTitle})`);
      return;
    }

    setAuthError('بيانات الدخول غير صحيحة');
  };

  // أنماط التصميم حسب الثيم
  const themeClass = {
    noir: 'bg-[#0a0a0a] text-white border-neutral-800',
    ash: 'bg-[#1e1e20] text-neutral-100 border-neutral-700',
    blanc: 'bg-[#ffffff] text-black border-neutral-200'
  }[theme];

  return (
    <div className={`min-h-screen ${themeClass} font-sans antialiased flex flex-col transition-colors duration-300`}>
      {/* التنبيهات العائمة */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-black px-6 py-3.5 shadow-2xl font-mono text-[11px] tracking-widest uppercase border border-neutral-300 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* الشريط الإعلاني العلوي */}
      <aside className="border-b border-neutral-800/80 py-2 px-6 text-[10px] tracking-widest flex items-center justify-between font-mono uppercase bg-black/40">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-sans text-neutral-300">معاينة وقياس منزلي مجاني مع المندوب قبل السداد</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-neutral-400 font-sans">
          <span>شحن لجميع المحافظات عبر {defaultCourier.name.split(' ')[0]}</span>
        </div>
      </aside>

      {/* الهيدر الرئيسي مع الشعار المتحرك وأزرار التحكم */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-800 px-6 sm:px-10 h-20 flex items-center justify-between gap-6">
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          <button onClick={() => setView('store')} className="hover:text-white transition">الكتالوج (Archive)</button>
          <span className="text-neutral-700">|</span>
          <span className="text-[10px] text-neutral-500">خامات ميلتون 480 GSM</span>
        </nav>

        {/* الشعار التحريري مع حركة دوران الإنفينيتي 360 درجة */}
        <div onClick={() => setView('store')} className="cursor-pointer text-center group select-none flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-light tracking-[0.22em] font-serif flex items-center leading-none text-white">
            <span>L</span>
            <span className="inline-flex items-center justify-center transform group-hover:rotate-[360deg] transition-transform duration-1000 ease-out">
              <InfinityLogo className="w-8 sm:w-10 h-5 sm:h-6 mx-0.5 text-white" />
            </span>
            <span>O</span>
            <span>M</span>
          </div>
          <span className="text-[8px] font-mono tracking-[0.45em] text-neutral-400 uppercase mt-1">
            STUDIOS
          </span>
        </div>

        {/* أدوات الزائر والتحكم الإداري */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px] uppercase">
          {/* ثيمات العرض */}
          <div className="flex items-center border border-neutral-800 p-0.5 bg-neutral-950 rounded">
            <button onClick={() => setTheme('noir')} className={`px-2 py-0.5 text-[9px] ${theme === 'noir' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}>NOIR</button>
            <button onClick={() => setTheme('ash')} className={`px-2 py-0.5 text-[9px] ${theme === 'ash' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}>ASH</button>
            <button onClick={() => setTheme('blanc')} className={`px-2 py-0.5 text-[9px] ${theme === 'blanc' ? 'bg-black text-white font-bold' : 'text-neutral-400'}`}>BLANC</button>
          </div>

          {/* زر بوابة الإدارة (محمي) */}
          <button
            onClick={() => {
              if (currentUser) {
                setView(view === 'admin' ? 'store' : 'admin');
              } else {
                setShowAuthModal(true);
              }
            }}
            className={`px-3 py-1.5 border text-[10px] tracking-wider uppercase flex items-center gap-1.5 transition ${
              currentUser.isOwner
                ? 'border-amber-400 text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 font-bold'
                : 'border-neutral-700 text-neutral-300 hover:border-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{view === 'admin' ? 'المتجر' : 'لوحة الإدارة'}</span>
          </button>

          {/* زر سلة التسوق للزوار */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>[{cart.reduce((s, i) => s + i.quantity, 0)}]</span>
          </button>
        </div>
      </header>

      {/* ========================================== */}
      {/* 1. واجهة المتجر المفتوحة للزوار (STOREFRONT) */}
      {/* ========================================== */}
      {view === 'store' && (
        <main className="flex-1 w-full max-w-[1720px] mx-auto px-6 sm:px-10 py-10 space-y-16">
          {/* البانر الرئيسي */}
          <section className="relative w-full aspect-[21/9] min-h-[420px] bg-neutral-950 overflow-hidden border border-neutral-800 flex items-end p-8 md:p-14">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85"
              alt="Editorial Banner"
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75"
            />
            <div className="relative z-10 space-y-3 max-w-2xl text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-white/10 px-2 py-0.5 border border-white/20">WINTER 2026 ARCHIVE</span>
              <h1 className="text-4xl md:text-6xl font-serif font-light tracking-wide">ARCHITECTURAL DRAPE</h1>
              <p className="text-xs md:text-sm text-neutral-300 font-sans leading-relaxed">
                ميلتون مصري ثقيل بوزن 460 إلى 480 جرام، قصات ستريت وير أوروبية بأكتاف ساقطة تمنحك حضوراً صلباً ومقاوماً للغسيل المتكرر.
              </p>
            </div>
          </section>

          {/* شبكة المنتجات للزوار */}
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">INDEX [{products.length} PIECES]</span>
                <h2 className="text-2xl font-serif">المجموعة المتوفرة للشحن الفوري</h2>
              </div>
              <div className="text-xs text-neutral-400 font-mono">الدفع عند الاستلام بعد المعاينة</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="border border-neutral-800 bg-neutral-950/60 p-4 space-y-4 hover:border-neutral-500 transition duration-300">
                  <div className="aspect-[3/4] bg-neutral-900 overflow-hidden relative group cursor-pointer" onClick={() => setSelectedProductDetail(product)}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition duration-700"
                    />
                    {product.salePrice && (
                      <span className="absolute top-3 right-3 bg-white text-black text-[10px] font-mono font-bold px-2 py-0.5">
                        وفر {product.price - product.salePrice} EGP
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-neutral-400 block">{product.ref} • {product.fabric}</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider">{product.title}</h3>
                    <p className="text-xs text-neutral-400 font-sans line-clamp-2">{product.description}</p>

                    {/* خيارات الألوان المتوفرة */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase">الألوان:</span>
                        {product.colors.map((c, idx) => (
                          <span
                            key={idx}
                            title={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-neutral-700 inline-block"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-neutral-800">
                      <div>
                        <span className="text-base font-mono font-bold">{product.salePrice || product.price} EGP</span>
                        {product.salePrice && (
                          <span className="text-xs font-mono text-neutral-500 line-through mr-2">{product.price} EGP</span>
                        )}
                      </div>

                      <div className="flex gap-1.5">
                        {product.sizes.map(sz => (
                          <button
                            key={sz}
                            onClick={() => handleAddToCart(product, sz, product.colors ? product.colors[0]?.name : null)}
                            className="px-2.5 py-1 bg-white text-black font-mono text-[10px] font-bold hover:bg-neutral-300 transition"
                          >
                            + {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ========================================== */}
      {/* 2. لوحة تحكم الإدارة الكاملة (ENTERPRISE CMS) */}
      {/* ========================================== */}
      {view === 'admin' && (
        <div className="flex-1 max-w-[1720px] mx-auto px-6 sm:px-10 py-8 w-full flex flex-col md:flex-row gap-8 font-mono">
          {/* الشريط الجانبي للإدارة */}
          <aside className="w-full md:w-72 border border-neutral-800 bg-neutral-950 p-5 shrink-0 h-fit space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <div className="text-[9px] text-amber-400 uppercase tracking-widest font-bold">
                {currentUser.isOwner ? 'المالك العام (Full Root)' : currentUser.roleTitle}
              </div>
              <h3 className="text-sm font-bold uppercase mt-1">{currentUser.name}</h3>
              <span className="text-[10px] text-neutral-500">{currentUser.email}</span>
            </div>

            <nav className="space-y-1 text-xs">
              {/* إدارة المنتجات والتعديل عليها */}
              {(currentUser.isOwner || currentUser.permissions.products_create || currentUser.permissions.products_edit) && (
                <button
                  onClick={() => setAdminTab('products')}
                  className={`w-full flex items-center justify-between p-2.5 transition text-left ${adminTab === 'products' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2"><Package className="w-4 h-4" /><span>المنتجات والتسعير</span></div>
                  <span>[{products.length}]</span>
                </button>
              )}

              {/* الطلبات الواردة والشحن */}
              {(currentUser.isOwner || currentUser.permissions.orders_manage) && (
                <button
                  onClick={() => setAdminTab('orders')}
                  className={`w-full flex items-center justify-between p-2.5 transition text-left ${adminTab === 'orders' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" /><span>طلبات الزوار</span></div>
                  <span>[{orders.length}]</span>
                </button>
              )}

              {/* إدارة فريق العمل والصلاحيات */}
              {(currentUser.isOwner || currentUser.permissions.staff_manage) && (
                <button
                  onClick={() => setAdminTab('staff')}
                  className={`w-full flex items-center justify-between p-2.5 transition text-left ${adminTab === 'staff' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>الصلاحيات والإداريين</span></div>
                  <span>[{staff.length}]</span>
                </button>
              )}

              {/* إعدادات الشحن وأسعار المحافظات */}
              {(currentUser.isOwner || currentUser.permissions.shipping_manage) && (
                <button
                  onClick={() => setAdminTab('shipping')}
                  className={`w-full flex items-center justify-between p-2.5 transition text-left ${adminTab === 'shipping' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2"><Truck className="w-4 h-4" /><span>شركات الشحن والتسعير</span></div>
                </button>
              )}

              {/* خيارات الدفع والتسوية */}
              {(currentUser.isOwner || currentUser.permissions.gateways_manage) && (
                <button
                  onClick={() => setAdminTab('gateways')}
                  className={`w-full flex items-center justify-between p-2.5 transition text-left ${adminTab === 'gateways' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" /><span>طرق الدفع والعربون</span></div>
                </button>
              )}
            </nav>
          </aside>

          {/* محتوى الشاشة الإدارية */}
          <div className="flex-1 border border-neutral-800 bg-neutral-950 p-6 md:p-8">
            {/* 1. قسم إدارة المنتجات: إضافة + تعديل أسعار وألوان ومقاسات وصور */}
            {adminTab === 'products' && (
              <div className="space-y-8">
                <div className="border-b border-neutral-800 pb-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold uppercase">إدارة المنتجات والتعديل المالي (Product Engine)</h3>
                    <p className="text-xs text-neutral-400 font-sans mt-0.5">تعديل الأسعار، تكلفة التصنيع، إضافة ألوان ومقاسات وصور لكل قطعة.</p>
                  </div>
                  {editingProductId && (
                    <button
                      onClick={() => setEditingProductId(null)}
                      className="text-xs bg-neutral-800 text-neutral-300 px-3 py-1.5 hover:text-white"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                </div>

                {/* فورم إضافة أو تعديل المنتج */}
                {(currentUser.isOwner || currentUser.permissions.products_create || currentUser.permissions.products_edit) && (
                  <form onSubmit={handleSaveProduct} className="border border-neutral-800 bg-black/60 p-5 space-y-4 text-xs font-mono">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      <span>{editingProductId ? 'تعديل بيانات المنتج الحالي' : 'إضافة قطعة ميلتون جديدة للكتالوج'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">اسم المنتج</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: HEAVYWEIGHT ZIP HOODIE"
                          value={productForm.title}
                          onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">البيان الفرعي والقصة</label>
                        <input
                          type="text"
                          placeholder="مثال: BOX-FIT 480 GSM FLEECE"
                          value={productForm.subtitle}
                          onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">القسم</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        >
                          <option value="hoodies">هوديز (Hoodies)</option>
                          <option value="pants">سويت بانتس (Pants)</option>
                          <option value="sets">ترينج كامل (Full Suits)</option>
                          <option value="tees">تيشيرتات (Tees)</option>
                        </select>
                      </div>

                      {/* التسعير والتكلفة */}
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">سعر البيع الأصلي (EGP)</label>
                        <input
                          type="number"
                          required
                          placeholder="1100"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">سعر الخصم للزوار (اختياري)</label>
                        <input
                          type="number"
                          placeholder="899"
                          value={productForm.salePrice}
                          onChange={(e) => setProductForm({ ...productForm, salePrice: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">تكلفة التصنيع والخامة (COGS)</label>
                        <input
                          type="number"
                          placeholder="420"
                          value={productForm.cogs}
                          onChange={(e) => setProductForm({ ...productForm, cogs: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>

                      {/* روابط الصور */}
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-neutral-400 block mb-1">رابط الصورة الرئيسية للمنتج (Image URL)</label>
                        <input
                          type="url"
                          required
                          placeholder="https://images.unsplash.com/..."
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">الكمية المتوفرة بالمخزن</label>
                        <input
                          type="number"
                          placeholder="30"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>
                    </div>

                    {/* المقاسات والألوان المتوفرة */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-800 pt-3">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">المقاسات المتوفرة (مفصولة بفاصلة)</label>
                        <input
                          type="text"
                          placeholder="M/L, L/XL, S, XL"
                          value={productForm.sizes.join(', ')}
                          onChange={(e) => setProductForm({
                            ...productForm,
                            sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">الألوان (أدخل اسم اللون وكوده - مثال: Noir #0a0a0a)</label>
                        <input
                          type="text"
                          placeholder="Noir Black #0a0a0a, Ash Gray #6b7280"
                          value={productForm.colors.map(c => `${c.name} ${c.hex}`).join(', ')}
                          onChange={(e) => {
                            const raw = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            const parsed = raw.map(item => {
                              const parts = item.split(' ');
                              const hex = parts[parts.length - 1].startsWith('#') ? parts.pop() : '#000000';
                              return { name: parts.join(' ') || 'Color', hex };
                            });
                            setProductForm({ ...productForm, colors: parsed });
                          }}
                          className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">وصف الخامة والقصة بالتفصيل</label>
                      <textarea
                        rows={2}
                        placeholder="أدخل مواصفات غسيل وخياطة ووزن القطعة..."
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white font-sans"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition"
                      >
                        {editingProductId ? 'حفظ وتطبيق التعديلات' : 'نشر القطعة بالمتجر فوراً'}
                      </button>
                    </div>
                  </form>
                )}

                {/* جدول قائمة المنتجات للتعديل والحذف */}
                <div className="overflow-x-auto border border-neutral-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-900 text-neutral-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">المنتج</th>
                        <th className="p-3">سعر البيع</th>
                        <th className="p-3">التكلفة</th>
                        <th className="p-3">المخزون</th>
                        <th className="p-3">الألوان والمقاسات</th>
                        <th className="p-3 text-right">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-900/40">
                          <td className="p-3 flex items-center gap-3">
                            <img src={p.image} alt={p.title} className="w-10 h-12 object-cover" />
                            <div>
                              <div className="font-bold uppercase">{p.title}</div>
                              <div className="text-[10px] text-neutral-500">{p.ref}</div>
                            </div>
                          </td>
                          <td className="p-3 font-bold">{p.salePrice || p.price} EGP</td>
                          <td className="p-3 text-neutral-400">{p.cogs || 200} EGP</td>
                          <td className="p-3">{p.stock} قطعة</td>
                          <td className="p-3 text-[10px] text-neutral-400">
                            <div>مقاسات: {p.sizes.join(', ')}</div>
                            <div>ألوان: {p.colors ? p.colors.map(c => c.name).join(', ') : 'Default'}</div>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => startEditProduct(p)}
                                className="p-1.5 bg-neutral-800 hover:bg-white hover:text-black transition"
                                title="تعديل السعر والبيانات"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                                    setProducts(products.filter(item => item.id !== p.id));
                                    showToast('تم حذف المنتج بنجاح');
                                  }
                                }}
                                className="p-1.5 bg-neutral-800 hover:bg-rose-600 hover:text-white transition"
                                title="حذف"
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

            {/* 2. قسم إدارة الصلاحيات والإداريين الجدد */}
            {adminTab === 'staff' && (currentUser.isOwner || currentUser.permissions.staff_manage) && (
              <div className="space-y-8">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="text-base font-bold uppercase">إدارة الأقسام الإدارية والصلاحيات (Staff & RBAC Matrix)</h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    إضافة إداري جديد وتحديد الصلاحيات المفتوحة له (المنتجات، الشحن، بوابات الدفع، البوالص، والأرباح).
                  </p>
                </div>

                {/* فورم إضافة إداري جديد */}
                <form onSubmit={handleAddStaff} className="border border-neutral-800 bg-black/60 p-5 space-y-4 text-xs font-mono">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>إضافة إداري جديد للسيستم</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">اسم الإداري</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: أحمد سامي"
                        value={newStaffForm.name}
                        onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">البريد الإلكتروني للولوج</label>
                      <input
                        type="email"
                        required
                        placeholder="ahmed.ops@loom.com"
                        value={newStaffForm.email}
                        onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">المسمى الوظيفي / القسم</label>
                      <input
                        type="text"
                        placeholder="مثال: منسق طلبات وشحن"
                        value={newStaffForm.roleTitle}
                        onChange={(e) => setNewStaffForm({ ...newStaffForm, roleTitle: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                      />
                    </div>
                  </div>

                  {/* صندوق اختيار الصلاحيات */}
                  <div className="border-t border-neutral-800 pt-3">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-2">تحديد الصلاحيات المفتوحة له:</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                      {[
                        { key: 'products_create', label: 'إضافة منتجات جديدة' },
                        { key: 'products_edit', label: 'تعديل الأسعار والمنتجات' },
                        { key: 'shipping_manage', label: 'تعديل أسعار وشركات الشحن' },
                        { key: 'gateways_manage', label: 'تعديل طرق الدفع والعربون' },
                        { key: 'orders_manage', label: 'إدارة وتأكيد الطلبات' },
                        { key: 'waybills_print', label: 'طباعة البوالص الحرارية' },
                        { key: 'staff_manage', label: 'إدارة وتعيين إداريين' },
                        { key: 'revenue_view', label: 'عرض الأرباح والتقارير المالية' }
                      ].map(perm => (
                        <label key={perm.key} className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStaffForm.permissions[perm.key]}
                            onChange={(e) => setNewStaffForm({
                              ...newStaffForm,
                              permissions: { ...newStaffForm.permissions, [perm.key]: e.target.checked }
                            })}
                            className="accent-white"
                          />
                          <span>{perm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="px-5 py-2 bg-white text-black font-bold uppercase hover:bg-neutral-200">
                      اعتماد وإضافة الإداري
                    </button>
                  </div>
                </form>

                {/* قائمة الإداريين الحاليين مع مفاتيح الصلاحيات الحية */}
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div key={member.id} className="border border-neutral-800 bg-neutral-900/50 p-4 space-y-3">
                      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                        <div>
                          <span className="font-bold text-sm uppercase">{member.name}</span>
                          <span className="text-[10px] text-neutral-400 mr-2">({member.roleTitle}) • {member.email}</span>
                        </div>
                        {member.isOwner && (
                          <span className="text-[9px] bg-amber-400 text-black px-2 py-0.5 font-bold uppercase">المالك العام (ROOT)</span>
                        )}
                      </div>

                      {/* أزرار تبديل الصلاحيات المباشرة */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
                        {[
                          { key: 'products_create', label: 'إضافة منتجات' },
                          { key: 'products_edit', label: 'تعديل الأسعار' },
                          { key: 'shipping_manage', label: 'إدارة الشحن' },
                          { key: 'gateways_manage', label: 'طرق الدفع' },
                          { key: 'orders_manage', label: 'إدارة الطلبات' },
                          { key: 'waybills_print', label: 'طباعة البوالص' },
                          { key: 'staff_manage', label: 'إدارة الفريق' },
                          { key: 'revenue_view', label: 'عرض الأرباح' }
                        ].map(perm => (
                          <button
                            key={perm.key}
                            disabled={member.isOwner}
                            onClick={() => toggleStaffPermission(member.id, perm.key)}
                            className={`p-1.5 border text-center transition ${
                              member.permissions[perm.key]
                                ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300 font-bold'
                                : 'border-neutral-800 text-neutral-500'
                            }`}
                          >
                            {perm.label}: {member.permissions[perm.key] ? 'مفعل' : 'مغلق'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. قسم إدارة الشحن وتسعير المحافظات */}
            {adminTab === 'shipping' && (
              <div className="space-y-8">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="text-base font-bold uppercase">إعدادات شركات الشحن وأسعار المحافظات</h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">تحديد شركة الشحن الافتراضية وتعديل أسعار التوصيل لكل محافظة في مصر.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {couriers.map((c) => (
                    <div key={c.id} className={`border p-4 space-y-2 ${c.isDefault ? 'border-emerald-500 bg-emerald-950/20' : 'border-neutral-800'}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">{c.name}</span>
                        {c.isDefault && <span className="text-[9px] bg-emerald-400 text-black px-1.5 py-0.5 font-bold">الافتراضية</span>}
                      </div>
                      <button
                        onClick={() => {
                          setCouriers(couriers.map(item => ({ ...item, isDefault: item.id === c.id })));
                          showToast(`تم تعيين ${c.name} كشركة شحن افتراضية`);
                        }}
                        className="w-full text-xs py-1.5 bg-neutral-800 hover:bg-white hover:text-black uppercase"
                      >
                        تعيين كافتراضية بالمتجر
                      </button>
                    </div>
                  ))}
                </div>

                {/* تسعير المحافظات الحية */}
                <div className="border border-neutral-800 p-4 space-y-3">
                  <span className="text-xs font-bold text-neutral-300 uppercase block">تعديل أسعار الشحن للمحافظات (EGP):</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {governorates.map((g) => (
                      <div key={g.id} className="border border-neutral-800 p-2.5 flex items-center justify-between">
                        <span className="text-xs font-sans">{g.name}</span>
                        <input
                          type="number"
                          value={g.cost}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setGovernorates(governorates.map(item => item.id === g.id ? { ...item, cost: val } : item));
                          }}
                          className="w-16 bg-black border border-neutral-700 px-2 py-1 text-xs text-center font-bold text-amber-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. قسم طرق الدفع والعربون */}
            {adminTab === 'gateways' && (
              <div className="space-y-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="text-base font-bold uppercase">قنوات الدفع والتسوية المتاحة للزوار</h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">تفعيل أو إيقاف خيارات الدفع عند الاستلام، التحويل، أو العربون المسبق.</p>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map((pm) => (
                    <div key={pm.id} className="border border-neutral-800 p-4 flex justify-between items-center bg-black/40">
                      <div>
                        <div className="font-bold text-xs uppercase">{pm.name}</div>
                        <div className="text-[10px] text-neutral-500 font-sans mt-0.5">{pm.desc}</div>
                      </div>
                      <button
                        onClick={() => {
                          setPaymentMethods(paymentMethods.map(p => p.id === pm.id ? { ...p, active: !p.active } : p));
                          showToast(`تم تغيير حالة وسيلة الدفع: ${pm.name}`);
                        }}
                        className={`px-3 py-1 text-[10px] uppercase font-bold ${pm.active ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}
                      >
                        {pm.active ? 'مفعلة' : 'معطلة'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. قسم طلبات الزوار */}
            {adminTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="text-base font-bold uppercase">سجل طلبات الزوار والمبيعات ({orders.length})</h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">مراجعة أوردرات المشترين وأرقام هواتفهم للتأكيد والتوصيل.</p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 text-xs font-sans">لا توجد طلبات جديدة مسجلة حتى الآن.</div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="border border-neutral-800 bg-black/50 p-4 space-y-3">
                        <div className="flex justify-between items-start border-b border-neutral-800 pb-2">
                          <div>
                            <span className="font-bold text-amber-400 uppercase">#{ord.id}</span>
                            <span className="text-xs text-white mr-3 font-bold font-sans">{ord.customerName}</span>
                          </div>
                          <span className="font-bold text-base font-mono">{ord.totalAmount} EGP</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans text-neutral-300">
                          <div>الهاتف الأساسي: <strong className="font-mono text-white">{ord.phone}</strong></div>
                          <div>الهاتف الإضافي: <strong className="font-mono text-white">{ord.altPhone}</strong></div>
                          <div>البريد: {ord.email || 'غير مسجل'}</div>
                          <div>العنوان: {ord.address} ({ord.governorate})</div>
                        </div>

                        <div className="text-[11px] text-neutral-400 border-t border-neutral-900 pt-2 font-mono">
                          {ord.items.map((it, idx) => (
                            <span key={idx} className="block">• {it.title} (مقاس: {it.size} - لون: {it.color}) x{it.quantity}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. درج سلة الشراء وإتمام الطلب للزائر (CART & CHECKOUT) */}
      {/* ========================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end text-white font-sans">
          <div className="w-full max-w-lg bg-[#0e0e0e] h-full border-l border-neutral-800 flex flex-col justify-between p-6 overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider">حقيبة التسوق والطلب [{cart.reduce((s, i) => s + i.quantity, 0)}]</span>
              <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-24 text-center text-neutral-500 font-mono text-xs">الحقيبة فارغة حالياً. تصفح الكتالوج لاختيار قطعك.</div>
            ) : (
              <div className="space-y-6 my-6">
                {/* عناصر السلة */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.key} className="flex gap-3 border-b border-neutral-900 pb-3 items-center justify-between">
                      <img src={item.image} alt={item.title} className="w-12 h-14 object-cover" />
                      <div className="flex-1 text-xs">
                        <div className="font-bold uppercase font-mono">{item.title}</div>
                        <div className="text-[10px] text-neutral-400">مقاس: {item.size} • لون: {item.color} • عدد: {item.quantity}</div>
                        <div className="font-mono font-bold text-white mt-0.5">{item.price} EGP</div>
                      </div>
                      <button
                        onClick={() => setCart(cart.filter(i => i.key !== item.key))}
                        className="text-neutral-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* ملخص الحسابات */}
                <div className="border border-neutral-800 p-3 bg-black space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>قيمة المنتجات:</span>
                    <span>{cartSubtotal} EGP</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>الشحن عبر {defaultCourier.name.split(' ')[0]}:</span>
                    <span>{activeShippingCost} EGP</span>
                  </div>
                  <div className="flex justify-between text-white font-bold border-t border-neutral-800 pt-2 text-sm">
                    <span>المطلوب تحصيله عند الاستلام:</span>
                    <span className="text-amber-400">{cartSubtotal + activeShippingCost} EGP</span>
                  </div>
                </div>

                {/* نموذج إدخال بيانات المشتري دون الحاجة لتسجيل مسبق */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-3 border-t border-neutral-800 pt-4 text-xs font-sans">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">بيانات التوصيل والتأكيد:</span>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="الاسم ثلاثي"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-2.5 text-white focus:border-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="رقم الهاتف الأساسي (واتساب)"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-2.5 text-white focus:border-white outline-none font-mono"
                    />
                    <input
                      type="tel"
                      placeholder="رقم هاتف إضافي (بديل)"
                      value={checkoutData.altPhone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, altPhone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-2.5 text-white focus:border-white outline-none font-mono"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني (لتأكيد الفاتورة)"
                      value={checkoutData.email}
                      onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-2.5 text-white focus:border-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={checkoutData.governorate}
                      onChange={(e) => setCheckoutData({ ...checkoutData, governorate: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 p-2.5 text-white text-xs"
                    >
                      {governorates.map((g) => (
                        <option key={g.id} value={g.id}>{g.name} (+{g.cost}ج)</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      required
                      placeholder="المنطقة أو الحي"
                      value={checkoutData.cityArea}
                      onChange={(e) => setCheckoutData({ ...checkoutData, cityArea: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-2.5 text-white focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="العنوان بالتفصيل (اسم الشارع ورقم العمارة)"
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-2.5 text-white focus:border-white outline-none"
                    />
                  </div>

                  {/* وسيلة الدفع */}
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">طريقة السداد:</span>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      {paymentMethods.filter(p => p.active).map(pm => (
                        <label key={pm.id} className="flex items-center justify-between p-2 border border-neutral-800 bg-neutral-950 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="pm"
                              checked={checkoutData.paymentMethod === pm.id}
                              onChange={() => setCheckoutData({ ...checkoutData, paymentMethod: pm.id })}
                              className="accent-white"
                            />
                            <span>{pm.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition mt-4"
                  >
                    تأكيد الطلب وشحن الأوردر الآن
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة تسجيل الدخول للإدارة */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 text-white font-mono">
          <div className="border border-neutral-800 bg-[#0e0e0e] max-w-md w-full p-8 relative space-y-4 shadow-2xl">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">بوابة الإدارة المركزية</span>
              <h3 className="text-xl font-bold mt-1">تسجيل دخول طاقم الإدارة</h3>
            </div>

            {authError && <div className="p-2.5 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">{authError}</div>}

            <form onSubmit={handleAdminLogin} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-black border border-neutral-700 p-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">كلمة المرور</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-black border border-neutral-700 p-2 text-white outline-none"
                />
              </div>

              <button type="submit" className="w-full py-2.5 bg-white text-black font-bold uppercase hover:bg-neutral-200">
                تسجيل الدخول للوحة التحكم
              </button>
            </form>
          </div>
        </div>
      )}

      {/* الفوتر */}
      <footer className="border-t border-neutral-800 py-12 px-6 text-center text-xs text-neutral-500 font-mono space-y-2">
        <p>© 2026 LOOM STUDIOS ARCHIVE. ALL RIGHTS RESERVED.</p>
        <p className="text-[10px]">HAUTE STREETWEAR • 480 GSM MILTON FABRICATIONS • CAIRO & GIZA</p>
      </footer>
    </div>
  );
}
