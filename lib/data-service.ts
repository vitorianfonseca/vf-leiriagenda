// Sistema de dados centralizado para a LeiriAgenda
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "moderator"
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastActive: string
  avatar: string
  favorites: string[]
  phone?: string
  location?: string
  bio?: string
  website?: string
  provider?: "email" | "google"
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  location: string
  address: string
  category: string
  price: string
  isFree: boolean
  capacity?: number
  organizer: string
  email: string
  phone: string
  website?: string
  image: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  favorites: number
  views: number
}

export interface Comment {
  id: string
  eventId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  rating: number // 1-5 estrelas
  createdAt: string
  updatedAt: string
  likes: number
  isEdited: boolean
  isReported: boolean
  status: "active" | "hidden" | "deleted"
}

export interface EventRating {
  eventId: string
  totalRatings: number
  averageRating: number
  ratingDistribution: {
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
  }
}

const STORAGE_KEYS = {
  USERS: "leiriagenda_users",
  CURRENT_USER: "leiriagenda_current_user",
  EVENTS: "leiriagenda_events",
  COMMENTS: "leiriagenda_comments",
  EVENT_RATINGS: "leiriagenda_event_ratings",
  SETTINGS: "leiriagenda_settings"
}

const DEFAULT_ADMIN_USER: User = {
  id: "admin-1",
  name: "Administrador",
  email: "admin@leiriagenda.pt",
  role: "admin",
  status: "active",
  joinDate: "2024-01-01",
  lastActive: new Date().toISOString(),
  avatar: "/placeholder-user.jpg",
  favorites: [],
  provider: "email"
}

const DEFAULT_USERS: User[] = [DEFAULT_ADMIN_USER]

const DEFAULT_EVENTS: Event[] = [
  {
    id: "1",
    title: "Festival de Música de Leiria 2024",
    description: "Um festival de música incrível com artistas locais e nacionais.",
    date: "2024-12-15",
    time: "20:00",
    endTime: "23:00",
    location: "Teatro José Lúcio da Silva",
    address: "Rua Tenente Valadim, Leiria",
    category: "Música",
    price: "€25",
    isFree: false,
    capacity: 500,
    organizer: "Câmara Municipal de Leiria",
    email: "cultura@cm-leiria.pt",
    phone: "244839500",
    website: "https://www.cm-leiria.pt",
    image: "/placeholder.svg?height=200&width=400&text=Festival+de+Música",
    status: "approved",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    favorites: 45,
    views: 1200
  },
  {
    id: "2",
    title: "Mercado de Natal do Castelo",
    description: "Mercado tradicional de Natal com artesanato local e gastronomia.",
    date: "2024-12-20",
    time: "10:00",
    endTime: "18:00",
    location: "Castelo de Leiria",
    address: "Castelo de Leiria, Leiria",
    category: "Cultura",
    price: "Gratuito",
    isFree: true,
    capacity: 1000,
    organizer: "Associação Cultural de Leiria",
    email: "info@acultura-leiria.pt",
    phone: "244839600",
    website: "https://www.acultura-leiria.pt",
    image: "/placeholder.svg?height=200&width=400&text=Mercado+de+Natal",
    status: "approved",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    favorites: 78,
    views: 2100
  }
]

class DataService {
  // Métodos para utilizadores
  static getUsers(): User[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS)
      if (stored) {
        const users = JSON.parse(stored)
        // Garantir que o admin sempre existe
        if (!users.find((u: User) => u.email === DEFAULT_ADMIN_USER.email)) {
          return [DEFAULT_ADMIN_USER, ...users]
        }
        return users
      }
      return DEFAULT_USERS
    } catch (error) {
      console.error('Erro ao carregar utilizadores:', error)
      return DEFAULT_USERS
    }
  }

  static saveUsers(users: User[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    } catch (error) {
      console.error('Erro ao guardar utilizadores:', error)
    }
  }

  static addUser(user: User): void {
    const users = this.getUsers()
    const updatedUsers = [...users, user]
    this.saveUsers(updatedUsers)
  }

  static updateUser(userId: string, updates: Partial<User>): void {
    const users = this.getUsers()
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    )
    this.saveUsers(updatedUsers)
  }

  static deleteUser(userId: string): void {
    const users = this.getUsers()
    const updatedUsers = users.filter(user => user.id !== userId)
    this.saveUsers(updatedUsers)
  }

  // Métodos para eventos
  static getEvents(): Event[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENTS)
      if (stored) {
        const events = JSON.parse(stored)
        // Garantir que os eventos padrão sempre existem
        const defaultEventIds = DEFAULT_EVENTS.map(e => e.id)
        const customEvents = events.filter((e: Event) => !defaultEventIds.includes(e.id))
        return [...DEFAULT_EVENTS, ...customEvents]
      }
      return DEFAULT_EVENTS
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
      return DEFAULT_EVENTS
    }
  }

  static saveEvents(events: Event[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events))
    } catch (error) {
      console.error('Erro ao guardar eventos:', error)
    }
  }

  static addEvent(event: Event): void {
    const events = this.getEvents()
    const updatedEvents = [...events, event]
    this.saveEvents(updatedEvents)
  }

  static updateEvent(eventId: string, updates: Partial<Event>): void {
    const events = this.getEvents()
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, ...updates, updatedAt: new Date().toISOString() } : event
    )
    this.saveEvents(updatedEvents)
  }

  static deleteEvent(eventId: string): void {
    const events = this.getEvents()
    const updatedEvents = events.filter(event => event.id !== eventId)
    this.saveEvents(updatedEvents)
  }

  static getEventById(eventId: string): Event | undefined {
    const events = this.getEvents()
    return events.find(event => event.id === eventId)
  }

  static getEventsByCategory(category: string): Event[] {
    const events = this.getEvents()
    return events.filter(event => 
      event.category.toLowerCase() === category.toLowerCase()
    )
  }

  static getEventsByStatus(status: Event['status']): Event[] {
    const events = this.getEvents()
    return events.filter(event => event.status === status)
  }

  static searchEvents(query: string): Event[] {
    const events = this.getEvents()
    const lowerQuery = query.toLowerCase()
    
    return events.filter(event => 
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery) ||
      event.location.toLowerCase().includes(lowerQuery) ||
      event.category.toLowerCase().includes(lowerQuery) ||
      event.organizer.toLowerCase().includes(lowerQuery)
    )
  }

  // Métodos para comentários
  static getComments(eventId?: string): Comment[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMMENTS)
      if (!stored) return []
      
      const allComments: Comment[] = JSON.parse(stored)
      if (eventId) {
        return allComments.filter(comment => comment.eventId === eventId && comment.status === "active")
      }
      return allComments.filter(comment => comment.status === "active")
    } catch (error) {
      console.error("Erro ao obter comentários:", error)
      return []
    }
  }

  static saveComments(comments: Comment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments))
    } catch (error) {
      console.error("Erro ao guardar comentários:", error)
    }
  }

  static addComment(comment: Comment): void {
    try {
      const comments = this.getComments()
      comments.push(comment)
      this.saveComments(comments)
      
      // Atualizar rating do evento
      this.updateEventRating(comment.eventId, comment.rating)
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error)
    }
  }

  static updateComment(commentId: string, updates: Partial<Comment>): void {
    try {
      const comments = this.getComments()
      const index = comments.findIndex(c => c.id === commentId)
      if (index !== -1) {
        comments[index] = { ...comments[index], ...updates, updatedAt: new Date().toISOString() }
        this.saveComments(comments)
      }
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error)
    }
  }

  static deleteComment(commentId: string): void {
    try {
      const comments = this.getComments()
      const index = comments.findIndex(c => c.id === commentId)
      if (index !== -1) {
        comments[index].status = "deleted"
        this.saveComments(comments)
      }
    } catch (error) {
      console.error("Erro ao eliminar comentário:", error)
    }
  }

  // Métodos para ratings
  static getEventRating(eventId: string): EventRating {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENT_RATINGS)
      if (!stored) {
        return {
          eventId,
          totalRatings: 0,
          averageRating: 0,
          ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
        }
      }
      
      const allRatings: EventRating[] = JSON.parse(stored)
      const eventRating = allRatings.find(r => r.eventId === eventId)
      
      return eventRating || {
        eventId,
        totalRatings: 0,
        averageRating: 0,
        ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
      }
    } catch (error) {
      console.error("Erro ao obter rating do evento:", error)
      return {
        eventId,
        totalRatings: 0,
        averageRating: 0,
        ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
      }
    }
  }

  static updateEventRating(eventId: string, newRating: number): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENT_RATINGS)
      let allRatings: EventRating[] = []
      
      if (stored) {
        allRatings = JSON.parse(stored)
      }
      
      let eventRating = allRatings.find(r => r.eventId === eventId)
      if (!eventRating) {
        eventRating = {
          eventId,
          totalRatings: 0,
          averageRating: 0,
          ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
        }
        allRatings.push(eventRating)
      }
      
      // Atualizar distribuição
      eventRating.ratingDistribution[newRating.toString() as keyof typeof eventRating.ratingDistribution]++
      eventRating.totalRatings++
      
      // Calcular média
      const total = Object.entries(eventRating.ratingDistribution).reduce((sum, [rating, count]) => {
        return sum + (parseInt(rating) * count)
      }, 0)
      
      eventRating.averageRating = total / eventRating.totalRatings
      
      localStorage.setItem(STORAGE_KEYS.EVENT_RATINGS, JSON.stringify(allRatings))
    } catch (error) {
      console.error("Erro ao atualizar rating do evento:", error)
    }
  }

  // Métodos para configurações
  static getSettings(): Record<string, any> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
      return {}
    }
  }

  static saveSettings(settings: Record<string, any>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
    } catch (error) {
      console.error('Erro ao guardar configurações:', error)
    }
  }

  // Métodos para backup e restauro
  static exportData(): string {
    const data = {
      users: this.getUsers(),
      events: this.getEvents(),
      comments: this.getComments(),
      eventRatings: Object.fromEntries(
        this.getEvents().map(event => [
          event.id, 
          this.getEventRating(event.id)
        ])
      ),
      settings: this.getSettings(),
      exportDate: new Date().toISOString()
    }
    
    return JSON.stringify(data, null, 2)
  }

  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      
      if (data.users) {
        this.saveUsers(data.users)
      }
      
      if (data.events) {
        this.saveEvents(data.events)
      }
      
      if (data.comments) {
        this.saveComments(data.comments)
      }
      
      if (data.eventRatings) {
        localStorage.setItem(STORAGE_KEYS.EVENT_RATINGS, JSON.stringify(Object.values(data.eventRatings)))
      }
      
      if (data.settings) {
        this.saveSettings(data.settings)
      }
      
      return true
    } catch (error) {
      console.error('Erro ao importar dados:', error)
      return false
    }
  }

  // Método para limpar todos os dados
  static clearAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Erro ao limpar dados:', error)
    }
  }

  // Método para inicializar dados padrão
  static initializeDefaultData(): void {
    try {
      // Só inicializar se não existirem dados
      if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        this.saveUsers(DEFAULT_USERS)
      }
      
      if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
        this.saveEvents(DEFAULT_EVENTS)
      }
    } catch (error) {
      console.error('Erro ao inicializar dados padrão:', error)
    }
  }
}

export default DataService

