'use client';

import React, { useState } from 'react';
import * as bip39 from 'bip39';
import { Button } from '../../../components/ui/button';

interface Props {
  onNext: () => void;
}

const StepThree: React.FC<Props> = ({ onNext }) => {
  const [mnemonic, setMnemonic] = useState('');

  const generateMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic();
    setMnemonic(newMnemonic);
  };

  const mnemonicArray = mnemonic.split(' ');

  return (
    <div className='flex flex-col items-center gap-4'>
      <Button onClick={generateMnemonic}>Generate</Button>
      {mnemonicArray.length > 0 && (
        <div className='grid grid-cols-3 w-full border rounded-xl p-4'>
          {mnemonicArray.map((word, index) => (
            <div key={index} className='text-lg text-center font-mono'>
              {word}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepThree;
