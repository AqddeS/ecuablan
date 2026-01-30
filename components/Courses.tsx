import React, { useState } from 'react';
import { Course } from '../types';
import GlitchHeader from './GlitchHeader';
import TypingEffect from './TypingEffect';
import { Terminal, Shield, Lock, ChevronRight, User, Clock, Award, CheckCircle } from 'lucide-react';

const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'CARDING BASICS',
        description: 'Fundamentos de seguridad en transacciones y análisis de vulnerabilidades en pasarelas de pago.',
        duration: '4 Weeks',
        level: 'Beginner',
        price: '$150',
        features: ['Análisis de BINs', 'Seguridad en Pasarelas', 'Anonimato Básico', 'VPNs & Proxies']
    },
    {
        id: '2',
        title: 'ADVANCED PHISHING',
        description: 'Técnicas avanzadas de ingeniería social y clonación de interfaces para auditoría de seguridad.',
        duration: '6 Weeks',
        level: 'Advanced',
        price: '$300',
        features: ['Clonación de OPs', 'Evasión de filtros de correo', 'Ingeniería Social', 'Despliegue de Servidores']
    },
    {
        id: '3',
        title: 'CRYPTO SECURITY',
        description: 'Protección de activos digitales, rastreo de transacciones en blockchain y seguridad de wallets.',
        duration: '5 Weeks',
        level: 'Intermediate',
        price: '$250',
        features: ['Blockchain Analysis', 'Wallet Security', 'Transacciones Anónimas', 'Smart Contracts']
    },
    {
        id: '4',
        title: 'SYSTEM INTRUSION',
        description: 'Pentesting ofensivo para infraestructuras críticas y escalada de privilegios en servidores.',
        duration: '8 Weeks',
        level: 'Advanced',
        price: '$500',
        features: ['Escalada de Privilegios', 'Exploit Development', 'Persistencia en Sistemas', 'Evasión de EDR']
    }
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-green-500/5 blur-sm rounded-sm group-hover:bg-green-500/10 transition-colors duration-300" />

            <div className={`
        relative h-full bg-black/80 border p-6 rounded-sm backdrop-blur-md transition-all duration-300 flex flex-col
        ${isHovered ? 'border-green-500 shadow-[0_0_20px_rgba(0,255,65,0.2)] transform -translate-y-1' : 'border-green-900/30'}
      `}>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-full">
                        <Terminal className={`w-6 h-6 ${isHovered ? 'text-green-400 animate-pulse' : 'text-green-600'}`} />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={`text-xs font-mono uppercase px-2 py-1 rounded-sm border ${course.level === 'Advanced' ? 'bg-red-900/20 text-red-400 border-red-500/30' :
                                course.level === 'Intermediate' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30' :
                                    'bg-green-900/20 text-green-400 border-green-500/30'
                            }`}>
                            {course.level}
                        </span>
                        <span className="text-gray-500 text-xs font-mono mt-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                        </span>
                    </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold font-mono text-white mb-3 group-hover:text-green-400 transition-colors">
                    <TypingEffect text={course.title} speed={50} />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono flex-grow">
                    {course.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-500 font-mono">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {feature}
                        </div>
                    ))}
                </div>

                {/* Price & Action */}
                <div className="mt-auto pt-6 border-t border-green-900/30 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-500 font-mono block">PRECIVM</span>
                        <span className="text-2xl font-bold text-white font-mono group-hover:text-green-400 transition-colors">
                            {course.price}
                        </span>
                    </div>

                    <button className={`
            flex items-center px-4 py-2 text-sm font-bold font-mono transition-all duration-300 border
            ${isHovered
                            ? 'bg-green-500 text-black border-green-500 hover:bg-green-400'
                            : 'bg-transparent text-green-500 border-green-500/50 hover:border-green-500'}
          `}>
                        INSCRIPCIÓN
                        <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Courses: React.FC = () => {
    return (
        <div className="animate-in fade-in duration-500 max-w-7xl mx-auto space-y-12 pb-12">
            <GlitchHeader text="ACADEMY_MODULES" subtext="Formación Especializada en Ciberseguridad" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {MOCK_COURSES.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            <div className="mt-16 p-8 border border-green-900/30 bg-black/40 backdrop-blur-sm rounded-sm text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white font-mono mb-4">
                        <TypingEffect text="¿BUSCAS FORMACIÓN PERSONALIZADA?" speed={30} />
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-mono">
                        Ofrecemos mentorías 1 a 1 para objetivos específicos. Desde pentesting corporativo hasta auditoría forense avanzada.
                    </p>
                    <a
                        href="https://t.me/system_ec"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-3 bg-green-900/20 border border-green-500 text-green-400 font-mono font-bold hover:bg-green-500 hover:text-black transition-all duration-300"
                    >
                        CONTACTAR MENTOR <Award className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Courses;
