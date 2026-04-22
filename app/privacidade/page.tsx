export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-card rounded-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Política de Privacidade</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-primary/60 mb-6">
              A LeiriAgenda compromete-se a proteger a sua privacidade. Esta política explica como recolhemos,
              utilizamos e protegemos as suas informações pessoais.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Informações que Recolhemos</h2>
            <ul className="list-disc pl-6 text-primary/60 space-y-2">
              <li>Informações de contacto (nome, email, telefone)</li>
              <li>Preferências de eventos e interesses</li>
              <li>Dados de utilização da plataforma</li>
              <li>Informações de localização (quando autorizado)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Como Utilizamos as Suas Informações</h2>
            <ul className="list-disc pl-6 text-primary/60 space-y-2">
              <li>Para personalizar a sua experiência na plataforma</li>
              <li>Para enviar notificações sobre eventos do seu interesse</li>
              <li>Para melhorar os nossos serviços</li>
              <li>Para comunicar sobre atualizações importantes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Proteção de Dados</h2>
            <p className="text-primary/60">
              Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger as suas informações
              pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Os Seus Direitos</h2>
            <p className="text-primary/60">
              Tem o direito de aceder, corrigir, eliminar ou limitar o processamento dos seus dados pessoais. Para
              exercer estes direitos, contacte-nos através do email: privacidade@leiria-agenda.pt
            </p>

            <p className="text-primary/50 text-sm mt-8">Última atualização: Dezembro 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
