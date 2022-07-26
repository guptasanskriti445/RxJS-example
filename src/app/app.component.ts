import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular';
  streamsubscribe: any;
  AsyncStream(observer) {
    var t1 = setInterval(() => {
      observer.next(Math.random() * 10);
    }, 1000);
  }
  myobserv = Observable.create(this.AsyncStream);
  mainstreamobservable = Observable.create(this.AsyncStream);
  step1stream = this.mainstreamobservable.pipe(
    map((x: number) => Math.round(x))
  );
  step2stream = this.step1stream.pipe(filter((x: number) => x > 4));
  ngOnInit() {
    // this.myobserv.subscribe((res) => this.Listener(res));
    this.streamsubscribe = this.step2stream.subscribe((res) =>
      this.Listener(res)
    );
  }
  Listener(res: any) {
    console.log(res);
  }
  ngOnDestroy() {
    this.streamsubscribe.unSubscribe();
  }
}
