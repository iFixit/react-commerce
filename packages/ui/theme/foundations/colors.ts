import { ThemeOverride } from '@chakra-ui/react';
import { color as primitiveColor } from '@core-ds/primitives';

export const colors: ThemeOverride['colors'] = {
   black: primitiveColor.black,
   white: primitiveColor.white,
   whiteAlpha: {
      50: 'rgba(255, 255, 255, 0.04)',
      100: 'rgba(255, 255, 255, 0.06)',
      200: 'rgba(255, 255, 255, 0.08)',
      300: 'rgba(255, 255, 255, 0.16)',
      400: 'rgba(255, 255, 255, 0.24)',
      500: 'rgba(255, 255, 255, 0.36)',
      600: 'rgba(255, 255, 255, 0.48)',
      700: 'rgba(255, 255, 255, 0.64)',
      800: 'rgba(255, 255, 255, 0.80)',
      900: 'rgba(255, 255, 255, 0.92)',
   },
   blackAlpha: {
      50: 'rgba(0, 0, 0, 0.04)',
      100: 'rgba(0, 0, 0, 0.06)',
      200: 'rgba(0, 0, 0, 0.08)',
      300: 'rgba(0, 0, 0, 0.16)',
      400: 'rgba(0, 0, 0, 0.24)',
      500: 'rgba(0, 0, 0, 0.36)',
      600: 'rgba(0, 0, 0, 0.48)',
      700: 'rgba(0, 0, 0, 0.64)',
      800: 'rgba(0, 0, 0, 0.80)',
      900: 'rgba(0, 0, 0, 0.92)',
   },
   brand: {
      100: '#EDF6FF',
      200: '#BDDCFF',
      300: '#77B5FF',
      400: '#3B95FF',
      500: '#1975F1',
      600: '#085FD9',
      700: '#004AB3',
      800: '#00368C',
      900: '#002466',
   },
   rose: {
      50: primitiveColor.rose[50],
      100: primitiveColor.rose[100],
      200: primitiveColor.rose[200],
      300: primitiveColor.rose[300],
      400: primitiveColor.rose[400],
      500: primitiveColor.rose[500],
      600: primitiveColor.rose[600],
      700: primitiveColor.rose[700],
      800: primitiveColor.rose[800],
      900: primitiveColor.rose[900],
   },
   pink: {
      50: primitiveColor.pink[50],
      100: primitiveColor.pink[100],
      200: primitiveColor.pink[200],
      300: primitiveColor.pink[300],
      400: primitiveColor.pink[400],
      500: primitiveColor.pink[500],
      600: primitiveColor.pink[600],
      700: primitiveColor.pink[700],
      800: primitiveColor.pink[800],
      900: primitiveColor.pink[900],
   },
   fuchsia: {
      50: primitiveColor.fuchsia[50],
      100: primitiveColor.fuchsia[100],
      200: primitiveColor.fuchsia[200],
      300: primitiveColor.fuchsia[300],
      400: primitiveColor.fuchsia[400],
      500: primitiveColor.fuchsia[500],
      600: primitiveColor.fuchsia[600],
      700: primitiveColor.fuchsia[700],
      800: primitiveColor.fuchsia[800],
      900: primitiveColor.fuchsia[900],
   },
   purple: {
      50: primitiveColor.purple[50],
      100: primitiveColor.purple[100],
      200: primitiveColor.purple[200],
      300: primitiveColor.purple[300],
      400: primitiveColor.purple[400],
      500: primitiveColor.purple[500],
      600: primitiveColor.purple[600],
      700: primitiveColor.purple[700],
      800: primitiveColor.purple[800],
      900: primitiveColor.purple[900],
   },
   violet: {
      50: primitiveColor.violet[50],
      100: primitiveColor.violet[100],
      200: primitiveColor.violet[200],
      300: primitiveColor.violet[300],
      400: primitiveColor.violet[400],
      500: primitiveColor.violet[500],
      600: primitiveColor.violet[600],
      700: primitiveColor.violet[700],
      800: primitiveColor.violet[800],
      900: primitiveColor.violet[900],
   },
   indigo: {
      50: primitiveColor.indigo[50],
      100: primitiveColor.indigo[100],
      200: primitiveColor.indigo[200],
      300: primitiveColor.indigo[300],
      400: primitiveColor.indigo[400],
      500: primitiveColor.indigo[500],
      600: primitiveColor.indigo[600],
      700: primitiveColor.indigo[700],
      800: primitiveColor.indigo[800],
      900: primitiveColor.indigo[900],
   },
   blue: {
      50: primitiveColor.blue[50],
      100: primitiveColor.blue[100],
      200: primitiveColor.blue[200],
      300: primitiveColor.blue[300],
      400: primitiveColor.blue[400],
      500: primitiveColor.blue[500],
      600: primitiveColor.blue[600],
      700: primitiveColor.blue[700],
      800: primitiveColor.blue[800],
      900: primitiveColor.blue[900],
      ifixit: primitiveColor.blue.ifixit,
   },
   lightBlue: {
      50: primitiveColor.lightBlue[50],
      100: primitiveColor.lightBlue[100],
      200: primitiveColor.lightBlue[200],
      300: primitiveColor.lightBlue[300],
      400: primitiveColor.lightBlue[400],
      500: primitiveColor.lightBlue[500],
      600: primitiveColor.lightBlue[600],
      700: primitiveColor.lightBlue[700],
      800: primitiveColor.lightBlue[800],
      900: primitiveColor.lightBlue[900],
   },
   cyan: {
      50: primitiveColor.cyan[50],
      100: primitiveColor.cyan[100],
      200: primitiveColor.cyan[200],
      300: primitiveColor.cyan[300],
      400: primitiveColor.cyan[400],
      500: primitiveColor.cyan[500],
      600: primitiveColor.cyan[600],
      700: primitiveColor.cyan[700],
      800: primitiveColor.cyan[800],
      900: primitiveColor.cyan[900],
   },
   teal: {
      50: primitiveColor.teal[50],
      100: primitiveColor.teal[100],
      200: primitiveColor.teal[200],
      300: primitiveColor.teal[300],
      400: primitiveColor.teal[400],
      500: primitiveColor.teal[500],
      600: primitiveColor.teal[600],
      700: primitiveColor.teal[700],
      800: primitiveColor.teal[800],
      900: primitiveColor.teal[900],
   },
   emerald: {
      50: primitiveColor.emerald[50],
      100: primitiveColor.emerald[100],
      200: primitiveColor.emerald[200],
      300: primitiveColor.emerald[300],
      400: primitiveColor.emerald[400],
      500: primitiveColor.emerald[500],
      600: primitiveColor.emerald[600],
      700: primitiveColor.emerald[700],
      800: primitiveColor.emerald[800],
      900: primitiveColor.emerald[900],
   },
   green: {
      50: primitiveColor.green[50],
      100: primitiveColor.green[100],
      200: primitiveColor.green[200],
      300: primitiveColor.green[300],
      400: primitiveColor.green[400],
      500: primitiveColor.green[500],
      600: primitiveColor.green[600],
      700: primitiveColor.green[700],
      800: primitiveColor.green[800],
      900: primitiveColor.green[900],
   },
   lime: {
      50: primitiveColor.lime[50],
      100: primitiveColor.lime[100],
      200: primitiveColor.lime[200],
      300: primitiveColor.lime[300],
      400: primitiveColor.lime[400],
      500: primitiveColor.lime[500],
      600: primitiveColor.lime[600],
      700: primitiveColor.lime[700],
      800: primitiveColor.lime[800],
      900: primitiveColor.lime[900],
   },
   yellow: {
      50: primitiveColor.yellow[50],
      100: primitiveColor.yellow[100],
      200: primitiveColor.yellow[200],
      300: primitiveColor.yellow[300],
      400: primitiveColor.yellow[400],
      500: primitiveColor.yellow[500],
      600: primitiveColor.yellow[600],
      700: primitiveColor.yellow[700],
      800: primitiveColor.yellow[800],
      900: primitiveColor.yellow[900],
   },
   amber: {
      50: primitiveColor.amber[50],
      100: primitiveColor.amber[100],
      200: primitiveColor.amber[200],
      300: primitiveColor.amber[300],
      400: primitiveColor.amber[400],
      500: primitiveColor.amber[500],
      600: primitiveColor.amber[600],
      700: primitiveColor.amber[700],
      800: primitiveColor.amber[800],
      900: primitiveColor.amber[900],
   },
   orange: {
      50: primitiveColor.orange[50],
      100: primitiveColor.orange[100],
      200: primitiveColor.orange[200],
      300: primitiveColor.orange[300],
      400: primitiveColor.orange[400],
      500: primitiveColor.orange[500],
      600: primitiveColor.orange[600],
      700: primitiveColor.orange[700],
      800: primitiveColor.orange[800],
      900: primitiveColor.orange[900],
   },
   red: {
      50: primitiveColor.red[50],
      100: primitiveColor.red[100],
      200: primitiveColor.red[200],
      300: primitiveColor.red[300],
      400: primitiveColor.red[400],
      500: primitiveColor.red[500],
      600: primitiveColor.red[600],
      700: primitiveColor.red[700],
      800: primitiveColor.red[800],
      900: primitiveColor.red[900],
   },
   warmGray: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
   },
   trueGray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
   },
   gray: {
      50: primitiveColor.gray[50],
      100: primitiveColor.gray[100],
      200: primitiveColor.gray[200],
      300: primitiveColor.gray[300],
      400: primitiveColor.gray[400],
      500: primitiveColor.gray[500],
      600: primitiveColor.gray[600],
      700: primitiveColor.gray[700],
      800: primitiveColor.gray[800],
      900: primitiveColor.gray[900],
   },
   coolGray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
   },
   blueGray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
   },
   borderColor: primitiveColor.gray[200],
};
