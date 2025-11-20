import React from 'react'
import { useMouseMovement } from "./mouse-movement-hook-handler";

/**
 * Calculates Euclidean distance between two points.
 * @param x1 - X coordinate of first point
 * @param y1 - Y coordinate of first point
 * @param x2 - X coordinate of second point
 * @param y2 - Y coordinate of second point
 * @returns Distance between the two points
 */
function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Hook that calculates normalized distance from mouse to a target point.
 * @param target - Target from which the mouse distance will be calculated, defaults to center
 * @param target.x - X coordinate of the target point (defaults to screen center)
 * @param target.y - Y coordinate of the target point (defaults to screen center)
 * @returns Relative distance between 0 (at target) and 1 (at corner)
 */
export const useMouseDistance = (target?: { x?: number; y?: number }) => {
	const mouse = useMouseMovement()
	const [ distanceFromMouse , setDistanceFromMouse ] = React.useState(0)
	React.useEffect(() => {
		const targetX = target?.x ?? (window.innerWidth / 2)
		const targetY = target?.y ?? (window.innerHeight / 2)
		const distance = getDistance(mouse.x, mouse.y, targetX, targetY ) 
		const maxDistance = getDistance(0, 0, targetX, targetY )
		const relativeDistance = distance / maxDistance // this will oscilate between 0 / 1 (0 center, 1 is border)
		setDistanceFromMouse(relativeDistance)
	}, [mouse, target?.x, target?.y])
	return distanceFromMouse
}