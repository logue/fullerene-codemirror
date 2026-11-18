/** Sample code for each language shown in the playground. */
export const samples = {
  javascript: `// Fibonacci with memoization
import { readFile } from 'node:fs/promises';

const cache = new Map();

/**
 * Returns the n-th Fibonacci number.
 * @param {number} n
 */
export function fibonacci(n) {
  if (n < 2) return n;
  if (cache.has(n)) return cache.get(n);
  const value = fibonacci(n - 1) + fibonacci(n - 2);
  cache.set(n, value);
  return value;
}

class Greeter {
  #name;
  constructor(name = 'world') {
    this.#name = name;
  }
  greet() {
    return \`Hello, \${this.#name}!\`;
  }
}

const pattern = /^[a-z]+\\d*$/gi;
console.log(new Greeter().greet(), fibonacci(30), pattern.test('abc123'), null, true);
`,
  typescript: `interface User {
  id: number;
  name: string;
  email?: string;
}

type Role = 'admin' | 'editor' | 'viewer';

enum Status {
  Active = 1,
  Inactive = 0
}

export abstract class Repository<T extends { id: number }> {
  protected readonly items = new Map<number, T>();

  public find(id: number): T | undefined {
    return this.items.get(id);
  }

  abstract validate(item: T): boolean;
}

export const hasRole = (user: User & { role: Role }, role: Role): boolean =>
  user.role === role;

const status: Status = Status.Active;
`,
  html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Sample page</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Main content -->
    <main id="app" class="container">
      <h1>Hello &amp; welcome</h1>
      <a href="https://carbondesignsystem.com" target="_blank">Carbon</a>
      <button type="button" disabled>Click me</button>
    </main>
    <script type="module">
      document.querySelector('#app').dataset.ready = 'true';
    </script>
  </body>
</html>
`,
  css: `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono');

:root {
  --spacing: 1rem;
  --brand: #0f62fe;
}

/* Card component */
.card > .card__title:hover,
#main::before {
  margin: calc(var(--spacing) * 2) auto;
  color: rgb(15 98 254 / 80%);
  font: 600 1.25rem/1.4 'IBM Plex Sans', sans-serif;
  transition: color 150ms ease-in-out !important;
}

@media (prefers-color-scheme: dark) {
  .card {
    background-color: #262626;
  }
}
`,
  json: `{
  "name": "@buckminsterfullerene/codemirror-theme",
  "version": "1.0.0",
  "private": false,
  "keywords": ["codemirror", "theme", "carbon"],
  "config": {
    "dark": true,
    "tabSize": 2,
    "fallback": null
  }
}
`,
  markdown: `# Fullerene CodeMirror Theme

A **CodeMirror 6** theme based on *Carbon Design System* tokens.

## Features

- Light and dark mode
- Uses \`--cds-syntax-*\` tokens
- ~~No configuration~~ Minimal configuration

> Colors follow your Carbon theme automatically.

\`\`\`ts
import { carbonDark } from '@buckminsterfullerene/codemirror-theme';
\`\`\`

[Carbon Design System](https://carbondesignsystem.com)

---
`,
  python: `from dataclasses import dataclass
import re


@dataclass
class Point:
    """A point in 2D space."""

    x: float = 0.0
    y: float = 0.0

    def distance(self, other: "Point") -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5


def parse(text: str) -> list[int]:
    # Extract all integers
    return [int(n) for n in re.findall(r"-?\\d+", text) if n]


if __name__ == "__main__":
    print(f"Distance: {Point(3, 4).distance(Point()):.2f}", None, True)
`
} as const;
