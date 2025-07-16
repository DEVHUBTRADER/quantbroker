import React from 'react';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';

interface NAPProps {
  variant?: 'header' | 'footer' | 'contact' | 'inline';
  showIcons?: boolean;
  className?: string;
}

const NAP: React.FC<NAPProps> = ({ 
  variant = 'contact', 
  showIcons = true, 
  className = '' 
}) => {
  const businessInfo = {
    name: "Quant Broker - Portfólios de IA BTG Pactual",
    address: {
      street: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      country: "Brasil"
    },
    phone: {
      primary: "+55 (11) 91156-0276",
      btg: "+55 (51) 95483-3140"
    },
    email: "contato@quantbroker.com.br",
    hours: "Segunda a Sexta: 09:00 - 18:00"
  };

  const formatAddress = () => {
    const { street, city, state, zipCode } = businessInfo.address;
    return `${street}, ${city} - ${state}, ${zipCode}`;
  };

  if (variant === 'inline') {
    return (
      <span className={`text-sm ${className}`}>
        {businessInfo.name} | {formatAddress()} | {businessInfo.phone.primary}
      </span>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center space-x-4 text-sm ${className}`}>
        <div className="flex items-center">
          {showIcons && <Phone className="h-4 w-4 mr-1" />}
          <span>{businessInfo.phone.primary}</span>
        </div>
        <div className="flex items-center">
          {showIcons && <MapPin className="h-4 w-4 mr-1" />}
          <span>{businessInfo.address.city}, {businessInfo.address.state}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Business Name */}
      <div className="flex items-center">
        {showIcons && <Building2 className="h-5 w-5 mr-3 text-blue-600" />}
        <div>
          <h3 className="font-semibold text-gray-900">{businessInfo.name}</h3>
          <p className="text-sm text-gray-600">Parceria Exclusiva BTG Pactual</p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start">
        {showIcons && <MapPin className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />}
        <div>
          <p className="text-gray-700">{businessInfo.address.street}</p>
          <p className="text-gray-700">
            {businessInfo.address.city} - {businessInfo.address.state}, {businessInfo.address.zipCode}
          </p>
          <p className="text-gray-700">{businessInfo.address.country}</p>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="space-y-2">
        <div className="flex items-center">
          {showIcons && <Phone className="h-5 w-5 mr-3 text-blue-600" />}
          <div>
            <p className="text-gray-700">
              <span className="font-medium">WhatsApp:</span> {businessInfo.phone.primary}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">BTG Mosaico:</span> {businessInfo.phone.btg}
            </p>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center">
        {showIcons && <Mail className="h-5 w-5 mr-3 text-blue-600" />}
        <p className="text-gray-700">{businessInfo.email}</p>
      </div>

      {/* Business Hours */}
      <div className="flex items-center">
        {showIcons && <Clock className="h-5 w-5 mr-3 text-blue-600" />}
        <p className="text-gray-700">{businessInfo.hours}</p>
      </div>

      {/* Service Areas */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Áreas de Atendimento</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
          <span>• São Paulo - SP</span>
          <span>• Rio de Janeiro - RJ</span>
          <span>• Belo Horizonte - MG</span>
          <span>• Brasília - DF</span>
          <span>• Porto Alegre - RS</span>
          <span>• Todo o Brasil (Online)</span>
        </div>
      </div>
    </div>
  );
};

export default NAP;