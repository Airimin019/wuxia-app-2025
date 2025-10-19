import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-rose-900/50 p-4 text-center sticky top-0 z-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-rose-300 tracking-wider" style={{ fontFamily: '"Cinzel", serif' }}>
        Tejedor de Historias Danmei & Xianxia
      </h1>
      <p className="text-gray-400 mt-1">Creando Narrativas Visuales con IA</p>
    </header>
  );
};

export default Header;