<template>
  <button type="button" @click="onClick" :class="className">
    <span v-text="display" />
    <svg
      :class="{ display: !!display }"
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <circle class="circle-2" cx="50" cy="50" r="45" />
      <path class="path-1" d="M 15,15 L 85,85" />
      <path class="path-2" d="M 85,15 L 15,85" />
      <circle class="circle-1" cx="50" cy="50" r="35" />
    </svg>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ScoreButton extends Vue {
  @Prop({ default: false }) private closed!: 0 | 1;
  @Prop({ required: true }) private value!: number;
  @Prop({ required: true }) private onClick!: Function;

  get className() {
    if (this.closed) return 'value-X';
    const val = Math.min(this.value, 4);
    return `value-${val}`;
  }

  get display() {
    return this.value <= 3 ? '' : (this.value - 3).toString();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@function sqrt($r) {
  $x0: 1;
  $x1: $x0;
  @for $i from 1 through 10 {
    $x1: $x0 - ($x0 * $x0 - abs($r)) / (2 * $x0);
    $x0: $x1;
  }
  @return $x1;
}

@function distance($ax, $ay, $bx, $by) {
  $x: $bx - $ax;
  $y: $by - $ay;
  @return sqrt($x * $x + $y * $y);
}

$color: black;
$accent: tomato;
$stroke: 10px;
$button-di: 60px;
$time: 150ms;
$ease: ease-in-out;
$circle-diameter: 70;
$circle-length: 3.14159265359 * $circle-diameter;
$highlight-diameter: 90;
$highlight-length: 3.14159265359 * $highlight-diameter;
$path-length: distance(15, 15, 85, 85) + $stroke;

button {
  appearance: none;
  background: transparent;
  border: none;
  overflow: visible;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: $button-di * 0.7;
  width: $button-di * 0.7;
  @media (min-height: 660px), (min-width: 660px) {
    width: $button-di;
    height: $button-di;
  }
  outline: none;
  padding: 0;
  position: relative;
  transition: background $time $ease, color $time $ease;
  &,
  svg {
    vertical-align: middle;
  }
  &.value-X {
    color: white;
    cursor: default;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    font-weight: 900;
    font-size: 1.3em;
    transform: translate(-50%, -50%) translateZ(0);
  }
}

svg {
  width: 100%;
  height: auto;
}
path,
circle {
  fill: none;
}

.circle-1 {
  transform: rotate(-90deg);
  transform-origin: center center;
  stroke-dasharray: $circle-length $circle-length;
  stroke-dashoffset: $circle-length;
}
.path-1,
.path-2 {
  stroke-dasharray: $path-length $path-length;
  stroke-dashoffset: $path-length;
}
.circle-1,
.path-1,
.path-2 {
  stroke: currentColor;
  .value-4 & {
    stroke: transparent;
  }
}
.circle-2 {
  stroke: transparent;
  .value-0 & {
    stroke: #f0f0f0;
  }
  .value-4 & {
    stroke: currentColor;
  }
}

.value-X {
  .circle-1,
  .path-1,
  .path-2 {
    stroke: transparent;
  }
  span {
    color: $accent;
    color: $color;
  }
  .display .circle-2 {
    fill: currentColor;
    stroke: $color;
  }
}

.circle-1,
.circle-2,
.path-1,
.path-2 {
  stroke-width: $stroke;
  transition: stroke-dashoffset $time $ease, stroke $time $ease,
    fill $time $ease;
}

%active-stroke {
  stroke-dashoffset: 0;
}

.circle-2 {
  @extend %active-stroke;
}

.value-1,
.value-2,
.value-3,
.value-4,
.value-X {
  .path-1 {
    @extend %active-stroke;
  }
}
.value-2,
.value-3,
.value-4,
.value-X {
  .path-2 {
    @extend %active-stroke;
  }
}
.value-3,
.value-4,
.value-X {
  .circle-1 {
    @extend %active-stroke;
  }
}
</style>
