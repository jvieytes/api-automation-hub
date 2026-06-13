function fn() {
  var baseUrl =
    java.lang.System.getProperty('baseUrl') ||
    java.lang.System.getenv('BASE_URL') ||
    java.lang.System.getenv('REST_BASE_URL') ||
    'http://localhost:3000';

  karate.configure('connectTimeout', 15000);
  karate.configure('readTimeout', 30000);
  karate.configure('headers', {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  return {
    baseUrl: baseUrl
  };
}