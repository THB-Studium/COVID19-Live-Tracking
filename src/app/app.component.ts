import {Component} from '@angular/core'
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet, FooterComponent]
})
export class AppComponent {
  title: string = 'COVID19-Live-Tracking'
}
