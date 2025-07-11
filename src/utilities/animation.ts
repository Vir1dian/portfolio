type AnimationCallback = (dt: number) => void;

let frame_id: number | undefined = undefined;
let previous_time: DOMHighResTimeStamp = 0;
let callbacks: Set<AnimationCallback> = new Set();  // Set to prevent duplicates and O(1) add/delete

/**
 * Adds a callback function to be executed on each animation frame.
 * @param callback The function to add.
 */
function addAnimationCallback(callback: AnimationCallback) {
  callbacks.add(callback);
  // Automatically start the animation loop if it's not running
  if (callbacks.size === 1 && frame_id === undefined) {
    startAnimationLoop();
  }
}

/**
 * Removes a callback function from the animation loop.
 * @param callback The function to remove.
 */
function removeAnimationCallback(callback: AnimationCallback) {
  callbacks.delete(callback);
  // Stop the animation loop if there are no more callbacks
  if (callbacks.size === 0 && frame_id !== undefined) {
    stopAnimationLoop();
  }
}

/**
 * The main animation loop function.
 * It calculates delta time and executes all registered callbacks.
 * @param timestamp The current time provided by requestAnimationFrame.
 */
function animationLoop(timestamp: DOMHighResTimeStamp) {
  if (!previous_time) {
    previous_time = timestamp;
  }

  // Calculate delta time in seconds, clamped to avoid huge jumps on tab switch/initial load
  const dt = Math.min((timestamp - previous_time) / 1000, 1 / 60);
  previous_time = timestamp;

  // Execute all registered callbacks
  callbacks.forEach(callback => {
    callback(dt); // Your individual animation logic goes here
  });

  // Request the next frame
  frame_id = requestAnimationFrame(animationLoop);
}

/**
 * Starts the global animation loop.
 */
function startAnimationLoop() {
  if (frame_id === undefined) {
    previous_time = 0; // Reset previous_time for a smooth start
    frame_id = requestAnimationFrame(animationLoop);
  }
}

/**
 * Stops the global animation loop.
 */
function stopAnimationLoop() {
  if (frame_id !== undefined) {
    cancelAnimationFrame(frame_id);
    frame_id = undefined;
    previous_time = 0; // Reset previous_time
  }
}

export {
  addAnimationCallback,
  removeAnimationCallback
}