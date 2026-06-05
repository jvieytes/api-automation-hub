export class TestConfig {
  private static readonly defaultBaseUrl = 'http://localhost:3000';

  static baseUrl(): string {
    return process.env.BASE_URL ?? process.env.REST_BASE_URL ?? this.defaultBaseUrl;
  }
}