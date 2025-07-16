import React, { useState } from 'react';
import { Menu, X, TrendingUp, User, LogIn, MessageCircle } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, isLoggedIn, isAdmin = false, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseMenuItems = [
    { id: 'home', label: 'Home', icon: TrendingUp },
    { id: 'plans', label: 'Planos', icon: TrendingUp },
    { id: 'results', label: 'Resultados', icon: TrendingUp },
    { id: 'faq', label: 'FAQ', icon: TrendingUp },
  ];

  // Add admin menu only for admin users
  const menuItems = isAdmin 
    ? [...baseMenuItems, { id: 'admin', label: 'Admin', icon: TrendingUp }]
    : baseMenuItems;
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="https://i.postimg.cc/GhnKd5J5/Chat-GPT-Image-13-de-jul-de-2025-18-07-15.png" 
              alt="Quant Broker Logo" 
             className="w-12 h-12 rounded-lg shadow-lg"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Quant Broker
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => onViewChange('dashboard')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Entrar</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    window.open('https://wa.me/5511911560276', '_blank');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-green-600 text-white rounded-md mb-2"
                >
                  📱 WhatsApp
                </button>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        onViewChange('dashboard');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md mb-2"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onLogin();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Entrar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;