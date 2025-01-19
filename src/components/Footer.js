import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>
                Desenvolvido por <a href="http://demanxier.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
                <strong>Demanxier</strong>.{' '}
                </a>
            </p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
    text: {
        margin: 0,
        fontSize: '14px',
    },
    link: {
        color: '#727D73',
        textDecoration: 'none',
    },
};

export default Footer;