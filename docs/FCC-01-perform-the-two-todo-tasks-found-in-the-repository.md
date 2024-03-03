# User Story

## Title

Perform the two TODO tasks found in the repository

## Description

As a developer, I want to perform the two TODO tasks found in the repository. The first task is to refactor the code to
extract `ethersProvider` into a hook. This will allow for code reuse in the `StakingInfo.tsx` and `useDevConsole.tsx`
files, improving the maintainability and readability of the code. The second task is to adhere to clean code principles
as indicated in the `TODO` comment in the `App.tsx` file.

## Acceptance Criteria

1. A new hook named `useEthersProvider` is created.
2. The `useEthersProvider` hook returns `ethersProvider`.
3. The `useEthersProvider` hook is used in `StakingInfo.tsx` and `useDevConsole.tsx` files to obtain `ethersProvider`.
4. The code functions as expected after the refactor, with no regressions.
5. The code adheres to clean code principles, improving maintainability and readability.
6. The `TODO` comment in the `App.tsx` file is addressed and the code is refactored accordingly.

## Story Point Estimate

1