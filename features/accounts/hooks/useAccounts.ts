'use client';

import { useState } from 'react';

export const useAccounts = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);

  return { account, accounts };
};
