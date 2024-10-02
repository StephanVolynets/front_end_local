// root

import '@public/styles/global.css'

export const metadata = {
  title: 'Silicore',
  description: 'Your cripto web app',
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='description' content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
