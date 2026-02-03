import './styles/globals.css'

export const metadata = {
  title: 'XPEX Dashboard',
  description: 'Painel XPEX Systems — deploy Vercel-ready',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-shell">
          <header className="topbar">XPEX SYSTEMS AI</header>
          <main className="content">{children}</main>
          <footer className="footer">© XPEX</footer>
        </div>
      </body>
    </html>
  )
}
