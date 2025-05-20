import { Args } from '@massalabs/massa-web3';

function buildCallData({
  targetAddress,
  functionName,
  parameter,
  maxGas,
  coins,
  fee,
}: {
  targetAddress: string;
  functionName: string;
  parameter: Uint8Array;
  maxGas: bigint;
  coins: bigint;
  fee: bigint;
}) {
  const args = new Args()
    .addString(targetAddress)
    .addString(functionName)
    .addUint8Array(parameter)
    .addU64(maxGas)
    .addU64(coins)
    .addU64(fee);

  return args.serialize();
}

export default buildCallData;