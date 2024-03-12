var vtkPolyDataVS = "//VTK::System::Dec\r\n\r\n/*=========================================================================\r\n\r\n  Program:   Visualization Toolkit\r\n  Module:    vtkPolyDataVS.glsl\r\n\r\n  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\r\n  All rights reserved.\r\n  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\r\n\r\n     This software is distributed WITHOUT ANY WARRANTY; without even\r\n     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\r\n     PURPOSE.  See the above copyright notice for more information.\r\n\r\n=========================================================================*/\r\n\r\nattribute vec4 vertexMC;\r\n\r\n// frag position in VC\r\n//VTK::PositionVC::Dec\r\n\r\n// optional normal declaration\r\n//VTK::Normal::Dec\r\n\r\n// extra lighting parameters\r\n//VTK::Light::Dec\r\n\r\n// Texture coordinates\r\n//VTK::TCoord::Dec\r\n\r\n// material property values\r\n//VTK::Color::Dec\r\n\r\n// clipping plane vars\r\n//VTK::Clip::Dec\r\n\r\n// camera and actor matrix values\r\n//VTK::Camera::Dec\r\n\r\n// Apple Bug\r\n//VTK::PrimID::Dec\r\n\r\n// picking support\r\n//VTK::Picking::Dec\r\n\r\nvoid main()\r\n{\r\n  //VTK::Color::Impl\r\n\r\n  //VTK::Normal::Impl\r\n\r\n  //VTK::TCoord::Impl\r\n\r\n  //VTK::Clip::Impl\r\n\r\n  //VTK::PrimID::Impl\r\n\r\n  //VTK::PositionVC::Impl\r\n\r\n  //VTK::Light::Impl\r\n\r\n  //VTK::Picking::Impl\r\n}\r\n";

export { vtkPolyDataVS as v };
