export interface Usecase<T, U> {
  run(input: T): U;
}
