const fs = require('fs');
const path = require('path');
const { readWriteSync } = require('./get-coverage');
const {
  createFolder,
  getFormattedCoverage,
  generateBadge,
} = require('./utils');

jest.mock('fs');
jest.mock('path');
jest.mock('./utils');

describe('Coverage Badge Generator', () => {
  const mockCoverage = {
    statements: { total: 100, covered: 80 },
    lines: { total: 100, covered: 60 },
    functions: { total: 100, covered: 90 },
    branches: { total: 100, covered: 70 },
  };

  const mockBadgesTypes = ['statements', 'lines', 'functions', 'branches'];
  const mockBadgesValues = {
    statements: { width: 143 },
    lines: { width: 143 },
    functions: { width: 143 },
    branches: { width: 143 },
  };
  const mockColors = { green: '#4c1', red: '#e74c3c', yellow: '#f1c40f' };

  const consoleLog = console.log;
  beforeEach(() => {
    jest.clearAllMocks();
    fs.readFileSync.mockClear();
    fs.writeFileSync.mockClear();
    createFolder.mockClear();
    getFormattedCoverage.mockClear();
    generateBadge.mockClear();
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = consoleLog;
  });

  it('should generate badges for each coverage type', () => {
    fs.readFileSync.mockReturnValue('_WIDTH_ _LABEL_ _VALUE_ _COLOR_');

    getFormattedCoverage.mockImplementation((type) => {
      const coverage = mockCoverage[type];
      return Math.trunc((coverage.covered / coverage.total) * 100);
    });

    generateBadge.mockResolvedValue();

    process.cwd = jest.fn().mockReturnValue('../');
    jest.mock('../coverage/coverage-summary.json', () => ({
      total: mockCoverage,
    }));

    readWriteSync();
    expect(createFolder).toHaveBeenCalledWith('badges_output', './');

    mockBadgesTypes.forEach((badge) => {
      const coverageValue = Math.trunc(
        (mockCoverage[badge].covered / mockCoverage[badge].total) * 100
      );
      expect(generateBadge).toHaveBeenCalledWith({
        data: '_WIDTH_ _LABEL_ _VALUE_ _COLOR_',
        label: badge,
        value: coverageValue,
        colors: mockColors,
        badgesValues: mockBadgesValues,
        folderToSave: 'badges_output',
      });
    });

    expect(console.log).toHaveBeenCalledTimes(2);
  });

  it('should use default folder if no output folder is provided', () => {
    process.argv = ['node', 'script.js'];
    readWriteSync();

    expect(createFolder).toHaveBeenCalledWith('badges_output', './');
  });

  it('should use custom folder if output folder is provided', () => {
    const customFolder = 'custom_folder';
    process.argv = ['node', 'script.js', customFolder];
    readWriteSync();

    expect(createFolder).toHaveBeenCalledWith(customFolder, './');
  });
});
