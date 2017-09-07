import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [

    transition(':enter', [
      style({
        transform: 'translateX(-100%)',
      }),
      animate('.5s ease-in-out', style({
        transform: 'translateX(0)',
      }))
    ]),

    transition(':leave', [
      style({
        position: 'absolute',
        opacity: 1,
        top: 0,
        transform: 'translateX(0)',
      }),
      animate('.5s ease-in-out', style({
        transform: 'translateX(400%)',
        opacity: 0
      }))
    ])
  ]);

