import HtmlDataAccessHelper from 'vtk.js\Sources\IO\Core\DataAccessHelper\HtmlDataAccessHelper';
import HttpDataAccessHelper from 'vtk.js\Sources\IO\Core\DataAccessHelper\HttpDataAccessHelper';
import JSZipDataAccessHelper from 'vtk.js\Sources\IO\Core\DataAccessHelper\JSZipDataAccessHelper';
import LiteHttpDataAccessHelper from 'vtk.js\Sources\IO\Core\DataAccessHelper\LiteHttpDataAccessHelper';

export function has(type: string): boolean;
export function get(type?: string, options?: object): HtmlDataAccessHelper | HttpDataAccessHelper | JSZipDataAccessHelper | LiteHttpDataAccessHelper
export function registerType(type: string, fn: any): void;

export interface DataAccessHelper {
	/**
	 * 
	 * @param {String} type 
	 */
	has(type: string): boolean;

	/**
	 * 
	 * @param {String} type 
	 * @param options 
	 */
	get(type?: string, options?: object): HtmlDataAccessHelper | HttpDataAccessHelper | JSZipDataAccessHelper | LiteHttpDataAccessHelper

	/**
	 * 
	 * @param {String} type 
	 * @param fn 
	 */
	registerType(type: string, fn: any): void;
}

export declare const DataAccessHelper: {
	has: typeof has,
	get: typeof get,
	registerType: typeof registerType,
}

export default DataAccessHelper;
