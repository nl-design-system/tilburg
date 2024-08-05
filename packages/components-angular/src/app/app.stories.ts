import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AppComponent, HttpLoaderFactory } from './index';

export default {
  title: 'Angular Component/App',
  id: 'angular-app',
  component: AppComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }),
  ],
} as Meta;

type Story = StoryObj<AppComponent>;

export const Default: Story = {
  args: {},
};
