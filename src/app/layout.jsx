import '@public/styles/global.css'

export const metadata = {
  title: 'Silicore',
  description: 'Your crypto web app',
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name='description' content={metadata.description} />
        <meta name='keywords' content="crypto, exchanges, bitcoin, comparition, rates, trading" />
        <meta name='robots' content="index, follow" />
        <link rel='canonical' href="https://www.silicore.io" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Silicore",
              "url": "https://www
          `}
        </script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
