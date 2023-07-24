// This code is based on a pen by Jarod Hargreaves:
// https://codepen.io/jargharg/pen/YzQQdoo

const EL_EYE = document.querySelector("#eyeball");
const EL_LIDS = document.querySelectorAll(".eyelids");
const EL_PUPIL = document.querySelector("#pupil");
const EL_HIGHLIGHT = document.querySelector("#smallHighlight");

const PATH_LID_CLOSED =
  "M0,80C0,80 15.7,83.3 29.5,86.2C43,89 57,89 70.5,86.2C84.3,83.3 100,80 100,80C100,80 84.3,83.3 70.5,86.2C57,89 43,89 29.5,86.2C15.7,83.3 0,80 0,80Z";
const PATH_LID_OPEN = document.querySelector(".eyelids").getAttribute("d");

const EYE_MOVEMENT = 25;
const PUPIL_MOVEMENT = 3;

function blink({ delay } = {}) {
  let shouldQuickBlink = Math.random() < 0.2;
  let randomDelay = 1 + Math.random() * 3;
  let toCloseDuration = 0.1 + Math.random() * 0.3;
  let toOpenDuration = shouldQuickBlink ? 0.2 : 0.3 + Math.random() * 0.5;

  gsap
    .timeline({
      onComplete: blink,
      delay: delay ?? (shouldQuickBlink ? 0 : randomDelay),
      defaults: { ease: "power3.out" },
    })
    .to(EL_LIDS, {
      attr: { d: PATH_LID_CLOSED },
      duration: toCloseDuration,
    })
    .to(EL_LIDS, {
      attr: { d: PATH_LID_OPEN },
      duration: toOpenDuration,
    });
}

function moveEyeball() {
  let toRightDuration = 0.5 + Math.random() * 3;
  let toLeftDuration = 0.5 + Math.random() * 3;

  gsap
    .timeline({
      onComplete: moveEyeball,
      defaults: {
        ease: "expo.inOut",
        transformOrigin: "center center",
      },
    })
    .addLabel("toRight")
    .to(EL_EYE, { x: -EYE_MOVEMENT, duration: toRightDuration }, "toRight")
    .to(EL_PUPIL, { x: -PUPIL_MOVEMENT, duration: toRightDuration }, "toRight")
    .to(EL_HIGHLIGHT, { x: -1, duration: toRightDuration }, "toRight")
    .addLabel("toLeft")
    .to(EL_EYE, { x: EYE_MOVEMENT, duration: toLeftDuration }, "toLeft")
    .to(EL_PUPIL, { x: PUPIL_MOVEMENT, duration: toLeftDuration }, "toLeft")
    .to(EL_HIGHLIGHT, { x: 1, duration: toLeftDuration }, "toLeft");
}

function resetEye() {
    gsap.set(EL_LIDS, { attr: { d: PATH_LID_CLOSED } });
    gsap.set([EL_EYE, EL_PUPIL, EL_HIGHLIGHT], { x: 0 });
}
  

moveEyeball();
blink({ delay: 0.3 });
