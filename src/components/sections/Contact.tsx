/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Facebook, Instagram, Zap } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-48 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-bold tracking-[0.3em] uppercase">Connect Strategy</span>
            </motion.div>
            
            <h2 className="text-brand-text text-5xl lg:text-8xl font-bold mb-10 leading-tight">
              Let's Create <br />
              <span className="italic text-brand-primary">Better Taste.</span>
            </h2>
            <p className="text-brand-text-secondary text-xl leading-relaxed mb-16 max-w-xl">
              Partner with PT. NEW ALFA OMEGA UTAMA to standardize your flavors. We serve chefs, food factories, and hospitalty leaders nationwide.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-[2rem] bg-brand-surface border border-brand-border space-y-4">
                 <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Phone size={20} />
                 </div>
                 <div>
                    <p className="text-brand-text-secondary text-[10px] uppercase font-bold tracking-widest mb-1">Office Line</p>
                    <p className="text-brand-text font-bold text-lg">031 866 8858</p>
                 </div>
              </div>
              <div className="p-8 rounded-[2rem] bg-brand-surface border border-brand-border space-y-4">
                 <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <MessageSquare size={20} className="text-[#25D366]" />
                 </div>
                 <div>
                    <p className="text-brand-text-secondary text-[10px] uppercase font-bold tracking-widest mb-1">WhatsApp</p>
                    <p className="text-brand-text font-bold text-lg">0812 4918 6623</p>
                 </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-brand-surface border border-brand-border rounded-2xl flex items-center justify-center text-brand-text-secondary hover:text-brand-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-card p-10 lg:p-16 rounded-[4rem] border border-brand-border relative"
          >
            <h3 className="text-brand-text text-3xl mb-10">Business Inquiry</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary ml-4">Representative Name</label>
                 <input type="text" className="w-full bg-brand-surface border border-brand-border rounded-[1.5rem] py-5 px-8 text-brand-text font-bold outline-none focus:border-brand-primary/30 transition-all" placeholder="Enter your name" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary ml-4">Company Name</label>
                  <input type="text" className="w-full bg-brand-surface border border-brand-border rounded-[1.5rem] py-5 px-8 text-brand-text font-bold outline-none focus:border-brand-primary/30 transition-all" placeholder="Your organization" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary ml-4">Interest Area</label>
                  <select className="w-full bg-brand-surface border border-brand-border rounded-[1.5rem] py-5 px-8 text-brand-text font-bold outline-none focus:border-brand-primary/30 transition-all appearance-none cursor-pointer">
                     <option>Snack Seasoning</option>
                     <option>Bouillon & Base</option>
                     <option>Sauce Manufacturing</option>
                     <option>Industrial OEM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary ml-4">Message / Requirements</label>
                 <textarea className="w-full bg-brand-surface border border-brand-border rounded-[1.5rem] py-5 px-8 text-brand-text font-bold outline-none focus:border-brand-primary/30 transition-all h-32 resize-none" placeholder="Tell us about your flavor needs..."></textarea>
              </div>
              
              <button className="btn-primary w-full py-6 flex items-center justify-center gap-4">
                 Send Inquiry <Send size={18} />
              </button>
            </form>

            <div className="mt-12 flex justify-center">
               <a href="#" className="flex items-center gap-3 text-brand-text-secondary hover:text-brand-primary transition-all text-[10px] uppercase font-bold tracking-widest">
                  Direct WhatsApp Access <MessageSquare size={14} />
               </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
