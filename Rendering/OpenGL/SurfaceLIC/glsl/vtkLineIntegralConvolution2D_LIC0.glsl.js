var vtkLineIntegralConvolution2D_LIC0 = "//VTK::System::Dec\r\n\r\n//=========================================================================\r\n//\r\n//  Program:   Visualization Toolkit\r\n//  Module:    vtkLineIntegralConvolution2D_LIC0.glsl\r\n//\r\n//  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\r\n//  All rights reserved.\r\n//  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\r\n//\r\n//     This software is distributed WITHOUT ANY WARRANTY; without even\r\n//     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\r\n//     PURPOSE.  See the above copyright notice for more information.\r\n//\r\n//=========================================================================\r\n\r\n/**\r\nThis shader initializes the convolution for the LIC computation.\r\n*/\r\n\r\n// the output of this shader\r\nlayout(location = 0) out vec4 LICOutput;\r\nlayout(location = 1) out vec4 SeedOutput;\r\n\r\nuniform sampler2D texMaskVectors;\r\nuniform sampler2D texNoise;\r\nuniform sampler2D texLIC;\r\n\r\nuniform int   uStepNo;         // in step 0 initialize lic and seeds, else just seeds\r\nuniform int   uPassNo;         // in pass 1 hpf of pass 0 is convolved.\r\nuniform float uMaskThreshold;  // if |V| < uMaskThreshold render transparent\r\nuniform vec2  uNoiseBoundsPt1; // tc of upper right pt of noise texture\r\n\r\nin vec2 tcoordVC;\r\n\r\n// convert from vector coordinate space to noise coordinate space.\r\n// the noise texture is tiled across the *whole* domain\r\nvec2 VectorTCToNoiseTC(vec2 vectc)\r\n{\r\n  return vectc/uNoiseBoundsPt1;\r\n}\r\n\r\n// get the texture coordidnate to lookup noise value. this\r\n// depends on the pass number.\r\nvec2 getNoiseTC(vec2 vectc)\r\n{\r\n  // in pass 1 : convert from vector tc to noise tc\r\n  // in pass 2 : use vector tc\r\n  if (uPassNo == 0)\r\n    {\r\n    return VectorTCToNoiseTC(vectc);\r\n    }\r\n  else\r\n    {\r\n    return vectc;\r\n    }\r\n}\r\n\r\n// look up noise value at the given location. The location\r\n// is supplied in vector texture coordinates, hence the\r\n// need to convert to noise texture coordinates.\r\nfloat getNoise(vec2 vectc)\r\n{\r\n  return texture2D(texNoise, getNoiseTC(vectc)).r;\r\n}\r\n\r\nvoid main(void)\r\n{\r\n  vec2 vectc = tcoordVC.st;\r\n\r\n  // lic => (convolution, mask, 0, step count)\r\n  if (uStepNo == 0)\r\n    {\r\n    float maskCriteria = length(texture2D(texMaskVectors, vectc).xyz);\r\n    float maskFlag;\r\n    if (maskCriteria <= uMaskThreshold)\r\n      {\r\n      maskFlag = 1.0;\r\n      }\r\n    else\r\n      {\r\n      maskFlag = 0.0;\r\n      }\r\n    float noise = getNoise(vectc);\r\n    LICOutput = vec4(noise, maskFlag, 0.0, 1.0);\r\n    }\r\n  else\r\n    {\r\n    LICOutput = texture2D(texLIC, vectc);\r\n    }\r\n\r\n  // initial seed\r\n  SeedOutput = vec4(vectc, 0.0, 1.0);\r\n}\r\n";

export { vtkLineIntegralConvolution2D_LIC0 as v };
