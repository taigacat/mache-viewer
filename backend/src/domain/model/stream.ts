import { Historical } from './historical';

export class Stream extends Historical {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}
