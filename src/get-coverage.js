#!/usr/bin/env node

/*
 *
 *      Get coverage
 *      --------------------
 *      Code to generate badges to README.md
 *
 *      by: Maria Luísa
 *          https://malu.dev
 *          https://github.com/@marialuiscp
 */

const fs = require('fs');
const path = require('path');
const {
  createFolder,
  getFormattedCoverage,
  generateBadge,
  generateChart,
} = require('./utils');

const badgesValues = {
  statements: { width: 143 },
  lines: { width: 143 },
  functions: { width: 143 },
  branches: { width: 143 },
};
const colors = { green: '#4c1', red: '#e74c3c', yellow: '#f1c40f' };

const getMode = (mode) => {
  if (mode === 'mode:chart') return 'chart';
  if (mode === 'mode:badge') return 'badge';
  return 'all';
};

const readWriteSync = () => {
  const argOutputFolder = process.argv[2];
  let folderToSave = process.argv[2] ? `${argOutputFolder}` : 'badges_output';
  let mode = getMode(process.argv[3]);
  const projectRoot = process.cwd();
  const coverageResults = require(`${projectRoot}/coverage/coverage-summary.json`);
  const coverage = coverageResults.total;
  const badgesTypes = ['statements', 'lines', 'functions', 'branches'];

  const fileName = path.resolve(__dirname, './badge-template.svg');
  const chartFileName = path.resolve(__dirname, './donut-chart-template.svg');
  var data = fs.readFileSync(fileName, 'utf-8');
  var dataChart = fs.readFileSync(chartFileName, 'utf-8');

  createFolder(folderToSave, './');

  badgesTypes.forEach((badge) => {
    if (coverage[badge]) {
      const coverageValue = getFormattedCoverage(badge, coverage);
      (mode === 'badge') | (mode === 'all') &&
        generateBadge({
          data,
          label: badge,
          value: coverageValue,
          colors,
          badgesValues,
          folderToSave,
        });
      (mode === 'chart') | (mode === 'all') &&
        generateChart({
          data: dataChart,
          label: badge,
          value: coverageValue,
          colors,
          folderToSave,
        });
    } else {
      console.log(`Error: Invalid coverage data to ${badge}`);
    }
  });

  console.log('Result: - Badges generated ✓');
  console.log('        - Charts generated ✓');
};

exports.readWriteSync = readWriteSync;
