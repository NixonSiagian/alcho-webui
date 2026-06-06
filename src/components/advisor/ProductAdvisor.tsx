/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, X, Send, FileText, BookOpen, Boxes, ChevronDown, ChevronUp } from 'lucide-react';
import { ADVISOR_REFUSAL, isAdvisorConfigured } from '../../lib/advisor-config';
import type { AdvisorSource } from '../../lib/advisor';
import { PRODUCTS } from '../../data/products';
import { Markdown } from './Markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: AdvisorSource[];
}

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi, I'm the **Alcho Product Advisor**. Ask me about our products, applications, recipes, packaging, or technical documentation.",
};

const SUGGESTIONS = [
  'Which product for crispy fried chicken?',
  'Recommend a bouillon for a meatball soup base',
  'What packaging sizes are available?',
  'Show me a recipe using Alcho Beef Powder',
];

const SOURCE_ICON: Record<string, typeof FileText> = {
  Recipe: BookOpen,
  Technical: FileText,
  Company: FileText,
  Category: Boxes,
};

const SNAPS = [0.3, 0.6, 0.9];
const COLLAPSED_MAX = 260; // px before "Show more" kicks in

function useIsMobile() {
  const query = '(max-width: 639px)';
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return mobile;
}

export default function ProductAdvisor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [snapIdx, setSnapIdx] = useState(1); // default 60%
  const configured = isAdvisorConfigured();
  const isMobile = useIsMobile();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const atBottomRef = useRef(true);

  // Auto-scroll to latest, but preserve scroll position if the user scrolled up.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    if (loading || last?.role === 'user' || atBottomRef.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setSnapIdx(1);
      // focus after the open animation
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Prevent body scroll when the sheet is open on mobile.
  useEffect(() => {
    if (open && isMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, isMobile]);

  const onBodyScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    atBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
  };

  const send = async (text: string) => {
    const query = text.trim();
    if (!query || loading) return;

    const history = messages.filter((m) => m !== GREETING);
    atBottomRef.current = true;
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setInput('');
    setLoading(true);

    try {
      if (!configured) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'The advisor is not configured yet. Add a **GEMINI_API_KEY** to enable AI responses. In the meantime, browse the [Products](/products) and [Resources](/resources) pages for full details.',
          },
        ]);
        return;
      }
      const result = await import('../../lib/advisor').then((m) =>
        m.askAdvisor(
          history.map((msg) => ({ role: msg.role, content: msg.content })),
          query,
        ),
      );
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: result.text, sources: result.sources },
      ]);
    } catch (err) {
      // Log the full error (step, status, stack) to the browser console so the
      // exact failing point is visible in production, then surface the real
      // reason to the user instead of a generic "couldn't reach" message.
      console.error('[Alcho Advisor] request failed:', err);

      const e = err as { name?: string; message?: string; step?: string; status?: number };
      let content: string;
      if (e?.step === 'NOT_CONFIGURED' || e?.message === 'NOT_CONFIGURED') {
        content =
          'The advisor is **not configured** on this deployment — the build is missing a valid `GEMINI_API_KEY`. ' +
          'Set it on the production build, then redeploy. Meanwhile, browse the [Products](/products) and [Resources](/resources) pages.';
      } else if (e?.step === 'GEMINI_CALL') {
        const status = e.status ? ` (HTTP ${e.status})` : '';
        const hint =
          e.status === 400
            ? ' — the API key looks invalid for this build.'
            : e.status === 403
              ? ' — the API key is blocked for this site (check HTTP-referrer / API restrictions in Google Cloud).'
              : e.status === 429
                ? ' — rate limit or quota exceeded.'
                : '';
        content = `**Advisor error${status}.** ${e.message ?? 'Gemini request failed.'}${hint}`;
      } else {
        content = `**Advisor error.** ${e?.message ?? String(err)}`;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content }]);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
  ) => {
    const { offset, velocity } = info;
    if (offset.y > 70 || velocity.y > 500) {
      if (snapIdx === 0) setOpen(false);
      else setSnapIdx((i) => Math.max(0, i - 1));
    } else if (offset.y < -70 || velocity.y < -500) {
      setSnapIdx((i) => Math.min(SNAPS.length - 1, i + 1));
    }
  };

  const showEmptyState = messages.length === 1 && !loading;

  const panelClass = isMobile
    ? 'fixed inset-x-0 bottom-0 z-[120] flex flex-col rounded-t-3xl transition-[height] duration-300 ease-out'
    : 'fixed bottom-6 right-6 z-[120] w-[400px] max-h-[88vh] flex flex-col rounded-3xl';

  return (
    <div className="no-print">
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            aria-label="Open Alcho Product Advisor"
            className="fixed bottom-6 right-6 z-[120] flex items-center justify-center gap-3 h-14 w-14 sm:w-auto sm:pl-4 sm:pr-5 rounded-full bg-brand-primary text-brand-text font-bold text-sm shadow-xl shadow-brand-primary/30 hover:bg-brand-secondary hover:text-white transition-colors"
          >
            <Sparkles size={20} />
            <span className="hidden sm:inline">Product Advisor</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop (mobile only) */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[119] bg-black/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Panel / Bottom sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="advisor-panel"
            initial={isMobile ? { y: '100%' } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Alcho Product Advisor"
            style={isMobile ? { height: `${SNAPS[snapIdx] * 100}svh` } : undefined}
            className={`${panelClass} bg-brand-surface border border-brand-border shadow-2xl shadow-black/15 overflow-hidden`}
          >
            {/* Drag handle (mobile) */}
            {isMobile && (
              <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                className="shrink-0 pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing touch-none"
              >
                <div className="w-10 h-1.5 rounded-full bg-brand-border-strong" />
              </motion.div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-brand-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-secondary">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="font-bold text-brand-text leading-tight">Alcho Product Advisor</p>
                  <p className="text-[11px] text-brand-text-secondary">Products · Applications · Recipes</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close advisor"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-brand-text-secondary hover:bg-brand-fill hover:text-brand-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages (scroll body) */}
            <div
              ref={scrollRef}
              onScroll={onBodyScroll}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 space-y-4 sm:max-h-[500px]"
            >
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <UserBubble key={i} content={m.content} />
                ) : (
                  <AssistantBubble key={i} message={m} />
                ),
              )}

              {loading && <TypingIndicator />}

              {showEmptyState && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] uppercase font-bold tracking-widest text-brand-text-secondary">
                    Suggested questions
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-sm px-4 py-3 rounded-xl border border-brand-border bg-brand-bg hover:border-brand-primary/40 hover:bg-brand-fill transition-colors text-brand-text"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-4 border-t border-brand-border shrink-0"
            >
              <div className="flex items-center gap-2 bg-brand-bg border border-brand-border rounded-2xl pl-4 pr-2 py-2 focus-within:border-brand-primary/50 transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Alcho products…"
                  aria-label="Message the Alcho Product Advisor"
                  className="flex-1 bg-transparent outline-none text-sm text-brand-text placeholder:text-brand-text-secondary/70"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="w-9 h-9 shrink-0 rounded-xl bg-brand-primary text-brand-text flex items-center justify-center hover:bg-brand-secondary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-brand-text-secondary/70 text-center mt-2">
                Scoped to Alcho Foods products, recipes & documentation.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] bg-brand-primary/15 text-brand-text rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

function AssistantBubble({ message }: { message: Message }) {
  const isRefusal = message.content.trim() === ADVISOR_REFUSAL;
  const products = (message.sources ?? []).filter((s) => s.source === 'Product');
  const others = (message.sources ?? []).filter((s) => s.source !== 'Product');

  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] w-full">
        <div className="bg-brand-bg border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3">
          <ClampableContent>
            <Markdown text={message.content} />
          </ClampableContent>
        </div>

        {!isRefusal && products.length > 0 && (
          <div className="mt-2 grid grid-cols-1 gap-2">
            {products.map((p, i) => (
              <ProductCard key={i} source={p} />
            ))}
          </div>
        )}

        {!isRefusal && others.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {others.map((s, idx) => {
              const Icon = SOURCE_ICON[s.source] ?? FileText;
              const chip = (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border border-brand-border bg-brand-surface text-brand-text-secondary hover:text-brand-secondary hover:border-brand-primary/40 transition-colors">
                  <Icon size={11} /> {s.title}
                </span>
              );
              return s.ref ? (
                <Link key={idx} to={s.ref}>
                  {chip}
                </Link>
              ) : (
                <span key={idx}>{chip}</span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function ClampableContent({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clampable, setClampable] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) setClampable(el.scrollHeight > COLLAPSED_MAX + 12);
  }, []);

  return (
    <div>
      <div
        ref={ref}
        style={!expanded && clampable ? { maxHeight: COLLAPSED_MAX } : undefined}
        className={`relative overflow-hidden ${!expanded && clampable ? '' : ''}`}
      >
        {children}
        {clampable && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-brand-bg to-transparent" />
        )}
      </div>
      {clampable && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors"
        >
          {expanded ? (
            <>
              Show less <ChevronUp size={14} />
            </>
          ) : (
            <>
              Show more <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

function ProductCard({ source }: { source: AdvisorSource }) {
  const code = source.ref?.startsWith('/products/') ? source.ref.split('/').pop() : undefined;
  const product = code ? PRODUCTS.find((p) => p.code === code) : undefined;
  const name = product?.name ?? source.title;
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-surface p-3 hover:border-brand-primary/40 hover:shadow-md hover:shadow-black/5 transition-all">
      <div className="w-11 h-11 shrink-0 rounded-lg bg-brand-primary/15 flex items-center justify-center">
        <Boxes size={18} className="text-brand-secondary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-brand-text truncate">{name}</p>
        <p className="text-[10px] text-brand-text-secondary truncate">
          {product ? product.category : 'Alcho product'}
          {code ? ` · ${code}` : ''}
        </p>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary shrink-0">View</span>
    </div>
  );
  return source.ref ? <Link to={source.ref}>{inner}</Link> : inner;
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-brand-bg border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-text-secondary"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}
