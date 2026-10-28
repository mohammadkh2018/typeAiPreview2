import { environment } from '../../../environments/environment';

export class EnvironmentCheckUtil {
  static isDevelopment(): boolean {
    return !environment.production;
  }
}
