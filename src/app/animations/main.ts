import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [

    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('.5s ease-in-out', style({
        opacity: 1
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

export const slideOutAnimation =
  trigger('slideInOutAnimation', [
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

