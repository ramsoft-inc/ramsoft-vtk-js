var vtkImageResliceMapperFS = "//VTK::System::Dec\r\n\r\n/*=========================================================================\r\n\r\n  Program:   Visualization Toolkit\r\n  Module:    vtkImageResliceMapperFS.glsl\r\n\r\n  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\r\n  All rights reserved.\r\n  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\r\n\r\n     This software is distributed WITHOUT ANY WARRANTY; without even\r\n     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\r\n     PURPOSE.  See the above copyright notice for more information.\r\n\r\n=========================================================================*/\r\n// Template for the gpu image mapper fragment shader\r\n\r\n// VC position of this fragment\r\n//VTK::PositionVC::Dec\r\n\r\n// Texture coordinates\r\n//VTK::TCoord::Dec\r\n\r\n// picking support\r\n//VTK::Picking::Dec\r\n\r\n// handle coincident offsets\r\n//VTK::Coincident::Dec\r\n\r\n//VTK::ZBuffer::Dec\r\n\r\n// the output of this shader\r\n//VTK::Output::Dec\r\n\r\nvoid main()\r\n{\r\n  // VC position of this fragment. This should not branch/return/discard.\r\n  //VTK::PositionVC::Impl\r\n\r\n  // Place any calls that require uniform flow (e.g. dFdx) here.\r\n  //VTK::UniformFlow::Impl\r\n\r\n  // Set gl_FragDepth here (gl_FragCoord.z by default)\r\n  //VTK::Depth::Impl\r\n\r\n  // Early depth peeling abort:\r\n  //VTK::DepthPeeling::PreColor\r\n\r\n  //VTK::TCoord::Impl\r\n\r\n  if (gl_FragData[0].a <= 0.0)\r\n    {\r\n    discard;\r\n    }\r\n\r\n  //VTK::DepthPeeling::Impl\r\n\r\n  //VTK::Picking::Impl\r\n\r\n  // handle coincident offsets\r\n  //VTK::Coincident::Impl\r\n\r\n  //VTK::ZBuffer::Impl\r\n\r\n  //VTK::RenderPassFragmentShader::Impl\r\n}\r\n";

export { vtkImageResliceMapperFS as v };
