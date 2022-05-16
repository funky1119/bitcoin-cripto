// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      bg: string;
      box: string;
      text: string;
      accent: string;
    };
  }
}
