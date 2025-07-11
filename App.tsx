import React, { useState, useEffect, useCallback, createContext, useContext, forwardRef } from 'react';

// --- SVG Icon Components ---
const PrinterIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);

// --- Simplified shadcn/ui Component Mocks ---

// Card components
const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white shadow-lg rounded-lg border border-gray-200 ${className || ''}`} {...props}>
    {children}
  </div>
);
const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 border-b border-gray-200 ${className || ''}`} {...props}>
    {children}
  </div>
);
const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-xl font-semibold text-gray-800 ${className || ''}`} {...props}>
    {children}
  </h3>
);
const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 ${className || ''}`} {...props}>
    {children}
  </div>
);

// Button component
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

const Button = ({ className, children, onClick, variant = 'default', size = 'default', ...props }: ButtonProps) => {
  let baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    ghost: "hover:bg-gray-100",
    link: "underline-offset-4 hover:underline text-blue-600",
  };
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10"
  };
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Input component
const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    {...props}
  />
));
Input.displayName = "Input";

// Label component
const Label = ({ className, children, htmlFor, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className || ''}`}
    {...props}
  >
    {children}
  </label>
);

// Tabs components
const TabsContext = createContext({ value: '', onValueChange: (value: string) => {} });

const Tabs = ({ children, value, onValueChange, className, ...props }: { children: React.ReactNode; value: string; onValueChange: (value: string) => void; className?: string }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={className} {...props}>{children}</div>
  </TabsContext.Provider>
);

const TabsList = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-slate-200 p-1 text-slate-600 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

const TabsTrigger = ({ children, value, className, ...props }: { children: React.ReactNode; value: string; className?: string }) => {
  const context = useContext(TabsContext);
  const isActive = context.value === value;
  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-slate-100'} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Dialog components
const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!open) return null;
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onOpenChange(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={handleOverlayClick}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
        {children}
      </div>
    </div>
  );
};
const DialogContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`relative z-50 grid w-full gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg ${className || ''}`} {...props}>
    {children}
  </div>
);
const DialogHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ''}`} {...props}>
    {children}
  </div>
);
const DialogTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`} {...props}>
    {children}
  </h2>
);

// Separator component
const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
  <hr className={`shrink-0 bg-gray-200 h-[1px] w-full ${className || ''}`} {...props} />
);

// --- Toast System ---
type ToastFunction = (options: { title: string; description?: string; duration?: number }) => void;
const ToastContext = createContext<{ toast: ToastFunction } | null>(null);

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<any[]>([]);
  const toast: ToastFunction = ({ title, description, duration = 3000 }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-[100]">
        {toasts.map(t => (
          <div key={t.id} className="bg-slate-900 text-white p-4 rounded-md shadow-lg w-80">
            <h3 className="font-semibold text-base">{t.title}</h3>
            {t.description && <p className="text-sm mt-1">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// --- Property Data Interface ---
interface PropertyData {
  id: string;
  name: string;
  percentage: number;
  priceUSD: number;
  priceRial: number;
  sellableAmount: number;
  targetSale: number;
  unit: string;
  icon: string;
}

// --- Main Application Component ---
const PropertyCalculatorApp: React.FC = () => {
    const { toast } = useToast();
    const [exchangeRate, setExchangeRate] = useState<number>(95_000);
    const [totalTargetToman, setTotalTargetToman] = useState<number>(100_000_000_000);
    const [totalTargetUSD, setTotalTargetUSD] = useState<number>(0);
    const [calculationMode, setCalculationMode] = useState<'top-down' | 'bottom-up'>('top-down');
    const [showPercentageModal, setShowPercentageModal] = useState(false);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [currentPercentageSum, setCurrentPercentageSum] = useState(0);

    const [properties, setProperties] = useState<PropertyData[]>([
        { id: 'commercial', name: 'تجاری همکف', percentage: 30, priceUSD: 0, priceRial: 700_000_000, sellableAmount: 0, targetSale: 0, unit: 'متر مربع', icon: '🏪' },
        { id: 'avaPlus', name: 'تجاری آوا پلاس', percentage: 40, priceUSD: 0, priceRial: 400_000_000, sellableAmount: 0, targetSale: 0, unit: 'متر مربع', icon: '🏢' },
        { id: 'office', name: 'اداری', percentage: 15, priceUSD: 0, priceRial: 250_000_000, sellableAmount: 0, targetSale: 0, unit: 'متر مربع', icon: '🏬' },
        { id: 'storage', name: 'انباری', percentage: 13, priceUSD: 0, priceRial: 200_000_000, sellableAmount: 0, targetSale: 0, unit: 'متر مربع', icon: '📦' },
        { id: 'parking', name: 'پارکینگ', percentage: 2, priceUSD: 0, priceRial: 400_000_000, sellableAmount: 0, targetSale: 0, unit: 'عدد', icon: '🚗' }
    ]);

    const formatDisplay = useCallback((num: number, decimals = 1): string => {
        const multiplier = Math.pow(10, decimals);
        const rounded = Math.round(num * multiplier) / multiplier;
        const options: Intl.NumberFormatOptions = rounded % 1 === 0
            ? { maximumFractionDigits: 0 }
            : { minimumFractionDigits: decimals, maximumFractionDigits: decimals };
        return new Intl.NumberFormat('fa-IR', options).format(rounded);
    }, []);

    const parseNumber = useCallback((value: string): number => {
        const westernNumerals = value
            .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728))
            .replace(/[٠-٩]/g, d => String.fromCharCode(d.charCodeAt(0) - 1584));
        const cleaned = westernNumerals.replace(/[^0-9\.]/g, '');
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
    }, []);

    useEffect(() => {
        setProperties(prev => prev.map(p => ({
            ...p,
            priceUSD: exchangeRate > 0 ? p.priceRial / exchangeRate : 0
        })));
        // Recalculate total USD when exchange rate changes in top-down mode
        if (calculationMode === 'top-down') {
            setTotalTargetUSD(exchangeRate > 0 ? totalTargetToman / exchangeRate : 0);
        }
    }, [exchangeRate, totalTargetToman, calculationMode]); // Add dependencies

    useEffect(() => {
        if (calculationMode === 'top-down') {
            setTotalTargetUSD(exchangeRate > 0 ? totalTargetToman / exchangeRate : 0);
        }
    }, [totalTargetToman, exchangeRate, calculationMode]);


    const updateProperty = (id: string, field: keyof PropertyData, value: string) => {
        const numericValue = parseNumber(value);

        setProperties(prev => prev.map(p => {
            if (p.id === id) {
                const updated = { ...p, [field]: numericValue };
                if (field === 'priceRial') {
                    updated.priceUSD = exchangeRate > 0 ? numericValue / exchangeRate : 0;
                }
                if (field === 'priceUSD') {
                    updated.priceRial = numericValue * exchangeRate;
                }
                return updated;
            }
            return p;
        }));
    };

    const performCalculations = () => {
        if (calculationMode === 'top-down') {
            const sum = properties.reduce((s, p) => s + p.percentage, 0);
            setCurrentPercentageSum(sum);
            if (Math.abs(sum - 100) > 0.1) {
                setShowPercentageModal(true);
                return;
            }
            setProperties(prev => prev.map(p => {
                const targetSale = (totalTargetToman * p.percentage) / 100;
                const priceUSD = exchangeRate > 0 ? p.priceRial / exchangeRate : 0; // Use current/recalculated priceUSD
                const sellableAmount = priceUSD > 0
                    ? targetSale / (priceUSD * exchangeRate)
                    : 0;
                return { ...p, targetSale, sellableAmount, priceUSD }; // Ensure priceUSD is updated
            }));
        } else {
            let currentTotalTargetToman = 0;
            const updatedProperties = properties.map(p => {
                const priceUSD = exchangeRate > 0 ? p.priceRial / exchangeRate : 0; // Use current/recalculated priceUSD
                const targetSale = p.sellableAmount * priceUSD * exchangeRate;
                currentTotalTargetToman += targetSale;
                return { ...p, targetSale, priceUSD }; // Ensure priceUSD is updated
            });

            setProperties(updatedProperties.map(p => ({
                ...p,
                percentage: currentTotalTargetToman > 0 ? (p.targetSale / currentTotalTargetToman) * 100 : 0
            })));
            setTotalTargetToman(currentTotalTargetToman);
            setTotalTargetUSD(exchangeRate > 0 ? currentTotalTargetToman / exchangeRate : 0);
        }
        toast({ title: "محاسبات انجام شد", description: "نتایج با موفقیت به‌روزرسانی شدند" });
    };

    // Initial calculation on load
    useEffect(() => {
        performCalculations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculationMode]); // Re-run if mode changes

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-emerald-50">
            <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">ماشین حساب هدف فروش املاک</h1>
                    <p className="text-base text-slate-600">حالت محاسبه را انتخاب کنید، سپس مقادیر را وارد و دکمه محاسبه را بزنید.</p>
                </div>

                <div className="mb-6 flex justify-center">
                    <Tabs value={calculationMode} onValueChange={v => setCalculationMode(v as 'top-down' | 'bottom-up')}>
                        <TabsList className="flex justify-center gap-1 sm:gap-2 bg-slate-200 rounded-lg p-1">
                            <TabsTrigger value="top-down" className="px-4 sm:px-6 py-2">هدف‌گذاری از کل به جزء</TabsTrigger>
                            <TabsTrigger value="bottom-up" className="px-4 sm:px-6 py-2">پیش‌بینی از جزء به کل</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <Card className="mb-6">
                    <CardHeader><CardTitle>تنظیمات محاسبه</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="exchangeRateInput">نرخ روز دلار (تومان)</Label>
                            <Input id="exchangeRateInput" type="text" value={formatDisplay(exchangeRate, 0)} onChange={e => setExchangeRate(parseNumber(e.target.value))} className="text-left" />
                        </div>
                        {calculationMode === 'top-down' && (
                            <>
                                <div>
                                    <Label htmlFor="totalTargetTomanInput">هدف کل فروش سالانه (تومان)</Label>
                                    <Input id="totalTargetTomanInput" type="text" value={formatDisplay(totalTargetToman, 0)} onChange={e => setTotalTargetToman(parseNumber(e.target.value))} className="text-left" />
                                </div>
                                <div>
                                    <Label htmlFor="totalTargetUSDInput">هدف کل فروش سالانه (دلار)</Label>
                                    <Input id="totalTargetUSDInput" type="text" value={formatDisplay(totalTargetUSD, 1)} onChange={e => {
                                        const v = parseNumber(e.target.value);
                                        setTotalTargetUSD(v);
                                        setTotalTargetToman(v * exchangeRate);
                                    }} className="text-left" />
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {properties.map(p => (
                        <Card key={p.id}>
                            <CardHeader><CardTitle className="flex justify-between items-center">{p.name} <span className="text-2xl">{p.icon}</span></CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`percentage-${p.id}`}>درصد از کل فروش (%)</Label>
                                    <Input id={`percentage-${p.id}`} type="text" value={formatDisplay(p.percentage, 1)} onChange={e => updateProperty(p.id, 'percentage', e.target.value)} disabled={calculationMode === 'bottom-up'} className="text-left disabled:bg-slate-100" />
                                </div>
                                <div>
                                    <Label htmlFor={`sellableAmount-${p.id}`}>مقدار قابل فروش ({p.unit})</Label>
                                    <Input id={`sellableAmount-${p.id}`} type="text" value={formatDisplay(p.sellableAmount, p.unit === 'عدد' ? 0 : 1)} onChange={e => updateProperty(p.id, 'sellableAmount', e.target.value)} disabled={calculationMode === 'top-down'} className="text-left disabled:bg-slate-100" />
                                </div>
                                <div>
                                    <Label htmlFor={`priceRial-${p.id}`}>قیمت هر {p.unit} (تومان)</Label>
                                    <Input id={`priceRial-${p.id}`} type="text" value={formatDisplay(p.priceRial, 0)} onChange={e => updateProperty(p.id, 'priceRial', e.target.value)} className="text-left" />
                                </div>
                                <div>
                                    <Label htmlFor={`priceUSD-${p.id}`}>قیمت هر {p.unit} (دلار)</Label>
                                    <Input id={`priceUSD-${p.id}`} type="text" value={formatDisplay(p.priceUSD, 1)} onChange={e => updateProperty(p.id, 'priceUSD', e.target.value)} className="text-left" />
                                </div>
                                <div className="col-span-1 sm:col-span-2 pt-2 border-t mt-2">
                                    <Label>سهم از فروش (تومان)</Label>
                                    <p className="mt-1 text-lg font-semibold text-slate-700">{formatDisplay(p.targetSale, 0)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mb-8">
                    <Button onClick={performCalculations} className="px-10 py-3 text-base font-semibold">محاسبه کن</Button>
                </div>

                <Card className="mb-6">
                    <CardHeader><CardTitle>خلاصه نتایج</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                        <div>
                            <p className="text-slate-600">{calculationMode === 'top-down' ? 'هدف کل فروش' : 'پیش‌بینی کل فروش'} (تومان)</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">{formatDisplay(totalTargetToman, 0)}</p>
                        </div>
                        <div>
                            <p className="text-slate-600">معادل دلار</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">${formatDisplay(totalTargetUSD, 1)}</p>
                        </div>
                    </CardContent>
                    <Separator className="my-4" />
                    <CardContent dir="rtl">
                        <h3 className="text-lg font-semibold mb-3 text-slate-700">جزئیات فروش بر اساس واحد/متراژ و درصد سهم</h3>
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="w-full text-right">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="p-3 font-semibold text-slate-600">نوع ملک</th>
                                        <th className="p-3 font-semibold text-slate-600">مقدار</th>
                                        <th className="p-3 font-semibold text-slate-600">درصد سهم</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map(p => (
                                        <tr key={p.id} className="border-t hover:bg-slate-50 transition-colors">
                                            <td className="p-3 text-slate-700">{p.name}</td>
                                            <td className="p-3 text-slate-700">{formatDisplay(p.sellableAmount, p.unit === 'عدد' ? 0 : 1)} {p.unit}</td>
                                            <td className="p-3 text-slate-700">{formatDisplay(p.percentage, 1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center mt-6 mb-4">
                    <Button onClick={() => setShowPrintModal(true)} variant="outline" className="gap-2">
                        <PrinterIcon /> راهنمای چاپ
                    </Button>
                </div>

                <Dialog open={showPercentageModal} onOpenChange={setShowPercentageModal}>
                    <DialogContent>
                        <DialogHeader><DialogTitle className="text-red-600 flex items-center gap-2">⚠️ اخطار مجموع درصدها!</DialogTitle></DialogHeader>
                        <p className="py-4 text-slate-700">مجموع درصدها باید دقیقاً 100% باشد. مجموع فعلی: <span className="font-semibold">{formatDisplay(currentPercentageSum, 1)}%</span></p>
                        <div className="flex justify-end">
                            <Button onClick={() => setShowPercentageModal(false)} className="mt-2">متوجه شدم</Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
                    <DialogContent>
                        <DialogHeader><DialogTitle className="flex items-center gap-2"><PrinterIcon /> راهنمای چاپ / ذخیره PDF</DialogTitle></DialogHeader>
                        <p className="py-4 text-slate-700">
                            برای چاپ نتایج یا ذخیره آن‌ها به صورت فایل PDF، از قابلیت چاپ مرورگر خود استفاده کنید.
                            معمولاً با فشردن کلیدهای <kbd>Ctrl+P</kbd> (در ویندوز)
                            یا <kbd>Cmd+P</kbd> (در مک) می‌توانید این کار را انجام دهید.
                        </p>
                        <div className="flex justify-end">
                            <Button onClick={() => setShowPrintModal(false)} className="mt-2">بستن</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

// --- Root component to provide ToastContext ---
const App = () => {
  return (
    <ToastProvider>
      <PropertyCalculatorApp />
    </ToastProvider>
  );
};

export default App;