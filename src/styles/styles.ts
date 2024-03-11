import { theme } from './palette';

export const textButtons = {
  textTransform: 'capitalize',
  fontSize: { xs: '0.9rem', sm: '1rem' },
  fontWeight: 'bold'
};

export const gridContainer = {
  minWidth: 80,
  backgroundColor: theme.palette.info.light,
  borderRadius: 12,
  color: theme.palette.primary.main,
  p: 3
};

export const gridItemContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

export const gridItem = {
  color: 'white',
  backgroundColor: theme.palette.info.main,
  width: 150,
  borderRadius: 2
};
