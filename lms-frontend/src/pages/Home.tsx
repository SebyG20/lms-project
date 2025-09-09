// Home.tsx
// This component renders the landing (home) page for Cyber College.
// It introduces the platform, provides a brief description, and offers navigation to key actions.

// React functional component for the Home page
const Home = () => (
  <section>
    {/* Main heading: clearly shows the user they are on the home page */}
    <h1>Home</h1>

    {/*
      Description paragraph:
      - Explains what Cyber College is and its mission in a concise way.
      - Highlights the main subjects and the unique blend of science and creativity.
      - Uses inline styles for max width, margin, and line height for readability.
    */}
    <p style={{maxWidth: '700px', margin: '1.5rem auto', lineHeight: '1.7'}}>
      Cyber College blends academic excellence with creativity and innovation, preparing students to thrive in a changing world. Our mission is to equip learners with the knowledge, skills, and confidence for success.
      <br /><br />
      Students explore a diverse curriculum: Computer Science for digital skills, Mathematics for logical thinking, English for communication, and Biology and Physics for scientific discovery. Art encourages creativity and self-expression. At Cyber College, science meets creativity, and knowledge meets real-world application.
    </p>

    {/*
      Action buttons:
      - "Apply Now" takes the user to the dashboard (where they can view courses and get started).
      - "Sign Up" takes the user to the registration page to create a new account.
      - Buttons are styled for visibility and placed side-by-side using flexbox.
    */}
    <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem'}}>
      <a href="/dashboard" style={{padding: '0.7rem 1.5rem', background: '#4f8cff', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600}}>Apply Now</a>
      <a href="/register" style={{padding: '0.7rem 1.5rem', background: '#232a3b', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, border: '1px solid #4f8cff'}}>Sign Up</a>
    </div>
  </section>
);

// Export the Home component so it can be used in the app's routing
export default Home;
