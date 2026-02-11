import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are an ideation guide for butfirstideate.ai - helping people validate app ideas before building.

=== YOUR ROLE ===
Guide users through validating their app idea conversationally. Be a skeptical but supportive product strategist.

=== STAGES ===
1. Problem - What problem? Who has it? How do you know?
2. Solutions - What exists? What are the gaps?
3. Users - Who specifically? Can you reach them?
4. Differentiation - Why choose this over alternatives?
5. Feasibility - Can they build it? Complexity?
6. Go/No-Go - Honest recommendation

=== RULES ===
- Ask ONE question at a time
- Dig deeper when vague
- Challenge weak assumptions  
- Be honest if idea seems flawed
- Keep responses to 2-3 sentences + your question
- Occasional emoji is fine

=== SUMMARY ===
When you learn something concrete, end your message with:
|||SUMMARY:{"field":"problem","value":"5-10 word summary"}|||

Fields: problem, users, competition, differentiation, complexity, recommendation
Only when you have NEW info. Not every message.

Start by greeting them warmly and asking what they want to build and why.`;

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState({
    problem: null, users: null, competition: null,
    differentiation: null, complexity: null, recommendation: null
  });
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const endRef = useRef(null);

  const stages = [
    { icon: '💡', name: 'Problem' },
    { icon: '🔍', name: 'Solutions' },
    { icon: '👥', name: 'Users' },
    { icon: '✨', name: 'Edge' },
    { icon: '⚙️', name: 'Feasibility' },
    { icon: '🎯', name: 'Decision' }
  ];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const extract = (text) => {
    const m = text.match(/\|\|\|SUMMARY:(\{[^}]+\})\|\|\|/);
    if (m) {
      try {
        return { clean: text.replace(/\|\|\|SUMMARY:\{[^}]+\}\|\|\|/, '').trim(), upd: JSON.parse(m[1]) };
      } catch { return { clean: text, upd: null }; }
    }
    return { clean: text, upd: null };
  };

  const call = async (msgs) => {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 400, system: SYSTEM_PROMPT, messages: msgs })
    });
    const d = await r.json();
    return d.content?.map(c => c.text || '').join('') || '';
  };

  const start = async () => {
    setStarted(true);
    setIsLoading(true);
    try {
      const t = await call([{ role: 'user', content: 'Start the ideation session.' }]);
      const { clean } = extract(t);
      setMessages([{ role: 'assistant', content: clean }]);
    } catch {
      setMessages([{ role: 'assistant', content: "Hey! 👋 I'm here to help validate your app idea before you code.\n\n**What do you want to build, and why?**" }]);
    }
    setIsLoading(false);
  };

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput('');
    const newMsgs = [...messages, { role: 'user', content: msg }];
    setMessages(newMsgs);
    setIsLoading(true);
    try {
      const t = await call(newMsgs.map(m => ({ role: m.role, content: m.content })));
      const { clean, upd } = extract(t);
      if (upd?.field && upd?.value) {
        setSummary(p => {
          const n = { ...p, [upd.field]: upd.value };
          setStage(Math.min(['problem','users','competition','differentiation','complexity','recommendation'].filter(f => n[f]).length, 5));
          return n;
        });
      }
      setMessages([...newMsgs, { role: 'assistant', content: clean }]);
    } catch {
      setMessages([...newMsgs, { role: 'assistant', content: "Sorry, could you try that again?" }]);
    }
    setIsLoading(false);
  };

  if (!started) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFFBF7, #FFF5EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', padding: 24 }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💡</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#1f2937', marginBottom: 12 }}>
            But first, <span style={{ color: '#ea580c', fontStyle: 'italic' }}>ideate</span>
          </h1>
          <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 24, lineHeight: 1.6 }}>
            Before you write any code, let's make sure you're building something worth building.
          </p>
          <button onClick={start} style={{ padding: '14px 32px', fontSize: 17, fontWeight: 600, background: '#ea580c', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer' }}>
            Start Ideating →
          </button>
          <p style={{ marginTop: 16, fontSize: 14, color: '#9ca3af' }}>Free • No signup • ~15 min</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui', background: '#FFFBF7' }}>
      {/* Left */}
      <div style={{ width: 200, background: 'white', borderRight: '1px solid #e5e7eb', padding: 16, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>💡 Ideation</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>Validating your idea</div>
        </div>
        <div style={{ flex: 1 }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: 8, marginBottom: 4, borderRadius: 8,
              background: i === stage ? '#fff7ed' : i < stage ? '#f0fdf4' : '#f9fafb',
              borderLeft: i === stage ? '3px solid #ea580c' : i < stage ? '3px solid #22c55e' : '3px solid transparent',
              opacity: i > stage ? 0.4 : 1
            }}>
              <span>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
              {i < stage && <span style={{ marginLeft: 'auto', color: '#22c55e', fontSize: 12 }}>✓</span>}
            </div>
          ))}
        </div>
        <button onClick={() => { setStarted(false); setMessages([]); setSummary({ problem: null, users: null, competition: null, differentiation: null, complexity: null, recommendation: null }); setStage(0); }}
          style={{ padding: 8, fontSize: 13, background: 'transparent', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}>
          ← Restart
        </button>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: 12, background: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #ea580c, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💡</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Ideation Guide</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{stages[stage]?.name || 'Getting started'}</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                {m.role === 'assistant' && <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #ea580c, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>💡</div>}
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: 16, fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap',
                  ...(m.role === 'user' ? { background: '#ea580c', color: 'white', borderBottomRightRadius: 4 } : { background: 'white', border: '1px solid #e5e7eb', borderBottomLeftRadius: 4 })
                }}>{m.content}</div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #ea580c, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>💡</div>
                <div style={{ padding: '10px 14px', background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, borderBottomLeftRadius: 4, color: '#9ca3af' }}>● ● ●</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <div style={{ padding: 12, background: 'white', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Share your idea..." disabled={isLoading}
              style={{ flex: 1, padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#ea580c'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            <button onClick={send} disabled={isLoading || !input.trim()}
              style={{ padding: '10px 20px', background: isLoading || !input.trim() ? '#d1d5db' : '#ea580c', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer' }}>
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ width: 220, background: 'white', borderLeft: '1px solid #e5e7eb', padding: 16, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>📋 Summary</div>
          <div style={{ fontSize: 11, color: '#6b7280' }}>Key insights</div>
        </div>
        <div style={{ flex: 1 }}>
          {[
            { k: 'problem', l: 'Problem', i: '🎯' },
            { k: 'users', l: 'Users', i: '👥' },
            { k: 'competition', l: 'Competition', i: '🔍' },
            { k: 'differentiation', l: 'Edge', i: '✨' },
            { k: 'complexity', l: 'Complexity', i: '⚙️' },
            { k: 'recommendation', l: 'Verdict', i: '🎯' }
          ].map(x => (
            <div key={x.k} style={{ padding: 10, marginBottom: 6, borderRadius: 8, background: summary[x.k] ? '#f0fdf4' : '#f9fafb', border: summary[x.k] ? '1px solid #bbf7d0' : 'none' }}>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', marginBottom: 4 }}>{x.i} {x.l}</div>
              <div style={{ fontSize: 12, color: summary[x.k] ? '#1f2937' : '#9ca3af', fontStyle: summary[x.k] ? 'normal' : 'italic' }}>
                {summary[x.k] || 'Waiting...'}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => {
          const t = Object.entries(summary).filter(([,v]) => v).map(([k,v]) => `${k.toUpperCase()}: ${v}`).join('\n\n');
          if (t) { navigator.clipboard.writeText(t); alert('Copied!'); }
        }} style={{ padding: 8, fontSize: 12, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}>
          📋 Copy Summary
        </button>
      </div>
    </div>
  );
}
