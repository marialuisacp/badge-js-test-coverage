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
} = require('./utils');

const badgesValues = {
  statements: { width: 143 },
  lines: { width: 143 },
  functions: { width: 143 },
  branches: { width: 143 },
};
const colors = { green: '#4c1', red: '#e74c3c', yellow: '#f1c40f' };

const readWriteSync = () => {
  const argOutputFolder = process.argv[2];
  let folderToSave = process.argv[2] ? `${argOutputFolder}` : 'badges_output';
  const projectRoot = process.cwd();
  const coverageResults = require(`${projectRoot}/coverage/coverage-summary.json`);
  const coverage = coverageResults.total;
  const badgesTypes = ['statements', 'lines', 'functions', 'branches'];

  const fileName = path.resolve(__dirname, './badge-template.svg');
  var data = fs.readFileSync(fileName, 'utf-8');
  createFolder(folderToSave, './');
  badgesTypes.forEach((badge) => {
    if (coverage[badge]) {
      const coverageValue = getFormattedCoverage(badge, coverage);
      generateBadge({
        data,
        label: badge,
        value: coverageValue,
        colors,
        badgesValues,
        folderToSave,
      });
    } else {
      console.log(`Error: Invalid coverage data to ${badge}`);
    }
  });
  console.log('Result: Badges generated ✓');
};

exports.readWriteSync = readWriteSync;
