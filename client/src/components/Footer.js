import React from 'react';
import './Footer.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer>
      <div className='footer__links'>
        <a
          href='https://github.com/BradaZG'
          target='_blank'
          rel='noreferrer noopener'
        >
          <GitHubIcon className='footer__icon' />
        </a>
        <a
          href='https://twitter.com/bradaZG'
          target='_blank'
          rel='noreferrer noopener'
        >
          <TwitterIcon className='footer__icon' />
        </a>
        <a
          href='https://www.linkedin.com/in/bradazg/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <LinkedInIcon className='footer__icon' />
        </a>
        <a
          href='mailto:bradazg@gmail.com'
          target='_blank'
          rel='noreferrer noopener'
        >
          <MailIcon className='footer__icon' />
        </a>
      </div>
      <p>© Copyright BradaZG {year}</p>
    </footer>
  );
};

export default Footer;
