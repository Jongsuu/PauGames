import { animate, animation, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

const dealCardAnimation = animation([
  animate("500ms", keyframes([
    style({
      transform: "translate(-200%) rotate(-27deg)"
    }),
    style({
      transform: "translate(40%) rotate(9deg)"
    }),
    style({
      transform: "translate(0) rotate(0)"
    })
  ]))
]);

export const dealCardTrigger = trigger("dealCardTrigger", [
  transition(":enter", [
    useAnimation(dealCardAnimation)
  ])
]);

const fadeInAnimation = animation([
  style({
    opacity: "0"
  }),
  animate("200ms ease-in-out", style({
    opacity: "1"
  }))
]);

export const fadeInTrigger = trigger("fadeInTrigger", [
  transition(":enter", [
    useAnimation(fadeInAnimation)
  ])
]);
