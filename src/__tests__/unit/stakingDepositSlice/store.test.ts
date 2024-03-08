import { Action, Store, configureStore } from '@reduxjs/toolkit';
import { RootState } from '../../../state/store/store';
import rootReducer from '../../../state/store/rootReducer';
import { initialState } from '../../../state/stakingDeposit/stakingDepositSlice';

describe('Redux stakingDeposit Store', () => {
  let store: Store<RootState, Action>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  test('Store is properly initialized', () => {
    expect(store.getState().stakingDeposit).toEqual(initialState);
  });
});
