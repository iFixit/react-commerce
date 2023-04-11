import { TestInfo } from '@playwright/test';
import path from 'node:path';

export function traceOutputDirTemplate(testInfo: TestInfo) {
   // The path to where all the trace files will be outputted as defined
   // in the Playwright config
   const globalOutputDir = testInfo.project.outputDir;

   // titlePath houses the path to the test file relevant to the test directory
   // e.g. 'product/add_to_cart.spec.ts' -> 'product/add_to_cart'
   const testFile = testInfo.titlePath[0].replace(/\.spec\.ts$/, '');

   const testName = formatTestNameForDirectory(testInfo.title);

   // The 'device' the test was ran on
   const projectName = testInfo.project.name.replace(/\s/g, '-').toLowerCase();

   return path.join(globalOutputDir, testFile, testName, projectName);
}

function formatTestNameForDirectory(testName: string) {
   const formattedName = testName.replace(/[^a-zA-Z0-9]+/g, '-');
   const directoryName = formattedName.toLowerCase();

   return directoryName;
}
