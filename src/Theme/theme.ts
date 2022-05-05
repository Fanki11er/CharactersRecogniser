export const theme: AppTheme = {
  colors: {
    gradientLightBlueStart: 'rgba(193, 235, 255, 1)',
    gradientLightBlueEnd:  'rgba(193, 235, 255, 0)',
    frameBlue: 'rgba(74, 144, 255, 1)',
    buttonOrangeGradientStart: 'rgba(253, 124, 1, 1)',
    buttonOrangeGradientEnd: 'rgba(236, 176, 28, 1)',
    selectDigitPurple: 'rgba(184, 154, 199, 1)',
    borderPurple: 'rgba(144, 93, 163, 1)',
    numberScreenLightBlue: 'rgba(231, 247, 255, 1)',
    numberScreenBorderOrange: 'rgba(252, 129, 3, 1)',
    barsGradientGreenStart: 'rgba(48, 144, 55, 1)',
    barsGradientGreenEnd: 'rgba(48, 144, 55, 0.38)',
    barsGradientOrangeStart: 'rgba(252, 126, 2, 1)',
    barsGradientOrangeEnd: 'rgba(235, 235, 235, 1)',
    barsNumberOrange: 'rgba(239, 168, 23, 1)',
    buttonInactiveGrayStart: 'rgba(173, 173, 173, 1)',
    buttonInactiveGrayEnd: 'rgba(200, 200 ,200, 1)',
    fontColorRequiredCharacterRedStart: 'rgba(223, 108, 79, 1)',
    fontColorRequiredCharacterRedGradientEnd: 'rgba(223, 108, 79, 0.47)',
    diodeGreen: 'rgba(97, 170, 55, 1)',
  },
  fontSizes: {
    navigationButton: '25px',
    mediumHeader: '4.5rem',
    smallError: '2rem',

  },
};

export type AppTheme = {
  colors: {
    gradientLightBlueStart: string;
    gradientLightBlueEnd: string;
    frameBlue: string;
    buttonOrangeGradientStart: string;
    buttonOrangeGradientEnd: string;
    selectDigitPurple: string;
    borderPurple: string;
    numberScreenLightBlue: string;
    numberScreenBorderOrange: string;
    barsGradientGreenStart: string;
    barsGradientGreenEnd: string;
    barsGradientOrangeStart: string;
    barsGradientOrangeEnd: string;
    barsNumberOrange: string;
    buttonInactiveGrayStart: string;
    buttonInactiveGrayEnd: string;
    fontColorRequiredCharacterRedStart: string;
    fontColorRequiredCharacterRedGradientEnd: string,
    diodeGreen: string;
  };
  fontSizes: {
    navigationButton: string;
    mediumHeader: string;
    smallError: string;
    
  };
};

export interface ThemeProps {
  theme: AppTheme;
}
