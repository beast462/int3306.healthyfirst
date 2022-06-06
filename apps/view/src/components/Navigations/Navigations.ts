import { ReactElement } from 'react';

type Element = (props: unknown) => ReactElement;
type TabProps = {
  avatar: ReactElement;
  label: string;
  caption?: string;
  childOf: string;
};
export type RegisterValue = {
  element: Element;
  tabProps: TabProps;
};

export class Navigations {
  private static instance: Navigations;

  private readonly register: Map<string, RegisterValue>;

  public constructor() {
    this.register = new Map();
  }

  public registerNavigation(path: string, props: TabProps) {
    return (element: Element) => {
      this.register.set(path, {
        element,
        tabProps: props,
      });
    };
  }

  public getAllNavigations(): [string, RegisterValue][] {
    return [...this.register.entries()];
  }

  public static getInstance(): Navigations {
    if (!Navigations.instance) Navigations.instance = new Navigations();

    return Navigations.instance;
  }
}
