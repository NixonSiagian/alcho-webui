/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Truck, BarChart3, Globe2, Handshake, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Mail, Building2, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Distributor() {
  return (
    <section id="distributor" className="py-24 lg:py-40 bg-brand-surface relative overflow-hidden">
      {/* Background visual */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 1000 1000" className="w-full h-full fill-white">
          <circle cx="500" cy="500" r="400" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="500" cy="500" r="300" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="500" cy="500" r="200" stroke="white" strokeWidth="1" fill="none" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          
          <div className="lg:col-span-12 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-bold tracking-[0.3em] uppercase">Global Partnership</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-text mb-8"
            >
              Scale with our <span className="text-brand-primary italic">Distribution Network.</span>
            </motion.h2>
          </div>

          {/* Left Column: Vision & Benefits */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-16"
          >
            <div className="relative p-12 bg-brand-bg border border-brand-border rounded-[3rem] overflow-hidden group">
               <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="text-2xl text-brand-text mb-8 relative z-10">Certified Regional Partners</h3>
               <p className="text-brand-text-secondary text-lg leading-relaxed mb-12 relative z-10">
                 We are expanding our Tier-1 logistics network. Join Alcho to provide enterprise-grade seasoning solutions to regional HORECA clusters and industrial zones.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                  {[
                    { icon: BarChart3, title: 'Yield Optimization', desc: 'Volume-based pricing nodes.' },
                    { icon: Truck, title: 'Priority Dispatch', desc: 'Node-to-node logistics support.' },
                    { icon: ShieldCheck, title: 'SLA Guarantee', desc: 'Consistent 99% supply uptime.' },
                    { icon: Handshake, title: 'R&D Bridge', desc: 'Direct technical support access.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center shrink-0">
                          <item.icon size={18} className="text-brand-primary" />
                       </div>
                       <div>
                          <p className="text-brand-text font-bold mb-1">{item.title}</p>
                          <p className="text-xs text-brand-text-secondary">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-text-secondary opacity-50 flex items-center gap-4">
                  Target Regions 
                  <div className="h-[1px] flex-1 bg-brand-fill" />
               </h4>
               <div className="flex flex-wrap gap-4">
                  {["Java_Node_01", "Sumatera_NW", "Bali_Logistics", "Kalimantan_SE", "International_Exp"].map(area => (
                    <div key={area} className="px-6 py-4 bg-brand-bg border border-brand-border rounded-2xl flex items-center gap-4 group hover:border-brand-primary/30 transition-all cursor-default">
                       <div className="w-2 h-2 rounded-full bg-brand-primary group-hover:animate-ping" />
                       <span className="text-[10px] uppercase font-mono tracking-widest text-brand-text-secondary group-hover:text-brand-text transition-colors">{area}</span>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Right Column: Application Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative"
          >
             <div className="bg-brand-bg border border-brand-primary/20 rounded-[3rem] p-10 lg:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h3 className="text-3xl text-brand-text mb-2">Onboarding</h3>
                <p className="text-brand-text-secondary text-xs mb-10 pb-8 border-b border-brand-border">Start your enterprise partner application below.</p>

                <form className="space-y-6">
                   <div className="space-y-4">
                      <div className="relative group">
                         <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary group-focus-within:text-brand-primary transition-colors" size={18} />
                         <input 
                           type="text" 
                           placeholder="Legal Entity Name"
                           className="w-full bg-brand-surface border border-brand-border rounded-2xl py-6 pl-14 pr-6 text-sm text-brand-text focus:border-brand-primary/30 outline-none transition-all placeholder:text-brand-text-secondary/30"
                         />
                      </div>
                      <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary group-focus-within:text-brand-primary transition-colors" size={18} />
                         <input 
                           type="text" 
                           placeholder="Representative Full Name"
                           className="w-full bg-brand-surface border border-brand-border rounded-2xl py-6 pl-14 pr-6 text-sm text-brand-text focus:border-brand-primary/30 outline-none transition-all placeholder:text-brand-text-secondary/30"
                         />
                      </div>
                      <div className="relative group">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary group-focus-within:text-brand-primary transition-colors" size={18} />
                         <input 
                           type="email" 
                           placeholder="Corporate Email Address"
                           className="w-full bg-brand-surface border border-brand-border rounded-2xl py-6 pl-14 pr-6 text-sm text-brand-text focus:border-brand-primary/30 outline-none transition-all placeholder:text-brand-text-secondary/30"
                         />
                      </div>
                   </div>

                   <button className="btn-primary w-full py-8 group">
                      <span className="flex items-center justify-center gap-3">
                         Submit Credentials
                         <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                      </span>
                   </button>

                   <div className="flex items-center gap-4 py-6 px-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                      <CheckCircle2 size={16} className="text-brand-primary shrink-0" />
                      <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-brand-text-secondary leading-relaxed">
                         ISO-compliant data processing. Expect analysis within 48h.
                      </p>
                   </div>
                </form>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
