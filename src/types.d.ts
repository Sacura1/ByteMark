export {};

declare global {
  interface Window {
    massa?: {
      getAccount(): Promise<string>;
      sendTransaction(tx: {
        targetAddress: string;
        functionName: string;
        parameter: Uint8Array;
        maxGas: bigint;
        coins: bigint;
        fee: bigint;
      }): Promise<string>;
      readTransaction(tx: {
        targetAddress: string;
        functionName: string;
        parameter: Uint8Array;
      }): Promise<{ returnValue: Uint8Array }>;
    };
  }
}