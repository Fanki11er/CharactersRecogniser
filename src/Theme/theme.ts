export const theme: AppTheme = {
  colors: {},
  fontSizes: {
    navigationButton: '25px',
    mediumHeader: '4.5rem',
    smallError: '2rem',
  },
};

export type AppTheme = {
  colors: {};
  fontSizes: {
    navigationButton: string;
    mediumHeader: string;
    smallError: string;
  };
};

export interface ThemeProps {
  theme: AppTheme;
}
