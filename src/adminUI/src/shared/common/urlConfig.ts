export class UrlConfig {
    public static emptyURL = '';
    public static homeURL = 'home';
    public static logsURL = 'logs';
    public static proxiesURL = 'proxies';
    public static accountURL = 'accounts';
    public static loginURL = 'login';
    public static registerURL = 'register';
    public static notFoundURL = 'notfound';
    public static tableURL = 'tableexample';
    public static internalServerErrorsURL = 'internalservererror';
    public static unauthorizedURL = 'unauthorized';
    public static forgotPasswordURL = 'forgotpassword';
    public static allURL = '**';


    public static urlWithTemplate = [
        '/' + UrlConfig.homeURL,
        '/' + UrlConfig.logsURL,
        '/' + UrlConfig.proxiesURL,
        '/' + UrlConfig.accountURL,
        '/' + UrlConfig.tableURL,
    ];
}
