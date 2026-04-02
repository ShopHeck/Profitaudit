import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('Missing DATABASE_URL.');
  process.exit(1);
}

const seedFiles = [
  join(process.cwd(), 'db/seed/001_demo_seed.sql'),
  join(process.cwd(), 'db/seed/002_launch_seed.sql')
];

const sql = (await Promise.all(seedFiles.map((file) => readFile(file, 'utf8')))).join('\n');

const child = spawn('psql', [databaseUrl, '-v', 'ON_ERROR_STOP=1'], { stdio: ['pipe', 'inherit', 'inherit'] });
child.stdin.write(sql);
child.stdin.end();

child.on('close', (code) => {
  if (code !== 0) {
    process.exit(code ?? 1);
  }
  console.log('Seed complete.');
});
