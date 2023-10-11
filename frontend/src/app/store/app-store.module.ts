import { AppEffect } from './effect/app.effect';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './reducer/app.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('app', appReducer),
    EffectsModule.forFeature([AppEffect]),
  ],
  exports: [],
})
export class AppStoreModule {}
