import { DepthOfField, EffectComposer, SSR } from "@react-three/postprocessing";
export default function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <SSR
        intensity={0.45}
        distance={10}
        thickness={10}
        ior={0.45}
        fade={10}
        exponent={1}
        maxRoughness={1}
        maxDepthDifference={10}
        blend={0.95}
        correction={1}
        correctionRadius={1}
        blur={0}
        blurKernel={1}
        blurSharpness={10}
        jitter={0.75}
        jitterRoughness={0.2}
        steps={40}
        refineSteps={5}
        useNormalMap={true}
        useRoughnessMap={true}
        missedRays={true}
        resolutionScale={1}
      />
      <DepthOfField focusDistance={0.01} focalLength={0.2} bokehScale={3} />
    </EffectComposer>
  );
}
