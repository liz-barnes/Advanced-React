import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    // will go through each component that needs to be rendered to page and see if there are any styled components, will rip out CSS that it needs and render out to server
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    // gathering CSS
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
