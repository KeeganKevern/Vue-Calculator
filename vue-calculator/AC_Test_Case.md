Pressing AC (mouse click) is causing problems.
Input test study:
input the equation "12 + 2 =" using Keyboard, mouse, and hybrid input to determine the
source of the problem. Observe the output/calculated result.

K == keyboard input
M = Mouse input

12 + 2 = NaN
KK K K K

12 + 2 = 14
MM M M M

12 + 2 = 14
MM K M M

12 + 2 = 34
MM M M K

12 + 2 = 34
MM K M K

Observations:

- When "Enter" is pressed on the keyboard, results go awry.

From inserting console.log(this.current, this.previous), it is seen that after AC is pressed, no values are stored at the time of pressing enter (after entering current-> operator -> previous)

Clicking AC, then clicking off the calculator, then inputting:
12 + 2 =
KK K K K

results in 14. Therefore it appears the mouse click is being repeated, or the button is being "held down". This is constantly wiping out the numerical values inputted from the keyboard.
