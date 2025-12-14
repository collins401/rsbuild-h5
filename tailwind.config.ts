import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontWeight: {
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
      textColor: {
        color: 'rgba(var(--default-text), 0.85)',
      },
      colors: {
        zinc: 'rgba(242,242,247,1)',
        white: 'rgba(255,255,255,1)',
        // primary: 'rgba(var(--primary), 1)',
        info: 'rgba(var(--info), 1)',
        success: 'rgba(var(--success), 1)',
        warning: 'rgba(var(--warning), 1)',
        danger: 'rgba(var(--danger), 1)',
        grey: 'rgba(229,231,235,1)',
        background: 'hsla(var(--background), 1)',
        primary: {
          DEFAULT: 'hsla(var(--primary), 1)',
          foreground: 'hsla(var(--primary-foreground), 1)',
        },
        foreground: 'hsla(var(--foreground), 0.85)',
        card: {
          DEFAULT: 'hsla(var(--card),1)',
          foreground: 'hsla(var(--card-foreground),1)',
        },
        popover: {
          DEFAULT: 'hsla(var(--popover), 1)',
          foreground: 'hsla(var(--popover-foreground), 1)',
        },
        secondary: {
          DEFAULT: 'hsla(var(--secondary), 1)',
          foreground: 'hsla(var(--secondary-foreground), 1)',
        },
        muted: {
          DEFAULT: 'hsla(var(--muted), 1)',
          foreground: 'hsla(var(--muted-foreground), 1)',
        },
        accent: {
          DEFAULT: 'hsla(var(--accent),1)',
          foreground: 'hsla(var(--accent-foreground),1)',
        },
        destructive: {
          DEFAULT: 'hsla(var(--destructive),1)',
          foreground: 'hsla(var(--destructive-foreground),1)',
        },
        border: 'hsla(var(--border),1)',
        input: 'hsla(var(--input),1)',
        ring: 'hsla(var(--ring),1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
