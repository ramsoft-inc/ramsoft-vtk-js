import vtkViewProxy from 'vtk.js\Sources\Proxy\Core\ViewProxy';

export interface vtkView2DProxy extends vtkViewProxy {
  getAxis(): number;
}

export default vtkView2DProxy;
