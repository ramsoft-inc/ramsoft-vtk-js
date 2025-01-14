import { vtkObject } from 'vtk.js\Sources\interfaces';
import { VtkProxy } from 'vtk.js\Sources\macros';
import vtkSourceProxy from 'vtk.js\Sources\Proxy\Core\SourceProxy';
import vtkAbstractMapper from 'vtk.js\Sources\Rendering\Core\AbstractMapper';
import vtkActor from 'vtk.js\Sources\Rendering\Core\Actor';
import vtkVolume from 'vtk.js\Sources\Rendering\Core\Volume';

export interface vtkAbstractRepresentationProxy extends VtkProxy {
  setInput<T>(source: vtkSourceProxy<T>): void;
  getInputDataSet(): vtkObject | null;
  setColorBy(
    arrayName: string | null,
    arrayLocation: string,
    componentIndex?: number
  );
  setRescaleOnColorBy(rescale: boolean): boolean;
  getRescaleOnColorBy(): boolean;
  getInput(): VtkProxy;
  getMapper(): vtkAbstractMapper;
  getActors(): vtkActor[];
  getVolumes(): vtkVolume[];
}

export default vtkAbstractRepresentationProxy;
