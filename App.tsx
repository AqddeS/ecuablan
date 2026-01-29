import React, { useState, useEffect } from 'react';
import GlitchHeader from './components/GlitchHeader';
import DefenseCard from './components/DefenseCard';
import { SecurityModule, Tab } from './types';
import { Shield, Terminal as TerminalIcon, Activity, Globe, Menu, X, Lock, Server, MessageCircle, AlertTriangle, CheckCircle, CreditCard, Zap, Cpu } from 'lucide-react';
import TypingEffect from './components/TypingEffect';
import ServicesCarousel from './components/ServicesCarousel';
import TestimonialLog from './components/TestimonialLog';
import SuccessChart from './components/SuccessChart';

const defenseModules: SecurityModule[] = [
  {
    id: '1',
    title: 'BASIC',
    description: 'Adquiriendo este plan por un precio mucho menor tienes esta cantidad $760.',
    difficulty: 'Beginner',
    category: 'Defense'
  },
  {
    id: '2',
    title: 'NORMAL',
    description: 'Adquiriendo este plan por un precio mucho menor tienes esta cantidad $1,300.',
    difficulty: 'Beginner',
    category: 'Analysis'
  },
  {
    id: '3',
    title: 'MEDIO',
    description: 'Adquiriendo este plan por un precio mucho menor tienes esta cantidad $1,580.',
    difficulty: 'Intermediate',
    category: 'Defense'
  },
  {
    id: '4',
    title: 'INTERMEDIO',
    description: 'Adquiriendo este plan por un precio mucho menor tienes esta cantidad $1,840.',
    difficulty: 'Intermediate',
    category: 'Encryption'
  },
  {
    id: '5',
    title: 'AVANZADO',
    description: 'Adquiriendo este plan por un precio mucho menor tienes esta cantidad $2,630.',
    difficulty: 'Advanced',
    category: 'Defense'
  },
  {
    id: '6',
    title: 'PREMIUM',
    description: 'Adquiriendo este plan por un precio mucho menor tienes esta cantidad $6,000.',
    difficulty: 'Advanced',
    category: 'Analysis'
  }
];

const TAB_TRANSLATIONS: Record<Tab, string> = {
  [Tab.DASHBOARD]: 'INICIO',
  [Tab.HOW_IT_WORKS]: 'CÓMO FUNCIONA',
  [Tab.SERVICES]: 'SERVICIOS',
  [Tab.FAQ]: 'FAQ'
};

const generateSuccessData = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 15; i++) {
    const time = new Date(now.getTime() - (15 - i) * 60000);
    data.push({
      timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      success: Math.floor(Math.random() * 15) + 85, // High success rate 85-100
      deals: Math.floor(Math.random() * 30) + 50,  // Active deals
    });
  }
  return data;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [chartData, setChartData] = useState(generateSuccessData());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = new Date();
        newData.push({
          timestamp: lastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          success: Math.floor(Math.random() * 15) + 85,
          deals: Math.floor(Math.random() * 30) + 50,
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans overflow-x-hidden selection:bg-green-500 selection:text-black">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-green-900/50 h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-green-500 animate-pulse" />
          <span className="text-xl font-bold tracking-widest font-mono text-white">
            ECUA<span className="text-green-500">BLAN</span>
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          {Object.values(Tab).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-sm tracking-widest hover:text-green-400 transition-colors uppercase ${activeTab === tab ? 'text-green-400 border-b-2 border-green-500' : 'text-gray-500'
                }`}
            >
              {TAB_TRANSLATIONS[tab]}
            </button>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="text-green-500" /> : <Menu className="text-green-500" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 pt-20 px-6 md:hidden">
          <div className="flex flex-col space-y-6">
            {Object.values(Tab).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsSidebarOpen(false);
                }}
                className={`font-mono text-xl tracking-widest text-left uppercase ${activeTab === tab ? 'text-green-400' : 'text-gray-500'
                  }`}
              >
                {TAB_TRANSLATIONS[tab]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto pb-12">
        {activeTab === Tab.DASHBOARD && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="relative text-center py-12 overflow-hidden border-b border-green-900/30">
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent z-10"></div>
                <img
                  src="/hacker-gorilla.jpg"
                  alt="Background"
                  className="w-full h-full object-cover object-top opacity-60 scale-105"
                />
              </div>

              <div className="relative z-10">
                <GlitchHeader text="ECUABLAN CAS" subtext="Fisicas y Virtuales" />
                <div className="mt-8 max-w-3xl mx-auto bg-black/60 backdrop-blur-sm p-6 rounded-sm border border-green-900/30 text-gray-300 text-lg text-left space-y-3 font-mono shadow-2xl shadow-green-900/20">
                  <p><TypingEffect text="> Uso nacional e internacional" speed={30} repeatDelay={5000} /></p>
                  <p><TypingEffect text="> Entrega al instante" speed={30} delay={1000} repeatDelay={5000} /></p>
                  <div className="pl-4 text-sm text-green-400/80 border-l border-green-500/30 my-2">
                    <p><TypingEffect text="— Formato digital con datos completos para que hagas compras en línea de inmediato." speed={20} delay={2000} repeatDelay={5000} /></p>
                    <p><TypingEffect text="— Envío físico a todo el Ecuador (Servientrega)" speed={20} delay={4000} repeatDelay={5000} /></p>
                  </div>
                  <p className="font-bold text-green-400 mt-4"><TypingEffect text="Beneficios:" speed={50} delay={5500} repeatDelay={5000} /></p>
                  <ul className="list-none space-y-1 pl-4 border-l-2 border-green-500">
                    <li><TypingEffect text="[+] Retiro en cajeros" speed={20} delay={6000} repeatDelay={5000} /></li>
                    <li><TypingEffect text="[+] Compras online y en tiendas" speed={20} delay={7000} repeatDelay={5000} /></li>
                    <li><TypingEffect text="[+] Recargas y pedidos por apps" speed={20} delay={8000} repeatDelay={5000} /></li>
                    <li className="text-white font-bold bg-green-900/30 pr-2 inline-block"><TypingEffect text="[+] Saldos según tu elección INCLUYE ASESORÍA HASTA TU PRIMERA COMPRA" speed={20} delay={9000} repeatDelay={5000} /></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'CLIENTS', val: '+1000', icon: Shield, color: 'text-green-500' },
                { label: 'PRICES', val: '65$-300$', icon: Server, color: 'text-blue-500' },
                { label: 'System Integrity', val: '100%', icon: Lock, color: 'text-purple-500' },
                { label: 'Uptime', val: '99.99%', icon: Activity, color: 'text-yellow-500' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-black/40 border border-green-900/30 p-6 rounded-sm backdrop-blur-sm hover:border-green-500/50 transition-colors group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest"><TypingEffect text={stat.label} speed={50} repeatDelay={5000} /></p>
                      <h4 className={`text-2xl font-bold mt-2 font-mono ${stat.color} group-hover:glow-text`}>
                        <TypingEffect text={stat.val} speed={100} delay={500} repeatDelay={5000} />
                      </h4>
                    </div>
                    <stat.icon className={`w-6 h-6 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts & Testimonials Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[500px]">
              <SuccessChart data={chartData} />
              <TestimonialLog />
            </div>

            {/* Featured Services */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-mono text-white flex items-center">
                  <TerminalIcon className="mr-2 text-green-500" />
                  AVAILABLE_SERVICES
                </h2>
                <button
                  onClick={() => setActiveTab(Tab.SERVICES)}
                  className="text-sm font-mono text-green-500 hover:text-white transition-colors"
                >
                  VIEW_ALL_Services &gt;&gt;
                </button>
              </div>
              <div className="py-12">
                {/* Warning/Disclaimer */}
                <div className="mb-8 p-4 bg-red-900/10 border border-red-500/30 rounded-sm max-w-3xl mx-auto text-center">
                  <p className="text-red-400 font-mono text-sm tracking-wide">
                    <AlertTriangle className="inline-block w-4 h-4 mr-2 mb-1" />
                    <TypingEffect text="ADVERTENCIA DE SISTEMA: No somos banco, no hay garantías eternas. Lo que entregamos funciona mientras el saldo esté activo." speed={20} />
                  </p>
                </div>

                <ServicesCarousel services={defenseModules} />

                {/* Policy/Info */}
                <div className="mt-12 max-w-4xl mx-auto space-y-6 text-center">
                  <div className="p-4 bg-green-900/10 border border-green-500/30 rounded-sm">
                    <p className="text-green-400 font-mono text-sm mb-2 font-bold">
                      <TypingEffect text="> INFRAESTRUCTURA SOPORTADA:" speed={30} />
                    </p>
                    <p className="text-gray-400 font-mono text-xs md:text-sm">
                      <TypingEffect text="Incluye tarjeta: VISA, MASTERCARD y AMEX." speed={20} delay={1000} />
                      <br />
                      <TypingEffect text="Bancos: BCP, INTERBANK, BBVA, PICHINCHA y GUAYAQUIL." speed={20} delay={2000} />
                    </p>
                  </div>

                  <div className="p-4 border-l-2 border-yellow-500 bg-yellow-900/5 text-left">
                    <p className="text-yellow-500/80 font-mono text-xs">
                      <TypingEffect text="> PROTOCOLO DE PAGO:" speed={20} delay={3500} /> <span className="text-gray-400">En temas de tarjetas no existe la contraentrega, el pago siempre es anticipado. Esperamos entienda nuestras políticas de seguridad y anonimato.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ & Contact Section */}
            <div className="space-y-12 pt-12 border-t border-green-900/30">
              <GlitchHeader text="CONFIDENTIAL_FAQ" subtext="Read Before Proceeding" />

              <div className="bg-black/40 border border-green-900/30 p-8 rounded-sm backdrop-blur-sm hover:border-green-500/50 transition-colors">
                <h3 className="text-xl font-mono font-bold text-white flex items-center mb-4">
                  <TerminalIcon className="w-5 h-5 mr-2 text-green-500" />
                  <TypingEffect text="PREGUNTA: ES LEGAL?" speed={30} />
                </h3>
                <div className="pl-7 font-mono text-gray-400 border-l-2 border-green-900/50">
                  <p className="flex items-start text-yellow-500/80">
                    <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span className="italic">
                      <TypingEffect text="RESPUESTA: Operamos en zona gris. Úsalo bajo tu responsabilidad." speed={20} delay={1000} />
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-black/40 border border-green-900/30 p-8 rounded-sm backdrop-blur-sm">
                <h3 className="text-xl font-mono font-bold text-white flex items-center mb-6">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  <TypingEffect text="ENCRYPTED_CHANNELS" speed={30} delay={2000} />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="https://t.me/system_ec" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-green-900/50 hover:bg-green-900/10 hover:border-green-500 transition-all group">
                    <span className="font-mono text-lg group-hover:text-green-400">TELEGRAM</span>
                    <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-green-500" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 border border-green-900/50 hover:bg-green-900/10 hover:border-green-500 transition-all group">
                    <span className="font-mono text-lg group-hover:text-green-400">TIKTOK</span>
                    <Activity className="w-5 h-5 text-gray-500 group-hover:text-pink-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === Tab.HOW_IT_WORKS && (
          <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-12 pb-12">
            <GlitchHeader text="SYSTEM_PROTOCOLS" subtext="Cómo Funciona – Sistemas Ecuador" />

            <div className="bg-black/80 border border-green-500/20 p-6 rounded-sm">
              <p className="font-mono text-green-400 text-lg mb-8 text-center">
                <TypingEffect text="> No hay cuentos ni promesas vacías. Te explicamos paso a paso." speed={20} />
              </p>

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Verificamos fuentes reales",
                    icon: Server,
                    desc: "Nuestros proveedores obtienen datos frescos y válidos de cuentas con saldo disponible. Nosotros los chequeamos uno por uno. Probamos transacciones pequeñas para confirmar que el saldo está vivo y no bloqueado."
                  },
                  {
                    step: "02",
                    title: "Preparamos la tarjeta blanca",
                    icon: CreditCard,
                    desc: "Usamos tarjetas plásticas en blanco de alta calidad (chip y banda magnética). Escribimos los datos verificados de forma precisa para que la tarjeta se lea como una normal. Esto es equipo profesional y software avanzado."
                  },
                  {
                    step: "03",
                    title: "El saldo aparece porque es real",
                    icon: Zap,
                    desc: "El saldo que ves es el límite disponible de la fuente original. No es 'mágico' ni infinito, pero es funcional mientras la cuenta fuente no sea reportada. Por eso entregamos tarjetas con saldo verificado en el momento."
                  },
                  {
                    step: "04",
                    title: "Te entregamos lista para usar",
                    icon: CheckCircle,
                    desc: "Recibes la tarjeta física (o datos digitales) con: Número completo, Expiración, CVV, PIN (si aplica) e Instrucciones claras y cortas."
                  },
                  {
                    step: "05",
                    title: "Asesoría hasta que veas resultados",
                    icon: Cpu,
                    desc: "Te guiamos paso a paso en tu primera operación por Telegram. Si algo no sale como debe, ajustamos rápido. No te dejamos solo. La mayoría ve el saldo y empieza a usarlo el mismo día."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-green-900/50 hover:border-green-500 transition-colors group">
                    <div className="absolute -left-3 top-0 bg-black text-green-500 font-mono text-xs border border-green-500 px-1">
                      {item.step}
                    </div>
                    <div className="mb-2 flex items-center">
                      <item.icon className="w-5 h-5 text-green-500 mr-3 animate-pulse" />
                      <h3 className="text-xl font-bold text-white font-mono uppercase">
                        <TypingEffect text={item.title} speed={30} delay={idx * 500} />
                      </h3>
                    </div>
                    <p className="text-gray-400 font-mono text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>


            </div>
          </div>
        )}

        {activeTab === Tab.SERVICES && (
          <div className="animate-in fade-in duration-500">
            <GlitchHeader text="SERVICES_CATALOG" subtext="Advanced Cyber Solutions" />
            <div className="mt-12 min-h-[600px]">
              <div className="mb-12 p-4 bg-red-900/10 border border-red-500/30 rounded-sm max-w-3xl mx-auto text-center">
                <p className="text-red-400 font-mono text-sm tracking-wide">
                  <AlertTriangle className="inline-block w-4 h-4 mr-2 mb-1" />
                  <TypingEffect text="ADVERTENCIA DE SISTEMA: No somos banco, no hay garantías eternas. Lo que entregamos funciona mientras el saldo esté activo." speed={20} />
                </p>
              </div>

              <div className="flex justify-center items-center">
                <ServicesCarousel services={defenseModules} />
              </div>

              <div className="mt-16 max-w-4xl mx-auto space-y-6 text-center">
                <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-sm">
                  <p className="text-green-400 font-mono text-lg mb-4 font-bold">
                    <TypingEffect text="> INFRAESTRUCTURA SOPORTADA:" speed={30} />
                  </p>
                  <p className="text-gray-400 font-mono md:text-base">
                    <TypingEffect text="Incluye tarjeta: VISA, MASTERCARD y AMEX." speed={20} delay={1000} />
                  </p>
                  <p className="text-gray-400 font-mono md:text-base mt-2">
                    <TypingEffect text="Bancos: BCP, INTERBANK, BBVA, PICHINCHA y GUAYAQUIL." speed={20} delay={2000} />
                  </p>
                </div>

                <div className="p-4 border-l-2 border-yellow-500 bg-yellow-900/5 text-left mx-auto max-w-2xl">
                  <p className="text-yellow-500/80 font-mono text-sm">
                    <TypingEffect text="> PROTOCOLO DE PAGO:" speed={20} delay={3500} /> <span className="text-gray-400">En temas de tarjetas no existe la contraentrega, el pago siempre es anticipado. Esperamos entienda nuestras políticas de seguridad y anonimato.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}



        {activeTab === Tab.FAQ && (
          <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-12">
            <GlitchHeader text="CONFIDENTIAL_FAQ" subtext="Read Before Proceeding" />

            <div className="bg-black/40 border border-green-900/30 p-8 rounded-sm backdrop-blur-sm hover:border-green-500/50 transition-colors">
              <h3 className="text-xl font-mono font-bold text-white flex items-center mb-4">
                <TerminalIcon className="w-5 h-5 mr-2 text-green-500" />
                <TypingEffect text="PREGUNTA: ES LEGAL?" speed={30} />
              </h3>
              <div className="pl-7 font-mono text-gray-400 border-l-2 border-green-900/50">
                <p className="flex items-start text-yellow-500/80">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                  <span className="italic">
                    <TypingEffect text="RESPUESTA: Operamos en zona gris. Úsalo bajo tu responsabilidad." speed={20} delay={1000} />
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-green-900/30 p-8 rounded-sm backdrop-blur-sm">
              <h3 className="text-xl font-mono font-bold text-white flex items-center mb-6">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                <TypingEffect text="ENCRYPTED_CHANNELS" speed={30} delay={2000} />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://t.me/system_ec" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-green-900/50 hover:bg-green-900/10 hover:border-green-500 transition-all group">
                  <span className="font-mono text-lg group-hover:text-green-400">TELEGRAM</span>
                  <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-green-500" />
                </a>
                <a href="https://t.me/system_ec" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-green-900/50 hover:bg-green-900/10 hover:border-green-500 transition-all group">
                  <span className="font-mono text-lg group-hover:text-green-400">TIKTOK</span>
                  <Activity className="w-5 h-5 text-gray-500 group-hover:text-pink-500" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-green-900/30 bg-black py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600">
          <p>© 2024 ECUABLAN. EDUCATIONAL USE ONLY.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>PRIVACY_PROTOCOL</span>
            <span>TERMS_OF_SERVICE</span>
            <span>ENCRYPTED_CONTACT</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;