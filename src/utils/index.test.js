const fs = require('fs');
const path = require('path');
const utils = require('./');

jest.mock('fs');
jest.mock('path');

describe('Utils Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getColor', () => {
    it('should return green for values greater than 80', () => {
      const colors = { green: 'green', yellow: 'yellow', red: 'red' };
      expect(utils.getColor(85, colors)).toBe('green');
    });

    it('should return yellow for values between 50 and 80', () => {
      const colors = { green: 'green', yellow: 'yellow', red: 'red' };
      expect(utils.getColor(60, colors)).toBe('yellow');
    });

    it('should return red for values less than 50', () => {
      const colors = { green: 'green', yellow: 'yellow', red: 'red' };
      expect(utils.getColor(40, colors)).toBe('red');
    });
  });

  describe('getCoverage', () => {
    it('should return correct coverage percentage', () => {
      expect(utils.getCoverage(100, 80)).toBe(80);
      expect(utils.getCoverage(200, 100)).toBe(50);
    });
  });

  describe('getFormattedCoverage', () => {
    it('should return formatted coverage', () => {
      const coverage = {
        type1: { total: 100, covered: 80 },
        type2: { total: 200, covered: 150 },
      };

      expect(utils.getFormattedCoverage('type1', coverage)).toBe(80);
      expect(utils.getFormattedCoverage('type2', coverage)).toBe(75);
    });
  });

  describe('createFolder', () => {
    it('should create folder if it does not exist', () => {
      const folderName = 'newFolder';
      const parentPath = '/parent';
      const folderPath = path.join(parentPath, folderName);

      fs.existsSync.mockReturnValue(false);
      fs.mkdirSync.mockClear();

      utils.createFolder(folderName, parentPath);

      expect(fs.existsSync).toHaveBeenCalledWith(folderPath);
      expect(fs.mkdirSync).toHaveBeenCalledWith(folderPath, {
        recursive: true,
      });
    });

    it('should not create folder if it already exists', () => {
      const folderName = 'existingFolder';
      const parentPath = '/parent';
      const folderPath = path.join(parentPath, folderName);

      fs.existsSync.mockReturnValue(true);

      utils.createFolder(folderName, parentPath);

      expect(fs.existsSync).toHaveBeenCalledWith(folderPath);
      expect(fs.mkdirSync).not.toHaveBeenCalled();
    });
  });

  describe('generateBadge', () => {
    it('should generate badge and write to file', async () => {
      const mockWriteFileSync = jest.fn();
      fs.writeFileSync = mockWriteFileSync;

      const data = '_WIDTH_ _LABEL_ _VALUE_ _COLOR_';
      const label = 'coverage';
      const value = 85;
      const colors = { green: 'green', yellow: 'yellow', red: 'red' };
      const badgesValues = { coverage: { width: '100' } };
      const folderToSave = 'badges';

      await utils.generateBadge({
        data,
        label,
        value,
        colors,
        badgesValues,
        folderToSave,
      });

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        './badges/coverage.svg',
        '_WIDTH_ _LABEL_ _VALUE_ _COLOR_'
          .replace('_WIDTH_', '100')
          .replace('_LABEL_', 'COVERAGE')
          .replace('_VALUE_', '85')
          .replace('_COLOR_', 'green'),
        'utf-8'
      );
    });
  });
});
