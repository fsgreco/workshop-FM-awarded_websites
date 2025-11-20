import React from "react";

// Event type mapping for type-safe event handling
type EventMap = {
  mousemove: MouseEvent;
  click: MouseEvent;
  mousedown: MouseEvent;
  mouseup: MouseEvent;
  scroll: Event;
  resize: UIEvent;
  keydown: KeyboardEvent;
  keyup: KeyboardEvent;
};

type EventType = keyof EventMap;

/**
 * Sets a CSS custom property (variable) on an element in response to window events.
 * 
 * Define the event to listen to, provide a callback that processes the event data,
 * and the results of that callback will be applied to the element as a CSS variable with your chosen name.
 * 
 * @param eventType - The window event to listen to (e.g., 'mousemove', 'scroll', 'resize')
 * @param callback - Function that receives the event and returns the CSS variable value (number or string)
 * @param element - React ref object pointing to the target HTML element where the CSS variable will be set
 * @param variable - Name of the CSS variable (without the '--' prefix)
 * 
 * @example
 * ```tsx
 * const elementRef = useRef<HTMLDivElement>(null);
 * 
 * useWindowEventToCSSProperty('mousemove', (event) => {
 *   return event.clientX; // Sets --mouse-x on the element
 * }, elementRef, 'mouse-x');
 * ```
 */
export const useWindowEventToCSSProperty = <T extends EventType>(
  eventType: T,
  callback: (event: EventMap[T]) => number | string,
  element: React.RefObject<HTMLElement | null>,
  variable: string
) => {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof callback !== "function") return; // Early return if invalid callback
    if (!element.current) return; // Early return if element not ready

    const ctrl = new AbortController();
    window.addEventListener( eventType, (event) => {
        const result = callback(event as EventMap[T]);
        element.current?.style.setProperty(`--${variable}`, result.toString());
      },
      { signal: ctrl.signal }
    );

    return () => { ctrl.abort(); };

  }, [element, callback, variable, eventType]);
}


