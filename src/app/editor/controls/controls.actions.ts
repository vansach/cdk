import { Action } from '@ngrx/store';

export enum WebpackState {
  // Not doing anything.
  Stopped,
  // Currently booting up.
  Starting,
  // Currently compiling code.
  Compiling,
  // Built successfully.
  Compiled,
  // Had an error on the last compilation
  HadError,
  // In the process of stopping.
  Stopping,
  // Could not boot up, or crashed.
  Failed,
}

/**
 * Returns whether the webpack state represents one which is currently
 * running.
 */
export function isRunning(state: WebpackState) {
  return state !== WebpackState.Stopped && state !== WebpackState.Failed;
}

export interface IWebpackInstance {
  id: number;
  address: string;
}

export const enum ControlsActionTypes {
  START_WEBPACK = '[Controls] Start webpack',
  UPDATE_WEBPACK_STATE = '[Controls] Update webpack state',
  UPDATE_WEBPACK_CONSOLE = '[Controls] Update webpack console',
  RESTART_WEBPACK = '[Controls] Restart webpack',
  STOP_WEBPACK = '[Controls] Stop webpack',
  SET_WEBPACK_INSTANCE = '[Controls] Set webpack instance',
  AUTO_OPEN_CONSOLE = '[Controls] Auto open webpack console',
  AUTO_CLOSE_CONSOLE = '[Controls] Auto close webpack console',
  REFRESH_CONTROLS = '[Controls] Refresh the displayed controls',
  SEND_CONTROL_PACKET = '[Controls] Send a packet to the controls',
  SET_IS_READY = '[Controls] Set ready',
  PROMPT_LOCATE_WEBPACK_CONFIG = '[Controls] Prompt to locate webpack config',
  LOCATE_WEBPACK_CONFIG = '[Controls] Locate webpack config',
  OPEN_WEBPACK_CONFIG = '[Controls] Open webpack config',
}

export const enum ControlsMethods {
  StartWebpack = '[Controls] Start webpack',
  StopWebpack = '[Controls] Stop webpack',
  SetWebpackConfig = '[Controls] Set webpack config',
  LocateWebpackConfig = '[Controls] Locate webpack config',
  GetWebpackConfig = '[Controls] Get webpack config',
}

/**
 * Starts the webpack dev server in the project directory.
 */
export class StartWebpack implements Action {
  public readonly type = ControlsActionTypes.START_WEBPACK;
}

/**
 * Updates the state of the webpack dev server.
 */
export class UpdateWebpackState implements Action {
  public readonly type = ControlsActionTypes.UPDATE_WEBPACK_STATE;

  constructor(public readonly state: WebpackState) {}
}

/**
 * Fired by the server to update the contents displayed in the dev
 * server console.
 */
export class UpdateWebpackConsole implements Action {
  public readonly type = ControlsActionTypes.UPDATE_WEBPACK_CONSOLE;

  constructor(public readonly data: string) {}
}

/**
 * Fired to restart the webpack server.
 */
export class RestartWebpack implements Action {
  public readonly type = ControlsActionTypes.RESTART_WEBPACK;
}

/**
 * Fired to stop the webpack server.
 */
export class StopWebpack implements Action {
  public readonly type = ControlsActionTypes.STOP_WEBPACK;
}

/**
 * Sets the currently running webpack server.
 */
export class SetWebpackInstance implements Action {
  public readonly type = ControlsActionTypes.SET_WEBPACK_INSTANCE;

  constructor(public readonly instance: IWebpackInstance) {}
}

/**
 * Dispatched when we want to automatically open the dev console, as a result
 * of compilation errors for example.
 */
export class AutoOpenConsole implements Action {
  public readonly type = ControlsActionTypes.AUTO_OPEN_CONSOLE;
}

/**
 * Dispatched when we want to automatically close the dev console, as a result
 * of a successful compilation for example.
 */
export class AutoCloseConsole implements Action {
  public readonly type = ControlsActionTypes.AUTO_CLOSE_CONSOLE;
}

/**
 * Dispatched when we want to refresh the controls within the frame.
 */
export class RefreshControls implements Action {
  public readonly type = ControlsActionTypes.REFRESH_CONTROLS;
}

/**
 * Dispatched when we want to send data to the controls.
 */
export class SendControlPacket implements Action {
  public readonly type = ControlsActionTypes.SEND_CONTROL_PACKET;

  constructor(public readonly method: string, public readonly params: any) {}
}

/**
 * Dispatched to set or unset the ready state. If isReady is omitted, toggle.
 */
export class SetReady implements Action {
  public readonly type = ControlsActionTypes.SET_IS_READY;

  constructor(public readonly isReady?: boolean) {}
}

/**
 * Asks the user to provide the location of their webpack config on disk.
 */
export class PromptLocateWebpackConfig implements Action {
  public readonly type = ControlsActionTypes.PROMPT_LOCATE_WEBPACK_CONFIG;
}

/**
 * Asks the user to provide the location of their webpack config on disk.
 */
export class LocateWebpackConfig implements Action {
  public readonly type = ControlsActionTypes.LOCATE_WEBPACK_CONFIG;
}

/**
 * Opens the webpack config in the user's preferred editor.
 */
export class OpenWebpackConfig implements Action {
  public readonly type = ControlsActionTypes.OPEN_WEBPACK_CONFIG;
}

export type ControlActions =
  | StartWebpack
  | UpdateWebpackState
  | UpdateWebpackConsole
  | RestartWebpack
  | StopWebpack
  | SetWebpackInstance
  | AutoCloseConsole
  | AutoOpenConsole
  | SetReady
  | PromptLocateWebpackConfig
  | LocateWebpackConfig
  | OpenWebpackConfig;
