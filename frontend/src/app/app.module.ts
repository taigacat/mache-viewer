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

@NgModule({
  declarations: [AppComponent, LogComponent, SettingComponent, PointCardComponent, GiftListCardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: 'log', component: LogComponent },
      { path: 'setting', component: SettingComponent },
      { path: '**', redirectTo: 'log' },
    ]),
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
