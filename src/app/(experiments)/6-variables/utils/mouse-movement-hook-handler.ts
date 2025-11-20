import React from 'react'

type MouseData = { x: number; y: number; } | Record<string,never>
type setterStateFn = React.Dispatch<React.SetStateAction<MouseData>>
/**
 * Curried mouse move handler that captures mouse position.
 * 
 * Usage:
 * 1. Pass a state setter function to create the actual event handler
 * 2. Attach the returned function to a mousemove event listener
 * 3. The setter will receive an object with { x, y }
 * 
 * @param setterFn - React setState function that receives mouse data
 * @returns Event handler function that can be attached to mousemove events
 * 
 * @example
 * ```
 * const [mouse, setMouse] = useState<typeof handleMouseMove.State>({});
 * React.useEffect(() => {
 *   const ctrl = new AbortController()
 *   window.addEventListener('mousemove', handlerMouseMove(setMouse), {signal: ctrl.signal})
 *   return () => {ctrl.abort()}
 * }, [])
 * ```
 */
const handlerFn = (setterFn: setterStateFn) => (event: MouseEvent) => {
	const [x,y] = [event.clientX, event.clientY]
	const newState: MouseData = { x, y };
	setterFn(newState)
}

export const handlerMouseMove = Object.assign(handlerFn, { State: {} as MouseData })


/**
 * Hook that tracks mouse position across the window. 
 * It uses abortController inside to handle the component unmount logic
 * @returns Object with x and y coordinates, or empty object if no movement detected yet
 */
export const useMouseMovement = () => {
	const [mouseInfo, setMouseInfo] = React.useState<typeof handlerMouseMove.State>({});
	
	React.useEffect(() => {
		const ctrl = new AbortController()
		window.addEventListener('mousemove', handlerMouseMove(setMouseInfo), {signal: ctrl.signal})
		return () => {ctrl.abort()}
	}, [])

	return mouseInfo
}

