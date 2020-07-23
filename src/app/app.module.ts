import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DtIconModule } from '@dynatrace/barista-components/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DtTableModule } from '@dynatrace/barista-components/table';
import { DtQuickFilterModule } from '@dynatrace/barista-components/experimental/quick-filter';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DtIconModule.forRoot({ svgIconLocation: '/assets/icons/{{name}}.svg' }),
        DtTableModule,
        DtQuickFilterModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
