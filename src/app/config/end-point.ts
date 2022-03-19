import { environment } from 'src/environments/environment';

export class EndPointService {
  private static apiUrl = environment.baseUrl;
  // getter method is used to declare the apis globally

  public static get getDataApi(): string {
    return this.apiUrl + '/characters';
  }
}
