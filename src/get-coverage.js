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

const argOutputFolder = process.argv[2];
let folderToSave = process.argv[2] ? `${argOutputFolder}` : 'badges_output';

const projectRoot = process.cwd();
const coverageResults = require(`${projectRoot}/coverage/coverage-summary.json`);
const coverage = coverageResults.total;
const badgesTypes = ['statements', 'lines', 'functions', 'branches'];

const badgesValues = {
  statements: { width: 143 },
  lines: { width: 143 },
  functions: { width: 143 },
  branches: { width: 143 },
};

const colors = { green: '#6ab04c', red: '#d63031', yellow: '#fdcb6e' };

const getColor = (value) =>
  value > 80 ? colors.green : value >= 50 ? colors.yellow : colors.red;
const generateBadge = async ({ data, label, value }) => {
  let newData = data
    .replace(/_WIDTH_/gim, badgesValues[label].width)
    .replace(/_LABEL_/gim, label.toUpperCase())
    .replace(/_VALUE_/gim, value)
    .replace(/_COLOR_/gim, getColor(value));
  fs.writeFileSync(`./${folderToSave}/${label}.svg`, newData, 'utf-8');
};

const generateChart = async ({ data, label, value }) => {
  const chartSize = 263.76;
  const exactValue = (value * chartSize) / 100;

  let newData = data
    .replace(/_LABEL_/gim, label.toUpperCase())
    .replace(/_VALUE_/gim, value)
    .replace(/_CHART_SIZE_/gim, chartSize)
    .replace(/_EXACT_VALUE_/gim, exactValue)
    .replace(/_COLOR_/gim, getColor(value));
  fs.writeFileSync(`./${folderToSave}/${label}_chart.svg`, newData, 'utf-8');
};

const getCoverage = (total, covered) => (covered / total) * 100;

const getFormattedCoverage = (type) =>
  Math.trunc(getCoverage(coverage[type].total, coverage[type].covered));

const createFolder = (folderName, parentPath) => {
  const folderPath = path.join(parentPath, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const readWriteSync = () => {
  const fileName = path.resolve(__dirname, './badge-template.svg');
  const chartFileName = path.resolve(__dirname, './donut-chart-template.svg');
  var data = fs.readFileSync(fileName, 'utf-8');
  var dataChart = fs.readFileSync(chartFileName, 'utf-8');

  createFolder(folderToSave, './');

  badgesTypes.forEach((badge) => {
    const coverageValue = getFormattedCoverage(badge);
    generateBadge({ data, label: badge, value: coverageValue });
    generateChart({ data: dataChart, label: badge, value: coverageValue });
  });

  console.log('Result: - Badges generated ✓');
  console.log('        - Charts generated ✓');
};

exports.readWriteSync = readWriteSync;
