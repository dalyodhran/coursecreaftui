import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    TrendingUp,
    Map,
    Calendar,
    Zap,
    ChevronRight,
    BarChart3,
    Trophy,
    ArrowRight,
    Heart,
    Timer,
} from 'lucide-react';
import { useAuth } from 'react-oidc-context';

// --- Sub-Components ---

const Navbar: React.FC<{ auth: ReturnType<typeof useAuth> }> = ({ auth }) => (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div
                    className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform -rotate-6 shadow-lg shadow-emerald-500/20">
                    <Activity className="text-slate-900 w-5 h-5" />
                </div>
                <span
                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    CourseCrafter
                </span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                <button className="hover:text-emerald-400 transition-colors">
                    Features
                </button>
                <button className="hover:text-emerald-400 transition-colors">
                    Methodology
                </button>
                <button className="hover:text-emerald-400 transition-colors">
                    Pricing
                </button>
            </div>
            <button
                className="bg-slate-100 text-slate-900 px-5 py-2 rounded-full font-semibold text-sm hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]"
                onClick={() => auth.signinRedirect()}
            >
                Start Training
            </button>
        </div>
    </nav>
);

const Hero = () => (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 z-10 text-center relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <span
                    className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider mb-6">
                    INTELLIGENCE OVER INTENSITY
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
                    Don't just log miles. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                        Craft your performance.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    The first training platform centered around{' '}
                    <strong>Training Blocks</strong> and{' '}
                    <strong>Race Cycles</strong>. Context-aware guidance that
                    tells you <em>why</em> today's run matters.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group">
                        Build Your Block
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all border border-slate-700">
                        View Demo
                    </button>
                </div>
            </motion.div>

            {/* Hero Visualizer Mockup */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-20 mx-auto max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-t-3xl shadow-2xl overflow-hidden"
                style={{ perspective: '1000px' }}
            >
                {/* Mock Browser Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-xs font-mono text-slate-600">
                        coursecrafter.app/dashboard
                    </div>
                    <div className="w-4" />
                </div>

                {/* Mock Dashboard Content */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {/* Elevation / Progress Chart */}
                    <div className="col-span-2 space-y-4">
                        <div
                            className="h-40 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl w-full relative overflow-hidden group border border-slate-800">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-slate-700 font-mono text-xs uppercase tracking-widest">
                                    Interactive Elevation Profile
                                </span>
                            </div>
                            {/* Simulated Graph Lines */}
                            <svg
                                className="absolute bottom-0 left-0 w-full h-24 text-emerald-500/20"
                                preserveAspectRatio="none"
                                viewBox="0 0 100 100"
                            >
                                <path
                                    d="M0,100 L10,80 L20,85 L30,60 L40,70 L50,40 L60,50 L70,30 L80,45 L90,20 L100,100 Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                                initial={{ width: '0%' }}
                                whileInView={{ width: '65%' }}
                                transition={{ duration: 1.5, delay: 0.8 }}
                            />
                            <motion.div
                                className="absolute bottom-2 left-[65%] w-3 h-3 bg-white rounded-full shadow-lg"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 2.3 }}
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                                    Current Phase
                                </p>
                                <p className="text-xl font-bold text-white flex items-center gap-2">
                                    Peak Week 2
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-500">
                                        <span
                                            className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                                    </span>
                                </p>
                            </div>
                            <div className="flex-1 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                                    Race Readiness
                                </p>
                                <p className="text-xl font-bold text-emerald-400">
                                    94%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coach Message */}
                    <div
                        className="bg-slate-800/50 p-6 rounded-xl border border-emerald-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-2xl rounded-full" />
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-emerald-400 font-bold text-xs tracking-widest">
                                COACH SAYS
                            </span>
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed italic relative z-10">
                            "Sharpening now. Execute with purpose. Your volume
                            is dropping, but keep the intensity high on Tuesday.
                            Trust the taper."
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <Timer className="w-3 h-3" /> Updated 2 hrs ago
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

const PhaseVisualizer = () => {
    const [activePhase, setActivePhase] = useState(2);

    const phases = [
        {
            id: 0,
            name: 'Base',
            color: 'bg-blue-500',
            text: 'text-blue-500',
            msg: 'Build rhythm. Consistency > intensity.',
        },
        {
            id: 1,
            name: 'Build',
            color: 'bg-purple-500',
            text: 'text-purple-500',
            msg: 'Stack the work. Discipline over speed.',
        },
        {
            id: 2,
            name: 'Peak',
            color: 'bg-emerald-500',
            text: 'text-emerald-500',
            msg: 'Sharpening now. Execute with purpose.',
        },
        {
            id: 3,
            name: 'Taper',
            color: 'bg-orange-500',
            text: 'text-orange-500',
            msg: 'Relax. Trust your training. Don\'t stress.',
        },
    ];

    return (
        <section className="py-24 bg-slate-950 relative border-t border-slate-900">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Context-Aware Intelligence
                    </h2>
                    <p className="text-slate-400 text-lg">
                        The interface adapts to where you are in your journey.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Controls */}
                    <div className="space-y-4">
                        {phases.map((phase) => (
                            <motion.div
                                key={phase.id}
                                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                                    activePhase === phase.id
                                        ? 'border-slate-600 bg-slate-800 shadow-xl'
                                        : 'border-slate-900 bg-slate-900/30 hover:bg-slate-900/80 hover:border-slate-800'
                                }`}
                                onClick={() => setActivePhase(phase.id)}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-1.5 h-12 rounded-full ${phase.color} shadow-[0_0_10px_currentColor] opacity-80`}
                                        />
                                        <div>
                                            <h3
                                                className={`text-lg font-bold ${
                                                    activePhase === phase.id
                                                        ? 'text-white'
                                                        : 'text-slate-500'
                                                }`}
                                            >
                                                {phase.name} Phase
                                            </h3>
                                            {activePhase === phase.id && (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-xs text-slate-400 mt-1"
                                                >
                                                    Focus:{' '}
                                                    {phase.id === 0
                                                        ? 'Aerobic Capacity'
                                                        : phase.id === 1
                                                            ? 'Threshold & Hills'
                                                            : phase.id === 2
                                                                ? 'Race Pace'
                                                                : 'Recovery'}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                    {activePhase === phase.id && (
                                        <ChevronRight className="text-white w-5 h-5" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dynamic Card */}
                    <div className="relative h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhase}
                                initial={{ opacity: 0, x: 20, rotateY: -10 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                exit={{ opacity: 0, x: -20, rotateY: 10 }}
                                transition={{ duration: 0.4 }}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center"
                                style={{ perspective: '1000px' }}
                            >
                                <div
                                    className={`absolute top-0 right-0 p-40 rounded-full blur-[100px] opacity-15 ${phases[activePhase].color}`}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                                            <Zap
                                                className={`w-5 h-5 ${phases[activePhase].text}`}
                                            />
                                        </div>
                                        <span className="text-slate-400 text-sm tracking-wider uppercase font-semibold">
                                            Weekly Directive
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-8 leading-snug">
                                        "{phases[activePhase].msg}"
                                    </h3>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-xs text-slate-500 font-bold tracking-wider">
                                                    INTENSITY
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {activePhase === 0
                                                        ? 'Low'
                                                        : activePhase === 2
                                                            ? 'High'
                                                            : 'Moderate'}
                                                </span>
                                            </div>
                                            <div
                                                className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width:
                                                            activePhase === 0
                                                                ? '30%'
                                                                : activePhase ===
                                                                1
                                                                    ? '70%'
                                                                    : activePhase ===
                                                                    2
                                                                        ? '95%'
                                                                        : '40%',
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        ease: 'easeOut',
                                                    }}
                                                    className={`h-full ${phases[activePhase].color}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-xs text-slate-500 font-bold tracking-wider">
                                                    VOLUME
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {activePhase === 3
                                                        ? 'Dropping'
                                                        : 'Building'}
                                                </span>
                                            </div>
                                            <div
                                                className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width:
                                                            activePhase === 0
                                                                ? '80%'
                                                                : activePhase ===
                                                                1
                                                                    ? '90%'
                                                                    : activePhase ===
                                                                    2
                                                                        ? '60%'
                                                                        : '30%',
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        ease: 'easeOut',
                                                        delay: 0.1,
                                                    }}
                                                    className={`h-full ${phases[activePhase].color}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface BentoFeatureProps {
    title: string;
    desc: string;
    icon: React.ElementType;
    delay: number;
    colSpan?: string;
}

const BentoFeature: React.FC<BentoFeatureProps> = ({
                                                       title,
                                                       desc,
                                                       icon: Icon,
                                                       delay,
                                                       colSpan = 'col-span-1',
                                                   }) => (
    <motion.div
        className={`${colSpan} bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors group relative overflow-hidden flex flex-col`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay }}
    >
        <div
            className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

        <div className="relative z-10 flex-1">
            <div
                className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-800 transition-colors border border-slate-700/50">
                <Icon className="text-emerald-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const FeaturesGrid = () => (
    <section className="py-32 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 text-center md:text-left">
                <span className="text-emerald-500 font-bold tracking-wider text-sm mb-2 block uppercase">
                    Under the Hood
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    The Architecture of Progress
                </h2>
                <p className="text-slate-400 max-w-xl text-lg">
                    Powered by Microservices on Kubernetes. Designed for the
                    athlete who loves data as much as the run.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                <BentoFeature
                    title="Race-Centric Design"
                    desc="View the entire training block that led to a race. See the story, not just the stats. Drill down into weekly mileage progression and workout patterns."
                    icon={Trophy}
                    delay={0.1}
                    colSpan="md:col-span-2 md:row-span-1"
                />
                <BentoFeature
                    title="Route Integration"
                    desc="Import GPX or sync Strava routes to get predicted pacing models and difficulty heatmaps."
                    icon={Map}
                    delay={0.2}
                />
                <BentoFeature
                    title="Fatigue Trends"
                    desc="Visualize cumulative load vs rest. Know when you're trending towards burnout."
                    icon={BarChart3}
                    delay={0.3}
                />
                <BentoFeature
                    title="Calendar Planning"
                    desc="Drag-and-drop workout planner that adjusts weekly volume automatically."
                    icon={Calendar}
                    delay={0.4}
                />
                <BentoFeature
                    title="Health Metrics"
                    desc="Integrates with wearables to track HRV and sleep impact on training readiness."
                    icon={Heart}
                    delay={0.5}
                />
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="text-emerald-500 w-6 h-6" />
                        <span className="text-white font-bold text-xl">
                            CourseCrafter
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                        The intelligent training platform for endurance
                        athletes. Built with React, Tailwind, and Framer Motion
                        for a seamless experience.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6">Platform</h4>
                    <ul className="space-y-4 text-sm text-slate-500">
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            Training Logs
                        </li>
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            Race Planner
                        </li>
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            Route Builder
                        </li>
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            Analytics
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6">Company</h4>
                    <ul className="space-y-4 text-sm text-slate-500">
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            About Us
                        </li>
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            Engineering Blog
                        </li>
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            Careers
                        </li>
                        <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                            Contact
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-600 text-sm">
                    © 2024 CourseCrafter. All rights reserved.
                </p>
                <div className="flex gap-6 text-slate-600">
                    <TrendingUp className="w-5 h-5 hover:text-emerald-400 cursor-pointer transition-colors" />
                    <Heart className="w-5 h-5 hover:text-emerald-400 cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    </footer>
);

// --- Main App Component ---

const App = () => {
    const auth = useAuth();

    return (
        <div
            className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar auth={auth} />
            <Hero />
            <PhaseVisualizer />
            <FeaturesGrid />

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Ready to stop guessing?
                        </h2>
                        <p className="text-slate-400 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
                            Join the platform built for the bigger picture.
                            Context-aware, data-driven, and designed for you.
                        </p>
                        <button
                            className="px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                            onClick={() => auth.signinRedirect()}
                        >
                            Start Your Free Trial
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default App;
