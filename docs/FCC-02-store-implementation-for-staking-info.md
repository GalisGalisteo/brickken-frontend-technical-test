# User Story

### Title

Implementation of the store with Redux Toolkit for the `fetchStakingBknInfo` endpoint

### Description

As a frontend developer, I want to implement a store using Redux Toolkit, so that I can efficiently manage the
application state and use the `fetchStakingBknInfo` endpoint to fetch information about BKN staking.

### Acceptance Criteria

1. The store should be created using Redux Toolkit.
2. There should be a Redux slice to manage the state related to BKN staking information.
3. The slice should have an initial state, which includes all necessary fields to store BKN staking information.
4. There should be an asynchronous action in the slice that uses the `fetchStakingBknInfo` endpoint to fetch BKN staking
   information.
5. The asynchronous action should handle loading, success, and error states.
6. The store state should be correctly updated based on the response from the `fetchStakingBknInfo` endpoint.
7. There should be selectors to access BKN staking information from the store state.
8. The implementation should be covered with appropriate unit tests.