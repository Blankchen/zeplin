import { Observable } from 'rxjs';

export interface ApplicationService<Input, Output> {
  execute(input: Input): Observable<Output>;
}
