# User Story

## Title

Perform Staking Deposit

## Description

As a frontend developer, I want to perform a deposit in the staking contract. To do this, I need to create a store to
make the
calls `createAuthorizeStakingBknWithdrawal`, `getAuthorizeStakingBknWithdrawalResult`, `startDeposit`, `getStartDepositResult`
that are found in the `stakingWeb3Service.ts` file.

First, we will have to perform an allowance for this we have to use the `createAuthorizeStakingBknWithdrawal` function
that will return a tx-hash, after obtaining this tx-hash we will have to
dispatch `getAuthorizeStakingBknWithdrawalResult` to get the result, in case it is successful we could proceed with the
call of `startDeposit` to obtain the tx-hash and finally we will have to use `getStartDepositResult` to obtain the
result of the transaction.

Additionally, I want to implement the necessary elements for the visualization of what is happening to inform the user
and leave on screen the links to the tx-hash with the following format https://sepolia.etherscan.io/tx/<tx-hash>.

## Acceptance Criteria

1. A new store is created to make the
   calls `createAuthorizeStakingBknWithdrawal`, `getAuthorizeStakingBknWithdrawalResult`, `startDeposit`, `getStartDepositResult`.
2. The `createAuthorizeStakingBknWithdrawal` function is called and returns a tx-hash.
3. The `getAuthorizeStakingBknWithdrawalResult` function is dispatched with the tx-hash and returns a successful result.
4. The `startDeposit` function is called and returns a tx-hash.
5. The `getStartDepositResult` function is called with the tx-hash and returns a successful result.
6. The deposit in the staking contract is successfully performed, with no regressions.
7. The necessary elements for the visualization of what is happening are implemented to inform the user.
8. The links to the tx-hash are displayed on the screen with the following format https://sepolia.etherscan.io/tx/<
   tx-hash>.
9. The code adheres to clean code principles, improving maintainability and readability.
