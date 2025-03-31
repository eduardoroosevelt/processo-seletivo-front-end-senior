export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Polícia Judiciária Civil de Mato Grosso. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://geia.pjc.mt.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GEIA
          </a>
          <a
            href="https://www.pjc.mt.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            PJC-MT
          </a>
        </div>
      </div>
    </footer>
  )
}

