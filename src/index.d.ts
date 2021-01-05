declare module 'x-data-spreadsheet' {
  export interface Options {
    mode?: 'edit' | 'read';
    showToolbar?: boolean;
    showGrid?: boolean;
    showContextmenu?: boolean;
    view?: {
      height: () => number;
      width: () => number;
    };
    row?: {
      len: number;
      height: number;
    };
    col?: {
      len: number;
      width: number;
      indexWidth: number;
      minWidth: number;
    };
    style?: {
      bgcolor: string;
      align: 'left' | 'center' | 'right';
      valign: 'top' | 'middle' | 'bottom';
      textwrap: boolean;
      strike: boolean;
      underline: boolean;
      color: string;
      font: {
        name: 'Helvetica';
        size: number;
        bold: boolean;
        italic: false;
      };
    };
  }

  export type CELL_SELECTED = 'cell-selected';
  export type CELLS_SELECTED = 'cells-selected';
  export type CELL_EDITED = 'cell-edited';
  export type SHEET_SELECTED = 'sheet-selected';

  export type CellMerge = [number, number];

  export interface SpreadsheetEventHandler {
    (
      envt: CELL_SELECTED,
      callback: (cell: Cell, rowIndex: number, colIndex: number) => void
    ): void;
    (
      envt: CELLS_SELECTED,
      callback: (
        cell: Cell,
        parameters: { sri: number; sci: number; eri: number; eci: number }
      ) => void
    ): void;
    (
      evnt: CELL_EDITED,
      callback: (text: string, rowIndex: number, colIndex: number) => void
    ): void;
    (
      evnt: SHEET_SELECTED,
      callback: (name: string) => void
    ): void;
  }

  export interface ColProperties {
    width?: number;
  }

  /**
   * Validation Properties
   */
  export interface ValidationProperties {
    refs: string[];
    mode: 'cell';
    type: ValidatorType;
    required: boolean;
    operator: ValidationOperator;
    value: string | number[];
  }
  
  export type ValidatorType = 'list' | 'number' | 'date' | 'phone' | 'email';

  export type ValidationOperator = 'be' | 'nbe' | 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte';

  /**
   * Data for representing a cell
   */
  export interface CellData {
    format: <T>(newText: string, oldText: T) => T;
    text: string;
    style?: number;
    merge?: CellMerge;
  }
  /**
   * Data for representing a row
   */
  export interface RowData {
    cells: {
      [key: number]: CellData;
    }
  }

  /**
   * Data for representing a sheet
   */
  export interface SheetData {
    name?: string;
    freeze?: string;
    styles?: CellStyle[];
    merges?: string[];
    cols?: {
      len?: number;
      [key: number]: ColProperties;
    };
    rows?: {
      [key: number]: RowData
    };
    validations?: ValidationProperties[];
  }

  /**
   * Data for representing a spreadsheet
   */
  export interface SpreadsheetData {
    [index: number]: SheetData;
  }

  export interface CellStyle {
    align?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    font?: {
      bold?: boolean;
    }
    bgcolor?: string;
    textwrap?: boolean;
    color?: string;
    border?: {
      top?: string[];
      right?: string[];
      bottom?: string[];
      left?: string[];
    };
  }
  export interface Editor {}
  export interface Element {}

  export interface Row {}
  export interface Table {}
  export interface Cell {}
  export interface Sheet {}

  export default class Spreadsheet {
    constructor(container: string | HTMLElement, opts?: Options);
    on: SpreadsheetEventHandler;
    /**
     * retrieve cell
     * @param rowIndex {number} row index
     * @param colIndex {number} column index
     * @param sheetIndex {number} sheet iindex
     */
    cell(rowIndex: number, colIndex: number, sheetIndex: number): Cell;
    /**
     * retrieve cell style
     * @param rowIndex
     * @param colIndex
     * @param sheetIndex
     */
    cellStyle(
      rowIndex: number,
      colIndex: number,
      sheetIndex: number
    ): CellStyle;
    /**
     * get/set cell text
     * @param rowIndex
     * @param colIndex
     * @param text
     * @param sheetIndex
     */
    cellText(
      rowIndex: number,
      colIndex: number,
      text: string,
      sheetIndex?: number
    ): string;
    /**
     * remove current sheet
     */
    deleteSheet(): void;

    /**
     * load data
     * @param json
     */
    loadData(json: Record<string, any>): void;
    /**
     * get data
     */
    getData(): Record<string, any>;
    /**
     * bind handler to change event, including data change and user actions
     * @param callback
     */
    change(callback: (json: Record<string, any>) => void): void;
    /**
     * set locale
     * @param lang
     * @param message
     */
    locale(lang: string, message: string): void;
  }
  global {
    interface Window {
      x_spreadsheet(container: string | HTMLElement, opts?: Options): Spreadsheet;
    }
  }
}

declare module 'x-data-spreadsheet/src/core/alphabet' {

  export type TagA1 = string;

  export type TagXY = [number, number];

  export function stringAt(index: number): string;
  
  export function indexAt(str: string): number;

  export function expr2xy(src: TagA1): TagXY;

  export function xy2expr(x: number, y: number): TagA1;

  export function expr2expr(src: TagA1, xn: number, yn: number, condition: (x: number, y: number) => boolean): TagA1;
}


