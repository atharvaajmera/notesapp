import AppMain from "./main";
import React from 'react';

function Header() {
  return (
    <div>
      <div className="header">
        <h1 className="heading">ANote</h1>
      </div>
    </div>
  );
}

function Foot() {
  var k=new Date().getFullYear();
  return <footer className="bottom"> ANote ©️ {k} </footer>;
}

export default function App() {
  return (
    <div>
      <Header />
      <AppMain />
      <Foot />
    </div>
  );
}
