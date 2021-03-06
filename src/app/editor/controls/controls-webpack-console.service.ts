import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, merge } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

/**
 * Service that holds state about what's in the webpack console output.
 */
@Injectable()
export class ControlsWebpackConsoleService {
  /**
   * Maximum number of console output lines to store.
   */
  public static lineLimit = 10000;

  /**
   * Can be fired upon to clear the console output.
   */
  public clear = new Subject<void>();

  /**
   * A subject that emits with any new lines, as they're added.
   */
  private readonly newLines = new Subject<string>();

  /**
   * Current console contents.
   */
  public get contents() {
    return this.lines.join('');
  }

  private lines: string[] = [];

  /**
   * Inserts a new line into the console.
   */
  public write(line: string) {
    this.lines.push(line);
    this.newLines.next(line);

    // Trim any excess.
    if (this.lines.length > ControlsWebpackConsoleService.lineLimit) {
      this.lines = this.lines.slice(-Math.round(ControlsWebpackConsoleService.lineLimit * 2 / 3));
    }
  }

  /**
   * Returns an observable of the console contents.
   */
  public observe(): Observable<string> {
    return of(this.lines.join('')).pipe(merge(this.newLines), map(l => l));
  }
}
