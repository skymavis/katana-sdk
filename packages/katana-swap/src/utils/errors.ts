class WrongChainError extends Error {
  constructor() {
    super('Wrong network');
  }
}

function getReasonFromError(error: any): string | undefined {
  let reason: string | undefined;
  while (error) {
    reason = error.reason ?? error.message ?? reason;
    error = error.error ?? error.data?.originalError;
  }
  return reason;
}

function didUserReject(error: any): boolean {
  const reason = getReasonFromError(error);
  if (
    error?.code === 4001 ||
    // ethers v5.7.0 wrapped error
    error?.code === 'ACTION_REJECTED' ||
    // For Rainbow :
    (reason?.match(/request/i) && reason?.match(/reject/i)) ||
    // For Frame:
    reason?.match(/declined/i) ||
    // For SafePal:
    reason?.match(/cancell?ed by user/i) ||
    // For Trust:
    reason?.match(/user cancell?ed/i) ||
    // For Coinbase:
    reason?.match(/user denied/i) ||
    // For Fireblocks
    reason?.match(/user rejected/i)
  ) {
    return true;
  }
  return false;
}

function toReadableError(errorText: string, error: unknown) {
  if (typeof error === 'object' && error !== null) {
    const e = error as Error & { reason?: string };
    return new Error(`${errorText} 👺 ${e.message ?? e.reason ?? 'unknown'}`);
  }
  return new Error(`${errorText} 👺 ${error}`);
}

export { didUserReject, getReasonFromError, toReadableError, WrongChainError };
