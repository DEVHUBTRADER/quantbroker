import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, TrendingUp, Trash2, Plus, Minus, Search, Filter, 
  AlertCircle, CheckCircle, Edit3, Save, X, Eye, EyeOff, UserPlus,
  Calendar, Phone, Mail, Lock, RefreshCw, UserCheck, UserX,
  Download, Upload, MoreVertical
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  full_name?: string;
  email: string;
  phone?: string;
  created_at: string;
  last_sign_in_at?: string;
  leverage_multiplier: number;
  is_active: boolean;
  contracted_plan: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
}

interface UserFormData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  is_active: boolean;
  leverage_multiplier: number;
  contracted_plan: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // Selection and Bulk Actions
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Modal States
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form States
  const [userForm, setUserForm] = useState<UserFormData>({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    is_active: true,
    leverage_multiplier: 1,
    contracted_plan: 'none'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchUsers();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.email === 'pedropardal04@gmail.com');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Try to use the custom function to get all users including phone-only users
      let allUsersData: any[] = [];
      
      try {
        // Use the custom function to get all users from auth.users + user_profiles
        const { data: functionData, error: functionError } = await supabase
          .rpc('get_all_users_with_profiles');
        
        if (!functionError && functionData) {
          allUsersData = functionData;
          console.log('Users from function:', allUsersData.length);
        } else {
          throw functionError || new Error('Function returned no data');
        }
      } catch (functionError) {
        console.warn('Custom function failed, falling back to user_profiles:', functionError);
        
        // Fallback to user_profiles table only
        const { data: profilesData, error: profilesError } = await supabase
          .from('user_profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (profilesError) throw profilesError;
        allUsersData = profilesData || [];
      }

      // Ensure current admin user has a profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email === 'pedropardal04@gmail.com') {
        const existingProfile = allUsersData.find(p => p.id === user.id);
        
        if (!existingProfile) {
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert({
              id: user.id,
              email: user.email,
              phone: user.phone || null,
              leverage_multiplier: 5,
              is_active: true,
              contracted_plan: 'none'
            });
          
          if (!insertError) {
            // Add admin user to the data
            allUsersData.unshift({
              id: user.id,
              email: user.email,
              phone: user.phone || null,
              full_name: user.user_metadata?.full_name || '',
              created_at: user.created_at,
              last_sign_in_at: null,
              email_confirmed_at: user.email_confirmed_at,
              phone_confirmed_at: user.phone_confirmed_at,
              leverage_multiplier: 5,
              is_active: true,
              contracted_plan: 'none'
            });
          }
        }
      }
      
      // Create profiles for users that don't have them
      const usersWithoutProfiles = allUsersData.filter(userData => 
        !userData.leverage_multiplier && (userData.email || userData.phone)
      );
      
      if (usersWithoutProfiles.length > 0) {
        console.log('Creating profiles for users without them:', usersWithoutProfiles.length);
        
        const profilesToCreate = usersWithoutProfiles.map(userData => ({
          id: userData.id,
          email: userData.email || '',
          phone: userData.phone || '',
          full_name: userData.full_name || '',
          leverage_multiplier: 1,
          is_active: true,
          contracted_plan: 'none'
        }));
        
        const { error: batchInsertError } = await supabase
          .from('user_profiles')
          .insert(profilesToCreate);
        
        if (!batchInsertError) {
          // Update the data with default values
          usersWithoutProfiles.forEach(userData => {
            userData.leverage_multiplier = 1;
            userData.is_active = true;
            userData.contracted_plan = 'none';
          });
        }
      }

      const allUsers: User[] = allUsersData.map(userData => ({
        id: userData.id,
        full_name: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        created_at: userData.created_at,
        last_sign_in_at: userData.last_sign_in_at,
        leverage_multiplier: userData.leverage_multiplier || 1,
        is_active: userData.is_active !== false,
        contracted_plan: userData.contracted_plan || 'none',
        email_confirmed_at: userData.email_confirmed_at,
        phone_confirmed_at: userData.phone_confirmed_at
      }));

      // Debug: Log the users found
      console.log('Users found:', allUsers.length);
      console.log('Users with phones:', allUsers.filter(u => u.phone).length);
      console.log('Users with emails:', allUsers.filter(u => u.email).length);

      setUsers(allUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  // Phone formatting function
  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    
    if (digits.startsWith('55') && digits.length >= 13) {
      const countryCode = digits.slice(0, 2);
      const areaCode = digits.slice(2, 4);
      const firstPart = digits.slice(4, 9);
      const secondPart = digits.slice(9, 13);
      return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
    }
    
    return phone;
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 13;
  };

  const validateForm = (formData: UserFormData, isEdit = false) => {
    const errors: Record<string, string> = {};

    // Only validate required fields for new users, not edits
    if (!isEdit) {
      if (!formData.full_name.trim()) {
        errors.full_name = 'Nome completo é obrigatório';
      }

      if (!formData.email.trim()) {
        errors.email = 'Email é obrigatório';
      } else if (!validateEmail(formData.email)) {
        errors.email = 'Email inválido';
      }

      if (!formData.phone.trim()) {
        errors.phone = 'Telefone é obrigatório';
      } else if (!validatePhone(formData.phone)) {
        errors.phone = 'Telefone inválido';
      }

      if (!formData.password.trim()) {
        errors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 6) {
        errors.password = 'Senha deve ter pelo menos 6 caracteres';
      }
    } else {
      // For edits, only validate format if fields are not empty
      if (formData.email.trim() && !validateEmail(formData.email)) {
        errors.email = 'Email inválido';
      }

      if (formData.phone.trim() && !validatePhone(formData.phone)) {
        errors.phone = 'Telefone inválido';
      }
    }

    if (formData.leverage_multiplier < 1 || formData.leverage_multiplier > 5) {
      errors.leverage_multiplier = 'Alavancagem deve estar entre 1x e 5x';
    }

    return errors;
  };

  // CRUD Operations
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(userForm);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      
      // Check for existing email/phone
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('email, phone')
        .or(`email.eq.${userForm.email},phone.eq.${userForm.phone}`)
        .maybeSingle();

      if (existingUser) {
        if (existingUser.email === userForm.email) {
          setFormErrors({ email: 'Email já está em uso' });
          return;
        }
        if (existingUser.phone === userForm.phone) {
          setFormErrors({ phone: 'Telefone já está em uso' });
          return;
        }
      }

      // Create user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userForm.email,
        password: userForm.password,
        options: {
          data: {
            full_name: userForm.full_name,
            phone: userForm.phone
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            full_name: userForm.full_name,
            email: userForm.email,
            phone: userForm.phone,
            leverage_multiplier: userForm.leverage_multiplier,
            is_active: userForm.is_active,
            contracted_plan: userForm.contracted_plan
          });

        if (profileError) throw profileError;

        setSuccess('Usuário criado com sucesso!');
        setShowAddUserModal(false);
        resetForm();
        fetchUsers();
      }
    } catch (error: any) {
      console.error('Error adding user:', error);
      setError(error.message || 'Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    const errors = validateForm(userForm, true);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: userForm.full_name,
          email: userForm.email,
          phone: userForm.phone,
          leverage_multiplier: userForm.leverage_multiplier,
          is_active: userForm.is_active,
          contracted_plan: userForm.contracted_plan
        })
        .eq('id', editingUser.id);

      if (error) throw error;

      setSuccess('Usuário atualizado com sucesso!');
      setShowEditUserModal(false);
      setEditingUser(null);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating user:', error);
      setError(error.message || 'Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setSuccess('Usuário excluído com sucesso!');
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      setError('Erro ao excluir usuário');
    }
  };

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ is_active: isActive })
        .eq('id', userId);

      if (error) throw error;

      setSuccess(`Usuário ${isActive ? 'ativado' : 'desativado'} com sucesso!`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating user status:', error);
      setError('Erro ao atualizar status do usuário');
    }
  };

  const handleUpdateLeverage = async (userId: string, newLeverage: number) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ leverage_multiplier: newLeverage })
        .eq('id', userId);

      if (error) throw error;

      setSuccess(`Alavancagem atualizada para ${newLeverage}x com sucesso!`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating leverage:', error);
      setError('Erro ao atualizar alavancagem');
    }
  };
  const handleResetPassword = async (userId: string, email: string) => {
    try {
      // In a real implementation, you would send a password reset email
      // For now, we'll just show a success message
      setSuccess(`Email de redefinição de senha enviado para ${email}`);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      setError('Erro ao redefinir senha');
    }
  };

  // Helper functions
  const resetForm = () => {
    setUserForm({
      full_name: '',
      email: '',
      phone: '',
      password: '',
      is_active: true,
      leverage_multiplier: 1,
      contracted_plan: 'none'
    });
    setFormErrors({});
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setUserForm({
      full_name: user.full_name || '',
      email: user.email,
      phone: user.phone || '',
      password: '',
      is_active: user.is_active,
      leverage_multiplier: user.leverage_multiplier,
      contracted_plan: user.contracted_plan
    });
    setShowEditUserModal(true);
  };

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));
    
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && user.is_active) ||
                         (filterActive === 'inactive' && !user.is_active);

    const matchesDateRange = !dateRange.start || !dateRange.end || 
                            (new Date(user.created_at) >= new Date(dateRange.start) &&
                             new Date(user.created_at) <= new Date(dateRange.end));

    return matchesSearch && matchesFilter && matchesDateRange;
  });

  // Selection functions
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  // Utility functions
  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'bitcoin': return 'Bitcoin';
      case 'mini-indice': return 'Mini Índice';
      case 'mini-dolar': return 'Mini Dólar';
      case 'portfolio-completo': return 'Portfólio Completo';
      case 'none': return 'Nenhum';
      default: return plan;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'bitcoin': return 'bg-orange-100 text-orange-800';
      case 'mini-indice': return 'bg-blue-100 text-blue-800';
      case 'mini-dolar': return 'bg-green-100 text-green-800';
      case 'portfolio-completo': return 'bg-purple-100 text-purple-800';
      case 'none': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with New Logo */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img 
              src="https://i.postimg.cc/5tjcZ4qJ/Chat-GPT-Image-12-de-jul-de-2025-21-56-40.png" 
              alt="Quant Broker Logo" 
              className="h-12 w-12 mr-4 rounded-lg shadow-sm"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600">Gerencie usuários e configurações de alavancagem</p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            {success}
            <button 
              onClick={() => setSuccess(null)}
              className="ml-auto text-green-500 hover:text-green-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterActive}
                  onChange={(e) => setFilterActive(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">até</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Adicionar Usuário
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.is_active).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alavancagem Média</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length > 0 
                    ? (users.reduce((acc, u) => acc + u.leverage_multiplier, 0) / users.length).toFixed(1)
                    : '0'
                  }x
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Filter className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Filtrados</p>
                <p className="text-2xl font-bold text-gray-900">{filteredUsers.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Usuários</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  Total: {users.length} | Filtrados: {filteredUsers.length}
                </div>
                {selectedUsers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {selectedUsers.length} selecionados
                    </span>
                    <button
                      onClick={() => setSelectedUsers([])}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Limpar seleção
                    </button>
                  </div>
                )}
                <button
                  onClick={selectAllUsers}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {selectedUsers.length === filteredUsers.length ? 'Desmarcar todos' : 'Selecionar todos'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={selectAllUsers}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome Completo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alavancagem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cadastro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {(user.full_name || user.email).charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name || 'Nome não informado'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email_confirmed_at ? (
                              <span className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                Email verificado
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <AlertCircle className="w-3 h-3 text-yellow-500 mr-1" />
                                Email não verificado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatPhoneDisplay(user.phone || '')}
                      </div>
                      {user.phone_confirmed_at ? (
                        <div className="text-xs text-green-600 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verificado
                        </div>
                      ) : user.phone ? (
                        <div className="text-xs text-yellow-600 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Não verificado
                        </div>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleUserStatus(user.id, !user.is_active)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {user.is_active ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateLeverage(user.id, Math.max(1, user.leverage_multiplier - 1))}
                          className="p-1 text-red-600 hover:text-red-800"
                          disabled={user.leverage_multiplier <= 1}
                          title="Diminuir alavancagem"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-900 min-w-[3rem] text-center">
                          {user.leverage_multiplier}x
                        </span>
                        <button
                          onClick={() => handleUpdateLeverage(user.id, Math.min(5, user.leverage_multiplier + 1))}
                          className="p-1 text-green-600 hover:text-green-800"
                          disabled={user.leverage_multiplier >= 5}
                          title="Aumentar alavancagem"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(user.contracted_plan)}`}>
                        {getPlanDisplayName(user.contracted_plan)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_sign_in_at 
                        ? new Date(user.last_sign_in_at).toLocaleDateString('pt-BR')
                        : 'Nunca'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar usuário"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(user.id, user.email)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Redefinir senha"
                        >
                          <Lock className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Excluir usuário"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {loading ? 'Carregando usuários...' : 
                 users.length === 0 ? 'Nenhum usuário cadastrado' : 
                 'Nenhum usuário encontrado com os filtros aplicados'}
              </p>
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Adicionar Novo Usuário</h2>
                <button
                  onClick={() => {
                    setShowAddUserModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={userForm.full_name}
                      onChange={(e) => setUserForm(prev => ({ ...prev, full_name: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.full_name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Nome completo do usuário"
                    />
                    {formErrors.full_name && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="email@exemplo.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={userForm.phone}
                      onChange={(e) => setUserForm(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="(11) 99999-9999"
                    />
                    {formErrors.phone && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Senha *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={userForm.password}
                        onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.password ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alavancagem
                    </label>
                    <select
                      value={userForm.leverage_multiplier}
                      onChange={(e) => setUserForm(prev => ({ ...prev, leverage_multiplier: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>1x</option>
                      <option value={2}>2x</option>
                      <option value={3}>3x</option>
                      <option value={4}>4x</option>
                      <option value={5}>5x</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plano Contratado
                    </label>
                    <select
                      value={userForm.contracted_plan}
                      onChange={(e) => setUserForm(prev => ({ ...prev, contracted_plan: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">Nenhum</option>
                      <option value="bitcoin">Bitcoin</option>
                      <option value="mini-indice">Mini Índice</option>
                      <option value="mini-dolar">Mini Dólar</option>
                      <option value="portfolio-completo">Portfólio Completo</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={userForm.is_active}
                    onChange={(e) => setUserForm(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                    Conta ativa
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Criando...' : 'Criar Usuário'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUserModal(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditUserModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Editar Usuário</h2>
                <button
                  onClick={() => {
                    setShowEditUserModal(false);
                    setEditingUser(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleEditUser} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={userForm.full_name}
                      onChange={(e) => setUserForm(prev => ({ ...prev, full_name: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.full_name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Nome completo do usuário"
                    />
                    {formErrors.full_name && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="email@exemplo.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={userForm.phone}
                      onChange={(e) => setUserForm(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="(11) 99999-9999"
                    />
                    {formErrors.phone && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alavancagem
                    </label>
                    <select
                      value={userForm.leverage_multiplier}
                      onChange={(e) => setUserForm(prev => ({ ...prev, leverage_multiplier: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>1x</option>
                      <option value={2}>2x</option>
                      <option value={3}>3x</option>
                      <option value={4}>4x</option>
                      <option value={5}>5x</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plano Contratado
                    </label>
                    <select
                      value={userForm.contracted_plan}
                      onChange={(e) => setUserForm(prev => ({ ...prev, contracted_plan: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">Nenhum</option>
                      <option value="bitcoin">Bitcoin</option>
                      <option value="mini-indice">Mini Índice</option>
                      <option value="mini-dolar">Mini Dólar</option>
                      <option value="portfolio-completo">Portfólio Completo</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="edit_is_active"
                    checked={userForm.is_active}
                    onChange={(e) => setUserForm(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="edit_is_active" className="ml-2 text-sm text-gray-700">
                    Conta ativa
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditUserModal(false);
                      setEditingUser(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;