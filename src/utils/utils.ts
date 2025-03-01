import * as path from 'path';
import * as fs from 'fs';

const dataFilePath = path.join(__dirname, '../../src/db.json');

export function readDB(): any {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(rawData);
}

export function writeToDB(data: any): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}
