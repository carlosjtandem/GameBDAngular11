import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameRating = 0;
  gameId: string;
  game: Game;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpservice: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['Id'];
      this.gameDetails(this.gameId)
    });
  }

  gameDetails(id: string): void {
    this.gameSub = this.httpservice.getGameDetails(id)
      .subscribe((gameResp: Game)=>{
        this.game = gameResp;
        console.log(gameResp);
        setTimeout(() => {
          this.gameRating= this.game.metacritic;
        }, 1000);

      });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return 'fffa50';
    } else if (value > 30) {
      return 'f7aa38';
    } else {
      return 'ef4655';
    }
  }
}
