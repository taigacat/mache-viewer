export interface Usecase<T, U> {
  run(input: T): Promise<U>;
}
