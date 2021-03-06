import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ToggleDevTools } from '../../bedrock.actions';
import { IState } from '../../bedrock.reducers';
import { ControlsRemoteConsoleService } from '../../controls-console/controls-remote-console.service';
import { GoldenPanel, OpenPanel, stackedLocator } from '../../layout/layout.actions';
import { RemoteState, SetRemoteState } from '../../remote-connect/remote-connect.actions';
import { isRemoteConnected } from '../../remote-connect/remote-connect.reducer';
import { SetReady } from '../controls.actions';
import { selectIsReady } from '../controls.reducer';
import { BaseStateSyncService } from '../sync/base-state-sync.service';

/**
 * Yo dawg I heard you liked controls. This contains the "meta-controls" that
 * allow refreshing and otherwise manipulating the displayed content.
 */
@Component({
  selector: 'controls-controls',
  templateUrl: './controls-controls.component.html',
  styleUrls: ['./controls-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsControlsComponent {
  /**
   * Emits if there's any unread error message.
   */
  public hasUnreadError = this.console.hasUnreadError();

  /**
   * Emits whether the controls have a remote connection running.
   */
  public readonly isRemoteConnected = this.store.select(isRemoteConnected);

  /**
   * Selects whether the controls are ready.
   */
  public isReady = this.store.select(selectIsReady);

  constructor(
    public readonly sync: BaseStateSyncService,
    private readonly console: ControlsRemoteConsoleService,
    private readonly store: Store<IState>,
  ) {}

  public toggleDevtools() {
    const frame = document.body.querySelector('iframe');
    if (!frame) {
      this.store.dispatch(new ToggleDevTools());
      return;
    }

    const rect = frame.getBoundingClientRect();
    this.store.dispatch(
      new ToggleDevTools({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }),
    );
  }

  public showConsole() {
    this.store.dispatch(
      new OpenPanel(GoldenPanel.ControlsConsole, stackedLocator(GoldenPanel.Controls)),
    );
  }

  public toggleReady() {
    this.store.dispatch(new SetReady());
  }

  public disconnectRemote() {
    this.store.dispatch(new SetRemoteState(RemoteState.Disconnected));
  }
}
