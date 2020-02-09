<template>
  <div class="settings" :class="{ active }">
    <button @click="close" class="close"></button>
    <div>
      <p>Theme</p>
      <ul class="themes">
        <li
          v-for="(theme, i) in themes"
          :key="i"
          :class="{ active: i === themeIdx }"
          @click="() => select(i)"
        >
          <span
            v-for="(color, j) in Object.values(theme)"
            :key="j"
            :style="{ background: color }"
          ></span>
        </li>
      </ul>
    </div>
    <div>
      <p>Preview</p>
      <div class="row-examples">
        <div class="row closed">
          <div class="col">
            <ScoreButton :closed="true" :onClick="() => {}" :value="4" />
          </div>
          <div class="col-flex">
            <span class="hit" v-text="'B'" />
          </div>
          <div class="col">
            <ScoreButton :closed="true" :onClick="() => {}" :value="1" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ScoreButton :closed="false" :onClick="() => {}" :value="1" />
          </div>
          <div class="col-flex">
            <span class="hit" v-text="'B'" />
          </div>
          <div class="col">
            <ScoreButton :closed="false" :onClick="() => {}" :value="3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'vue-property-decorator';
import ScoreButton from './ScoreButton.vue';
import { Theme } from '../types';
@Component({
  components: { ScoreButton },
})
export default class Settings extends Vue {
  @Prop({ required: true }) active!: boolean;
  @Prop({ required: true }) close!: Function;
  @Prop({ required: true }) select!: Function;
  @Prop({ required: true }) themes!: Array<Theme>;
  @Prop({ required: true }) themeIdx!: number;
}
</script>

<style scoped lang="scss">
.settings {
  background: var(--color2);
  box-sizing: border-box;
  color: var(--color1);
  font-weight: bold;
  height: 100%;
  left: 0;
  padding: 1rem 1rem 1rem;
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  transition: transform 250ms ease-in-out;
  width: 100%;
  z-index: 9;
  p {
    font-size: var(--font-size-large);
    line-height: 3rem;
    margin: 0 0 0rem;
  }
  &.active {
    transform: translateY(0);
  }
  .close {
    &::after {
      content: '×';
      left: 50%;
      line-height: 0.8;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    display: block;
    background: var(--accent);
    color: var(--color2);
    font-size: 1.5rem;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    line-height: 3rem;
    padding: 0;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  display: flex;
  flex-direction: column;
  @media (orientation: portrait) {
    > div + div {
      margin-top: 1rem;
    }
  }
  .row-examples {
    display: flex;
    flex-direction: column;
    @media (orientation: landscape) {
      flex-direction: row;
      width: 100px;
    }
  }
  @media (orientation: landscape) {
    flex-direction: row;
    > div {
      .row-examples,
      ul {
        flex: 1;
      }
      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(50% - 0.5rem);
      + div {
        margin-left: 1rem;
      }
    }
  }
  .themes {
    list-style: none;
    margin: 0;
    padding: 0;
    @media (orientation: portrait) {
      margin-top: 1rem;
    }
    li {
      border: var(--border) solid transparent;
      display: flex;
      + li {
        margin-top: 0.5rem;
      }
      &.active {
        border-color: var(--accent);
      }
      span {
        display: block;
        height: 30px;
        width: 25%;
      }
    }
  }
}
</style>
