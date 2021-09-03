import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateService } from './state-provider.service';
import { StateServiceHttp } from './state-provider.service.http';
import { StateServiceStorage } from './state-provider.service.storage';

import { StateProviderConfigModule } from './models/state-providers-config';

import { API_STATE } from './state-api-path-token';
import { STORAGE_STATE } from './state-storage-path-token';

const defaultStateProviderConfig: StateProviderConfigModule = {
  clientStore: true,
  sessionStorage: false,
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class StateProviderModule {
  static forRoot(
    config: StateProviderConfigModule = defaultStateProviderConfig
  ): ModuleWithProviders<any> {
    return {
      ngModule: StateProviderModule,
      providers: [
        {
          provide:
            config?.api && !config?.clientStore ? API_STATE : STORAGE_STATE,
          useValue: config?.api || config.sessionStorage,
        },
        {
          provide: StateService,
          useClass: config?.api ? StateServiceHttp : StateServiceStorage,
        },
      ],
    };
  }
}
