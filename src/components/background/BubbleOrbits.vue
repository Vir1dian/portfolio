<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { addAnimationCallback, removeAnimationCallback } from '../../utilities/animation';
import type { BubbleData } from '../minis/Bubble.vue';
import Bubble from '../minis/Bubble.vue';

const COLOR_PALETTE: string[] = ["f1fffd", "befff7", "95fff2", "6affed"] as const; 
const OB_DIST_RATIO = 4;
const RAND_RANGES = {
  // ang_velocity_slow: {
  //   min: 0.05*Math.PI,
  //   max: 0.50*Math.PI,
  // },
  // ang_velocity_fast: {
  //   min: 0.25*Math.PI,
  //   max: 1.25*Math.PI,
  // },
  // bubble_radius_small: {
  //   min: 25,
  //   max: 125,
  // },
  // bubble_radius_large: {
  //   min: 200,
  //   max: 450,
  // },
  orbit_tilt: {  // in rads
    min: 0,
    max: 2*Math.PI,
  }  // rand range of orbit radius depends on height and width dimensions
};

type RandomRange = {
  min: number,
  max: number,
}

interface Props {
  count?: number;  // number of bubbles/orbits
  width?: number;  // width of space to draw the orbit (to offset by size of bubble) - in px
  height?: number;   // height of space to draw the orbit (to offset by size of bubble) - in px
  ang_velocity?: number | RandomRange;  // angular velocity of speed, in pi*rad/s
  bubble_radius?: number | RandomRange;  // starting bubble radius (how big the bubble appears to be is at phi = 0) in px
  orbit_radius?: 'random' | 'fit-maximum';  // in px
  orbit_tilt?: number | 'random';  // in pi*rad (0.5pi for perfectly vertical, 1pi for flipped upside down, error handle as you would with angles above 2pi rad)
  zoom?: number;  // multiplier for how far the observer is relative to the orbit origin
  color?: typeof COLOR_PALETTE[number] | "random";
};

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  width: 500,
  height: 500,
  ang_velocity: 0.75,
  bubble_radius: 50,
  orbit_radius: 'fit-maximum',
  orbit_tilt: 'random',
  zoom: 4,
  color: 'random',
});

const wrapper_dimensions = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };
});

onMounted(() => {
  generateBubbles();
  addAnimationCallback(animateOrbits);
});
onUnmounted(() => {
  removeAnimationCallback(animateOrbits);
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

/**
 * Maps an angle to its equivalent in the first quadrant, retaining the same
 * trigonometric ratios by repeatedly "folding" the angle. 
 * @param angle Any angle in radians
 */
function getQ1Angle(angle: number): number {
  let relevant_angle = Math.abs(angle);
  while (relevant_angle > Math.PI/2) relevant_angle = Math.abs(relevant_angle - Math.PI);
  return relevant_angle;
}
function getQuadrant(angle: number): 1 | 2 | 3 | 4 {
  let relevant_angle = angle;
  while (relevant_angle < 0) relevant_angle += 2*Math.PI;
  while (relevant_angle >= 2*Math.PI) relevant_angle -= 2*Math.PI;
  if (relevant_angle <= Math.PI/2) {
    return 1;
  } else if (relevant_angle <= Math.PI) {
    return 2;
  } else if (relevant_angle <= 3*Math.PI/2) {
    return 3;
  } else {
    return 4;
  }
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
function getTiltData(width: number, height: number, tilt_angle: number, radius_offset: number, distance: number): { x: number, y: number, r: number } {
  const x_center = width / 2;
  const y_center = height / 2;
  const b_avail = x_center - radius_offset; // Available half-width for orbit projection
  const h_avail = y_center - radius_offset; // Available half-height for orbit projection

  const tilt_q1 = getQ1Angle(tilt_angle); // Angle mapped to [0, PI/2] (for magnitudes)
  const quadrant = getQuadrant(tilt_angle); // Original quadrant of the tilt_angle

  let current_x_offset_magnitude: number; // Magnitude of the X offset from center
  let current_y_offset_magnitude: number; // Magnitude of the Y offset from center
  let orbit_radius_for_fit: number;       // The actual orbit radius (from fit-maximum logic)

  // Magnitude
  // Edge Cases (0 and PI/2)
  if (tilt_q1 === 0) {
    current_x_offset_magnitude = Math.abs(distance); 
    current_y_offset_magnitude = 0;
    orbit_radius_for_fit = b_avail;
  } else if (tilt_q1 === Math.PI / 2) {
    current_x_offset_magnitude = 0; 
    current_y_offset_magnitude = Math.abs(distance); 
    orbit_radius_for_fit = h_avail; 
  }

  else {
    const full_b_distance = b_avail / Math.cos(tilt_q1);
    const full_h_distance = h_avail / Math.sin(tilt_q1);

    if (full_b_distance < full_h_distance) {
      current_x_offset_magnitude = Math.abs(b_avail * distance / full_b_distance); 
      current_y_offset_magnitude = current_x_offset_magnitude * Math.tan(tilt_q1);
      orbit_radius_for_fit = full_b_distance;
    } else {
      current_y_offset_magnitude = Math.abs(h_avail * distance / full_h_distance); 
      current_x_offset_magnitude = current_y_offset_magnitude / Math.tan(tilt_q1);
      orbit_radius_for_fit = full_h_distance;
    }
  }

  // Quadrant
  let final_x_offset: number;
  let final_y_offset: number;

  // X-offset sign
  if (quadrant === 1 || quadrant === 4) { // cos(tilt_angle) is positive
    final_x_offset = current_x_offset_magnitude;
  } else { // quadrant === 2 || quadrant === 3 (cos(tilt_angle) is negative)
    final_x_offset = -current_x_offset_magnitude;
  }
  final_x_offset *= Math.sign(distance); // Apply sign from distance (R_orbit * cos(phi))


  // Y-offset sign
  if (quadrant === 1 || quadrant === 2) { // sin(tilt_angle) is positive
      final_y_offset = current_y_offset_magnitude;
  } else { // quadrant === 3 || quadrant === 4 (sin(tilt_angle) is negative)
      final_y_offset = -current_y_offset_magnitude;
  }
  final_y_offset *= Math.sign(distance); // Apply sign from distance (R_orbit * cos(phi))

  return {
    x: x_center + final_x_offset,
    y: y_center - final_y_offset, // Subtract y offset instead of adding due to vertical positioning based on top, not bottom
    r: orbit_radius_for_fit,
  };
}

// must always be bigger than the maximum orbit radius possible for the given dimensions, or else observer ends up on or inside the orbit, which will cause rendering issues
const observer_distance = computed(() => {  
  return OB_DIST_RATIO*Math.max(props.width, props.height)/Math.min(props.zoom, OB_DIST_RATIO);
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

    const ang_velocity = typeof props.ang_velocity === 'number' ? props.ang_velocity*Math.PI : getRandomFloat(props.ang_velocity.min, props.ang_velocity.max)*Math.PI;
    const bubble_radius = typeof props.bubble_radius === 'number' ? props.bubble_radius : getRandomInt(props.bubble_radius.min, props.bubble_radius.max);

    const orbit_tilt = props.orbit_tilt === 'random' ? getRandomFloat(RAND_RANGES.orbit_tilt.min, RAND_RANGES.orbit_tilt.max) : props.orbit_tilt*Math.PI;
    const orbit_data = getTiltData(props.width, props.height, orbit_tilt, bubble_radius, 0);

    const orbit_radius = props.orbit_radius === 'fit-maximum' ? orbit_data.r : getRandomInt(0, orbit_data.r);

    const angle = getRandomFloat(0, 2*Math.PI);
    const radius = getApparentRadius(orbit_radius, angle, bubble_radius, observer_distance.value);
    const position = {
      x: orbit_data.x + getApparentDistance(orbit_radius, angle), 
      y: orbit_data.y,
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

function move(bubble: BubbleDataExtended, dt: number, ang_velocity: number) {
  bubble.angle += ang_velocity * dt;
  if (bubble.angle > 2*Math.PI) bubble.angle -= 2*Math.PI;

  const new_radius = getApparentRadius(bubble.orbit_radius, bubble.angle, bubble.bubble_radius, observer_distance.value);
  const new_distance = getApparentDistance(bubble.orbit_radius, bubble.angle);
  
  bubble.radius = new_radius;
  const tilt_data = getTiltData(props.width, props.height, bubble.orbit_tilt, bubble.bubble_radius, new_distance);
  bubble.position.x = tilt_data.x;
  bubble.position.y = tilt_data.y;
}

function animateOrbits(dt: number) {
  animated_bubbles.value.forEach(bubble => {
    move(bubble, dt, bubble.ang_velocity);
  });
}

</script>

<template>

  <div class="orbits-wrapper" :style="wrapper_dimensions">
    <Bubble 
      v-for="(bubble, index) in animated_bubbles" 
      :key="index" 
      v-bind="bubble"
    />
  </div>

</template>

<style scoped>

.orbits-wrapper {
  position: relative;
  overflow: hidden;
}

</style>