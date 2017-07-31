import React from 'react';

export default function Client({ params }) {
  return (
    <pre>
      {JSON.stringify(params)}
    </pre>
  )
}
