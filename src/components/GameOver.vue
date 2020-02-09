<template>
  <div class="game-over" :class="{ active }">
    <div class="backdrop">
      <h1>{{ text }}</h1>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'vue-property-decorator';
import { TIE } from '../constants';
@Component
export default class GameOver extends Vue {
  @Prop({ required: true }) active!: boolean;
  @Prop({ required: true }) close!: Function;
  @Prop({ required: true }) winner!: string;

  get text() {
    return this.winner === TIE
      ? "Whelp...it's a tie!"
      : `The winner is ${this.winner}`;
  }
}
</script>

<style scoped lang="scss">
.game-over {
  background: var(--color2);
  box-sizing: border-box;
  color: var(--color1);
  height: 100%;
  left: 0;
  padding: 1rem;
  position: absolute;
  top: 0;
  transform: translateY(100%);
  transition: transform 250ms ease-in-out;
  width: 100%;
  z-index: 9;
  &.active {
    transform: translateY(0);
  }
  .backdrop {
    align-content: center;
    background: var(--color2);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;
    h1 {
      margin: 0;
      font-size: var(--font-size-display-small);
      text-transform: uppercase;
    }
    button {
      width: auto;
      margin: 1rem auto;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
}
</style>
