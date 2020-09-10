import React from 'react';

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';
import ErrorBoundary from '../../components/error/error.boundery';

const HomePage = () => (
  <div className='homepage'>
    <Directory />
  </div>
);

export default HomePage;
