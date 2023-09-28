import { TestInfo } from '@playwright/test';
import path from 'node:path';

export function traceOutputDirTemplate(testInfo: TestInfo) {
   // The path to where all the trace files will be outputted as defined
   // in the Playwright config
   const globalOutputDir = testInfo.project.outputDir;

   // titlePath houses a split up path to the test case which includes:
   // - The test file name and relative path from the test directory (e.g. 'product/add_to_cart.spec.ts')
   // - The test suite names (e.g. test.describe('<test suite name>', ...))
   // - The test case name (e.g. test('<test case name>', ...))
   const testCasePath = formatName(
      testInfo.titlePath.join('/').replace(/\.spec\.ts/, '')
   );

   // The 'device' the test was ran on
   const projectName = formatName(testInfo.project.name);

   return path.join(globalOutputDir, testCasePath, projectName);
}

function formatName(name: string) {
   return name.replace(/[^a-zA-Z0-9//]+/g, '-').toLowerCase();
}
