import pluginId from '../pluginId';

export function appBasePath() {
   return `/plugins/${pluginId}`;
}

export function homePath() {
   return `${appBasePath()}/`;
}

export function dataTransferPath() {
   return `${appBasePath()}/data-transfer`;
}

export function bulkOperationsPath() {
   return `${appBasePath()}/bulk-operations`;
}

export function joinPaths(...paths: string[]): string {
   const cleanedPaths = paths.map((path) => path.replace(/^\/|\/$/g, ''));

   return cleanedPaths.join('/');
}

export function convertToRelativePath(path: string) {
   return path.replace(/^\//gm, '');
}
