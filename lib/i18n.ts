export type Locale = "pt" | "en"

export const defaultLocale: Locale = "pt"

export const locales: Locale[] = ["pt", "en"]

export interface Translations {
  [key: string]: string | Translations
}

export const translations: Record<Locale, Translations> = {
  pt: {
    // Navigation
    nav: {
      home: "Início",
      events: "Eventos",
      submit: "Submeter",
      about: "Sobre",
      help: "Ajuda",
      favorites: "Favoritos",
      login: "Entrar",
      profile: "Perfil",
      settings: "Configurações",
      myEvents: "Meus Eventos",
      logout: "Sair",
    },
    // Hero Section
    hero: {
      title: "Descubra os melhores eventos em",
      subtitle: "Cultura, música, arte e muito mais. Encontre experiências únicas na sua cidade histórica.",
      searchPlaceholder: "Procurar eventos, locais ou categorias...",
      searchButton: "Procurar",
      eventsThisMonth: "Eventos este mês",
      participants: "Participantes",
      partnerVenues: "Locais parceiros",
    },
    // Events
    events: {
      featured: "Eventos em Destaque",
      featuredSubtitle: "Os melhores eventos acontecendo em Leiria",
      viewAll: "Ver todos",
      free: "Gratuito",
      viewMore: "Ver mais",
      noEvents: "Nenhum evento encontrado",
      loadMore: "Carregar mais eventos",
      allEvents: "Todos os Eventos",
      allEventsSubtitle: "Descubra tudo o que está a acontecer em Leiria",
      eventsFound: "eventos encontrados",
      sortedBy: "Ordenados por",
      sortByDate: "Data",
      sortByPrice: "Preço",
      sortByPopularity: "Popularidade",
      sortByName: "Nome",
    },
    // Categories
    categories: {
      title: "Explore por Categoria",
      subtitle: "Encontre eventos que combinam com os seus interesses",
      music: "Música",
      art: "Arte",
      culture: "Cultura",
      sports: "Desporto",
      workshop: "Workshop",
      gastronomy: "Gastronomia",
      events: "eventos",
    },
    // CTA
    cta: {
      title: "Tem um evento para partilhar?",
      subtitle: "Divulgue o seu evento na LeiriAgenda e chegue a milhares de pessoas em Leiria",
      submitEvent: "Submeter Evento",
    },
    // Auth
    auth: {
      loginRequired: "Login Necessário",
      loginMessage: "Precisa de fazer login para aceder a esta funcionalidade.",
      login: "Fazer Login",
      createAccount: "Criar Conta",
      welcomeBack: "Bem-vindo de volta!",
      createNewAccount: "crie uma conta nova",
      continueWithGoogle: "Continuar com Google",
      continueWithEmail: "Ou continue com email",
      email: "Email",
      password: "Palavra-passe",
      rememberMe: "Lembrar-me",
      forgotPassword: "Esqueceu a palavra-passe?",
      noAccount: "Não tem conta?",
      registerHere: "Registe-se aqui",
      backToHome: "Voltar ao início",
    },
    // Profile
    profile: {
      title: "Perfil",
      editProfile: "Editar Perfil",
      cancel: "Cancelar",
      save: "Guardar",
      personalInfo: "Informações Pessoais",
      fullName: "Nome Completo",
      phone: "Telefone",
      location: "Localização",
      website: "Website",
      bio: "Biografia",
      bioPlaceholder: "Conte-nos um pouco sobre si...",
      notifications: "Notificações",
      emailNotifications: "Notificações por Email",
      emailNotificationsDesc: "Receber emails sobre novos eventos",
      pushNotifications: "Notificações Push",
      pushNotificationsDesc: "Receber notificações no browser",
      smsNotifications: "SMS",
      smsNotificationsDesc: "Receber SMS sobre eventos importantes",
      privacy: "Privacidade",
      publicProfile: "Perfil Público",
      publicProfileDesc: "Outros utilizadores podem ver o seu perfil",
      showEmail: "Mostrar Email",
      showEmailDesc: "Email visível no perfil público",
      showPhone: "Mostrar Telefone",
      showPhoneDesc: "Telefone visível no perfil público",
      dangerZone: "Zona Perigosa",
      deleteAccount: "Eliminar Conta",
      deleteAccountDesc: "Esta ação é irreversível. Todos os seus dados serão permanentemente eliminados.",
      eventsSubmitted: "Eventos Submetidos",
      favoriteEvents: "Eventos Favoritos",
      memberSince: "Membro desde",
    },
    // Settings
    settings: {
      title: "Configurações",
      subtitle: "Personalize a sua experiência na LeiriAgenda",
      appearance: "Aparência",
      theme: "Tema",
      themeDesc: "Escolha como quer que a aplicação apareça",
      light: "Claro",
      dark: "Escuro",
      system: "Sistema",
      language: "Idioma",
      languageDesc: "Selecione o seu idioma preferido",
      portuguese: "Português",
      english: "English",
      saveSettings: "Guardar Configurações",
      settingsUpdated: "Configuração atualizada",
      allSettingsSaved: "Todas as configurações foram guardadas!",
    },
    // Common
    common: {
      loading: "A carregar...",
      error: "Erro",
      success: "Sucesso",
      cancel: "Cancelar",
      save: "Guardar",
      delete: "Eliminar",
      edit: "Editar",
      view: "Ver",
      back: "Voltar",
      next: "Seguinte",
      previous: "Anterior",
      close: "Fechar",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      events: "Events",
      submit: "Submit",
      about: "About",
      help: "Help",
      favorites: "Favorites",
      login: "Login",
      profile: "Profile",
      settings: "Settings",
      myEvents: "My Events",
      logout: "Logout",
    },
    // Hero Section
    hero: {
      title: "Discover the best events in",
      subtitle: "Culture, music, art and much more. Find unique experiences in your historic city.",
      searchPlaceholder: "Search events, venues or categories...",
      searchButton: "Search",
      eventsThisMonth: "Events this month",
      participants: "Participants",
      partnerVenues: "Partner venues",
    },
    // Events
    events: {
      featured: "Featured Events",
      featuredSubtitle: "The best events happening in Leiria",
      viewAll: "View all",
      free: "Free",
      viewMore: "View more",
      noEvents: "No events found",
      loadMore: "Load more events",
      allEvents: "All Events",
      allEventsSubtitle: "Discover everything happening in Leiria",
      eventsFound: "events found",
      sortedBy: "Sorted by",
      sortByDate: "Date",
      sortByPrice: "Price",
      sortByPopularity: "Popularity",
      sortByName: "Name",
    },
    // Categories
    categories: {
      title: "Explore by Category",
      subtitle: "Find events that match your interests",
      music: "Music",
      art: "Art",
      culture: "Culture",
      sports: "Sports",
      workshop: "Workshop",
      gastronomy: "Gastronomy",
      events: "events",
    },
    // CTA
    cta: {
      title: "Have an event to share?",
      subtitle: "Promote your event on LeiriAgenda and reach thousands of people in Leiria",
      submitEvent: "Submit Event",
    },
    // Auth
    auth: {
      loginRequired: "Login Required",
      loginMessage: "You need to login to access this feature.",
      login: "Login",
      createAccount: "Create Account",
      welcomeBack: "Welcome back!",
      createNewAccount: "create a new account",
      continueWithGoogle: "Continue with Google",
      continueWithEmail: "Or continue with email",
      email: "Email",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      registerHere: "Register here",
      backToHome: "Back to home",
    },
    // Profile
    profile: {
      title: "Profile",
      editProfile: "Edit Profile",
      cancel: "Cancel",
      save: "Save",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      phone: "Phone",
      location: "Location",
      website: "Website",
      bio: "Biography",
      bioPlaceholder: "Tell us a bit about yourself...",
      notifications: "Notifications",
      emailNotifications: "Email Notifications",
      emailNotificationsDesc: "Receive emails about new events",
      pushNotifications: "Push Notifications",
      pushNotificationsDesc: "Receive browser notifications",
      smsNotifications: "SMS",
      smsNotificationsDesc: "Receive SMS about important events",
      privacy: "Privacy",
      publicProfile: "Public Profile",
      publicProfileDesc: "Other users can see your profile",
      showEmail: "Show Email",
      showEmailDesc: "Email visible on public profile",
      showPhone: "Show Phone",
      showPhoneDesc: "Phone visible on public profile",
      dangerZone: "Danger Zone",
      deleteAccount: "Delete Account",
      deleteAccountDesc: "This action is irreversible. All your data will be permanently deleted.",
      eventsSubmitted: "Events Submitted",
      favoriteEvents: "Favorite Events",
      memberSince: "Member since",
    },
    // Settings
    settings: {
      title: "Settings",
      subtitle: "Customize your LeiriAgenda experience",
      appearance: "Appearance",
      theme: "Theme",
      themeDesc: "Choose how you want the app to appear",
      light: "Light",
      dark: "Dark",
      system: "System",
      language: "Language",
      languageDesc: "Select your preferred language",
      portuguese: "Português",
      english: "English",
      saveSettings: "Save Settings",
      settingsUpdated: "Setting updated",
      allSettingsSaved: "All settings have been saved!",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
    },
  },
}

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".")
  let value: any = translations[locale]

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k]
    } else {
      // Fallback to Portuguese if translation not found
      value = translations["pt"]
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey]
        } else {
          return key // Return key if no translation found
        }
      }
      break
    }
  }

  return typeof value === "string" ? value : key
}
