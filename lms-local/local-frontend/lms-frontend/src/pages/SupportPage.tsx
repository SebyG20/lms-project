// SupportPage.tsx
// This page provides support contact details for Cyber College users.
import React from 'react';

const SupportPage: React.FC = () => (
  <section style={{ maxWidth: 500, margin: '3rem auto', background: '#232a3b', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '2.5rem 2rem', color: '#fff' }}>
    <h2 style={{ color: '#4f8cff', marginBottom: '1.5rem', fontWeight: 700 }}>Support</h2>
    <p style={{ marginBottom: '1.2rem' }}>
      Need help? Our support team is here for you! Contact us using any of the methods below:
    </p>
    <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.08rem' }}>
      <li style={{ marginBottom: 12 }}><strong>Email:</strong> support@cybercollege.com</li>
      <li style={{ marginBottom: 12 }}><strong>Phone:</strong> +44 20 7946 0958</li>
      <li style={{ marginBottom: 12 }}><strong>Live Chat:</strong> Available 9am-5pm (UK time) via the chat icon on the bottom right</li>
      <li><strong>Address:</strong> 123 College Road, London, UK</li>
    </ul>
    <p style={{ marginTop: '2rem', color: '#4f8cff', fontWeight: 500 }}>We aim to respond to all queries within 24 hours.</p>
  </section>
);

export default SupportPage;