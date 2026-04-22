export default function TermsPage() {
  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-card rounded-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Termos e Condições</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-primary/60 mb-6">
              Bem-vindo à LeiriAgenda. Ao utilizar a nossa plataforma, concorda com estes termos e condições.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Utilização da Plataforma</h2>
            <ul className="list-disc pl-6 text-primary/60 space-y-2">
              <li>A plataforma destina-se à divulgação de eventos em Leiria</li>
              <li>Os utilizadores devem fornecer informações precisas e atualizadas</li>
              <li>É proibido publicar conteúdo ofensivo, ilegal ou inadequado</li>
              <li>Reservamo-nos o direito de remover eventos que violem estas condições</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Submissão de Eventos</h2>
            <ul className="list-disc pl-6 text-primary/60 space-y-2">
              <li>Os organizadores são responsáveis pela veracidade das informações</li>
              <li>A LeiriAgenda não se responsabiliza por eventos cancelados ou alterados</li>
              <li>Reservamo-nos o direito de moderar e aprovar eventos submetidos</li>
              <li>Os direitos de propriedade intelectual dos conteúdos pertencem aos respetivos autores</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Limitação de Responsabilidade</h2>
            <p className="text-primary/60">
              A LeiriAgenda atua como plataforma de divulgação. Não nos responsabilizamos por:
            </p>
            <ul className="list-disc pl-6 text-primary/60 space-y-2 mt-4">
              <li>Qualidade, segurança ou legalidade dos eventos divulgados</li>
              <li>Transações entre utilizadores e organizadores</li>
              <li>Danos resultantes da utilização da plataforma</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contacto</h2>
            <p className="text-primary/60">Para questões sobre estes termos, contacte-nos: termos@leiria-agenda.pt</p>

            <p className="text-primary/50 text-sm mt-8">Última atualização: Dezembro 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
