import {
   FullResult,
   Reporter,
   TestCase,
   TestResult,
} from '@playwright/test/reporter';
import { execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

interface ResultParams {
   id: string;
   test_name: string;
   time_start: number;
   time_end: number;
   time_taken: number;
   pass: string;
   test_suite_id: string | null;
   file_path: string | null;
}

class MetricsReporter implements Reporter {
   branch: string;
   commit: string;
   test_suite_id: string;
   results: Array<Object>;
   timeStart!: number;
   timeEnd!: number;

   constructor() {
      this.branch =
         process.env.BUILD_BRANCH ||
         execSync('git rev-parse --abbrev-ref HEAD', {
            encoding: 'utf-8',
         }).trim();
      this.commit =
         process.env.BUILD_COMMIT ||
         execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
      this.test_suite_id = uuidv4();

      this.results = [];
   }

   onBegin(): void {
      this.timeStart = Date.now();
   }

   getTestName(test: TestCase) {
      return test.titlePath().slice(3).join(' -> ');
   }

   getStatus(status: string): number {
      if (status === 'passed') {
         return 1;
      } else if (status === 'interrupted') {
         return -1;
      } else {
         return 0;
      }
   }

   addResult({
      id,
      test_name,
      time_start,
      time_end,
      time_taken,
      pass,
      test_suite_id,
      file_path,
   }: ResultParams) {
      this.results.push({
         id: id,
         test_name: test_name,
         time_start: time_start / 1000,
         time_end: time_end / 1000,
         time_taken: time_taken / 1000,
         pass: this.getStatus(pass),
         test_suite_id: test_suite_id,
         file_path: file_path,
         commit: this.commit,
         branch: this.branch,
      });
   }

   onTestEnd(test: TestCase, result: TestResult) {
      if (result.status !== 'skipped') {
         this.addResult({
            id: uuidv4(),
            test_name: this.getTestName(test),
            time_start: result.startTime.valueOf(),
            time_end: result.startTime.valueOf() + result.duration,
            time_taken: result.duration,
            pass: result.status,
            test_suite_id: this.test_suite_id,
            file_path: test.location.file,
         });
      }
   }

   // Add the total time for the test suite took to run
   addFullResult(fullResult: FullResult) {
      this.addResult({
         id: this.test_suite_id,
         test_name: 'ci-playwright',
         time_start: this.timeStart,
         time_end: this.timeEnd,
         time_taken: this.timeEnd - this.timeStart,
         pass: fullResult.status,
         test_suite_id: null,
         file_path: process.env.BUILD_LOG_URL || null,
      });
   }

   onEnd(fullResult: FullResult) {
      this.timeEnd = Date.now();
      this.addFullResult(fullResult);
   }
}

export default MetricsReporter;
