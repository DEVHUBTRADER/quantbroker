import React, { useState } from 'react';
import { X, Eye, EyeOff, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

// RD Station integration
declare global {
  interface Window {
    RdIntegration?: any;
  }
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  // Load RD Station script
  React.useEffect(() => {
    if (!window.RdIntegration) {
      const script = document.createElement('script');
      script.src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Add +55 if not present
    if (digits.startsWith('55')) {
      return `+${digits}`;
    } else if (digits.length === 11) {
      return `+55${digits}`;
    } else if (digits.length === 10) {
      return `+55${digits}`;
    }
    
    return `+55${digits}`;
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 13;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isRegister) {
        // Send to RD Station first
        try {
          if (window.RdIntegration) {
            window.RdIntegration.post({
              token_rdstation: '57e7abbb49395ca58551fe103433f9da',
              identificador: 'registro-usuario',
              email: email,
              telefone: phone,
              nome: email.split('@')[0], // Use email prefix as name fallback
              tags: ['registro', 'usuario-novo', 'quant-broker']
            });
          }
        } catch (rdError) {
          console.warn('RD Station integration error:', rdError);
          // Continue with registration even if RD Station fails
        }

        // Registration - requires email, phone, and password
        if (!email || !phone || !password) {
          throw new Error('Todos os campos são obrigatórios para registro');
        }

        if (!validatePhone(phone)) {
          throw new Error('Número de telefone inválido. Use o formato (11) 99999-9999');
        }

        const formattedPhone = formatPhoneNumber(phone);
        
        // Register with phone authentication
        const { data, error } = await supabase.auth.signUp({
          phone: formattedPhone,
          password,
          options: {
            data: {
              email: email,
              phone: formattedPhone
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          setPendingVerification(true);
          setIsVerifying(true);
        }
      } else {
        // Login - can use either email or phone
        if (!password) {
          throw new Error('Senha é obrigatória');
        }

        let loginData;
        
        if (loginMethod === 'email') {
          if (!email) {
            throw new Error('Email é obrigatório para login');
          }
          
          loginData = await supabase.auth.signInWithPassword({
            email,
            password,
          });
        } else {
          if (!phone) {
            throw new Error('Telefone é obrigatório para login');
          }
          
          const formattedPhone = formatPhoneNumber(phone);
          
          loginData = await supabase.auth.signInWithPassword({
            phone: formattedPhone,
            password,
          });
        }

        if (loginData.error) throw loginData.error;
        
        if (loginData.data.user) {
          onLogin();
          onClose();
          resetForm();
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'Erro ao processar solicitação');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneNumber(phone);
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: verificationCode,
        type: 'sms'
      });

      if (error) throw error;

      if (data.user) {
        onLogin();
        onClose();
        resetForm();
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      setError(error.message || 'Código de verificação inválido');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setPhone('');
    setVerificationCode('');
    setError('');
    setIsVerifying(false);
    setPendingVerification(false);
    setLoginMethod('email');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  // Verification screen
  if (isVerifying && pendingVerification) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Verificar Telefone
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleVerifyCode} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Enviamos um código de verificação para:
              </p>
              <p className="font-semibold text-gray-900 mb-6">
                {formatPhoneNumber(phone)}
              </p>
            </div>
            
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Verificação
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verificando...' : 'Verificar Código'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsVerifying(false);
                  setPendingVerification(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isRegister ? 'Criar Conta' : 'Fazer Login'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Hidden RD Station fields */}
          <input type="hidden" name="token_rdstation" value="57e7abbb49395ca58551fe103433f9da" />
          <input type="hidden" name="identificador" value="registro-usuario" />
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {isRegister ? (
            // Registration form - requires email, phone, and password
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Telefone (com DDD)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="(11) 99999-9999"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formato: (11) 99999-9999 ou 11999999999
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 6 caracteres
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Autenticação por SMS:</strong> Você receberá um código de verificação no seu telefone para confirmar o cadastro.
                </p>
              </div>
            </>
          ) : (
            // Login form - email or phone choice
            <>
              {/* Login Method Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Como você quer fazer login?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      loginMethod === 'email'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <Mail className="h-5 w-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Email</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('phone')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      loginMethod === 'phone'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <Phone className="h-5 w-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Telefone</div>
                  </button>
                </div>
              </div>

              {/* Login Fields */}
              {loginMethod === 'email' ? (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Telefone (com DDD)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="(11) 99999-9999"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formato: (11) 99999-9999 ou 11999999999
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
                </label>
                <button 
                  type="button"
                  onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Esqueceu a senha?
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              isRegister ? 'Criando conta...' : 'Entrando...'
            ) : (
              isRegister ? 'Criar Conta' : 'Entrar'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                  setEmail('');
                  setPhone('');
                  setPassword('');
                  setLoginMethod('email');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isRegister ? 'Fazer Login' : 'Cadastre-se'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;