import { vtkAlgorithm } from 'vtk.js\Sources\interfaces';
import { VtkProxy } from 'vtk.js\Sources\macros';

export interface vtkSourceProxy<T> extends VtkProxy {
  setInputProxy(source: vtkSourceProxy<T>): void;
  setInputData(dataset: T, type?: string): void;
  setInputAlgorithm(
    algo: vtkAlgorithm,
    type: string,
    autoUpdate: boolean
  ): void;
  update(): void;

  getName(): string;
  setName(name: string): boolean;
  getType(): string;
  getDataset(): T | null;
  getAlgo(): vtkAlgorithm | null;
  getInputProxy(): vtkSourceProxy<T> | null;
}

export default vtkSourceProxy;
