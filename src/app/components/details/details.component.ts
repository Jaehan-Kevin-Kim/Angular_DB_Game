import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0;
  gameId: string = "";
  game: Game;
  routeSub: Subscription | undefined;
  gameSub: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp;
      console.log(gameResp);
      setTimeout(() => {
        this.gameRating = this.game?.metacritic || 0;
      }, 1000);
    });

  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee42';
    } else if (value > 50) {
      return '#fffa50'
    } else if (value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.gameSub?.unsubscribe();
  }

}
