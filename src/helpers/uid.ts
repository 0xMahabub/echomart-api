import cuid from 'cuid';

export function generateUid(): string {
  return cuid();
}
