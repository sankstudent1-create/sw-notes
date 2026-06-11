export const designTokens = {
  colors: {
    background: '#F9F6F0',
    foreground: '#2B2B2B',
    paper: '#EFE8DA',
    sage: '#8FA68E',
    terracotta: '#C97954',
    amber: '#F0C05A',
    lavender: '#D8D1E8',
    textPrimary: '#2B2B2B',
    textSecondary: '#666666',
    success: '#4C8A5F',
    danger: '#B94A48',
    dark: {
      background: '#1F1A17',
      foreground: '#F5F0EA',
      card: '#2B2521',
      text: '#F5F0EA',
      accent: '#A6C4A6',
    },
  },
  typography: {
    heading: 'var(--font-kalam)',
    title: 'var(--font-caveat)',
    body: 'var(--font-nunito)',
    reading: 'var(--font-merriweather)',
    ui: 'var(--font-inter)',
  },
  radius: {
    button: '14px',
    card: '16px',
    large: '24px',
  },
  animations: {
    duration: {
      fast: 200,
      normal: 300,
    },
    easing: [0.4, 0, 0.2, 1], // Smooth easing
  },
};
