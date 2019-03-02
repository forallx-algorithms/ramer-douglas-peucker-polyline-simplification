const vec2length = (a) =>
    Math.sqrt(Math.pow(a[0], 2), Math.pow(a[1], 2));

const vec2norm = (a) => {
    const length = vec2length(a);
    return [a[0] / length, b[0] / length];
};

const vec2dot(a, b) = (a, b) => a[0] * b[0] + a[1] * b[1];

const vec2sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

/**
 * Compute perpendicular distance between line given by points "s" and "e" and point "p"
 * @param {[number, number]} s Start point of a line
 * @param {[number, number]} e End point of a line
 * @param {[number, number]} p Point
 * @returns {number} Computed perpendicular distance
 */
const computePerpendicularDistance = (s, e, p) => {
    const l = vec2norm(vec2sub(e, s));
    const projected = vec2dot(l, p);
    const d = vec2length(vec2sub(projected, p));
    return d;
};

/**
 * @param {[number, number][]} polyline
 * @param {number} si Index of the start point
 * @param {number} ei Index of the end point
 * @param {number} d
 * @returns {[number, number][]} Simplified polyline
 */
const douglasPeuckerSimplification = (polyline, si, ei, d) => {
    let maxDistance = -Infinity;
    let maxi = -1;
    const s = polyline[si];
    const e = polyline[ei];
    for (let i = si + 1; i < ei - 1; i++) {
        const distance = computePerpendicularDistance(s, e, polyline[i]);
        if (distance > maxDistance) {
            maxDistance = distance;
            maxi = i;
        }
    }

    if (maxDistance > d) {
        return douglasPeuckerSimplification(polyline, si, maxi, d)
            .concat(douglasPeuckerSimplification(polyline, maxi, ei, d));
    } else {
        return [s, e];
    }
}
