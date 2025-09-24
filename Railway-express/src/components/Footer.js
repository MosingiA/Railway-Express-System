import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor:  '#007bff',
      padding: '2rem',
      marginTop: '3rem',
      backdropFilter: 'blur(15px)',
      borderTop: '1px solid  #fff',
      textAlign: 'center',
      color: 'white'
    }}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <p>© 2025 Railway Express System. All rights reserved.</p>
        <p style={{fontSize: '0.9rem', marginTop: '0.5rem', opacity: '0.8'}}>
          Your trusted partner for railway management solutions
        </p>
        <h2>Reach us  at</h2>
        
          <div style={{marginTop: '1rem'}}>
  <div style={{marginTop: '1rem'}}>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'none', marginRight: '1rem', fontSize: '1.5rem'}}>
    <i className="fab fa-facebook-f"></i> Facebook
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'none', marginRight: '1rem', fontSize: '1.5rem'}}>
    <i className="fab fa-twitter"></i> Twitter
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'none', fontSize: '1.5rem'}}>
    <i className="fab fa-instagram"></i> Instagram
  </a>
</div>

</div>

    
  </div>
</footer>
  );
}

export default Footer;

