'use client';

import { useState } from 'react';
import StepWizard from '@/components/mint/StepWizard';
import ManifestEditor from '@/components/mint/ManifestEditor';

const steps = ['Bundle', 'Manifest', 'Fixed-Point', 'Conference', 'Sign', 'Publish', 'Alias'];

export default function MintPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chipManifest, setChipManifest] = useState({ name: 'Chip Alpha', version: '1.0.0' });
  const [formulaManifest, setFormulaManifest] = useState({ name: 'Formula Beta', version: '1.0.0' });

  return (
    <div className="space-y-6">
      <StepWizard
        steps={steps}
        active_index={activeIndex}
        onNext={() => setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1))}
        onBack={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
      />
      <ManifestEditor
        chip_manifest={chipManifest}
        formula_manifest={formulaManifest}
        readonly_cids={['b3:manifestchip', 'b3:manifestformula']}
        onChange={(next) => {
          setChipManifest(next.chip);
          setFormulaManifest(next.formula);
        }}
        onValidate={() => console.info('Validate manifest')}
      />
    </div>
  );
}
