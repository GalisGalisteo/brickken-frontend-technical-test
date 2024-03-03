# User Story

## Title

Create Staking Input Section

## Description

As a frontend developer, I want to create a section in the Staking Info component where users can input the amount they
want to stake. The input field should not allow values greater than the user's BKN amount. The deposit button should be
disabled if the input field is empty or if the `isDepositable` parameter in the staking information is false.

## Acceptance Criteria

1. A new section named `StakingInputSection` is created in the `StakingInfoComponent`.
2. The `StakingInputSection` includes an input field where users can enter the amount they want to stake.
3. The input field does not allow values greater than the user's BKN amount.
4. The `StakingInputSection` includes a deposit button.
5. The deposit button is disabled if the input field is empty or if the `isDepositable` parameter in the staking
   information is false.
6. The `StakingInputSection` is integrated into the `StakingInfoComponent` and functions as expected, with no
   regressions.
7. The code adheres to clean code principles, improving maintainability and readability.

## Story Point Estimate

<!-- Here is where you can add your Story Points estimate -->