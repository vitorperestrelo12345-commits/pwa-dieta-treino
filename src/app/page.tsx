'use client'

import { useState, useEffect } from 'react'
import { 
  Home, Heart, Target, Activity, Play, Settings, TrendingUp, 
  Award, Flame, Zap, Moon, Sun, Wind, Smile, Meh, Frown, 
  CheckCircle2, Circle, Calendar, Clock, BarChart3, Watch,
  ChevronRight, Plus, Pause, Volume2, VolumeX, Video, Mail, Lock, User, Eye, EyeOff, ArrowLeft
} from 'lucide-react'

// Mock Data
const mockUser = {
  name: 'Ana',
  email: 'ana@email.com',
  streak: 15,
  mood: 'happy',
  todayHabits: 5,
  completedHabits: 3,
  meditationMinutes: 10,
  workoutMinutes: 25
}

const mockHabits = [
  { id: 1, name: 'Meditar 10 min', icon: '🧘', completed: true, streak: 15, category: 'mental' },
  { id: 2, name: 'Beber 2L água', icon: '💧', completed: true, streak: 12, category: 'health' },
  { id: 3, name: 'Exercício 30 min', icon: '💪', completed: true, streak: 8, category: 'physical' },
  { id: 4, name: 'Ler 20 páginas', icon: '📚', completed: false, streak: 5, category: 'mental' },
  { id: 5, name: 'Dormir 8h', icon: '😴', completed: false, streak: 10, category: 'health' }
]

const mockJournalEntries = [
  { date: '2024-01-15', mood: 'happy', note: 'Dia produtivo! Consegui finalizar todos os projetos.' },
  { date: '2024-01-14', mood: 'calm', note: 'Meditação ajudou muito hoje.' },
  { date: '2024-01-13', mood: 'stressed', note: 'Dia corrido, mas consegui manter a calma.' }
]

const mockWorkouts = [
  { id: 1, name: 'HIIT Cardio', duration: '15 min', calories: 180, thumbnail: '🔥' },
  { id: 2, name: 'Yoga Flow', duration: '20 min', calories: 120, thumbnail: '🧘' },
  { id: 3, name: 'Força Total', duration: '30 min', calories: 250, thumbnail: '💪' },
  { id: 4, name: 'Alongamento', duration: '10 min', calories: 50, thumbnail: '🤸' }
]

export default function MindHabitApp() {
  const [currentScreen, setCurrentScreen] = useState('auth-welcome')
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedMood, setSelectedMood] = useState('')
  const [journalNote, setJournalNote] = useState('')
  const [meditationTime, setMeditationTime] = useState(300)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [breathPhase, setBreathPhase] = useState('inhale')

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const authToken = localStorage.getItem('mindhabit-auth')
    if (authToken) {
      setIsAuthenticated(true)
      setCurrentScreen('welcome')
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && meditationTime > 0) {
      interval = setInterval(() => {
        setMeditationTime(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, meditationTime])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold'
          if (prev === 'hold') return 'exhale'
          return 'inhale'
        })
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (authMode === 'register') {
      if (password !== confirmPassword) {
        alert('As senhas não coincidem!')
        return
      }
      if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!')
        return
      }
    }

    // Simular autenticação
    localStorage.setItem('mindhabit-auth', 'true')
    localStorage.setItem('mindhabit-user', JSON.stringify({ name, email }))
    setIsAuthenticated(true)
    setCurrentScreen('welcome')
  }

  const startApp = () => {
    localStorage.setItem('mindhabit-visited', 'true')
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('mindhabit-auth')
    localStorage.removeItem('mindhabit-user')
    localStorage.removeItem('mindhabit-visited')
    setIsAuthenticated(false)
    setCurrentScreen('auth-welcome')
  }

  // 🔐 Auth Welcome Screen
  const AuthWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E14] via-[#0F1419] to-[#0A0E14] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-3xl rounded-full" />
          <div className="relative bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-8 rounded-3xl border border-cyan-500/20 shadow-2xl">
            <div className="text-6xl mb-4">🧠</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              MINDHABIT+
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl text-gray-300">Bem-estar & Produtividade</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Transforme sua rotina com diário emocional, hábitos saudáveis, meditação e treinos personalizados
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setAuthMode('register')
              setCurrentScreen('auth-form')
            }}
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
          >
            Criar Conta
          </button>

          <button
            onClick={() => {
              setAuthMode('login')
              setCurrentScreen('auth-form')
            }}
            className="w-full bg-[#1A1F2E] border-2 border-cyan-500/30 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Já tenho conta
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  )

  // 🔐 Auth Form Screen
  const AuthFormScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E14] via-[#0F1419] to-[#0A0E14] text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
            onClick={() => setCurrentScreen('auth-welcome')}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">
            {authMode === 'login' ? 'Entrar' : authMode === 'register' ? 'Criar Conta' : 'Recuperar Senha'}
          </h1>
          <div className="w-10" />
        </div>

        {/* Logo pequeno */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-4 rounded-2xl border border-cyan-500/20">
            <div className="text-4xl">🧠</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="text-sm text-gray-400 block mb-2">Nome completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="w-full bg-[#1A1F2E] border border-cyan-500/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 block mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-[#1A1F2E] border border-cyan-500/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div>
              <label className="text-sm text-gray-400 block mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-[#1A1F2E] border border-cyan-500/20 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="text-sm text-gray-400 block mb-2">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-[#1A1F2E] border border-cyan-500/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {authMode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('forgot')
                  setCurrentScreen('auth-form')
                }}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 mt-6"
          >
            {authMode === 'login' ? 'Entrar' : authMode === 'register' ? 'Criar Conta' : 'Enviar Link'}
          </button>
        </form>

        {/* Divider */}
        {authMode !== 'forgot' && (
          <>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cyan-500/20" />
              <span className="text-sm text-gray-500">ou</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cyan-500/20" />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full bg-[#1A1F2E] border border-cyan-500/20 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:border-cyan-500/40 transition-all">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm">G</div>
                Continuar com Google
              </button>
              <button className="w-full bg-[#1A1F2E] border border-cyan-500/20 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:border-cyan-500/40 transition-all">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-sm">🍎</div>
                Continuar com Apple
              </button>
            </div>

            {/* Toggle Auth Mode */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                {authMode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                >
                  {authMode === 'login' ? 'Criar conta' : 'Entrar'}
                </button>
              </p>
            </div>
          </>
        )}

        {authMode === 'forgot' && (
          <div className="mt-6">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4">
              <p className="text-sm text-cyan-400 text-center">
                📧 Enviaremos um link de recuperação para o email informado
              </p>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Voltar para login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // 1️⃣ Welcome Screen (após autenticação)
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E14] via-[#0F1419] to-[#0A0E14] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-3xl rounded-full" />
          <div className="relative bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-8 rounded-3xl border border-cyan-500/20 shadow-2xl">
            <div className="text-6xl mb-4">🧠</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              MINDHABIT+
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl text-gray-300">Bem-vindo de volta! 👋</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Pronto para continuar sua jornada de bem-estar e produtividade?
          </p>
        </div>

        <button
          onClick={startApp}
          className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
        >
          Começar
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          <div className="w-2 h-2 rounded-full bg-gray-700" />
          <div className="w-2 h-2 rounded-full bg-gray-700" />
        </div>
      </div>
    </div>
  )

  // 2️⃣ Dashboard Screen
  const DashboardScreen = () => (
    <div className="min-h-screen bg-[#0A0E14] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-b-3xl border-b border-cyan-500/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Olá, {mockUser.name}! 👋</h1>
            <p className="text-gray-400 text-sm">Como você está hoje?</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-3 py-2 rounded-xl border border-orange-500/30">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold">{mockUser.streak}</span>
            </div>
            <button 
              onClick={() => setCurrentScreen('settings')}
              className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30"
            >
              <Settings className="w-5 h-5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Mood Quick Select */}
        <div className="bg-[#0F1419]/50 backdrop-blur-sm p-4 rounded-2xl border border-cyan-500/10">
          <p className="text-sm text-gray-400 mb-3">Como está seu humor?</p>
          <div className="flex gap-3 justify-between">
            {[
              { emoji: '😊', label: 'Feliz', value: 'happy', color: 'from-green-500 to-emerald-500' },
              { emoji: '😌', label: 'Calmo', value: 'calm', color: 'from-blue-500 to-cyan-500' },
              { emoji: '😐', label: 'Neutro', value: 'neutral', color: 'from-gray-500 to-slate-500' },
              { emoji: '😔', label: 'Triste', value: 'sad', color: 'from-indigo-500 to-purple-500' },
              { emoji: '😰', label: 'Ansioso', value: 'anxious', color: 'from-orange-500 to-red-500' }
            ].map((mood) => (
              <button
                key={mood.value}
                onClick={() => setCurrentScreen('journal')}
                className={`flex-1 aspect-square bg-gradient-to-br ${mood.color} bg-opacity-10 rounded-2xl flex flex-col items-center justify-center gap-1 border border-white/10 hover:border-white/30 transition-all duration-200 hover:scale-105`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs text-gray-300">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 p-6 rounded-2xl border border-purple-500/30 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">👑</span>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MINDHABIT+ Premium
                  </h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Desbloqueie recursos exclusivos e potencialize seus resultados
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Meditações guiadas ilimitadas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Treinos personalizados com IA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Relatórios avançados e insights</span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
              Assinar Premium - R$ 19,90/mês
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-5 rounded-2xl border border-cyan-500/20 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-6 h-6 text-cyan-400" />
              <span className="text-xs text-gray-400">Hábitos</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-cyan-400">{mockUser.completedHabits}</span>
              <span className="text-gray-400">/{mockUser.todayHabits}</span>
            </div>
            <div className="w-full bg-[#0A0E14] rounded-full h-2 mt-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(mockUser.completedHabits / mockUser.todayHabits) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-5 rounded-2xl border border-emerald-500/20 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-6 h-6 text-emerald-400" />
              <span className="text-xs text-gray-400">Treino</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-emerald-400">{mockUser.workoutMinutes}</span>
              <span className="text-gray-400">min</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Meta: 30 min</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setCurrentScreen('meditation')}
            className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 hover:scale-105"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Meditação</p>
                <p className="text-xs text-gray-400">{mockUser.meditationMinutes} min hoje</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentScreen('workout')}
            className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 rounded-2xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-200 hover:scale-105"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Treino</p>
                <p className="text-xs text-gray-400">Vamos começar!</p>
              </div>
            </div>
          </button>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-5 rounded-2xl border border-cyan-500/30 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">💡 Insight do Dia</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Você está mantendo uma sequência incrível! Continue assim e alcance 20 dias seguidos para desbloquear a medalha "Consistente".
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Preview */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-5 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Conquistas Recentes</h3>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-3">
            {[
              { icon: '🔥', name: '15 Dias', color: 'from-orange-500 to-red-500' },
              { icon: '🧘', name: 'Zen Master', color: 'from-purple-500 to-indigo-500' },
              { icon: '💪', name: 'Forte', color: 'from-cyan-500 to-emerald-500' }
            ].map((achievement, i) => (
              <div key={i} className={`flex-1 bg-gradient-to-br ${achievement.color} bg-opacity-10 p-4 rounded-xl border border-white/10`}>
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <p className="text-xs text-gray-300">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // 3️⃣ Journal Screen
  const JournalScreen = () => (
    <div className="min-h-screen bg-[#0A0E14] text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Diário Emocional</h1>
          <div className="w-10" />
        </div>

        {/* Mood Selection */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-cyan-500/20 mb-6">
          <p className="text-center text-gray-400 mb-4">Como você está se sentindo agora?</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {[
              { emoji: '😊', label: 'Feliz', value: 'happy' },
              { emoji: '😌', label: 'Calmo', value: 'calm' },
              { emoji: '😐', label: 'Neutro', value: 'neutral' },
              { emoji: '😔', label: 'Triste', value: 'sad' },
              { emoji: '😰', label: 'Ansioso', value: 'anxious' }
            ].map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  selectedMood === mood.value
                    ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 scale-110 shadow-lg shadow-cyan-500/25'
                    : 'bg-[#0F1419] border border-cyan-500/10 hover:border-cyan-500/30'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </button>
            ))}
          </div>

          {/* Note Input */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">O que aconteceu hoje?</label>
            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="Escreva sobre seu dia, sentimentos ou pensamentos..."
              className="w-full bg-[#0A0E14] border border-cyan-500/20 rounded-2xl p-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none h-32"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-3 rounded-2xl font-semibold mt-4 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200">
            Salvar Registro
          </button>
        </div>

        {/* Previous Entries */}
        <div>
          <h3 className="font-bold mb-4">Registros Anteriores</h3>
          <div className="space-y-3">
            {mockJournalEntries.map((entry, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-4 rounded-2xl border border-cyan-500/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{entry.date}</span>
                  <span className="text-2xl">
                    {entry.mood === 'happy' ? '😊' : entry.mood === 'calm' ? '😌' : '😰'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{entry.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // 4️⃣ Habits Screen
  const HabitsScreen = () => (
    <div className="min-h-screen bg-[#0A0E14] text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Meus Hábitos</h1>
          <button className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-cyan-500/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-cyan-400">{mockUser.completedHabits}/{mockUser.todayHabits}</p>
              <p className="text-sm text-gray-400">Hábitos de hoje</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-2xl font-bold text-orange-400">{mockUser.streak}</span>
              </div>
              <p className="text-xs text-gray-400">dias seguidos</p>
            </div>
          </div>
          <div className="w-full bg-[#0A0E14] rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(mockUser.completedHabits / mockUser.todayHabits) * 100}%` }}
            />
          </div>
        </div>

        {/* Habits List */}
        <div className="space-y-3">
          {mockHabits.map((habit) => (
            <div key={habit.id} className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-5 rounded-2xl border border-cyan-500/10">
              <div className="flex items-center gap-4">
                <button
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
                    habit.completed
                      ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 scale-105 shadow-lg shadow-cyan-500/25'
                      : 'bg-[#0F1419] border border-cyan-500/20 hover:border-cyan-500/40'
                  }`}
                >
                  {habit.completed ? <CheckCircle2 className="w-6 h-6 text-white" /> : habit.icon}
                </button>
                <div className="flex-1">
                  <h3 className="font-semibold">{habit.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-400">{habit.streak} dias</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      habit.category === 'mental' ? 'bg-purple-500/20 text-purple-400' :
                      habit.category === 'health' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {habit.category === 'mental' ? '🧠 Mental' : 
                       habit.category === 'health' ? '💚 Saúde' : '💪 Físico'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Progress */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-cyan-500/20 mt-6">
          <h3 className="font-bold mb-4">Progresso Semanal</h3>
          <div className="flex justify-between items-end h-32">
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-8 rounded-t-lg transition-all duration-500 ${
                    i < 5 ? 'bg-gradient-to-t from-cyan-500 to-emerald-500' : 'bg-[#0F1419]'
                  }`}
                  style={{ height: `${i < 5 ? (60 + Math.random() * 40) : 20}%` }}
                />
                <span className="text-xs text-gray-400">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // 5️⃣ Meditation Screen
  const MeditationScreen = () => (
    <div className="min-h-screen bg-[#0A0E14] text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Meditação</h1>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Breathing Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-3xl transition-all duration-4000 ${
              breathPhase === 'inhale' ? 'scale-150' : breathPhase === 'hold' ? 'scale-150' : 'scale-100'
            }`} />
          </div>
          <div className="relative flex items-center justify-center h-96">
            <div className={`w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center transition-all duration-4000 ${
              breathPhase === 'inhale' ? 'scale-125' : breathPhase === 'hold' ? 'scale-125' : 'scale-100'
            }`}>
              <div className="text-center">
                <Wind className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="text-lg font-semibold">
                  {breathPhase === 'inhale' ? 'Inspire' : breathPhase === 'hold' ? 'Segure' : 'Expire'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-purple-500/20 mb-6">
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-purple-400 mb-2">{formatTime(meditationTime)}</p>
            <p className="text-gray-400">Tempo restante</p>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setMeditationTime(300)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                meditationTime === 300
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                  : 'bg-[#0F1419] text-gray-400 border border-purple-500/20'
              }`}
            >
              5 min
            </button>
            <button
              onClick={() => setMeditationTime(600)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                meditationTime === 600
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                  : 'bg-[#0F1419] text-gray-400 border border-purple-500/20'
              }`}
            >
              10 min
            </button>
            <button
              onClick={() => setMeditationTime(900)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                meditationTime === 900
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                  : 'bg-[#0F1419] text-gray-400 border border-purple-500/20'
              }`}
            >
              15 min
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Pausar' : 'Iniciar'}
          </button>
        </div>

        {/* Meditation Programs */}
        <div>
          <h3 className="font-bold mb-4">Programas Guiados</h3>
          <div className="space-y-3">
            {[
              { name: 'Respiração Consciente', duration: '5 min', icon: '🌬️' },
              { name: 'Redução de Ansiedade', duration: '10 min', icon: '🧘' },
              { name: 'Sono Profundo', duration: '15 min', icon: '😴' },
              { name: 'Foco e Concentração', duration: '8 min', icon: '🎯' }
            ].map((program, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-4 rounded-2xl border border-purple-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center text-2xl">
                    {program.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{program.name}</p>
                    <p className="text-sm text-gray-400">{program.duration}</p>
                  </div>
                </div>
                <Play className="w-5 h-5 text-purple-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // 6️⃣ Workout Screen
  const WorkoutScreen = () => (
    <div className="min-h-screen bg-[#0A0E14] text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Treino Físico</h1>
          <div className="w-10" />
        </div>

        {/* Today's Stats */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-orange-500/20 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-orange-400">{mockUser.workoutMinutes}</p>
              <p className="text-xs text-gray-400">Minutos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-400">320</p>
              <p className="text-xs text-gray-400">Calorias</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-400">2</p>
              <p className="text-xs text-gray-400">Treinos</p>
            </div>
          </div>
        </div>

        {/* Workout Videos */}
        <div>
          <h3 className="font-bold mb-4">Treinos Rápidos</h3>
          <div className="space-y-4">
            {mockWorkouts.map((workout) => (
              <div key={workout.id} className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] rounded-2xl border border-orange-500/10 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                  <div className="text-6xl">{workout.thumbnail}</div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25 hover:scale-110 transition-all duration-200">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold mb-2">{workout.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>{workout.calories} kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // 7️⃣ Reports Screen
  const ReportsScreen = () => (
    <div className="min-h-screen bg-[#0A0E14] text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Relatórios</h1>
          <button className="text-sm text-cyan-400 font-semibold">Esta Semana</button>
        </div>

        {/* Mood Chart */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-cyan-500/20 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Humor</h3>
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <div className="flex justify-between items-end h-32 mb-4">
            {[4, 5, 3, 4, 5, 4, 3].map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg"
                  style={{ height: `${value * 20}%` }}
                />
                <span className="text-xs text-gray-400">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">Média: 😊 Feliz (4.1/5)</p>
        </div>

        {/* Sleep Chart */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-indigo-500/20 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Sono</h3>
            <Moon className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex justify-between items-end h-32 mb-4">
            {[7, 8, 6.5, 7.5, 8, 7, 6].map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                  style={{ height: `${(value / 10) * 100}%` }}
                />
                <span className="text-xs text-gray-400">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">Média: 7.1 horas/noite</p>
        </div>

        {/* Energy Chart */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-emerald-500/20 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Energia</h3>
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex justify-between items-end h-32 mb-4">
            {[3, 4, 5, 4, 5, 4, 3].map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg"
                  style={{ height: `${value * 20}%` }}
                />
                <span className="text-xs text-gray-400">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">Média: ⚡ Alta (4.0/5)</p>
        </div>

        {/* Habits Completion */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Conclusão de Hábitos</h3>
            <Target className="w-5 h-5 text-orange-400" />
          </div>
          <div className="space-y-3">
            {[
              { name: 'Meditação', completion: 85, color: 'from-purple-500 to-indigo-500' },
              { name: 'Exercício', completion: 70, color: 'from-orange-500 to-red-500' },
              { name: 'Leitura', completion: 60, color: 'from-cyan-500 to-emerald-500' },
              { name: 'Hidratação', completion: 95, color: 'from-blue-500 to-cyan-500' }
            ].map((habit, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{habit.name}</span>
                  <span className="text-sm text-gray-400">{habit.completion}%</span>
                </div>
                <div className="w-full bg-[#0A0E14] rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${habit.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${habit.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // 8️⃣ Settings Screen
  const SettingsScreen = () => (
    <div className="min-h-screen bg-[#0A0E14] text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#1A1F2E] rounded-xl flex items-center justify-center border border-cyan-500/20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Configurações</h1>
          <div className="w-10" />
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-6 rounded-2xl border border-cyan-500/20 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h3 className="font-bold text-lg">{mockUser.name}</h3>
              <p className="text-sm text-gray-400">{mockUser.email}</p>
            </div>
          </div>
        </div>

        {/* Smartwatch Integration */}
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-6 rounded-2xl border border-purple-500/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Watch className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-bold">Smartwatch</h3>
                <p className="text-sm text-gray-400">Não conectado</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
              Conectar
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Sincronize dados de atividade, sono e frequência cardíaca do seu Apple Watch, Galaxy Watch ou Fitbit
          </p>
        </div>

        {/* Settings Options */}
        <div className="space-y-3">
          {[
            { icon: '🔔', label: 'Notificações', screen: 'notifications' },
            { icon: '🎯', label: 'Metas e Objetivos', screen: 'goals' },
            { icon: '🎨', label: 'Aparência', screen: 'appearance' },
            { icon: '🔒', label: 'Privacidade', screen: 'privacy' },
            { icon: '💳', label: 'Assinatura Premium', screen: 'premium' },
            { icon: '❓', label: 'Ajuda e Suporte', screen: 'help' }
          ].map((item, i) => (
            <button
              key={i}
              className="w-full bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] p-4 rounded-2xl border border-cyan-500/10 flex items-center justify-between hover:border-cyan-500/30 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500/10 border border-red-500/30 text-red-400 py-4 rounded-2xl font-semibold mt-6 hover:bg-red-500/20 transition-all duration-200"
        >
          Sair da Conta
        </button>
      </div>
    </div>
  )

  // Bottom Navigation
  const BottomNav = () => {
    if (currentScreen === 'auth-welcome' || currentScreen === 'auth-form' || currentScreen === 'welcome') return null

    const navItems = [
      { icon: Home, label: 'Início', screen: 'dashboard' },
      { icon: Target, label: 'Hábitos', screen: 'habits' },
      { icon: Heart, label: 'Diário', screen: 'journal' },
      { icon: BarChart3, label: 'Relatórios', screen: 'reports' },
      { icon: Settings, label: 'Config', screen: 'settings' }
    ]

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F1419] to-[#0F1419]/95 backdrop-blur-lg border-t border-cyan-500/10 px-6 py-4 z-50">
        <div className="flex justify-between max-w-md mx-auto">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setCurrentScreen(item.screen)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentScreen === item.screen
                  ? 'text-cyan-400 scale-110'
                  : 'text-gray-500 hover:text-cyan-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Render current screen
  const renderScreen = () => {
    if (!isAuthenticated) {
      if (currentScreen === 'auth-form') return <AuthFormScreen />
      return <AuthWelcomeScreen />
    }

    switch (currentScreen) {
      case 'welcome': return <WelcomeScreen />
      case 'dashboard': return <DashboardScreen />
      case 'journal': return <JournalScreen />
      case 'habits': return <HabitsScreen />
      case 'meditation': return <MeditationScreen />
      case 'workout': return <WorkoutScreen />
      case 'reports': return <ReportsScreen />
      case 'settings': return <SettingsScreen />
      default: return <DashboardScreen />
    }
  }

  return (
    <div className="font-inter antialiased">
      {renderScreen()}
      <BottomNav />
    </div>
  )
}
