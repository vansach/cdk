import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BundleSizeWarningComponent } from './bundle-size-warning-dialog/bundle-size-warning-dialog.component';
import { BundleUploadService } from './bundle-upload.service';
import { BytesPipe } from './bytes.pipe';
import { CodeResizerComponent } from './code/code-resizer.component';
import { CodeComponent } from './code/code.component';
import { ConsoleComponent } from './console/console.component';
import { ConsoleService } from './console/console.service';
import { ExpandedMessageComponent } from './console/expanded-message.component';
import { FramePanelComponent } from './frame-panel/frame-panel.component';
import { ControlStateSyncService } from './frame/control-state-sync.service';
import { FrameComponent } from './frame/frame.component';
import { LocalControlsComponent } from './frame/local-controls.component';
import { RemoteControlsComponent } from './frame/remote-controls.component';
import { BaseStateSyncService } from './frame/state-sync.service';
import { HistoryComponent } from './history/history.component';
import { HostComponent } from './host/host.component';
import { HttpErrorService } from './http-error.service';
import { ChannelSelectDialog } from './launch-dialog/channel-select-dialog.component';
import { LaunchDialogComponent } from './launch-dialog/launch-dialog.component';
import { LinkDialogComponent } from './link-dialog/link-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoginWalkthroughComponent } from './login-walkthrough/login-walkthrough.component';
import { CodeNavComponent } from './nav/code-nav.component';
import { NavComponent } from './nav/nav.component';
import { HistoryEffects } from './redux/historyEffects';
import { metaReducers, ProjectService, reducers } from './redux/project';
import { RenameBundleDialogComponent } from './rename-bundle-dialog/rename-bundle-dialog.component';
import { SafePipe } from './safe.pipe';
import { UploadSchemaDialogComponent } from './upload-schema/upload-schema-dialog.component';
import { UploadSchemaService } from './upload-schema/upload-schema.service';

require('../../../static/editor/style.scss');

/**
 * Primary Editor application.
 */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    StoreModule.forRoot(<any>reducers, { metaReducers }),
    EffectsModule.forRoot([HistoryEffects]),
  ],
  declarations: [
    BundleSizeWarningComponent,
    BytesPipe,
    ChannelSelectDialog,
    CodeComponent,
    CodeNavComponent,
    CodeResizerComponent,
    ConsoleComponent,
    ExpandedMessageComponent,
    FrameComponent,
    FramePanelComponent,
    HistoryComponent,
    HostComponent,
    LaunchDialogComponent,
    LinkDialogComponent,
    LocalControlsComponent,
    LoginDialogComponent,
    LoginWalkthroughComponent,
    NavComponent,
    RemoteControlsComponent,
    RenameBundleDialogComponent,
    SafePipe,
    UploadSchemaDialogComponent,
  ],
  entryComponents: [
    BundleSizeWarningComponent,
    ChannelSelectDialog,
    LaunchDialogComponent,
    LinkDialogComponent,
    LoginDialogComponent,
    RenameBundleDialogComponent,
    UploadSchemaDialogComponent,
  ],
  providers: [
    BaseStateSyncService,
    BundleUploadService,
    ConsoleService,
    HttpErrorService,
    ProjectService,
    ControlStateSyncService,
    UploadSchemaService,
  ],
  bootstrap: [HostComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule); // tslint:disable-line
