'use client';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [socials, setSocials] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState({ text: '', color: '' });

  const supabaseUrl = 'https://yrpfevxzocpedpthknhi.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGZldnh6b2NwZWRwdGhrbmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDg5NjIsImV4cCI6MjA5NzUyNDk2Mn0.GMxuE_B17gwzUaqPlaHzwlY20i8XYaMNOoxY9WGijLw';

  useEffect(() => {
    async function loadAboutData() {
      try {
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        const [aboutRes, skillsRes, timelineRes, socialsRes] = await Promise.all([
          supabase.from('about').select('*'),
          supabase.from('skills').select('*'),
          supabase.from('timeline').select('*'),
          supabase.from('socials').select('*')
        ]);

        if (aboutRes.data) setProfile(aboutRes.data[0]);
        if (skillsRes.data) setSkills(skillsRes.data);
        if (timelineRes.data) setTimeline(timelineRes.data);
        if (socialsRes.data) setSocials(socialsRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadAboutData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ text: 'TRANSMITTING SIGNAL...', color: '#888888' });
    try {
      const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from('enquiries').insert([{ email, message }]);
      if (error) throw error;
      setFormStatus({ text: 'SIGNAL RECEIVED SUCCESSFULLY.', color: '#00ff88' });
      setEmail('');
      setMessage('');
    } catch (err) {
      setFormStatus({ text: 'TRANSMISSION FAILED. CORRUPTED PACKET.', color: '#ff3333' });
    }
  };

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/about" className="active">About</a>
      </nav>

      <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          {profile?.image_url && <img src={profile.image_url} style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #00ff88', boxShadow: '0 0 15px rgba(0, 255, 136, 0.15)', marginBottom: '20px' }} alt="Profile" />}
          <h1 style={{ color: '#ffffff', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '28px' }}>{profile?.title || 'robotlee10'}</h1>
          <p style={{ lineHeight: '1.8', color: '#888888', fontSize: '16px', maxWidth: '550px', margin: '0 auto' }}>{profile?.bio || 'Developer Profile Matrix'}</p>
        </div>

        <h2 style={{ color: '#ffffff', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '18px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>Core Capabilities</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
          {skills.map((skill, idx) => (
            <div key={idx} style={{ backgroundColor: '#111', border: '1px solid #222', color: '#00ff88', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontFamily: 'monospace' }}>{skill.name}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
          <div>
            <h2 style={{ color: '#ffffff', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '18px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>Education</h2>
            {timeline.filter(i => i.type === 'Education').map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#111111', borderLeft: '2px solid #00ff88', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
                <div style={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '12px' }}>{item.year}</div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666666', fontSize: '13px' }}>{item.institution}</div>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ color: '#ffffff', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '18px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>Experience</h2>
            {timeline.filter(i => i.type === 'Experience').map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#111111', borderLeft: '2px solid #00ff88', padding: '15px', borderRadius: '0 8px 8px 0', marginBottom: '15px' }}>
                <div style={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '12px' }}>{item.year}</div>
                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666666', fontSize: '13px' }}>{item.institution}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleFormSubmit} style={{ backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '8px', padding: '30px 25px', marginTop: '40px' }}>
          <h2 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '18px' }}>Initialize Contact</h2>
          <p style={{ fontSize: '14px', color: '#666666', margin: '0 0 20px 0' }}>Drop your coordinates below to submit an inquiry stream.</p>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontFamily: 'monospace', fontSize: '12px', color: '#00ff88', marginBottom: '6px' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #222222', borderRadius: '4px', padding: '12px', color: '#ffffff' }} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontFamily: 'monospace', fontSize: '12px', color: '#00ff88', marginBottom: '6px' }}>Project Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #222222', borderRadius: '4px', padding: '12px', color: '#ffffff', minHeight: '100px' }} required />
          </div>
          <button type="submit" style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid #00ff88', color: '#00ff88', fontFamily: 'monospace', padding: '14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Send Signal →</button>
          {formStatus.text && <div style={{ fontFamily: 'monospace', fontSize: '13px', marginTop: '15px', textAlign: 'center', color: formStatus.color }}>{formStatus.text}</div>}
        </form>
      </div>
    </>
  );
}
