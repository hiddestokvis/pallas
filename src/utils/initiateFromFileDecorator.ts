import * as fs from 'fs';
import * as path from 'path';

/**
 * Exports the root dir of the project
 * Based on: https://github.com/philidem/node-app-root-dir (Phillip Gates-Idem <phillip.idem@gmail.com>)
 * @author Phillip Gates-Idem <phillip.idem@gmail.com>
 * @return {string} root dir of the project
 */
export function getRoot(): string {
  const node_modules: string = `${path.sep}node_modules${path.sep}`;
  const cwd: string = process.cwd();
  let pos: number = cwd.indexOf(node_modules);
  if (pos !== -1) {
    return <string> cwd.substring(0, pos);
  } else if (<boolean> fs.existsSync(path.join(cwd, 'package.json'))) {
    return <string> cwd;
  } else {
    pos = __dirname.indexOf(node_modules);
    if (pos === -1) {
      return <string> path.normalize(path.join(__dirname, '..'));
    } else {
      return <string> __dirname.substring(0, pos);
    }
  }
}

export function getConfig(rootPath: string): string {
  const env: string = process.env.NODE_ENV;
  let config: string = path.join(rootPath, 'config.json');
  if (env) {
    if (fs.existsSync(path.join(rootPath, `config.${env.toLowerCase()}.json`))) {
      config = path.join(rootPath, `config.${env.toLowerCase()}.json`);
    }
  }
  if (fs.existsSync(config)) {
    return config;
  }
  console.log('[ERROR]: Config file could not be located');
  return '';
}

export function readConfig(configFile: string): any {
  try {
    const content = fs.readFileSync(configFile, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return error;
  }
}

export function initiateFromFile(target: Function) {
  const rootDir: string = getRoot();
  const config: string = getConfig(rootDir);
  const parsed: any = readConfig(config);
  const args: any[] = [];
  if (!(parsed instanceof Error)) {
    for (let i = 0; i < Object.keys(parsed).length; i += 1) {
      const key: string = Object.keys(parsed)[i];
      const properties: string[] = Object.getOwnPropertyNames(target.prototype);
      if (properties.indexOf(key) > -1) {
        args.push(parsed[key]);
      }
    }
  }
  return new target.prototype.constructor(...args);
}
