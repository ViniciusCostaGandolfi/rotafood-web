export enum Serving {
    NOT_APPLICABLE = 'NOT_APPLICABLE',
    SERVES_1 = 'SERVES_1',
    SERVES_2 = 'SERVES_2',
    SERVES_3 = 'SERVES_3',
    SERVES_4 = 'SERVES_4'
  }

  
  export const servingToString: Record<Serving, string> = {
    [Serving.NOT_APPLICABLE]: 'Não Aplicável',
    [Serving.SERVES_1]: 'Serve 1 pessoa',
    [Serving.SERVES_2]: 'Serve 2 pessoas',
    [Serving.SERVES_3]: 'Serve 3 pessoas',
    [Serving.SERVES_4]: 'Serve 4 pessoas',
  };
  