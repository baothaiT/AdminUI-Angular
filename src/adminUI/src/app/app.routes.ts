import { Routes } from '@angular/router';
import { UrlConfig } from './../shared/common/urlConfig';
import { HomeComponentComponent } from './Home/home-component.component';
import { LogComponent } from './Log/Log.component';
import { ProxyComponent } from './Proxy/Proxy.component';
import { TableExampleComponent } from "./Table-Example/Table-Example.component";
import { AccountsComponent } from "./Accounts/Accounts.component";
import { LoginComponent } from "./Login/Login.component";
import { RegisterComponent } from "./Register/Register.component";
import { NotFoundComponent } from "./NotFound/NotFound.component";
import { InternalServerErrorComponent } from "./InternalServerError/InternalServerError.component";
import { UnauthorizedComponent } from "./Unauthorized/Unauthorized.component";
import { ForgotPasswordComponent } from "./ForgotPassword/ForgotPassword.component";
import { TradeBalanceComponent } from "./Trade-Balance/Trade-Balance.component";

export const routes: Routes = [
    { path: UrlConfig.emptyURL, redirectTo: UrlConfig.homeURL, pathMatch: 'full' },
    { path: UrlConfig.homeURL, component: HomeComponentComponent },
    { path: UrlConfig.proxiesURL, component: ProxyComponent },
    { path: UrlConfig.logsURL, component: LogComponent },
    { path: UrlConfig.tableURL, component: TableExampleComponent },
    { path: UrlConfig.accountURL, component: AccountsComponent },
    { path: UrlConfig.loginURL, component: LoginComponent },
    { path: UrlConfig.registerURL, component: RegisterComponent },
    { path: UrlConfig.notFoundURL, component: NotFoundComponent },
    { path: UrlConfig.internalServerErrorsURL, component: InternalServerErrorComponent },
    { path: UrlConfig.unauthorizedURL, component: UnauthorizedComponent },
    { path: UrlConfig.forgotPasswordURL, component: ForgotPasswordComponent },
    { path: UrlConfig.tradeBalanceURL, component: TradeBalanceComponent },
    { path: UrlConfig.allURL, component: NotFoundComponent }
  ];
