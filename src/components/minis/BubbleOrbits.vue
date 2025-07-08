<script setup lang="ts">
import { ref, computed } from 'vue';
import type { BubbleData } from './Bubble.vue';
import Bubble from './Bubble.vue';

const COLOR_PALETTE: string[] = ["f1fffd", "befff7", "95fff2", "6affed"] as const; 
const OB_ZOOM = 1;  // multiplier for how far the observer is relative to the orbit origin
const OB_DIST_RATIO = 4;
const RAND_RANGES = {
  ang_velocity: {
    min: 0.25*Math.PI,
    max: 1.25*Math.PI,
  },
  bubble_radius: {
    min: 25,
    max: 125,
  },
  orbit_tilt: {  // in rads
    min: 0,
    max: 2*Math.PI,
  }  // rand range of orbit radius depends on height and width dimensions
};

interface Props {
  count?: number;  // number of bubbles/orbits
  width?: number;  // width of space to draw the orbit (to offset by size of bubble) - in px
  height?: number;   // height of space to draw the orbit (to offset by size of bubble) - in px
  ang_velocity?: number | 'random';  // angular velocity of speed, in rad/s
  bubble_radius?: number | 'random';  // starting bubble radius (how big the bubble appears to be is at phi = 0) in px
  orbit_radius?: 'random' | 'fit-maximum';  // in px
  orbit_tilt?: number | 'random';  // in rad (0.5pi for perfectly vertical, 1pi for flipped upside down, error handle as you would with angles above 2pi rad)
  color?: typeof COLOR_PALETTE[number] | "random";
};

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  width: 800,
  height: 450,
  ang_velocity: 0.75*Math.PI,
  bubble_radius: 15,
  orbit_radius: 'fit-maximum',
  orbit_tilt: 0,
  color: 'random',
});

// BUBBLE GENERATION
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random()*COLOR_PALETTE.length)];
}

// Derivation of orbit illusion (pure math):
// (variables that change to show an illusion of depth while revolving)
// d - apparent distance from center of bubble to origin
// r - apparent radius of bubble
// phi - angle of bubble in its orbit
// (constants inherent to the bubble and its orbit)
// V - angular velocity of bubble in its orbit
// D - actual distance (i.e. radius of orbit --> amplitude or maximum of apparent distance)
// R - actual radius (when the bubble is exactly the same distance from the observer as the orbit)
// theta - tilt of orbit from the horizontal axis (0rad is perfectly horizontal)
// D_0 - distance of observer from the orbit origin

// Formulas here:
// d = D * cos(phi)
// r = D_0 * R / (D_0 + D * sin(phi))

function getApparentDistance(orbit_radius: number, angle: number): number {
  return orbit_radius * Math.cos(angle);
}
function getApparentRadius(
  orbit_radius: number, 
  angle: number, 
  original_radius: number, 
  observer_distance: number
): number {
  return observer_distance * original_radius / (observer_distance + orbit_radius*Math.sin(angle));
}

// must always be bigger than the maximum orbit radius possible for the given dimensions, or else observer ends up on or inside the orbit, which will cause rendering issues
const observer_distance = computed(() => {  
  return OB_DIST_RATIO*Math.max(props.width, props.height)/Math.min(OB_ZOOM, OB_DIST_RATIO);
});

interface BubbleDataExtended extends BubbleData {
  ang_velocity: number;
  bubble_radius: number;  // original radius of bubble
  orbit_radius: number;
  orbit_tilt: number;

  angle: number;
}
const animated_bubbles = ref<BubbleDataExtended[]>([]);
function generateBubbles() {
  const bubble_arr: BubbleDataExtended[] = [];
  for (let i = 0; i < props.count; i++) {
    const orbit_axis_length = Math.max(props.width, props.height);

    const ang_velocity = props.ang_velocity === 'random' ? getRandomFloat(RAND_RANGES.ang_velocity.min, RAND_RANGES.ang_velocity.max) : props.ang_velocity;
    const bubble_radius = props.bubble_radius === 'random' ? getRandomInt(RAND_RANGES.bubble_radius.min, RAND_RANGES.bubble_radius.max) : props.bubble_radius;
    const orbit_radius = props.orbit_radius === 'fit-maximum' ? orbit_axis_length/2 : getRandomInt(0, orbit_axis_length/2);
    // const orbit_tilt = props.orbit_tilt === 'random' ? getRandomFloat(RAND_RANGES.orbit_tilt.min, RAND_RANGES.orbit_tilt.max) : props.orbit_tilt;
    const orbit_tilt = 0;

    const angle = getRandomFloat(0, 2*Math.PI);
    const radius = getApparentRadius(orbit_radius, angle, bubble_radius, observer_distance.value);
    const position = {  // assuming orbit tilt is zero for now
      x: props.width/2 + getApparentDistance(orbit_radius, angle), 
      y: props.height/2,
    };
    const color = props.color === "random" ? getRandomColor() : props.color;

    bubble_arr.push({
      ang_velocity: ang_velocity,
      bubble_radius: bubble_radius,
      orbit_radius: orbit_radius,
      orbit_tilt: orbit_tilt,

      angle: angle,

      radius: radius,
      position: position,
      color: color,
    });
  }
  bubble_arr.sort((a, b) => a.radius - b.radius);

  animated_bubbles.value = bubble_arr;
}

// ANIMATION DRIVER
let frame_id: number | undefined = undefined;
let previous_time: DOMHighResTimeStamp = 0;

function step(timestamp: DOMHighResTimeStamp) {

  if (!previous_time) previous_time = timestamp;
  const dt = Math.min((timestamp - previous_time) / 1000, 1 / 60);
  previous_time = timestamp;

  animated_bubbles.value.forEach(bubble => {
    move(bubble, dt, bubble.ang_velocity);
  });
  
  frame_id = requestAnimationFrame(step);
}

function move(bubble: BubbleDataExtended, dt: number, ang_velocity: number) {
  bubble.angle += ang_velocity * dt;
  if (bubble.angle > 2*Math.PI) bubble.angle -= 2*Math.PI;

  const new_radius = getApparentRadius(bubble.orbit_radius, bubble.angle, bubble.orbit_radius, observer_distance.value);
  const new_distance = getApparentDistance(bubble.orbit_radius, bubble.angle);
  
  bubble.radius = new_radius;
  bubble.position.x = props.width/2 + new_distance;
}

function startAnimation() {
  if (!frame_id) {
    frame_id = 0; // Reset last frame time for smooth start
    frame_id = requestAnimationFrame(step);
  }
};

function stopAnimation() {
  if (frame_id) {
    cancelAnimationFrame(frame_id);
    frame_id = undefined;
  }
};

</script>

<template>

  <div class="orbits-wrapper">
    <Bubble 
      v-for="(bubble, index) in animated_bubbles" 
      :key="index" 
      v-bind="bubble"
    />
  </div>

</template>

<style scoped>



</style>