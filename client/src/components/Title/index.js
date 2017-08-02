import React from 'react';
import { Header } from 'semantic-ui-react';

export default function Title({ children }) {
  if (typeof document !== "undefined") {
    // NOTE(rstankov): Might break in some browsers
    const title = `${ children }`.replace(/\[object Object\]/g, '').replace(/,/g, '').replace(/ {2}/g, '');

    document.title = `${ title } - TimeBox`;
  }

  return (
    <Header as="h1">
      {children}
    </Header>
  );
}
