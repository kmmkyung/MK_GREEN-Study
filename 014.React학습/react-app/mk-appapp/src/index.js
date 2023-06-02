// index.js는 public/index.html 페이지에 적용되는 컴포넌트다!

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Ban from './DC/Ban';

const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
<>
  <Ban cat="main"/>
  <Ban cat="CHARACTERS"/>
</>
)