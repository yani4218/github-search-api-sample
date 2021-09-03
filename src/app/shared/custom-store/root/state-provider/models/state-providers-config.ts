export interface StateProviderConfigModule {
  clientStore: boolean; // enabled sync with browser storages.
  api?: string; // api url for sync with server.
  sessionStorage?: boolean; // if sync with browser storages, SS or LS.
}
