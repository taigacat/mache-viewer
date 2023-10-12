import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LogComponent } from './pages/log/log.component';
import { SettingComponent } from './pages/setting/setting.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PointCardComponent } from './components/point-card/point-card.component';
import { GiftListCardComponent } from './components/gift-list-card/gift-list-card.component';
import { AppStoreModule } from './store/app-store.module';
import { HttpClientModule } from '@angular/common/http';
import { StreamListCardComponent } from './components/stream-list-card/stream-list-card.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from './store/meta.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BroadcasterSelectorComponent } from './components/broadcaster-selector/broadcaster-selector.component';
import { MatRadioModule } from '@angular/material/radio';

import '@angular/common/locales/global/ja';

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    SettingComponent,
    PointCardComponent,
    GiftListCardComponent,
    StreamListCardComponent,
    BroadcasterSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'log', component: LogComponent },
      { path: 'setting', component: SettingComponent },
      { path: '**', redirectTo: 'log' },
    ]),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    AppStoreModule,
    StoreDevtoolsModule.instrument({}),
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
