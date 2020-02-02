<template>
  <div id="app">
    <div class="board">
      <div class="row header">
        <div class="col-half" :class="{ winner: gameOver && winner !== 'B' }">
          <span>A</span><span>{{ scores.A }}</span>
        </div>
        <div class="col-half" :class="{ winner: gameOver && winner !== 'A' }">
          <span>{{ scores.B }}</span
          ><span>B</span>
        </div>
      </div>
      <div
        v-for="key in order"
        :key="key"
        class="row"
        :class="{ closed: closed[key] }"
      >
        <div class="col-small">
          <ScoreButton
            :closed="closed[key]"
            :onClick="() => hit('A', key)"
            :value="playerHits.A[key]"
          />
        </div>
        <div class="col-center">
          <span class="hit" v-text="key" />
        </div>
        <div class="col-small">
          <ScoreButton
            :closed="closed[key]"
            :onClick="() => hit('B', key)"
            :value="playerHits.B[key]"
          />
        </div>
      </div>
      <div class="row footer">
        <div class="col-half act-undo"><button @click="undo">UNDO</button></div>
        <div class="col-half act-new"><button @click="clear">NEW</button></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import ScoreButton from './components/ScoreButton.vue';

type ClosedType = 0 | 1;
type HitIdType = '15' | '16' | '17' | '18' | '19' | '20' | 'B';
type PlayerIdType = 'A' | 'B';

type Closed = { [K in HitIdType]: ClosedType };
type Hits = { [K in HitIdType]: number };
type PlayerHits = { [K in PlayerIdType]: Hits };
type Scores = { [K in PlayerIdType]: number };

interface TimelineEntry {
  hitId: HitIdType;
  playerId: PlayerIdType;
}
type Timeline = Array<TimelineEntry>;

const emptyHits: Hits = {
  '20': 0,
  '19': 0,
  '18': 0,
  '17': 0,
  '16': 0,
  '15': 0,
  B: 0,
};

const defaultOrder: ReadonlyArray<HitIdType> = [
  '20',
  '19',
  '18',
  '17',
  '16',
  '15',
  'B',
];

const defaultPlayerHits: PlayerHits = {
  A: Object.assign({}, emptyHits),
  B: Object.assign({}, emptyHits),
};

@Component({
  components: { ScoreButton },
})
export default class App extends Vue {
  order: ReadonlyArray<HitIdType> = defaultOrder;
  playerHits: PlayerHits = defaultPlayerHits;
  timeline: Timeline = [];

  get closed(): Closed {
    const { A, B } = this.playerHits;
    const check = (k: HitIdType): ClosedType =>
      A[k] >= 3 && B[k] >= 3 ? 1 : 0;
    return {
      '20': check('20'),
      '19': check('19'),
      '18': check('18'),
      '17': check('17'),
      '16': check('16'),
      '15': check('15'),
      B: check('B'),
    };
  }

  get gameOver(): boolean {
    const closedA = (): boolean =>
      Object.values(this.playerHits.A).filter(a => a < 3).length === 0;
    const closedB = (): boolean =>
      Object.values(this.playerHits.B).filter(a => a < 3).length === 0;
    const allClosed: boolean =
      Object.values(this.closed).filter(a => a === 0).length === 0;
    const winningA = this.winning === 'A';
    const winningB = this.winning === 'B';
    return allClosed || (winningA && closedA()) || (winningB && closedB());
  }

  get winning(): PlayerIdType | 'TIE' {
    if (this.scores.A > this.scores.B) return 'A';
    if (this.scores.B > this.scores.A) return 'B';
    return 'TIE';
  }

  get winner(): PlayerIdType | 'TIE' | null {
    if (!this.gameOver) return null;
    return this.winning;
  }

  get scores(): Scores {
    const { A, B } = this.playerHits;
    let a: number = 0;
    let b: number = 0;
    this.order.forEach(key => {
      const val: number = key === 'B' ? 25 : parseInt(key);
      if (A[key] > 3) a += (A[key] - 3) * val;
      if (B[key] > 3) b += (B[key] - 3) * val;
    });
    return { A: a, B: b };
  }

  @Emit() clear(): void {
    if (!window.confirm('Are you sure you want a new game?')) return;
    this.$set(this, 'playerHits', defaultPlayerHits);
    this.$set(this, 'timeline', []);
    this.save();
  }

  @Emit() hit(playerId: PlayerIdType, hitId: HitIdType): void {
    const currVal = this.playerHits[playerId][hitId];
    const nextVal = currVal + 1;
    if (this.closed[hitId] || this.gameOver) return;
    const entry: TimelineEntry = { playerId, hitId };
    this.timeline.push(entry);
    this.$set(this.playerHits[playerId], hitId, nextVal);
    this.save();
  }

  save(): void {
    const state = {
      playerHits: this.playerHits,
      timeline: this.timeline,
    };
    localStorage.setItem('cricket', JSON.stringify(state));
  }

  undo(): void {
    if (!this.timeline.length) return;
    const entry = this.timeline.pop();
    if (!entry) return;
    const hitId: HitIdType = entry.hitId;
    const playerId: PlayerIdType = entry.playerId;
    const nextVal = this.playerHits[playerId][hitId] - 1;
    this.$set(this.playerHits[playerId], hitId, nextVal);
    this.save();
  }

  mounted(): void {
    const saved = localStorage.getItem('cricket');
    if (saved) {
      const { playerHits, timeline } = JSON.parse(saved);
      this.$set(this, 'playerHits', playerHits as PlayerHits);
      this.$set(this, 'timeline', timeline as Timeline);
    }
  }
}
</script>

<style lang="scss">
$accent: tomato;
$border: 4px;
$font-size: 1rem;
$font-size-large: 1.4em;
$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
html,
body {
  background: black;
  margin: 0;
  height: 100%;
  font-size: $font-size;
  touch-action: none;
}
button {
  appearance: none;
  border: none;
  cursor: pointer;
  font-family: $font-family;
  font-size: $font-size;
  font-weight: bold;
  outline: none;
}
#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.board {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: 100%;
  left: 50%;
  max-height: 900px;
  max-width: 450px;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%) translateZ(0);
  width: 100%;
  .row {
    background: white;
    display: flex;
    justify-content: space-between;
    transition: color 150ms ease-in-out;
    &.closed {
      background: $accent;
      color: white;
      .col-center {
        border-left-color: $accent;
        border-right-color: $accent;
      }
    }
    &:not(.header):not(.footer) {
      flex: 1;
    }
    + .row {
      border-top: $border solid #f0f0f0;
    }
    .col-half,
    .col-small,
    .col-center {
      align-content: center;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0.25rem 0.5rem;
      > button,
      > span {
        display: block;
        width: 100%;
      }
    }
    .col-small {
      width: 16%;
    }
    .col-half {
      width: 50%;
    }
    .col-center {
      align-content: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 20%;
    }
    span.hit {
      font-size: $font-size-large;
      font-weight: 900;
    }
    span.count {
      font-weight: 900;
    }
  }

  .row.header {
    background: black;
    color: white;
    font-weight: 900;
    .col-half {
      flex-direction: row;
      font-size: $font-size-large;
      padding: 1rem;
      &.winner {
        background: $accent;
      }
      + .col-half {
        border-left: $border solid white;
      }
      span:first-child {
        text-align: left;
      }
      span:last-child {
        margin-left: auto;
        text-align: right;
      }
    }
  }
  .row.footer {
    background: black;
    padding: 0;
    .act-new,
    .act-undo {
      padding: 0;
      button {
        color: white;
        display: block;
        font-weight: 900;
        padding: 1rem 0;
        width: 100%;
        border: none;
        outline: none;
        margin: 0;
      }
    }
    .act-undo button {
      background: black;
    }
    .act-new {
      border-left: $border solid white;
    }
    .act-new button {
      background: $accent;
      background: black;
    }
  }
}
</style>
