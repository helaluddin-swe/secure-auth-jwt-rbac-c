import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  Trophy, 
  BookOpen, 
  LayoutDashboard, 
  ArrowRight, 
  Zap,
  BarChart3,
  ShieldCheck,
  Users,
  Lock
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn } = useAppContext();

  // Helper to get initials for a placeholder avatar
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '??';

  return (
    <>  
  
    <div className="min-h-screen  bg-[#020617] text-white font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Animated Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-indigo-600/10 blur-[120px] rounded-full" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} /> Secure Access Management
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-linear-to-b from-white to-slate-500 bg-clip-text text-transparent">
            Secure RBAC Architecture <br /> 
            <span className="text-indigo-500">Enterprise Auth Ready</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed">
            A robust authentication system featuring JWT integration, secure cookies, and granular 
            Role-Based Access Control. Manage users, admins, and permissions with a seamless MERN stack flow.
          </p>

          {!isLoggedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
              >
                Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all"
              >
                Secure Login
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-4xl backdrop-blur-md">
                   <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg">
                     {getInitials(userData?.name)}
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-slate-500 font-bold uppercase">Authenticated as {userData?.role},</p>
                     <p className="text-xl font-black">{userData?.name}</p>
                   </div>
                   <button 
                     onClick={() => navigate(userData?.role === 'admin' ? '/admin-control-center' : '/dashboard')}
                     className="ml-4 p-3 bg-white/10 hover:bg-indigo-600 rounded-xl transition-colors"
                   >
                     <LayoutDashboard size={20} />
                   </button>
                </div>
            </div>
          )}
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Lock className="text-blue-400" />}
          title="JWT Authentication"
          desc="Secure stateless authentication using JSON Web Tokens with HTTP-only cookies for maximum protection against XSS attacks."
        />
        <FeatureCard 
          icon={<Users className="text-amber-400" />}
          title="Role Management"
          desc="Define granular permissions for User and Admin roles. Protect routes on both the frontend and backend using middleware."
        />
        <FeatureCard 
          icon={<ShieldCheck className="text-emerald-400" />}
          title="Protected Routes"
          desc="Automated redirection and layout wrapping ensures only authorized users can access sensitive dashboard and admin data."
        />
      </section>

      {/* --- ACCOUNT DETAILS (Visible if logged in) --- */}
      {isLoggedIn && (
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="bg-[#0b0f1a] border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-500"/> Security Profile Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatBox label="Current Role" value={userData?.role?.toUpperCase() || 'USER'} />
              <StatBox label="Auth Status" value="VERIFIED" />
              <StatBox label="Account ID" value={userData?._id?.slice(-5) || 'N/A'} />
              <StatBox label="Session" value="ACTIVE" />
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  );
};

// Sub-components for cleaner code
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#0b0f1a] border border-white/5 p-8 rounded-4xl hover:border-indigo-500/50 transition-all group">
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-indigo-400">{value}</p>
  </div>
);

export default Home;