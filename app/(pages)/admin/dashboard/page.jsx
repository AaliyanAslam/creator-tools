"use client";

import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Users,
  LogOut,
  Search,
  Bell,
  Trash2,
  Edit3,
  CheckCircle,
  Loader2,
  MoreVertical,
  ChevronRight,
  Lock,
  Menu,
  X,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
  Clock,
  ToggleLeft,
  ToggleRight,
  ImageOff,
} from "lucide-react";
import { urbanist } from "@/app/fonts";

const ACCENT = "#ED1C24";
const SIDEBAR_WIDTH = 260;

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab]       = useState("dashboard");
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [btnLoading, setBtnLoading]     = useState(false);
  const [editingId, setEditingId]       = useState(null);
  const [searchQuery, setSearchQuery]   = useState("");
  const [toast, setToast]               = useState({ show: false, message: "", type: "success" });
  const [countdownEnd, setCountdownEnd] = useState("");

  const emptyForm = {
    title: "", subtitle: "", description: "", features: "",
    price: "", originalPrice: "", badge: "", tag: "", image: "", isActive: true,
  };
  const [form, setForm] = useState(emptyForm);

  const mainContentRef = useRef(null);
  const sidebarRef     = useRef(null);
  const backdropRef    = useRef(null);
  const loginRef       = useRef(null);
  const toastTimerRef  = useRef(null);
  // Track whether GSAP has set the sidebar initial state
  const sidebarInitRef = useRef(false);

  // ── Auth ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const auth = localStorage.getItem("isAdminLoggedIn");
    if (auth === "true") {
      setIsLoggedIn(true);
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);

  // ── Sidebar initial state via GSAP (runs before paint to avoid flash) ─────
  // We let GSAP own ALL transform state on the sidebar and backdrop.
  // Tailwind's -translate-x-full is REMOVED from the sidebar className.
  // Instead we use gsap.set() here so GSAP controls the initial position.
  useLayoutEffect(() => {
    if (!sidebarRef.current || !backdropRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    // Sidebar: visible on desktop, off-screen on mobile
    gsap.set(sidebarRef.current, { x: isDesktop ? 0 : -SIDEBAR_WIDTH });

    // Backdrop: always hidden initially
    gsap.set(backdropRef.current, { opacity: 0, pointerEvents: "none" });

    sidebarInitRef.current = true;
  }, [isLoggedIn]); // re-run when dashboard mounts after login

  // ── Handle window resize: snap sidebar position without animation ─────────
  useEffect(() => {
    const onResize = () => {
      if (!sidebarRef.current) return;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        // Always show sidebar on desktop, kill any mobile animation
        gsap.set(sidebarRef.current, { x: 0 });
        gsap.set(backdropRef.current, { opacity: 0, pointerEvents: "none" });
        setIsSidebarOpen(false);
      } else if (!isSidebarOpen) {
        // Hide sidebar off-screen on mobile if not open
        gsap.set(sidebarRef.current, { x: -SIDEBAR_WIDTH });
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isSidebarOpen]);

  // ── Sidebar open/close animation (mobile only) ────────────────────────────
  // This effect ONLY runs the open/close animation; initial state is
  // handled by useLayoutEffect above, so there's no conflict.
  useEffect(() => {
    if (!sidebarRef.current || !backdropRef.current) return;
    if (!sidebarInitRef.current) return; // wait for initial set

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) return; // desktop sidebar is always visible via gsap.set

    if (isSidebarOpen) {
      // Slide in
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.32,
        ease: "power3.out",
        overwrite: true,
      });
      // Fade backdrop in
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.28,
        ease: "power2.out",
        pointerEvents: "auto",
        overwrite: true,
      });
    } else {
      // Slide out
      gsap.to(sidebarRef.current, {
        x: -SIDEBAR_WIDTH,
        duration: 0.28,
        ease: "power3.in",
        overwrite: true,
      });
      // Fade backdrop out
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        pointerEvents: "none",
        overwrite: true,
      });
    }
  }, [isSidebarOpen]);

  // ── Scroll lock ───────────────────────────────────────────────────────────
  // Uses a class on <html> rather than body.style to avoid conflicts.
  useEffect(() => {
    const html = document.documentElement;
    if (isSidebarOpen) {
      // Store current scroll position to prevent jump
      const scrollY = window.scrollY;
      html.style.overflow  = "hidden";
      html.style.position  = "fixed";
      html.style.top       = `-${scrollY}px`;
      html.style.width     = "100%";
    } else {
      const scrollY = html.style.top ? parseInt(html.style.top || "0") * -1 : 0;
      html.style.overflow  = "";
      html.style.position  = "";
      html.style.top       = "";
      html.style.width     = "";
      // Restore scroll position
      if (scrollY) window.scrollTo(0, scrollY);
    }
    return () => {
      html.style.overflow = "";
      html.style.position = "";
      html.style.top      = "";
      html.style.width    = "";
    };
  }, [isSidebarOpen]);

  // ── Login GSAP animation ──────────────────────────────────────────────────
  useGSAP(() => {
    if (!isLoggedIn && loginRef.current) {
      gsap.from(loginRef.current, {
        scale: 0.92, opacity: 0, duration: 0.7, ease: "back.out(1.7)",
      });
    }
  }, [isLoggedIn]);

  // ── Header entrance animation (runs once after login) ─────────────────────
  useGSAP(() => {
    if (!isLoggedIn) return;
    gsap.from(".header-anim", {
      y: -20, opacity: 0, duration: 0.6, delay: 0.15, ease: "power3.out",
    });
  }, [isLoggedIn]);

  // ── Page-tab transition ───────────────────────────────────────────────────
  useGSAP(() => {
    if (isLoggedIn && mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  // ── Product cards stagger ─────────────────────────────────────────────────
  useGSAP(() => {
    if (!loading && activeTab === "all-products") {
      const cards = document.querySelectorAll(".product-card");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }
        );
      }
    }
  }, [loading, activeTab]);

  // ── Firestore helpers ─────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;
    if (
      user === process.env.NEXT_PUBLIC_ADMIN_USER &&
      pass === process.env.NEXT_PUBLIC_ADMIN_PASS
    ) {
      gsap.to(loginRef.current, {
        opacity: 0, y: -40, duration: 0.45, ease: "power3.in",
        onComplete: () => {
          localStorage.setItem("isAdminLoggedIn", "true");
          setIsLoggedIn(true);
          fetchProducts();
        },
      });
    } else {
      showToast("Invalid credentials", "error");
      gsap.to(loginRef.current, { x: 8, repeat: 5, yoyo: true, duration: 0.06 });
    }
  };

  const logout = () => {
    setIsSidebarOpen(false);
    localStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
    setProducts([]);
  };

  const handleToggleActive = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: newStatus } : p)));
    try {
      await updateDoc(doc(db, "products", id), { isActive: newStatus });
      showToast(newStatus ? "Product activated" : "Product deactivated");
    } catch (err) {
      console.error("Toggle error:", err);
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: currentStatus } : p)));
      showToast("Failed to update status", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const payload = {
      ...form,
      features:
        typeof form.features === "string"
          ? form.features.split(",").map((f) => f.trim()).filter(Boolean)
          : form.features,
    };
    try {
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
        setProducts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p)));
        showToast("Product updated!");
      } else {
        const docRef = await addDoc(collection(db, "products"), {
          ...payload, createdAt: serverTimestamp(),
        });
        setProducts((prev) => [{ id: docRef.id, ...payload }, ...prev]);
        showToast("Product published!");
      }
      resetForm();
      setActiveTab("all-products");
    } catch (err) {
      console.error("Submit error:", err);
      showToast("Action failed", "error");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, "products", id));
      showToast("Product removed");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Delete failed", "error");
      fetchProducts();
    }
  };

  const saveCountdown = async () => {
    if (!countdownEnd) { showToast("Please select a date and time", "error"); return; }
    setBtnLoading(true);
    try {
      await setDoc(doc(db, "settings", "countdown"), {
        endTime: new Date(countdownEnd), updatedAt: serverTimestamp(),
      });
      showToast("Countdown timer updated successfully!");
    } catch (err) {
      console.error("Timer error:", err);
      showToast("Failed to update timer", "error");
    } finally {
      setBtnLoading(false);
    }
  };

  const showToast = useCallback((message, type = "success") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, message, type });
    toastTimerRef.current = setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000
    );
  }, []);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const handleEdit = (product) => {
    const featuresStr = Array.isArray(product.features)
      ? product.features.join(", ")
      : product.features || "";
    setForm({ ...emptyForm, ...product, features: featuresStr });
    setEditingId(product.id);
    setActiveTab("add-product");
    closeSidebar();
  };

  const savings =
    form.originalPrice && form.price
      ? Math.round(
          ((parseFloat(form.originalPrice) - parseFloat(form.price)) /
            parseFloat(form.originalPrice)) * 100
        )
      : 0;

  // ── Navigation helpers ────────────────────────────────────────────────────
  const openSidebar  = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navigate = (tab) => {
    if (tab !== "add-product") resetForm();
    setActiveTab(tab);
    closeSidebar(); // always close on mobile after navigation
  };

  const filtered = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(237,28,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(237,28,36,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div
          ref={loginRef}
          className="relative w-full max-w-md bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/60"
        >
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-red-200/50"
              style={{ background: ACCENT }}
            >
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Admin Portal</h1>
            <p className="text-slate-400 mt-1.5 text-sm font-medium">Secure access only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <FormInput label="Username" name="username" type="text" placeholder="admin_user" required />
            <FormInput label="Password" name="password" type="password" placeholder="••••••••" required />
            <button
              type="submit"
              className="w-full text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200/50 hover:opacity-90 active:scale-95 transition-all text-sm mt-2"
              style={{ background: ACCENT }}
            >
              Sign In →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Main Dashboard ────────────────────────────────────────────────────────
  return (
    <div className={`flex min-h-screen bg-[#F8F8FA] text-slate-900 overflow-x-hidden ${urbanist.className}`}>

      {/*
        ── Backdrop ──────────────────────────────────────────────────────────
        Opacity and pointer-events are 100% GSAP-controlled via gsap.set /
        gsap.to. We do NOT set opacity/pointer-events via Tailwind here.
        aria-hidden keeps it out of the a11y tree.
      */}
      <div
        ref={backdropRef}
        onClick={closeSidebar}
        aria-hidden="true"
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        // Intentionally no Tailwind opacity or pointer-events classes here
      />

      {/*
        ── Sidebar ───────────────────────────────────────────────────────────
        KEY FIX: -translate-x-full and lg:translate-x-0 Tailwind classes are
        REMOVED. All x-translation is owned entirely by GSAP (set in
        useLayoutEffect + animated in useEffect). Mixing Tailwind transforms
        with GSAP transforms on the same element causes the flicker/conflict.
      */}
      <aside
        ref={sidebarRef}
        className="fixed inset-y-0 left-0 w-[260px] bg-white border-r border-slate-100/80 z-50 flex flex-col shadow-xl shadow-slate-200/30"
        // No transform class — GSAP owns this
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-50">
          <img src="/logo/ctu1.png" alt="Logo" className="h-8 w-auto object-contain" />
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.18em] px-3 pb-2 pt-1">
            Menu
          </p>
          <NavLink icon={<LayoutDashboard size={17} />} label="Dashboard"      active={activeTab === "dashboard"}     onClick={() => navigate("dashboard")} />
          <NavLink icon={<PlusCircle size={17} />}      label="Add Product"    active={activeTab === "add-product"}   onClick={() => { resetForm(); navigate("add-product"); }} />
          <NavLink icon={<Package size={17} />}         label="Catalog"        active={activeTab === "all-products"}  count={products.length} onClick={() => navigate("all-products")} />
          <NavLink icon={<Clock size={17} />}           label="Timer Settings" active={activeTab === "settings"}      onClick={() => navigate("settings")} />
          <NavLink icon={<Users size={17} />}           label="Customers"      active={activeTab === "customers"}     onClick={() => navigate("customers")} />
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group text-sm font-semibold"
          >
            <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Header */}
        <header className="header-anim h-16 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100/80 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={openSidebar}
              className="lg:hidden p-2 text-slate-500 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={15} />
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-4 text-sm w-56 md:w-72 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell size={18} />
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full border-2 border-white"
                style={{ background: ACCENT }}
              />
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-red-100 cursor-pointer">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=ED1C24&color=fff&bold=true"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div ref={mainContentRef} className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">

          {/* ── Dashboard ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
                <p className="text-slate-400 text-sm mt-1 font-medium">Performance at a glance</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard icon={<Package size={20} />}      title="Products" value={products.length} trend="+12%" color="#ED1C24" />
                <StatCard icon={<TrendingUp size={20} />}   title="Revenue"  value="$42.3k"          trend="+8%"  color="#10b981" />
                <StatCard icon={<ShoppingCart size={20} />} title="Orders"   value="1,240"           trend="+14%" color="#6366f1" className="col-span-2 lg:col-span-1" />
              </div>
            </div>
          )}

          {/* ── Add / Edit Product ── */}
          {activeTab === "add-product" && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                  {editingId ? "Edit Product" : "New Product"}
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  {editingId ? "Update product details" : "Add to your catalog"}
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput label="Title *"   value={form.title}    onChange={(e) => setForm({ ...form, title: e.target.value })}    placeholder="Pro Package"    required />
                  <FormInput label="Subtitle"  value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Advanced Tier" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput label="Price (PKR) *" value={form.price}          onChange={(e) => setForm({ ...form, price: e.target.value })}         placeholder="2999" type="number" required />
                  <FormInput label={`Original Price${savings > 0 ? ` — ${savings}% savings` : ""}`}
                             value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="4500" type="number" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput label="Badge" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Best Seller" />
                  <FormInput label="Tag"   value={form.tag}   onChange={(e) => setForm({ ...form, tag: e.target.value })}   placeholder="Most Popular" />
                </div>
                <FormInput label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200 min-h-[100px] transition-all resize-none"
                    placeholder="Product description…"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Features <span className="normal-case font-medium text-slate-300">(comma separated)</span>
                  </label>
                  <input
                    value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all"
                    placeholder="24/7 Support, Free Updates, Priority Access"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  {editingId && (
                    <button type="button" onClick={resetForm}
                      className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="flex-1 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-100/50 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                    style={{ background: ACCENT }}
                  >
                    {btnLoading ? <Loader2 size={16} className="animate-spin" /> : editingId ? "Save Changes" : "Publish Product"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── Catalog ── */}
          {activeTab === "all-products" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight">Digital Catalog</h1>
                  <p className="text-slate-400 text-sm mt-1 font-medium">
                    {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => { resetForm(); setActiveTab("add-product"); }}
                  className="text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-red-100/40 flex items-center gap-2 shrink-0"
                  style={{ background: ACCENT }}
                >
                  <PlusCircle size={16} /> New Product
                </button>
              </div>

              {/* Mobile search */}
              <div className="relative sm:hidden mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={15} />
                <input
                  type="text"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all placeholder:text-slate-300"
                />
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 size={36} className="animate-spin text-red-400" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                  <Package size={48} strokeWidth={1} />
                  <p className="mt-4 font-bold text-slate-400">No products found</p>
                </div>
              ) : (
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 ${urbanist.className}`}>
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} onEdit={handleEdit} onDelete={handleDelete} onToggleActive={handleToggleActive} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Timer Settings ── */}
          {activeTab === "settings" && (
            <div className="max-w-lg mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">Limited Offer Timer</h1>
                <p className="text-slate-400 text-sm mt-1">Set when the countdown should end on the homepage</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <label className="block text-sm font-medium text-slate-600 mb-3">Offer Ends At</label>
                <input
                  type="datetime-local"
                  value={countdownEnd}
                  onChange={(e) => setCountdownEnd(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
                <button
                  onClick={saveCountdown}
                  disabled={btnLoading || !countdownEnd}
                  className="mt-8 w-full bg-[#ED1C24] text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {btnLoading ? <Loader2 size={20} className="animate-spin" /> : "Save & Activate Timer"}
                </button>
                <p className="text-center text-xs text-slate-400 mt-6">
                  The timer will appear live in the hero section and update in real-time.
                </p>
              </div>
            </div>
          )}

          {/* ── Customers ── */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">Community</h1>
                <p className="text-slate-400 text-sm mt-1 font-medium">Registered clients</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[560px]">
                    <thead>
                      <tr className="border-b border-slate-50">
                        {["Client", "Status", "Plan", "Action"].map((h) => (
                          <th key={h} className={`px-6 py-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.18em]${h === "Action" ? " text-right" : ""}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/80">
                      <CustomerRow name="Aisha Khan"    email="aisha@example.com" status="Active"  plan="Enterprise"    />
                      <CustomerRow name="Michael Chen"  email="m.chen@dev.com"    status="Pending" plan="Professional"  />
                      <CustomerRow name="Sarah Miller"  email="sarah@design.io"   status="Active"  plan="Starter"       />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SUB-COMPONENTS  (unchanged visually)
// ══════════════════════════════════════════════════════════════════

function ProductCard({ product: p, onEdit, onDelete, onToggleActive }) {
  const [imgError, setImgError] = useState(false);
  const menuRef = useRef(null);

  const features = Array.isArray(p.features)
    ? p.features
    : typeof p.features === "string"
    ? p.features.split(",").map((f) => f.trim()).filter(Boolean)
    : [];

  const savingsPct =
    p.originalPrice && p.price && parseFloat(p.originalPrice) > parseFloat(p.price)
      ? Math.round(((parseFloat(p.originalPrice) - parseFloat(p.price)) / parseFloat(p.originalPrice)) * 100)
      : 0;

  return (
    <div
      ref={menuRef}
      className={`product-card group relative bg-white rounded-2xl flex flex-col overflow-hidden border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 ${!p.isActive ? "opacity-55 grayscale-[0.5]" : ""}`}
    >
      <div className="relative w-full aspect-[16/9] bg-slate-50 overflow-hidden shrink-0">
        {p.image && !imgError ? (
          <img
            src={p.image}
            alt={p.title || "Product"}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-200">
            <ImageOff size={28} strokeWidth={1.5} />
            <span className="text-[10px] font-semibold text-slate-300">No image</span>
          </div>
        )}
        {p.badge && (
          <span className="absolute top-2.5 left-2.5 text-[9px] font-black uppercase tracking-wider text-white px-2 py-1 rounded-lg shadow" style={{ background: ACCENT }}>
            {p.badge}
          </span>
        )}
        <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 border-white shadow ${p.isActive ? "bg-emerald-400" : "bg-slate-300"}`} />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-black text-slate-900 truncate leading-snug">{p.title || "Untitled"}</h3>
            {p.subtitle && <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{p.subtitle}</p>}
          </div>
          {p.tag && (
            <span className="shrink-0 text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-lg uppercase tracking-wide whitespace-nowrap">
              {p.tag}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-black text-slate-900">PKR {Number(p.price || 0).toLocaleString()}</span>
          {p.originalPrice && parseFloat(p.originalPrice) > parseFloat(p.price || 0) && (
            <span className="text-xs text-slate-300 line-through font-medium">PKR {Number(p.originalPrice).toLocaleString()}</span>
          )}
          {savingsPct > 0 && (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">-{savingsPct}%</span>
          )}
        </div>

        {features.length > 0 && (
          <ul className="space-y-1">
            {features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <CheckCircle size={11} className="text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
            {features.length > 3 && (
              <li className="text-[10px] text-slate-300 font-semibold pl-4">+{features.length - 3} more</li>
            )}
          </ul>
        )}

        <div className="flex-1" />

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-50">
          <button
            onClick={() => onToggleActive(p.id, p.isActive)}
            className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide rounded-lg px-2.5 py-1.5 transition-all ${
              p.isActive ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            }`}
          >
            {p.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
            {p.isActive ? "Live" : "Off"}
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => onEdit(p)}     className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all" title="Edit product"><Edit3 size={14} /></button>
            <button onClick={() => onDelete(p.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"  title="Delete product"><Trash2 size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ icon, label, active, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
        active ? "text-white shadow-md shadow-red-200/40" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }`}
      style={active ? { background: ACCENT } : {}}
    >
      <span className={active ? "text-white" : "text-slate-400 group-hover:text-slate-600 transition-colors"}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && !active && (
        <span className="text-[9px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-md">{count}</span>
      )}
      {active && <ChevronRight size={14} className="text-white/60" />}
    </button>
  );
}

function StatCard({ icon, title, value, trend, color, className = "" }) {
  return (
    <div className={`bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, color }}>{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{value}</h2>
        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg mb-0.5">{trend}</span>
      </div>
    </div>
  );
}

function FormInput({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 group">
      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 transition-colors group-focus-within:text-red-400">
        {label}
      </label>
      <input
        {...props}
        className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-medium"
      />
    </div>
  );
}

function CustomerRow({ name, email, status, plan }) {
  return (
    <tr className="hover:bg-slate-50/40 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white shrink-0" style={{ background: ACCENT }}>
            {name[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{name}</p>
            <p className="text-[10px] text-slate-400 font-medium">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${status === "Active" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-500"}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-xs font-bold text-slate-500">{plan}</td>
      <td className="px-6 py-4 text-right">
        <button className="p-1.5 text-slate-300 hover:text-slate-500 transition-colors rounded-lg hover:bg-slate-50">
          <MoreVertical size={15} />
        </button>
      </td>
    </tr>
  );
}

function Toast({ toast }) {
  if (!toast.show) return null;
  return (
    <div
      className={`fixed bottom-5 right-5 z-[9999] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-white text-sm font-bold animate-in slide-in-from-right-4 duration-300 ${toast.type === "error" ? "" : "bg-slate-900"}`}
      style={toast.type === "error" ? { background: ACCENT } : {}}
    >
      {toast.type === "error" ? <AlertCircle size={17} /> : <CheckCircle size={17} className="text-green-400" />}
      {toast.message}
    </div>
  );
}