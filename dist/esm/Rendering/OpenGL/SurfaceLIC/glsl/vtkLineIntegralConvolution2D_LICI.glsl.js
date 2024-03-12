var vtkLineIntegralConvolution2D_LICI = "//VTK::System::Dec\r\n\r\n//=========================================================================\r\n//\r\n//  Program:   Visualization Toolkit\r\n//  Module:    vtkLineIntegralConvolution2D_fs1.glsl\r\n//\r\n//  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\r\n//  All rights reserved.\r\n//  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\r\n//\r\n//     This software is distributed WITHOUT ANY WARRANTY; without even\r\n//     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\r\n//     PURPOSE.  See the above copyright notice for more information.\r\n//\r\n//=========================================================================\r\n\r\n// the output of this shader\r\nlayout(location = 0) out vec4 LICOutput;\r\nlayout(location = 1) out vec4 SeedOutput;\r\n\r\nuniform sampler2D  texVectors;\r\nuniform sampler2D  texNoise;\r\nuniform sampler2D  texLIC;\r\nuniform sampler2D  texSeedPts;\r\n\r\nuniform int   uPassNo;          // in pass 1 hpf of pass 0 is convolved.\r\nuniform float uStepSize;        // step size in parametric space\r\n\r\nuniform vec2  uNoiseBoundsPt1;  // tc of upper right pt of noise texture\r\n\r\nin vec2 tcoordVC;\r\n\r\n//VTK::LICVectorLookup::Impl\r\n\r\n// We need to do this manually since CLAMP_TO_BORDER and and borderColor\r\n// are very poorly supported in webgl\r\nvec2 clampToBorder(vec2 uv){\r\n  if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0)\r\n  {\r\n    return vec2(0.0, 0.0);\r\n  }\r\n  return getVector(uv);\r\n}\r\n\r\n// convert from vector coordinate space to noise coordinate space.\r\n// the noise texture is tiled across the whole domain\r\nvec2 VectorTCToNoiseTC(vec2 vectc)\r\n{\r\n  return vectc/uNoiseBoundsPt1;\r\n}\r\n\r\n// get the texture coordidnate to lookup noise value.\r\n// in pass 1 repeatedly tile the noise texture across\r\n// the computational domain.\r\nvec2 getNoiseTC(vec2 tc)\r\n{\r\n  if (uPassNo == 0)\r\n    {\r\n    return VectorTCToNoiseTC(tc);\r\n    }\r\n  else\r\n    {\r\n    return tc;\r\n    }\r\n}\r\n\r\n// look up noise value at the given location. The location\r\n// is supplied in vector texture coordinates, hence the need\r\n// to convert to either noise or lic texture coordinates in\r\n// pass 1 and 2 respectively.\r\nfloat getNoise(vec2 vectc)\r\n{\r\n  return texture2D(texNoise, getNoiseTC(vectc)).r;\r\n}\r\n\r\n// fourth-order Runge-Kutta streamline integration\r\n// no bounds checks are made, therefore it's essential\r\n// to have the entire texture initialized to 0\r\n// and set clamp to border and have border color 0\r\n// an integer is set if the step was taken, keeping\r\n// an accurate step count is necessary to prevent\r\n// boundary artifacts. Don't count the step if\r\n// all vector lookups are identically 0. This is\r\n// a proxy for \"stepped outside valid domain\"\r\nvec2 rk4(vec2 pt0, float dt, out bool count)\r\n{\r\n  count=true;\r\n  float dtHalf = dt * 0.5;\r\n  vec2 pt1;\r\n\r\n  vec2 v0 = clampToBorder(pt0);\r\n  pt1 = pt0 + v0 * dtHalf;\r\n\r\n  vec2 v1 = clampToBorder(pt1);\r\n  pt1 = pt0 + v1 * dtHalf;\r\n\r\n  vec2 v2 = clampToBorder(pt1);\r\n  pt1 = pt0 + v2 * dt;\r\n\r\n  vec2 v3 = clampToBorder(pt1);\r\n  vec2 vSum = v0 + v1 + v1 + v2 + v2 + v3;\r\n\r\n  if (vSum == vec2(0.0, 0.0))\r\n    {\r\n      count = false;\r\n    }\r\n\r\n  pt1 = pt0 + (vSum) * (dt * (1.0/6.0));\r\n\r\n return pt1;\r\n}\r\n\r\nvoid main(void)\r\n{\r\n  vec2 lictc = tcoordVC.st;\r\n  vec4 lic = texture2D(texLIC, lictc);\r\n  vec2 pt0 = texture2D(texSeedPts, lictc).st;\r\n\r\n  bool count;\r\n  vec2 pt1 = rk4(pt0, uStepSize, count);\r\n\r\n  if (count)\r\n    {\r\n    // accumulate lic step\r\n    // (lic, mask, 0, step count)\r\n    float noise = getNoise(pt1);\r\n    LICOutput = vec4(lic.r + noise, lic.g, 0.0, lic.a + 1.0);\r\n    SeedOutput = vec4(pt1, 0.0, 1.0);\r\n    }\r\n  else\r\n    {\r\n    // keep existing values\r\n    LICOutput = lic;\r\n    SeedOutput = vec4(pt0, 0.0, 1.0);\r\n    }\r\n}\r\n";

export { vtkLineIntegralConvolution2D_LICI as v };
