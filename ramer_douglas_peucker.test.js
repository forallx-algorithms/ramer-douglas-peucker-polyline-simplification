const { expect } = require('chai');
const { ramerDouglasPeuckerSimplification } = require('./ramer_douglas_peucker');

describe('ramerDouglasPeuckerSimplification', () => {
    it('should return empty array if polyline is empty', () => {
        expect(ramerDouglasPeuckerSimplification([], 1)).to.eql([]);
    });

    it('should return given polyline if polyline consist only of two points', () => {
        const polyline = [[2, 2], [7, 2]];
        expect(ramerDouglasPeuckerSimplification(polyline, 1)).to.eql(polyline);
    });

    it('should not delete point if its perpendicular distance is greater than given d', () => {
        const polyline = [[2, 2], [4, 5], [7, 2]];
        expect(ramerDouglasPeuckerSimplification(polyline, 1)).to.eql(polyline);
    });

    it('should delete point if its perpendicular distance is less than given d', () => {
        const polyline = [[2, 2], [4, 3], [7, 2]];
        const should = [polyline[0], polyline[2]];
        expect(ramerDouglasPeuckerSimplification(polyline, 1)).to.eql(should);
    });

    it('should simplify given polyline', () => {
        const polyline = [
            [0, 0], [1, 0.1], [2, -0.1], [3, 5], [4, 6], [5, 7], [6, 8.1], [7, 9], [8, 9], [9, 9]
        ];
        const should = [[0, 0], [2, -0.1], [3, 5], [7, 9], [9, 9]];
        expect(ramerDouglasPeuckerSimplification(polyline, 1)).to.eql(should);
    });
});
