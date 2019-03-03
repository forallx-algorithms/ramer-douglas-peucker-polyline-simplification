const vec2length = (a) =>
    Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));

const vec2norm = (a) => {
    const length = vec2length(a);
    return [a[0] / length, a[1] / length];
};

const vec2dot = (a, b) => a[0] * b[0] + a[1] * b[1];

const vec2sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

const vec2scale = (a, s) => [a[0] * s, a[1] * s];

/**
 * Compute perpendicular distance between line given by points "s" and "e" and point "p"
 * @param {[number, number]} s Start point of a line
 * @param {[number, number]} e End point of a line
 * @param {[number, number]} p Point
 * @returns {number} Computed perpendicular distance
 */
const computePerpendicularDistance = (s, e, p) => {
    const lv = vec2norm(vec2sub(e, s));
    const pv = vec2sub(p, s);
    const projected = vec2scale(lv, vec2dot(lv, pv));
    return vec2length(vec2sub(projected, pv));
};

/**
 * Simplifies part of the line bounded by "si" and "ei" indexes
 * @param {number} si Index of the start point
 * @param {number} ei Index of the end point
 * @return {[number, number][]} Simplified part of the given polyline
 */
const simplify = (polyline, si, ei, d) => {
    const s = polyline[si];
    const e = polyline[ei];

    if (ei - si === 1) {
        return [s, e];
    }

    let maxDistance = -Infinity;
    let maxIndex = -1;
    for (let i = si + 1; i < ei; i++) {
        const distance = computePerpendicularDistance(s, e, polyline[i]);
        if (distance > maxDistance) {
            maxDistance = distance;
            maxIndex = i;
        }
    }

    if (maxDistance > d) {
        const left = simplify(polyline, si, maxIndex, d);
        const right = simplify(polyline, maxIndex, ei, d);

        // left and right both contain maxIndex element
        // so remove maxIndex from left
        left.pop();

        return left.concat(right);
    } else {
        return [s, e];
    }
};

/**
 * @param {[number, number][]} polyline
 * @param {number} si Index of the start point
 * @param {number} ei Index of the end point
 * @param {number} d
 * @returns {[number, number][]} Simplified polyline
 */
const ramerDouglasPeuckerSimplification = (polyline, d) => {
    if (polyline.length > 1) {
        return simplify(polyline, 0, polyline.length - 1, d);
    } else {
        return polyline;
    }
};

module.exports = {
    ramerDouglasPeuckerSimplification
};
